# -*- coding: utf-8 -*-
import re, os, shutil, hashlib, html as _html
SRC=os.path.dirname(os.path.abspath(__file__))
SITE=f'{SRC}/site'
OUT=f'{SRC}/public'
DS='imai-design-system-4a6d94c2-7a00-44fd-bb33-ebaf204eaa53'
BASE='https://influencermarketing.ai'
BRAND='InfluencerMarketing.ai'

FONTS='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Passion+One:wght@400;700;900&display=swap'

# ---------------- minification (url() contents protected) ----------------
_PURL=[]
def _prot(css):
    def keep(m):
        _PURL.append(m.group(0)); return '\x00U%d\x00'%(len(_PURL)-1)
    return re.sub(r'url\(\s*(?:"[^"]*"|\'[^\']*\'|[^)\'"]*)\s*\)', keep, css)
def _rest(css):
    return re.sub(r'\x00U(\d+)\x00', lambda m:_PURL[int(m.group(1))], css)
def minify_css(css):
    css=_prot(re.sub(r'/\*.*?\*/','',css,flags=re.S))
    css=re.sub(r'\s+',' ',css)
    css=re.sub(r'\s*([{};:,>])\s*',r'\1',css).replace(';}','}')
    return _rest(css.strip())
def minify_js(js):
    js=re.sub(r'/\*.*?\*/','',js,flags=re.S)
    js=re.sub(r'^\s*//[^\n]*$','',js,flags=re.M)
    return '\n'.join(l.strip() for l in js.split('\n') if l.strip())

# ---------------- per-page CSS bundles (one render-blocking file per page) ----------------
_BUNDLES={}
def css_bundle(hrefs):
    key=tuple(hrefs)
    if key in _BUNDLES: return _BUNDLES[key]
    parts=[]
    for h in hrefs:
        h=h.lstrip('./')
        if 'colors_and_type.css' in h: path=f'{SRC}/_ds/{DS}/colors_and_type.css'
        elif h.startswith('css/'):     path=f'{SITE}/{h}'
        elif h=='onboarding-tal.css':  path=f'{SRC}/onboarding-tal.css'
        else: continue
        css=open(path,encoding='utf-8').read()
        css=re.sub(r'@import\s+url\((?:"[^"]*"|\'[^\']*\'|[^)]*)\)[^;]*;','',css)  # fonts load via <link>
        parts.append(css)
    out=minify_css('\n'.join(parts))
    name='/css/b-'+hashlib.md5(out.encode()).hexdigest()[:8]+'.css'
    open(OUT+name,'w',encoding='utf-8').write(out)
    _BUNDLES[key]=name
    return name

# ---------------- cache-busting: content-hash CSS/JS/DS so immutable caching is safe ----------------
def _fh(path):
    try: return hashlib.md5(open(path,'rb').read()).hexdigest()[:8]
    except Exception: return '1'
VER={
 '/css/ds-components.css': _fh(f'{SITE}/css/ds-components.css'),
 '/css/site.css':          _fh(f'{SITE}/css/site.css'),
 '/css/home.css':          _fh(f'{SITE}/css/home.css'),
 '/css/pages.css':         _fh(f'{SITE}/css/pages.css'),
 '/js/motion.js':          _fh(f'{SITE}/js/motion.js'),
 '/ds/colors_and_type.css':_fh(f'{SRC}/_ds/{DS}/colors_and_type.css'),
}
def add_versions(h):
    for path,v in VER.items():
        h=h.replace(path+'"', path+'?v='+v+'"')
    return h

# ---------------- URL MAP (old filename -> clean url) ----------------
URL={
 'index.html':'/', 'platform.html':'/platform', 'solutions.html':'/solutions',
 'pricing.html':'/pricing', 'customers.html':'/customers', 'about.html':'/about',
 'find-influencers.html':'/find-influencers','webinars.html':'/webinars',
 'discovery.html':'/platform/discovery','influencer-crm.html':'/platform/influencer-crm',
 'campaign-management.html':'/platform/campaign-management','tracking-roi.html':'/platform/tracking-roi',
 'creator-payouts.html':'/platform/creator-payouts','competitive-intelligence.html':'/platform/competitive-intelligence',
 'enterprise.html':'/solutions/enterprise','agencies.html':'/solutions/agencies','smb.html':'/solutions/smb',
 'ecommerce.html':'/solutions/ecommerce','ugc.html':'/solutions/ugc','pr.html':'/solutions/pr',
 'consumer-intelligence.html':'/solutions/consumer-intelligence','llm-visibility.html':'/solutions/llm-visibility',
 'ai-agents.html':'/solutions/ai-agents',
 'register.html':'/register','personalize.html':'/onboarding/personalize',
 'payment.html':'/onboarding/payment','setup.html':'/onboarding/setup','dashboard.html':'/register',
 'terms.html':'/terms','privacy.html':'/privacy','cookies.html':'/cookies','security.html':'/security',
}

