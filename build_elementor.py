# -*- coding: utf-8 -*-
"""
build_elementor.py — package the marketing site as WordPress / Elementor Pro
HTML-widget snippets.

Outputs (under elementor/):
  header.html   — shared nav + mobile drawer + the full shared CSS bundle
                  (design tokens, components, layout) + motion.js. Paste ONCE
                  into an HTML widget inside the Elementor Theme Builder
                  *Header* template. Every other snippet depends on it.
  footer.html   — shared footer markup (styles ride in header.html). Paste
                  ONCE into the Theme Builder *Footer* template.
  pages/*.html  — one standalone snippet per page: page markup + only the
                  page-specific CSS/JS it needs. Paste each into an HTML
                  widget on its WordPress page.
  README.md     — install notes + page-to-URL map.

Isolation: every class, id and @keyframes name is prefixed with `imw-`
(classes already namespaced `imai-` are kept), element-level rules are scoped
under unique containers (`.imw-scope`, `#imw-page-<slug>`), so WP theme /
Elementor global rules cannot restyle these widgets and vice-versa.

Weight: CSS is tree-shaken per snippet (unused rules, keyframes and design
tokens dropped), everything is minified, images are lazy-loaded, fonts come
from the Google Fonts CDN and binary assets stay on the deployed site.
"""
import re, os, shutil, json

ROOT = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(ROOT, 'site')
DS_DIR = os.path.join(ROOT, '_ds', 'imai-design-system-4a6d94c2-7a00-44fd-bb33-ebaf204eaa53')
OUT = os.path.join(ROOT, 'elementor')
BASE = 'https://influencermarketing.ai'   # where fonts/woff2/logo assets stay hosted
P = 'imw-'                                # unique namespace prefix
FONTS_HREF = ('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400'
              '&family=Passion+One:wght@400;700;900&display=swap')

# old filename -> clean site URL (same map the live site uses)
URL = {
 'index.html':'/', 'platform.html':'/platform', 'solutions.html':'/solutions',
 'pricing.html':'/pricing', 'customers.html':'/customers', 'about.html':'/about',
 'find-influencers.html':'/find-influencers', 'webinars.html':'/webinars',
 'discovery.html':'/platform/discovery', 'influencer-crm.html':'/platform/influencer-crm',
 'campaign-management.html':'/platform/campaign-management', 'tracking-roi.html':'/platform/tracking-roi',
 'creator-payouts.html':'/platform/creator-payouts', 'competitive-intelligence.html':'/platform/competitive-intelligence',
 'enterprise.html':'/solutions/enterprise', 'agencies.html':'/solutions/agencies', 'smb.html':'/solutions/smb',
 'ecommerce.html':'/solutions/ecommerce', 'ugc.html':'/solutions/ugc', 'pr.html':'/solutions/pr',
 'consumer-intelligence.html':'/solutions/consumer-intelligence', 'llm-visibility.html':'/solutions/llm-visibility',
 'ai-agents.html':'/solutions/ai-agents',
 'register.html':'/register', 'personalize.html':'/onboarding/personalize',
 'payment.html':'/onboarding/payment', 'setup.html':'/onboarding/setup',
}

# ---------------------------------------------------------------- rename ----
def f_cls(c):
    return c if c.startswith(('imw-', 'imai-')) else P + c

def f_id(i):
    return i if i.startswith('imw-') else P + i

# ------------------------------------------------------------- css engine ---
_URLS = []
def protect_urls(css):
    def keep(m):
        _URLS.append(m.group(0))
        return '\x00U%d\x00' % (len(_URLS) - 1)
    return re.sub(r'url\(\s*(?:"[^"]*"|\'[^\']*\'|[^)\'"]*)\s*\)', keep, css)

def restore_urls(css):
    return re.sub(r'\x00U(\d+)\x00', lambda m: _URLS[int(m.group(1))], css)

def strip_css_comments(css):
    return re.sub(r'/\*.*?\*/', '', css, flags=re.S)

