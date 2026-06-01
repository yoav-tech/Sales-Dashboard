/* ============================================================
   IMAI landing — vanilla JS for the interactive bits
   ============================================================
   1. Mobile hamburger menu — open/close + body scroll lock + ESC
   2. FAQ accordion          — click question to toggle .open
   3. Hero AI Search rotator — cycle 4 ICPs every 4.2s with fade

   No dependencies. Wrap in DOMContentLoaded so it works even if you
   load the script in <head> instead of just before </body>.
   ============================================================ */
(function () {
  function init() {
    const root = document.querySelector('.v-c');
    if (!root) return;

    /* ---------- 1. Hamburger menu ---------- */
    const nav = root.querySelector('nav.top');
    const burger = root.querySelector('.nav-burger');
    const scrim = root.querySelector('.nav-scrim');

    function setMenu(open) {
      if (!nav || !burger) return;
      nav.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    }

    if (burger) {
      burger.addEventListener('click', function () {
        setMenu(!nav.classList.contains('menu-open'));
      });
    }
    if (scrim) {
      scrim.addEventListener('click', function () { setMenu(false); });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav && nav.classList.contains('menu-open')) setMenu(false);
    });
    // close on nav-link click + scroll to the anchor
    root.querySelectorAll('nav.top ul a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });

    /* ---------- 2. FAQ accordion ---------- */
    root.querySelectorAll('.faq-item .faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        const item = q.closest('.faq-item');
        if (item) item.classList.toggle('open');
      });
    });

    /* ---------- 3. Hero AI Search ICP rotator ---------- */
    const ICPS = [
      {
        q: 'Beauty creators in LA, female 25–34, ER >4%',
        res: [
          { h: '@ariawild',         m: '97%', bg: 'linear-gradient(135deg,#ffecf0,#f9476c)' },
          { h: '@rosamora',         m: '93%', bg: 'linear-gradient(135deg,#fdf4c0,#efcc01)' },
          { h: '@minimaskincare',   m: '89%', bg: 'linear-gradient(135deg,#e0f8f2,#06c7a9)' },
        ],
      },
      {
        q: 'Fitness creators in NYC with >5% engagement',
        res: [
          { h: '@maeli',            m: '98%', bg: 'linear-gradient(135deg,#eeecff,#8564ff)' },
          { h: '@runwith.jp',       m: '94%', bg: 'linear-gradient(135deg,#e0f8f2,#299d88)' },
          { h: '@hadleyfit',        m: '91%', bg: 'linear-gradient(135deg,#fdf4c0,#efcc01)' },
        ],
      },
      {
        q: 'B2B SaaS reviewers, US, 50K–500K, dev audience',
        res: [
          { h: '@stackdaily',       m: '96%', bg: 'linear-gradient(135deg,#eeecff,#8564ff)' },
          { h: '@prodhunt.jen',     m: '92%', bg: 'linear-gradient(135deg,#e0f8f2,#06c7a9)' },
          { h: '@apicasey',         m: '88%', bg: 'linear-gradient(135deg,#ffecf0,#c94865)' },
        ],
      },
      {
        q: 'Lifestyle journalists & podcasters · parenting niche',
        res: [
          { h: '@cribandcoffee',    m: '95%', bg: 'linear-gradient(135deg,#fdf4c0,#efcc01)' },
          { h: '@parent.dispatch',  m: '91%', bg: 'linear-gradient(135deg,#ffecf0,#f9476c)' },
          { h: '@nightfeed.fm',     m: '87%', bg: 'linear-gradient(135deg,#eeecff,#8564ff)' },
        ],
      },
    ];

    const tile = root.querySelector('.tile-search');
    const tabs = root.querySelectorAll('.tile-search .icp-tab');
    const qText = root.querySelector('.tile-search .q span:nth-child(2)');
    const resBox = root.querySelector('.tile-search .results');

    if (tile && tabs.length && qText && resBox) {
      let idx = 0;
      const SWAP_MS = 4200;
      function paint(i) {
        tabs.forEach(function (t, j) { t.classList.toggle('on', j === i); });
        // restart the per-tab progress-bar animation on the active tab
        const onTab = tabs[i];
        if (onTab) { onTab.style.animation = 'none'; void onTab.offsetWidth; onTab.style.animation = ''; }
        const data = ICPS[i];
        qText.innerHTML = data.q;
        resBox.innerHTML = data.res.map(function (r, k) {
          return '<div class="res" style="animation-delay:' + (k * 60) + 'ms">' +
                   '<div class="av" style="background:' + r.bg + '"></div>' +
                   r.h + ' · ' + r.m +
                 '</div>';
        }).join('');
      }
      paint(0);
      setInterval(function () {
        tile.classList.add('swap');
        setTimeout(function () {
          idx = (idx + 1) % ICPS.length;
          paint(idx);
          tile.classList.remove('swap');
        }, 280);
      }, SWAP_MS);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