# ---------------- SEO MAP ----------------
# src filename: (title, description, breadcrumb-name, schema-kind)
S={
'index.html':("InfluencerMarketing.ai — AI Influencer Marketing Platform",
 "Discover, vet, activate and pay creators from 400M+ profiles — one AI platform for influencer search, fraud detection, campaigns, payouts in 135+ currencies and provable ROI.","Home","home"),
'platform.html':("Platform — AI Influencer Marketing Software",
 "Creator discovery, influencer CRM, campaign management, ROI tracking and global payouts — the complete AI platform to run influencer marketing end to end.","Platform","software"),
'solutions.html':("Solutions for Enterprise, Agencies, SMB & Ecommerce",
 "One AI platform for enterprise, agencies, SMBs and ecommerce — across influencer marketing, PR, UGC video, consumer intelligence, LLM visibility and AI agents.","Solutions","page"),
'pricing.html':("Pricing — Influencer Marketing Plans for Brands & Agencies",
 "Flexible influencer marketing pricing: Personal $129, Starter $299, Growth $499, Scale $1,200/mo and custom Enterprise. Full 412M+ creator database on every plan. 14-day free trial.","Pricing","product"),
'customers.html':("Customer Stories & Case Studies",
 "See how 1,000+ brands and agencies — including Estée Lauder, Samsung and Playtika — drive measurable ROI with InfluencerMarketing.ai.","Customers","page"),
'about.html':("About InfluencerMarketing.ai",
 "The AI platform helping 1,000+ brands discover, vet, activate and pay creators from 400M+ profiles across 50+ countries.","About","page"),
'find-influencers.html':("Find Influencers — Search 400M+ Creators",
 "Search 400M+ influencers across Instagram, TikTok, YouTube and X by niche, location, audience and engagement. Vet any creator for fake followers and brand safety.","Find influencers","page"),
'webinars.html':("Live Webinar — Proving Influencer ROI in 2026",
 "Free live webinar: turn 400M+ creators into measurable revenue. See AI creator discovery, authenticity vetting and client-ready ROI dashboards in action. Thursday, July 16, 2026. Replay included.","Webinars","page"),
'discovery.html':("AI Creator Discovery — Search 400M+ Influencers",
 "Find and vet creators with natural-language AI search across 400M+ Instagram, TikTok, YouTube and X profiles, with fake-follower and brand-safety screening.","Creator Discovery","feature"),
'influencer-crm.html':("Influencer CRM & AI Outreach Software",
 "Manage every creator, message and deliverable in one pipeline with AI outreach and automatic follow-ups — a 62% average reply rate, 3.1× the manual baseline.","Influencer CRM","feature"),
'campaign-management.html':("Influencer Campaign Management Software",
 "Run influencer campaigns from brief to bank transfer — contracts, e-sign, content approval and payouts in 135+ currencies, all in one platform.","Campaign Management","feature"),
'tracking-roi.html':("Influencer Marketing ROI Tracking & Attribution",
 "Measure influencer ROI with sales attribution via SDK, UTMs and discount codes. Roll up EMV, GMV, CAC and ROAS by creator, campaign or brand in real time.","Tracking & ROI","feature"),
'creator-payouts.html':("Creator Payouts in 135+ Currencies",
 "Pay influencers in 135+ currencies across 100+ countries, with tax forms, VAT/GST and conversion handled automatically — batch a whole campaign in one click.","Creator Payouts","feature"),
'competitive-intelligence.html':("Competitive Intelligence for Influencer Marketing",
 "Track competitor creator strategies, brand mentions and share of voice in real time — and see exactly which creators are driving the conversation.","Competitive Intelligence","feature"),
'enterprise.html':("Enterprise Influencer Marketing Platform",
 "Consolidate influencer, PR, UGC and consumer intelligence into one governed platform with SSO, SOC 2 Type II, role-based access and a dedicated CSM.","Enterprise","service"),
'agencies.html':("White-Label Influencer Marketing Platform for Agencies",
 "Launch your own branded influencer platform — your logo, domain and colors. Manage every client, service and payout from one login, with client-ready reports.","Agencies","service"),
'smb.html':("Influencer Marketing for SMBs & Startups",
 "Launch influencer campaigns in minutes. Find vetted creators, run campaigns, see sales by creator and automate payouts — 7-day free trial, no card required.","SMB & startups","service"),
'ecommerce.html':("Influencer Marketing for Ecommerce & Shopify",
 "Find creators that convert, attribute Shopify GMV per creator, and produce UGC video ads at scale. Tie every influencer post to real revenue.","Ecommerce","service"),
'ugc.html':("UGC Video Ads at Scale — AI Avatar Video",
 "Source creators and produce UGC video ads — including AI avatar video in 40+ languages — with usage rights and whitelisting handled. Brief to live in 14 days.","UGC Video Ads","service"),
'pr.html':("AI PR & Media Outreach — Pitch 1M+ Journalists",
 "Pitch 1M+ verified journalists with AI, track coverage and EMV, and target the outlets AI answers cite. PR and influencer marketing in one platform.","PR & Media","service"),
'consumer-intelligence.html':("Consumer Intelligence & Social Listening",
 "Monitor 2T+ conversations across social, surface trends and sentiment in real time, and activate the creators driving them — listening plus activation.","Consumer Intelligence","service"),
'llm-visibility.html':("LLM Visibility — Track Your Brand in AI Search",
 "See and shape how ChatGPT, Perplexity and Google AI Overviews describe your brand. Track AI share of voice and influence the sources they cite.","LLM Visibility","service"),
'ai-agents.html':("AI Voice & Chat Agents for Marketing",
 "Deploy AI agents that qualify leads, book meetings and support customers 24/7 — on-brand, multilingual and always on.","AI Agents","service"),
'register.html':("Start Your Free Trial — InfluencerMarketing.ai",
 "Create your InfluencerMarketing.ai account and start a free trial — full access to 412M+ creators, no card required.","Register","noindex"),
'personalize.html':("Personalize Your Workspace","Tailor your InfluencerMarketing.ai workspace.","Personalize","noindex"),
'payment.html':("Start Your 7-Day Trial","Confirm your plan and start your 7-day InfluencerMarketing.ai trial.","Payment","noindex"),
'setup.html':("Set Up Your Workspace","Finish setting up your InfluencerMarketing.ai workspace.","Setup","noindex"),
'terms.html':("Terms of Service",
 "The terms that govern your use of the InfluencerMarketing.ai platform and website.","Terms","page"),
'privacy.html':("Privacy Policy",
 "How InfluencerMarketing.ai collects, uses and protects personal data across the platform and website.","Privacy","page"),
'cookies.html':("Cookie Policy",
 "How InfluencerMarketing.ai uses cookies and similar technologies, and the choices you have.","Cookies","page"),
'security.html':("Security at InfluencerMarketing.ai",
 "The security practices that protect customer data: SOC 2 Type II controls, encryption, access management and more.","Security","page"),
}