def parse_css(css):
    """-> list of nodes: ('rule', sel, body) | ('media', header, children) | ('keyframes', name, raw_body)"""
    nodes, i, n = [], 0, len(css)
    while i < n:
        m = re.match(r'\s+', css[i:])
        if m: i += m.end()
        if i >= n: break
        if css[i] == '@':
            semi = css.find(';', i); brace = css.find('{', i)
            if brace == -1 or (semi != -1 and semi < brace):     # @import / @charset
                nodes.append(('rule', css[i:semi].strip(), None)); i = semi + 1; continue
            header = css[i:brace].strip()
            depth, j = 1, brace + 1
            while j < n and depth:
                if css[j] == '{': depth += 1
                elif css[j] == '}': depth -= 1
                j += 1
            inner = css[brace + 1:j - 1]
            if header.startswith(('@media', '@supports')):
                nodes.append(('media', header, parse_css(inner)))
            elif header.startswith('@keyframes') or header.startswith('@-webkit-keyframes'):
                name = header.split()[-1]
                nodes.append(('keyframes', name, inner))
            else:                                                # @font-face etc.
                nodes.append(('rule', header, inner))
            i = j; continue
        brace = css.find('{', i)
        if brace == -1: break
        close = css.find('}', brace)
        nodes.append(('rule', css[i:brace].strip(), css[brace + 1:close]))
        i = close + 1
    return nodes

def collect_classes_from_css(nodes, out):
    for kind, a, b in nodes:
        if kind == 'rule' and b is not None and not a.startswith('@'):
            out.update(re.findall(r'\.(-?[A-Za-z_][\w-]*)', a))
        elif kind == 'media':
            collect_classes_from_css(b, out)

def rename_sel(sel):
    sel = re.sub(r'\.(-?[A-Za-z_][\w-]*)', lambda m: '.' + f_cls(m.group(1)), sel)
    sel = re.sub(r'#([A-Za-z_][\w-]*)', lambda m: '#' + f_id(m.group(1)), sel)
    return sel

def scope_part(p, S):
    """Scope one comma-separated selector part under container S. -> list of parts (may be empty)."""
    p = p.strip()
    if not p: return []
    if p.startswith(':root'): return [S + p[len(':root'):]]
    if re.match(r'html(?![\w-])', p):
        rest = p[4:]
        if not rest or rest[0] in ' >+~,': return []      # global <html> side-effects: drop
        return [p]                                        # html.imw-js-motion … (JS adds it)
    if re.match(r'body(?![\w-])', p): return [S + p[4:]]
    if p[0] in '.#': return [p]                           # already unique via prefix
    if p[0] == '*': return [S + ' ' + p, S]
    return [S + ' ' + p]                                  # bare element / attr / pseudo

def rename_kf_refs(body, kf_names):
    if 'animation' not in body: return body
    def fix(m):
        decl = m.group(0)
        for k in kf_names:
            decl = re.sub(r'(?<![\w-])' + re.escape(k) + r'(?![\w-])', f_cls(k), decl)
        return decl
    return re.sub(r'animation(?:-name)?\s*:[^;\x00]*', fix, body)

def sel_used(sel, tokens, always):
    for c in re.findall(r'\.([\w-]+)', sel):
        if c not in tokens and c not in always: return False
    for i in re.findall(r'#([\w-]+)', sel):
        if i not in tokens and i not in always: return False
    return True

def emit_css(nodes, S, tokens, always, kf_names):
    out, used_kf = [], set()
    for kind, a, b in nodes:
        if kind == 'rule':
            if b is None:
                continue                                   # @import handled separately
            if a.startswith('@'):                          # @font-face
                out.append(a + '{' + b.strip() + '}'); continue
            parts = []
            for part in a.split(','):
                rp = rename_sel(part)
                if not sel_used(rp, tokens, always): continue
                parts += scope_part(rp, S)
            if not parts: continue
            body = rename_kf_refs(b, kf_names)
            used_kf.update(re.findall(r'animation(?:-name)?\s*:\s*([^;\x00]*)', body))
            out.append(','.join(parts) + '{' + body.strip() + '}')
        elif kind == 'media':
            inner, ikf = emit_css(b, S, tokens, always, kf_names)
            used_kf.update(ikf)
            if inner: out.append(a + '{' + inner + '}')
        # keyframes are appended per-bundle from the global registry (see build_css)
    return ''.join(out), used_kf

