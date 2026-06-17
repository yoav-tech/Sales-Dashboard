/* ============================================================
   IMAI — motion.js
   Scroll-reveal, counters, sticky nav, mega-menus, mobile drawer,
   accordions, tabs and seamless marquees. Progressive-enhancement:
   if JS never runs, content stays visible (the .js-motion gate).
   ============================================================ */
(function () {
  var docEl = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  docEl.classList.add("js-motion");

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  /* ---- scroll reveal ---- */
  function inView(el, pad) {
    var r = el.getBoundingClientRect();
    var h = window.innerHeight || docEl.clientHeight;
    pad = pad || 0;
    return r.top < (h - pad) && r.bottom > 0;
  }
  function initReveal() {
    var els = [].slice.call(document.querySelectorAll(".reveal"));
    if (reduce) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    // reveal whatever is already on screen, immediately (no waiting on IO)
    function sweep() {
      els.forEach(function (e) {
        if (!e.classList.contains("in") && inView(e, Math.min(60, e.offsetHeight * 0.12))) e.classList.add("in");
      });
    }
    sweep();
    // IntersectionObserver for precise scroll reveals where supported
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
      els.forEach(function (e) { if (!e.classList.contains("in")) io.observe(e); });
    }
    // scroll/resize fallback — keeps reveals working even if IO never fires
    var ticking = false;
    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { sweep(); ticking = false; });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // detect a frozen-clock environment (transitions never advance): if an in-view,
    // revealed element never gains opacity, switch motion off so content is always shown.
    var probe = els.filter(function (e) { return e.classList.contains("in"); })[0];
    if (probe) {
      setTimeout(function () {
        if (parseFloat(getComputedStyle(probe).opacity) === 0) docEl.classList.add("motion-off");
      }, 400);
    }
    // last resort: if NOTHING has revealed after 1.8s, force-show everything
    setTimeout(function () {
      if (els.length && document.querySelectorAll(".reveal:not(.in)").length === els.length) {
        docEl.classList.add("motion-off");
        els.forEach(function (e) { e.classList.add("in"); });
      }
    }, 1800);
  }

  /* auto-stagger: any [data-stagger] container delays its .reveal children */
  function initStagger() {
    [].slice.call(document.querySelectorAll("[data-stagger]")).forEach(function (c) {
      var step = parseInt(c.getAttribute("data-stagger"), 10) || 80;
      var kids = [].slice.call(c.querySelectorAll(":scope > .reveal, :scope > * > .reveal"));
      kids.forEach(function (k, i) { k.style.setProperty("--d", (i * step)); });
    });
  }

  /* ---- counters ---- */
  function finalText(el) {
    var raw = el.getAttribute("data-count");
    var dec = (raw.split(".")[1] || "").length;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    return prefix + Number(parseFloat(raw)).toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
  }
  function animateCount(el) {
    var raw = el.getAttribute("data-count");
    var target = parseFloat(raw);
    var dec = (raw.split(".")[1] || "").length;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = finalText(el); return; }
    var dur = 1400, start = null;
    function tick(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = (target * eased).toFixed(dec);
      el.textContent = prefix + Number(val).toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function initCounters() {
    var els = [].slice.call(document.querySelectorAll("[data-count]"));
    var done = [];
    function run(e) { if (done.indexOf(e) >= 0) return; done.push(e); animateCount(e); }
    if (reduce) { els.forEach(run); return; }
    function sweep() { els.forEach(function (e) { if (inView(e, 0)) run(e); }); }
    sweep();
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
      }, { threshold: 0.5 });
      els.forEach(function (e) { io.observe(e); });
    }
    var ticking = false;
    function onScroll() { if (ticking) return; ticking = true; requestAnimationFrame(function () { sweep(); ticking = false; }); }
    window.addEventListener("scroll", onScroll, { passive: true });
    // ensure counters reach their final value even if rAF never advances
    setTimeout(function () {
      els.forEach(function (e) {
        done.push(e);
        if (parseFloat(getComputedStyle(e).opacity) === 0 || /^0/.test(e.textContent.trim())) e.textContent = finalText(e);
      });
    }, 1600);
  }

  /* ---- sticky nav shadow ---- */
  function initNavScroll() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 10); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- desktop mega menus (hover + focus, click fallback) ---- */
  function initMega() {
    var items = [].slice.call(document.querySelectorAll(".nav-item.has-mega"));
    items.forEach(function (item) {
      var closeT;
      function open() { clearTimeout(closeT); items.forEach(function (i) { if (i !== item) i.classList.remove("open"); }); item.classList.add("open"); }
      function close() { closeT = setTimeout(function () { item.classList.remove("open"); }, 120); }
      item.addEventListener("mouseenter", open);
      item.addEventListener("mouseleave", close);
      var link = item.querySelector(".nav-link");
      if (link) link.addEventListener("click", function (e) { e.preventDefault(); item.classList.toggle("open"); });
      item.addEventListener("focusin", open);
      item.addEventListener("focusout", close);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") items.forEach(function (i) { i.classList.remove("open"); }); });
  }

  /* ---- mobile drawer ---- */
  function initMobile() {
    var burger = document.querySelector(".nav-burger");
    var menu = document.querySelector(".mobile-menu");
    if (!burger || !menu) return;
    burger.addEventListener("click", function () {
      var on = burger.classList.toggle("on");
      menu.classList.toggle("on", on);
      document.body.style.overflow = on ? "hidden" : "";
    });
    [].slice.call(menu.querySelectorAll(".mm-head")).forEach(function (head) {
      head.addEventListener("click", function () {
        var grp = head.closest(".mm-group");
        var sub = grp.querySelector(".mm-sub");
        var open = grp.classList.toggle("open");
        sub.style.maxHeight = open ? sub.scrollHeight + "px" : "0";
      });
    });
    [].slice.call(menu.querySelectorAll("a")).forEach(function (a) {
      a.addEventListener("click", function () { burger.classList.remove("on"); menu.classList.remove("on"); document.body.style.overflow = ""; });
    });
  }

  /* ---- accordions ---- */
  function initAcc() {
    [].slice.call(document.querySelectorAll(".acc")).forEach(function (acc) {
      var items = [].slice.call(acc.querySelectorAll(".acc-item"));
      items.forEach(function (item) {
        var q = item.querySelector(".acc-q");
        var a = item.querySelector(".acc-a");
        if (!q || !a) return;
        if (item.classList.contains("open")) a.style.maxHeight = a.scrollHeight + "px";
        q.addEventListener("click", function () {
          var isOpen = item.classList.contains("open");
          if (!acc.hasAttribute("data-multi")) {
            items.forEach(function (o) { if (o !== item) { o.classList.remove("open"); var oa = o.querySelector(".acc-a"); if (oa) oa.style.maxHeight = "0"; } });
          }
          item.classList.toggle("open", !isOpen);
          a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : "0";
        });
      });
    });
  }

  /* ---- tabs ---- */
  function initTabs() {
    [].slice.call(document.querySelectorAll("[data-tabs]")).forEach(function (group) {
      var tabs = [].slice.call(group.querySelectorAll(".pilltab"));
      var panelHost = document.querySelector(group.getAttribute("data-tabs"));
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          tabs.forEach(function (t) { t.classList.remove("on"); });
          tab.classList.add("on");
          var id = tab.getAttribute("data-tab");
          if (!panelHost) return;
          [].slice.call(panelHost.querySelectorAll(".tabpanel")).forEach(function (p) {
            p.classList.toggle("on", p.getAttribute("data-panel") === id);
          });
        });
      });
    });
  }

  /* ---- seamless marquee (duplicate children once) ---- */
  function initMarquee() {
    [].slice.call(document.querySelectorAll(".marquee-track")).forEach(function (track) {
      if (track.getAttribute("data-cloned")) return;
      track.setAttribute("data-cloned", "1");
      var html = track.innerHTML;
      track.innerHTML = html + html;
    });
  }

  /* ---- anchor offset for sticky nav ---- */
  function initAnchors() {
    [].slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        var y = t.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
      });
    });
  }

  // expose so shell.js can re-run after injecting nav/footer
  window.IMAIMotion = function () {
    initNavScroll(); initMega(); initMobile(); initMarquee();
  };

  ready(function () {
    initStagger(); initReveal(); initCounters();
    initAcc(); initTabs(); initAnchors();
    // nav-related run after shell injects (shell calls IMAIMotion); also run now in case nav is inline
    window.IMAIMotion();
  });
})();