NAV_SECTION={ # for active-state + breadcrumb parent
 'discovery.html':'platform','influencer-crm.html':'platform','campaign-management.html':'platform',
 'tracking-roi.html':'platform','creator-payouts.html':'platform','competitive-intelligence.html':'platform',
 'enterprise.html':'solutions','agencies.html':'solutions','smb.html':'solutions','ecommerce.html':'solutions',
 'ugc.html':'solutions','pr.html':'solutions','consumer-intelligence.html':'solutions',
 'llm-visibility.html':'solutions','ai-agents.html':'solutions',
}

# ---------------- helpers ----------------
def strip_tags(s): return re.sub('<[^>]+>','',s)

def rewrite_assets(h):
    h=h.replace(f'../_ds/{DS}/colors_and_type.css','/ds/colors_and_type.css')
    h=h.replace(f'_ds/{DS}/colors_and_type.css','/ds/colors_and_type.css')
    h=re.sub(r'(?<=["\'(])\.\./_ds/'+re.escape(DS)+r'/','/ds/',h)
    h=re.sub(r'(?<=["\'(])css/','/css/',h)
    h=re.sub(r'(?<=["\'(])js/','/js/',h)
    h=re.sub(r'(?<=["\'(])assets/','/assets/',h)
    h=re.sub(r'(?<=["\'(])\.\./assets/','/assets/',h)
    h=h.replace('"onboarding-tal.css"','"/onboarding-tal.css"')
    return h