def shake_vars(css, used_vars):
    def rule_body(m):
        head, body = m.group(1), m.group(2)
        decls = [d for d in body.split(';')
                 if not (d.strip().startswith('--') and d.split(':')[0].strip() not in used_vars)]
        return head + '{' + ';'.join(d for d in decls if d.strip()) + '}'
    return re.sub(r'([^{}]+)\{([^{}]*)\}', rule_body, css)

def minify_css(css):
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([{};:,>])\s*', r'\1', css)
    css = css.replace(';}', '}')
    return css.strip()

GLOBAL_KF = {}   # keyframe name -> body, across every stylesheet (populated in main)

def build_css(sources, S, usage_text, extra_always=()):
    tokens = set(re.findall(r'[\w-]+', usage_text))
    always = {'imw-scope', 'imw-in', 'imw-on', 'imw-open', 'imw-scrolled',
              'imw-js-motion', 'imw-motion-off', 'imw-is-active'} | set(extra_always)
    css = strip_css_comments('\n'.join(sources))
    css = protect_urls(css)
    nodes = parse_css(css)
    registry = dict(GLOBAL_KF)
    registry.update(collect_keyframes(nodes))              # bundle-local definitions win
    out, used_kf = emit_css(nodes, S, tokens, always, set(registry))
    kf_text = ' '.join(used_kf)
    for name, body in registry.items():
        if re.search(r'(?<![\w-])' + re.escape(f_cls(name)) + r'(?![\w-])', kf_text):
            out += '@keyframes ' + f_cls(name) + '{' + body.strip() + '}'
    return out

def collect_keyframes(nodes):
    kf = {}
    for kind, a, b in nodes:
        if kind == 'keyframes': kf[a] = b
        elif kind == 'media': kf.update(collect_keyframes(b))
    return kf

# ------------------------------------------------------------- html / js ----
def rewrite_assets_text(t):
    t = re.sub(r'(src|href)="(?:\.\./)?assets/', r'\1="' + BASE + '/assets/', t)
    return t

def rewrite_assets_urls():
    for i, u in enumerate(_URLS):
        _URLS[i] = re.sub(r'url\(\s*(["\']?)(?:\.\./)?assets/', r'url(\1' + BASE + '/assets/', u)

def rewrite_links(h):
    def repl(m):
        q, href = m.group(1), m.group(2)
        if href.startswith('#'):
            return 'href=%s#%s%s' % (q, f_id(href[1:]), q) if len(href) > 1 else m.group(0)
        if href.startswith(('http', 'mailto', '/')): return m.group(0)
        frag = ''
        if '#' in href:
            href, frag = href.split('#', 1)
            frag = '#' + f_id(frag)
        href = href.lstrip('./').replace('../', '')
        if href.startswith('site/'): href = href[5:]
        if href in URL:
            dest = URL[href]
            if frag and dest == '/': return 'href=%s/%s%s' % (q, frag, q)
            return 'href=%s%s%s%s' % (q, dest, frag, q)
        return m.group(0)
    return re.sub(r'href=(["\'])([^"\']+)\1', repl, h)

def rw_html(h, lazy_imgs=True):
    h = re.sub(r'<!--.*?-->', '', h, flags=re.S)
    h = re.sub(r'class="([^"]*)"', lambda m: 'class="' + ' '.join(f_cls(c) for c in m.group(1).split()) + '"', h)
    h = re.sub(r'\bid="([\w-]+)"', lambda m: 'id="' + f_id(m.group(1)) + '"', h)
    h = re.sub(r'\bfor="([\w-]+)"', lambda m: 'for="' + f_id(m.group(1)) + '"', h)
    h = re.sub(r'\b(aria-labelledby|aria-controls|aria-describedby)="([^"]+)"',
               lambda m: '%s="%s"' % (m.group(1), ' '.join(f_id(x) for x in m.group(2).split())), h)
    h = re.sub(r'data-tabs="#([\w-]+)"', lambda m: 'data-tabs="#' + f_id(m.group(1)) + '"', h)
    h = rewrite_links(h)
    h = rewrite_assets_text(h)
    if lazy_imgs:
        h = re.sub(r'<img (?![^>]*loading=)', '<img loading="lazy" decoding="async" ', h)
    # light minify: drop indentation + blank lines
    h = '\n'.join(l.strip() for l in h.split('\n') if l.strip())
    return h

