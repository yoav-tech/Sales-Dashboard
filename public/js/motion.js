(function () {
var docEl = document.documentElement;
var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
docEl.classList.add("js-motion");
function ready(fn) {
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
else fn();
}
function inView(el, pad) {
var r = el.getBoundingClientRect();
var h = window.innerHeight || docEl.clientHeight;
pad = pad || 0;
return r.top < (h - pad) && r.bottom > 0;
}
function initReveal() {
var els = [].slice.call(document.querySelectorAll(".reveal"));
if (reduce) { els.forEach(function (e) { e.classList.add("in"); }); return; }
function sweep() {
els.forEach(function (e) {
if (!e.classList.contains("in") && inView(e, Math.min(60, e.offsetHeight * 0.12))) e.classList.add("in");
});
}
sweep();
if ("IntersectionObserver" in window) {
var io = new IntersectionObserver(function (entries) {
entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
els.forEach(function (e) { if (!e.classList.contains("in")) io.observe(e); });
}
var ticking = false;
function onScroll() {
if (ticking) return; ticking = true;
requestAnimationFrame(function () { sweep(); ticking = false; });
}
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
var probe = els.filter(function (e) { return e.classList.contains("in"); })[0];
if (probe) {
setTimeout(function () {
if (parseFloat(getComputedStyle(probe).opacity) === 0) docEl.classList.add("motion-off");
}, 400);
}
setTimeout(function () {
if (els.length && document.querySelectorAll(".reveal:not(.in)").length === els.length) {
docEl.classList.add("motion-off");
els.forEach(function (e) { e.classList.add("in"); });
}
}, 1800);
}
function initStagger() {
[].slice.call(document.querySelectorAll("[data-stagger]")).forEach(function (c) {
var step = parseInt(c.getAttribute("data-stagger"), 10) || 80;
var kids = [].slice.call(c.querySelectorAll(":scope > .reveal, :scope > * > .reveal"));
kids.forEach(function (k, i) { k.style.setProperty("--d", (i * step)); });
});
}
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
els.forEach(function (e) {
e.textContent = finalText(e);
var w = e.getBoundingClientRect().width;
if (w) { e.style.display = "inline-block"; e.style.minWidth = Math.ceil(w) + "px"; }
});
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
setTimeout(function () {
els.forEach(function (e) {
done.push(e);
if (parseFloat(getComputedStyle(e).opacity) === 0 || /^0/.test(e.textContent.trim())) e.textContent = finalText(e);
});
}, 1600);
}
function initNavScroll() {
var nav = document.querySelector(".nav");
if (!nav) return;
function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 10); }
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
}
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
function initMobile() {
var burger = document.querySelector(".nav-burger");
var menu = document.querySelector(".mobile-menu");
if (!burger || !menu) return;
burger.addEventListener("click", function () {
var on = burger.classList.toggle("on");
menu.classList.toggle("on", on);
docEl.classList.toggle("drawer-open", on);   // lets CSS hide the sticky CTA bar
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
a.addEventListener("click", function () { burger.classList.remove("on"); menu.classList.remove("on"); docEl.classList.remove("drawer-open"); document.body.style.overflow = ""; });
});
}
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
function initMarquee() {
[].slice.call(document.querySelectorAll(".marquee-track")).forEach(function (track) {
if (track.getAttribute("data-cloned")) return;
track.setAttribute("data-cloned", "1");
var html = track.innerHTML;
track.innerHTML = html + html;
});
}
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
function initAdLanding() {
var kw = "";
try {
var params = new URLSearchParams(window.location.search);
kw = (params.get("utm_keyword") || params.get("utm_term") || "").trim().slice(0, 80);
} catch (e) {  }
var kwl = kw.toLowerCase();
if (kw) {
var target = document.getElementById("dynamic-keyword-target");
if (target) target.textContent = kw.toUpperCase();
}
if (/(modash|upfluence|\bgrin\b|creatoriq|alternative|\bvs\b|compare)/.test(kwl)) {
var cmp = document.getElementById("compare");
var hero = document.querySelector(".hero");
if (cmp && hero) hero.insertAdjacentElement("afterend", cmp);
}
var SEGMENTS = {
im: /influencer|creator|crm|discovery|campaign|payout/,
ci: /listening|consumer intelligence|social monitor/,
pr: /\bpr\b|press|journalist|media outreach/,
ugc: /ugc|avatar video|video ad/,
llm: /llm|ai search|ai visibility|\bgeo\b|generative engine/,
agents: /ai agent|voice agent|chat ?bot|chat agent/
};
var seg = null;
for (var k in SEGMENTS) { if (kwl && SEGMENTS[k].test(kwl)) { seg = k; break; } }
if (seg) {
var cards = [].slice.call(document.querySelectorAll("[data-seg]"));
var kept = 0;
cards.forEach(function (c) {
var on = c.getAttribute("data-seg") === seg;
c.style.display = on ? "" : "none";
if (on) kept++;
});
if (cards.length && seg === "im" && kept < 2) {
var sec = cards[0].closest("section");
if (sec) sec.style.display = "none";
}
}
var nav = document.querySelector(".nav");
var host = nav ? nav.parentNode : document.body;
if (host && !document.querySelector(".m-cta-bar")) {
var tmp = document.createElement("div");
tmp.innerHTML = '<div class="m-cta-bar"><a class="imai-btn imai-btn--primary imai-btn--lg imai-btn--block" href="/register">Start free trial — no card needed</a></div>';
host.appendChild(tmp.firstChild);
}
}
window.IMAIMotion = function () {
initNavScroll(); initMega(); initMobile(); initMarquee();
};
ready(function () {
initAdLanding();                 // reorder/hide before reveals measure the page
initStagger(); initReveal(); initCounters();
initAcc(); initTabs(); initAnchors();
window.IMAIMotion();
});
})();