def rewrite_links(h):
    def repl(m):
        q=m.group(1); href=m.group(2)
        if href.startswith('#') or href.startswith('http') or href.startswith('mailto') or href.startswith('/'):
            return m.group(0)
        frag=''
        if '#' in href: href,frag=href.split('#',1); frag='#'+frag
        href=href.lstrip('./')
        href=href.replace('../','')
        if href.startswith('site/'): href=href[5:]   # onboarding pages link to site/index.html etc.
        if href in URL:
            dest=URL[href]
            if frag and dest=='/': return f'href={q}/{frag}{q}'
            return f'href={q}{dest}{frag}{q}'
        return m.group(0)
    return re.sub(r'href=(["\'])([^"\']+)\1', repl, h)

def extract_faq(h):
    qa=[]
    for m in re.finditer(r'<button class="acc-q">(.*?)<span class="pl">.*?<div class="acc-a-in">(.*?)</div>', h, re.S):
        q=strip_tags(m.group(1)).strip(); a=strip_tags(m.group(2)).strip()
        if q and a: qa.append((q,a))
    # pricing faqList style
    for m in re.finditer(r'<(?:button|div)[^>]*class="faq-q"[^>]*>(.*?)</(?:button|div)>\s*<div[^>]*class="faq-a"[^>]*>(.*?)</div>', h, re.S):
        q=strip_tags(m.group(1)).strip(); a=strip_tags(m.group(2)).strip()
        if q and a: qa.append((q,a))
    return qa

def jstr(s): return s.replace('\\','\\\\').replace('"','\\"').replace('\n',' ').strip()