def rw_js(js, known_classes, known_ids):
    js = re.sub(r'(classList\.(?:add|remove|toggle|contains)\(\s*)([\'"])([\w-]+)\2',
                lambda m: m.group(1) + m.group(2) + f_cls(m.group(3)) + m.group(2), js)
    js = re.sub(r'(getElementById\(\s*)([\'"])([\w-]+)\2',
                lambda m: m.group(1) + m.group(2) + f_id(m.group(3)) + m.group(2), js)
    def rw_sel(m):
        s = m.group(3)
        s = re.sub(r'\.([\w-]+)', lambda x: '.' + f_cls(x.group(1)) if x.group(1) in known_classes else x.group(0), s)
        s = re.sub(r'#([\w-]+)', lambda x: '#' + f_id(x.group(1)) if x.group(1) in known_ids else x.group(0), s)
        return m.group(1) + m.group(2) + s + m.group(2)
    js = re.sub(r'((?:querySelectorAll|querySelector|closest|matches)\(\s*)([\'"])([^\'"]*)\2', rw_sel, js)
    js = re.sub(r'class="([^"]*)"', lambda m: 'class="' + ' '.join(f_cls(c) for c in m.group(1).split()) + '"', js)
    js = re.sub(r"class='([^']*)'", lambda m: "class='" + ' '.join(f_cls(c) for c in m.group(1).split()) + "'", js)
    js = rewrite_links(js)                                     # HTML built inside JS strings
    js = re.sub(r'^\s*//[^\n]*$', '', js, flags=re.M)          # line comments on their own line
    js = re.sub(r'/\*.*?\*/', '', js, flags=re.S)
    js = '\n'.join(l.strip() for l in js.split('\n') if l.strip())
    return js

# ---------------------------------------------------------------- main ------
def main():
    pages = {}          # src -> dict(raw, content, styles, scripts, css_links)
    for src in sorted(os.listdir(SITE)):
        if not src.endswith('.html'): continue
        raw = open(os.path.join(SITE, src), encoding='utf-8').read()
        styles = [m.group(1) for m in re.finditer(r'<style[^>]*>(.*?)</style>', raw, re.S)]
        scripts = []
        for m in re.finditer(r'<script\b([^>]*)>(.*?)</script>', raw, re.S):
            attrs, body = m.group(1), m.group(2)
            if 'src=' in attrs or 'ld+json' in attrs: continue
            if body.strip(): scripts.append(body)
        css_links = re.findall(r'<link rel="stylesheet" href="css/([\w.-]+)"', raw)
        body = re.search(r'<body[^>]*>(.*)</body>', raw, re.S).group(1)
        if src == 'pricing.html':
            content = re.sub(r'<nav class="top">.*?</nav>', '', body, flags=re.S)
            content = re.sub(r'<footer>.*?</footer>', '', content, flags=re.S)
            content = re.sub(r'<script\b[^>]*>.*?</script>', '', content, flags=re.S)
            content = re.sub(r'<div class="container">\s*</div>', '', content)
        else:
            content = re.search(r'<main[^>]*>.*</main>', body, re.S).group(0)
        pages[src] = dict(raw=raw, content=content, styles=styles, scripts=scripts, css_links=css_links)

    index_body = re.search(r'<body[^>]*>(.*)</body>', pages['index.html']['raw'], re.S).group(1)
    nav_html = re.search(r'<nav class="nav">.*?</nav>', index_body, re.S).group(0)
    mobile_html = re.search(r'<div class="mobile-menu">.*', index_body).group(0).split('\n')[0]
    footer_html = re.search(r'<footer class="footer">.*?</footer>', index_body, re.S).group(0)

    css_files = {
        'tokens': open(os.path.join(DS_DIR, 'colors_and_type.css'), encoding='utf-8').read(),
        'ds-components.css': open(os.path.join(SITE, 'css', 'ds-components.css'), encoding='utf-8').read(),
        'site.css': open(os.path.join(SITE, 'css', 'site.css'), encoding='utf-8').read(),
        'home.css': open(os.path.join(SITE, 'css', 'home.css'), encoding='utf-8').read(),
        'pages.css': open(os.path.join(SITE, 'css', 'pages.css'), encoding='utf-8').read(),
    }
    css_files['tokens'] = re.sub(r'@import\s+url\((?:"[^"]*"|\'[^\']*\'|[^)]*)\)[^;]*;', '',
                                 css_files['tokens'])
    motion_js = open(os.path.join(SITE, 'js', 'motion.js'), encoding='utf-8').read()
    GLOBAL_KF.update(collect_keyframes(parse_css(strip_css_comments('\n'.join(css_files.values())))))

    # ---- known class/id sets (for safe JS-string renaming) ----
    known_classes, known_ids = set(), set()
    all_css_text = strip_css_comments('\n'.join(css_files.values()) +
                                      '\n'.join('\n'.join(p['styles']) for p in pages.values()))
    collect_classes_from_css(parse_css(protect_urls(all_css_text)), known_classes)
    _URLS.clear()
    for p in pages.values():
        for m in re.finditer(r'class="([^"]*)"', p['content']): known_classes.update(m.group(1).split())
        for m in re.finditer(r'\bid="([\w-]+)"', p['raw']): known_ids.add(m.group(1))
    for frag in (nav_html, mobile_html, footer_html):
        for m in re.finditer(r'class="([^"]*)"', frag): known_classes.update(m.group(1).split())

    # ---- rename html fragments + js ----
    nav_out = rw_html(nav_html, lazy_imgs=False)
    mobile_out = rw_html(mobile_html)
    footer_out = rw_html(footer_html)
    motion_out = rw_js(motion_js, known_classes, known_ids)
    for src, p in pages.items():
        p['content_out'] = rw_html(p['content'])
        p['scripts_out'] = [rw_js(s, known_classes, known_ids) for s in p['scripts']]

    # ---- usage-driven CSS bundles ----
    global_usage = nav_out + mobile_out + footer_out + motion_out + ''.join(
        p['content_out'] + ''.join(p['scripts_out']) for p in pages.values())

    header_css = build_css([css_files['tokens'], css_files['ds-components.css'], css_files['site.css']],
                           '.imw-scope', global_usage)
    page_css_raw = {}
    for src, p in pages.items():
        slug = 'home' if src == 'index.html' else src[:-5]
        S = '#imw-page-' + slug
        sources = [css_files[l] for l in p['css_links'] if l in ('home.css', 'pages.css')]
        sources += p['styles']
        usage = p['content_out'] + ''.join(p['scripts_out']) + motion_out
        page_css_raw[src] = (slug, S, build_css(sources, S, usage, extra_always=('imw-page-' + slug,)))

    # ---- design-token shaking (transitive var usage across every bundle) ----
    all_final = header_css + ''.join(c for _, _, c in page_css_raw.values())
    var_defs = dict(re.findall(r'(--[\w-]+)\s*:\s*([^;}]*)', all_final))
    non_def = re.sub(r'--[\w-]+\s*:[^;}]*', '', all_final)
    used_vars = set(re.findall(r'var\(\s*(--[\w-]+)', non_def + global_usage))
    while True:
        new = set()
        for v in used_vars:
            new.update(re.findall(r'var\(\s*(--[\w-]+)', var_defs.get(v, '')))
        if new <= used_vars: break
        used_vars |= new
    rewrite_assets_urls()
    header_css = restore_urls(minify_css(shake_vars(header_css, used_vars)))

    # ---- write output ----
    if os.path.exists(OUT): shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, 'pages'))
    note = '<!-- %s — generated by build_elementor.py, do not edit by hand -->\n'

    header = (note % 'IMAI header widget (paste once into the Elementor Theme Builder Header template)' +
              '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
              '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
              '<link rel="stylesheet" href="' + FONTS_HREF + '">\n'
              '<style>' + header_css + '</style>\n'
              '<div id="imw-header" class="imw-scope">\n' + nav_out + '\n' + mobile_out + '\n</div>\n'
              '<script>' + motion_out + '</script>\n')
    open(os.path.join(OUT, 'header.html'), 'w', encoding='utf-8').write(header)

    footer = (note % 'IMAI footer widget (paste once into the Elementor Theme Builder Footer template; styles ship in header.html)' +
              '<div id="imw-footer" class="imw-scope">\n' + footer_out + '\n</div>\n')
    open(os.path.join(OUT, 'footer.html'), 'w', encoding='utf-8').write(footer)

    rows = []
    for src, (slug, S, css) in sorted(page_css_raw.items(), key=lambda kv: kv[1][0]):
        p = pages[src]
        css = restore_urls(minify_css(shake_vars(css, used_vars)))
        scope_cls = '' if src == 'pricing.html' else ' class="imw-scope"'
        content = p['content_out']
        m = re.match(r'<main([^>]*)>(.*)</main>$', content, re.S)
        if m:
            attrs, inner = m.group(1), m.group(2)
            attrs = re.sub(r'\s*class="[^"]*"', '', attrs)
            body = '<div id="imw-page-%s"%s%s>%s</div>' % (slug, scope_cls, attrs, inner)
        else:
            body = '<div id="imw-page-%s"%s>%s</div>' % (slug, scope_cls, content)
        snippet = note % ('IMAI page widget: ' + slug + ' (standalone; requires the site-wide header widget for base styles)'
                          if src != 'pricing.html' else 'IMAI page widget: pricing (fully self-contained)')
        if css: snippet += '<style>' + css + '</style>\n'
        snippet += body + '\n'
        for s in p['scripts_out']:
            snippet += '<script>' + s + '</script>\n'
        fname = slug + '.html'
        open(os.path.join(OUT, 'pages', fname), 'w', encoding='utf-8').write(snippet)
        rows.append((slug, URL[src], len(snippet)))

    write_readme(rows, len(header), len(footer))
    print('elementor/: header.html (%dKB), footer.html (%dKB), %d pages' %
          (len(header) // 1024, len(footer) // 1024, len(rows)))

def write_readme(rows, hsize, fsize):
    lines = [
        '# Elementor HTML-widget bundle', '',
        'Generated by `python3 build_elementor.py` — do not edit these files by hand.', '',
        '## Install', '',
        '1. **Header (once):** Elementor Pro → Theme Builder → Header template → drop an **HTML widget**',
        '   (full-width section, no padding) and paste `header.html` (%dKB). It carries the design tokens,' % (hsize // 1024),
        '   shared component CSS and the interaction JS that *all* other snippets rely on, so it must render',
        '   site-wide. Enable Elementor\'s **Sticky: Top** motion effect on the header section to keep the nav pinned.',
        '2. **Footer (once):** Theme Builder → Footer template → HTML widget → paste `footer.html` (%dKB).' % (fsize // 1024),
        '   Its styles ship inside `header.html`, so it needs no CSS of its own.',
        '3. **Pages:** create each WordPress page at the path below (Elementor full-width / canvas-content',
        '   layout, no extra container padding) and paste the matching `pages/*.html` into an HTML widget.',
        '   Set the page background to `#F5F7F9` for seamless sections.', '',
        '## Page map', '',
        '| Snippet | Suggested WP path | Size |', '|---|---|---|',
    ]
    for slug, url, size in rows:
        lines.append('| `pages/%s.html` | `%s` | %dKB |' % (slug, url, max(1, size // 1024)))
    lines += ['',
        '## Notes', '',
        '- **Isolation:** every class/id/keyframe is namespaced `imw-` and element-level rules are scoped to',
        '  unique containers (`#imw-header`, `#imw-footer`, `#imw-page-<slug>`), so theme/Elementor globals',
        '  cannot restyle the widgets and widget CSS cannot leak out. In-page anchors therefore use the',
        '  prefixed ids too (e.g. `/find-influencers#imw-niche`).',
        '- **Weight:** per snippet the CSS is tree-shaken to the rules, keyframes and design tokens that page',
        '  actually uses, then minified; images are lazy-loaded; fonts load once from the Google Fonts CDN.',
        '- **Assets:** logos/fonts/images are referenced absolutely from `%s/assets/…`,' % BASE,
        '  so nothing needs uploading to the WP media library. If that host ever changes, re-run the build',
        '  with a new `BASE`.',
        '- `pages/pricing.html` is fully self-contained (the source page ships its own design) — it only',
        '  shares the header/footer chrome.',
        '- CTAs link to `/register` and onboarding paths — keep those routes live (or point them at the app',
        '  signup URL) on the WordPress site.',
        '- The sign-up flow pages (`register`, `personalize`, `payment`, `setup`) are a standalone app flow',
        '  and are intentionally not exported as Elementor widgets.', '']
    open(os.path.join(OUT, 'README.md'), 'w', encoding='utf-8').write('\n'.join(lines))

if __name__ == '__main__':
    main()