def build_jsonld(src, url, title, desc, faqs):
    canon=BASE+url
    org={'@type':'Organization','@id':BASE+'/#org','name':BRAND,'url':BASE+'/',
         'logo':BASE+'/assets/imai-logo.png',
         'sameAs':['https://www.instagram.com/influencermarketing.ai','https://www.linkedin.com/company/influencermarketingai']}
    graph=[]
    kind=S[src][3]
    if src=='index.html':
        graph.append(org)
        graph.append({'@type':'WebSite','@id':BASE+'/#website','url':BASE+'/','name':BRAND,
            'publisher':{'@id':BASE+'/#org'},
            'potentialAction':{'@type':'SearchAction','target':{'@type':'EntryPoint',
                'urlTemplate':BASE+'/find-influencers?q={search_term_string}'},'query-input':'required name=search_term_string'}})
        graph.append({'@type':'SoftwareApplication','name':BRAND,'applicationCategory':'BusinessApplication',
            'operatingSystem':'Web','offers':{'@type':'Offer','price':'129','priceCurrency':'USD'},
            'aggregateRating':{'@type':'AggregateRating','ratingValue':'4.7','reviewCount':'1024'},
            'description':desc,'url':BASE+'/'})
    else:
        graph.append({'@type':'Organization','@id':BASE+'/#org','name':BRAND,'url':BASE+'/'})
    # breadcrumb
    crumbs=[('Home','/')]
    sec=NAV_SECTION.get(src)
    if sec=='platform': crumbs.append(('Platform','/platform'))
    if sec=='solutions': crumbs.append(('Solutions','/solutions'))
    if url not in ('/',):
        crumbs.append((S[src][2],url))
    if len(crumbs)>1:
        items=[{'@type':'ListItem','position':i+1,'name':n,'item':BASE+(u if u!='/' else '/')} for i,(n,u) in enumerate(crumbs)]
        graph.append({'@type':'BreadcrumbList','itemListElement':items})
    # software/product/service page node
    if kind=='software':
        graph.append({'@type':'SoftwareApplication','name':'InfluencerMarketing.ai Platform','applicationCategory':'BusinessApplication','operatingSystem':'Web','offers':{'@type':'Offer','price':'129','priceCurrency':'USD'},'description':desc,'url':canon})
    if kind=='feature' or kind=='service':
        graph.append({'@type':'Service','name':title,'provider':{'@id':BASE+'/#org'},'description':desc,'url':canon,'serviceType':'Influencer marketing software'})
    if kind=='product':
        tiers=[('Personal','129'),('Starter','299'),('Growth','499'),('Scale','1200')]
        offers=[{'@type':'Offer','name':n,'price':p,'priceCurrency':'USD','url':canon} for n,p in tiers]
        graph.append({'@type':'Product','name':'InfluencerMarketing.ai','description':desc,'brand':{'@id':BASE+'/#org'},
            'offers':{'@type':'AggregateOffer','lowPrice':'129','highPrice':'1200','priceCurrency':'USD','offerCount':'5','offers':offers}})
    if faqs:
        graph.append({'@type':'FAQPage','mainEntity':[
            {'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in faqs]})
    import json
    return '<script type="application/ld+json">'+json.dumps({'@context':'https://schema.org','@graph':graph},ensure_ascii=False)+'</script>'

OG_DEFAULT='/assets/og-default.png'

def build_head(src, url, head_inner):
    title,desc,crumb,kind=S[src]
    full_title = title
    canon=BASE+url
    noindex = (kind=='noindex')
    # bundle local stylesheets into ONE minified file per page; keep inline styles.
    # External stylesheet links (none today) would be kept as-is.
    keep=[]
    local_css=[]
    for m in re.finditer(r'<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>', head_inner):
        if m.group(1).startswith('http'): keep.append(m.group(0))
        else: local_css.append(m.group(1))
    for m in re.finditer(r'<style[^>]*>(.*?)</style>', head_inner, re.S):
        keep.append('<style>'+minify_css(m.group(1))+'</style>')
    if local_css:
        keep.insert(0, f'<link rel="stylesheet" href="{css_bundle(local_css)}" />')
    keep_html=rewrite_assets('\n'.join(keep))
    faqs=[] if noindex else extract_faq(PAGE_BODY[src])
    jsonld='' if noindex else build_jsonld(src,url,title,desc,faqs)
    robots='noindex,nofollow' if noindex else 'index,follow,max-image-preview:large'
    og_type='website' if src=='index.html' else 'article' if kind=='page' else 'website'
    parts=['<meta charset="UTF-8" />',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
      f'<title>{_html.escape(title)}</title>',
      f'<meta name="description" content="{_html.escape(desc, quote=True)}" />',
      f'<link rel="canonical" href="{canon}" />',
      f'<meta name="robots" content="{robots}" />',
      '<meta name="theme-color" content="#7132F5" />',
      '<meta name="author" content="InfluencerMarketing.ai" />',
      # Open Graph
      f'<meta property="og:site_name" content="{BRAND}" />',
      f'<meta property="og:type" content="{og_type}" />',
      f'<meta property="og:title" content="{_html.escape(title,quote=True)}" />',
      f'<meta property="og:description" content="{_html.escape(desc,quote=True)}" />',
      f'<meta property="og:url" content="{canon}" />',
      f'<meta property="og:image" content="{BASE}{OG_DEFAULT}" />',
      '<meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />',
      # Twitter
      '<meta name="twitter:card" content="summary_large_image" />',
      f'<meta name="twitter:title" content="{_html.escape(title,quote=True)}" />',
      f'<meta name="twitter:description" content="{_html.escape(desc,quote=True)}" />',
      f'<meta name="twitter:image" content="{BASE}{OG_DEFAULT}" />',
      # icons / manifest
      '<link rel="icon" type="image/png" href="/assets/imai-mark.png" />',
      '<link rel="apple-touch-icon" href="/assets/imai-mark.png" />',
      '<link rel="manifest" href="/site.webmanifest" />',
      '<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />',
      # fonts off the critical path: swap in via onload, plain link for no-JS (font-display:swap in URL)
      f'<link rel="stylesheet" href="{FONTS}" media="print" onload="this.media=\'all\'" />',
      f'<noscript><link rel="stylesheet" href="{FONTS}" /></noscript>',
      keep_html,
      jsonld,
    ]
    return '<head>\n'+'\n'.join(p for p in parts if p)+'\n</head>'

# ---------------- nav active state ----------------
def set_active(h, src):
    sec=NAV_SECTION.get(src)
    if src=='platform.html' or sec=='platform':
        h=h.replace('<button class="nav-link">Platform','<button class="nav-link is-active">Platform')
    if src=='solutions.html' or sec=='solutions':
        h=h.replace('<button class="nav-link">Solutions','<button class="nav-link is-active">Solutions')
    if src=='pricing.html':
        h=h.replace('<a class="nav-link" href="pricing.html">Pricing','<a class="nav-link is-active" href="pricing.html">Pricing')
    if src=='customers.html':
        h=h.replace('<a class="nav-link" href="customers.html">Customers','<a class="nav-link is-active" href="customers.html">Customers')
    if src=='find-influencers.html':
        h=h.replace('<a class="nav-link" href="find-influencers.html">Find influencers','<a class="nav-link is-active" href="find-influencers.html">Find influencers')
    return h

# ---------------- main transform ----------------
PAGE_BODY={}
def load_body(src, raw):
    m=re.search(r'<body[^>]*>(.*)</body>', raw, re.S)
    PAGE_BODY[src]=m.group(1) if m else raw

def transform(src, raw, url):
    raw=set_active(raw, src)
    head_m=re.search(r'<head[^>]*>(.*?)</head>', raw, re.S)
    head_inner=head_m.group(1) if head_m else ''
    body_m=re.search(r'(<body[^>]*>)(.*)(</body>)', raw, re.S)
    body_open, body_inner, body_close = body_m.group(1),body_m.group(2),body_m.group(3)
    PAGE_BODY[src]=body_inner
    # rewrite links + assets in body
    body_inner=rewrite_links(body_inner)
    body_inner=rewrite_assets(body_inner)
    # skip link + main id
    if '<main' in body_inner:
        body_inner=re.sub(r'<main(\s|>)', r'<main id="main"\1', body_inner, count=1)
        skip='<a class="skip-link" href="#main">Skip to content</a>\n'
    else:
        skip=''
    new_head=build_head(src,url,head_inner)
    lang='<html lang="en">'
    return add_versions(f'<!DOCTYPE html>\n{lang}\n{new_head}\n{body_open}\n{skip}{body_inner}{body_close}\n</html>\n')

def main():
    if os.path.exists(OUT): shutil.rmtree(OUT)
    os.makedirs(OUT)
    # shared dirs
    shutil.copytree(f'{SITE}/css', f'{OUT}/css')
    shutil.copytree(f'{SITE}/assets', f'{OUT}/assets')
    shutil.copytree(f'{SITE}/js', f'{OUT}/js')
    os.makedirs(f'{OUT}/ds')
    if os.path.exists(f'{SRC}/onboarding-tal.css'): shutil.copy(f'{SRC}/onboarding-tal.css', f'{OUT}/onboarding-tal.css')
    shutil.copy(f'{SRC}/_ds/{DS}/colors_and_type.css', f'{OUT}/ds/colors_and_type.css')
    if os.path.exists(f'{SRC}/_ds/{DS}/styles.css'): shutil.copy(f'{SRC}/_ds/{DS}/styles.css', f'{OUT}/ds/styles.css')
    # minify everything shipped directly (pages use bundles; these serve 404.html + direct hits)
    for d in (f'{OUT}/css', f'{OUT}/ds'):
        for fn in os.listdir(d):
            if fn.endswith('.css'):
                p=f'{d}/{fn}'; css=open(p,encoding='utf-8').read()
                if fn=='colors_and_type.css':
                    css=re.sub(r'@import\s+url\((?:"[^"]*"|\'[^\']*\'|[^)]*)\)[^;]*;','',css)
                open(p,'w',encoding='utf-8').write(minify_css(css))
    if os.path.exists(f'{OUT}/onboarding-tal.css'):
        _ob=minify_css(open(f'{OUT}/onboarding-tal.css',encoding='utf-8').read())
        open(f'{OUT}/onboarding-tal.css','w',encoding='utf-8').write(_ob)
    _mj=minify_js(open(f'{OUT}/js/motion.js',encoding='utf-8').read())
    open(f'{OUT}/js/motion.js','w',encoding='utf-8').write(_mj)
    count=0
    for src,url in URL.items():
        if src=='dashboard.html': continue
        path = f'{SITE}/{src}' if os.path.exists(f'{SITE}/{src}') else f'{SRC}/{src}'
        if not os.path.exists(path): print('MISSING',src); continue
        raw=open(path,encoding='utf-8').read()
        out_html=transform(src, raw, url)
        dest = OUT if url=='/' else OUT+url
        os.makedirs(dest, exist_ok=True)
        open(f'{dest}/index.html','w',encoding='utf-8').write(out_html)
        count+=1
    print('pages written:',count)

if __name__=='__main__': main()
