# -*- coding: utf-8 -*-
# Generates the non-page assets AFTER build_site.py (which wipes public/).
# Run: python3 build_site.py && python3 build_extras.py
import re, os
SRC=os.path.dirname(os.path.abspath(__file__)); OUT=f'{SRC}/public'
BASE='https://influencermarketing.ai'; TODAY='2026-06-17'

pages=[('/','1.0','weekly'),('/platform','0.9','monthly'),('/solutions','0.9','monthly'),('/pricing','0.9','weekly'),
 ('/find-influencers','0.8','weekly'),('/webinars','0.6','monthly'),('/customers','0.7','monthly'),('/about','0.6','monthly'),
 ('/platform/discovery','0.8','monthly'),('/platform/influencer-crm','0.8','monthly'),('/platform/campaign-management','0.8','monthly'),
 ('/platform/tracking-roi','0.8','monthly'),('/platform/creator-payouts','0.8','monthly'),('/platform/competitive-intelligence','0.8','monthly'),
 ('/solutions/enterprise','0.8','monthly'),('/solutions/agencies','0.8','monthly'),('/solutions/smb','0.8','monthly'),
 ('/solutions/ecommerce','0.8','monthly'),('/solutions/ugc','0.8','monthly'),('/solutions/pr','0.8','monthly'),
 ('/solutions/consumer-intelligence','0.8','monthly'),('/solutions/llm-visibility','0.8','monthly'),('/solutions/ai-agents','0.8','monthly'),
 ('/terms','0.3','yearly'),('/privacy','0.3','yearly'),('/cookies','0.3','yearly'),('/security','0.4','yearly')]
sm='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for u,p,cf in pages: sm+=f'  <url><loc>{BASE}{u}</loc><lastmod>{TODAY}</lastmod><changefreq>{cf}</changefreq><priority>{p}</priority></url>\n'
sm+='</urlset>\n'; open(f'{OUT}/sitemap.xml','w').write(sm)

open(f'{OUT}/robots.txt','w').write(f"""User-agent: *
Allow: /
Disallow: /register
Disallow: /onboarding/

User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: cohere-ai
Allow: /

Sitemap: {BASE}/sitemap.xml
""")

open(f'{OUT}/site.webmanifest','w').write('{\n  "name": "InfluencerMarketing.ai",\n  "short_name": "IMAI",\n  "description": "The AI platform for influencer marketing \\u2014 discover, vet, activate and pay creators from 400M+ profiles.",\n  "start_url": "/",\n  "display": "standalone",\n  "background_color": "#ffffff",\n  "theme_color": "#7132F5",\n  "icons": [ { "src": "/assets/imai-mark.png", "sizes": "512x512", "type": "image/png" } ]\n}\n')

llms="""# InfluencerMarketing.ai

> InfluencerMarketing.ai (IMAI) is an all-in-one AI platform for influencer marketing. Brands and agencies use it to discover, vet, activate, measure and pay creators from a database of 400M+ profiles across Instagram, TikTok, YouTube and X. It replaces the typical stack of a creator database, an outreach inbox, a reporting spreadsheet and a separate payments tool with one connected platform.

## Key facts
- Creator database: 400M+ profiles across Instagram, TikTok, YouTube and X; profiles refresh within 24 hours.
- AI natural-language search across 50+ audience and content signals, with fake-follower and brand-safety screening.
- Creator payouts in 135+ currencies across 100+ countries, with tax forms, VAT/GST and currency conversion handled automatically.
- ROI tracking: sales attribution via SDK, UTMs and discount codes; EMV, GMV, CAC and ROAS roll-ups by creator, campaign or brand.
- Shopify integration: one-click connection (Shopify and Shopify Plus) that attributes every order to the creator who drove it via synced discount codes, affiliate links and a tracking pixel; pays creators commission on real Shopify sales automatically.
- Trusted by 1,000+ brands and agencies in 50+ countries, including Estee Lauder, Samsung and Playtika.
- Pricing: Personal $129/mo, Starter $299/mo, Growth $499/mo, Scale $1,200/mo, and custom Enterprise. 7-day free trial, no card required. Full 412M+ creator database on every plan.
- Six connected workspaces: Influencer Marketing, Consumer Intelligence, PR & Media, UGC Video Ads, LLM Visibility and AI Agents.

## Platform
- [Creator Discovery](https://influencermarketing.ai/platform/discovery): AI natural-language search and vetting across 400M+ creators.
- [Influencer CRM](https://influencermarketing.ai/platform/influencer-crm): one pipeline with AI outreach and automatic follow-ups (62% average reply rate).
- [Campaign Management](https://influencermarketing.ai/platform/campaign-management): brief, contracts, e-sign, content approval and payouts in one workflow.
- [Tracking & ROI](https://influencermarketing.ai/platform/tracking-roi): sales attribution, Shopify GMV attribution and EMV/GMV/CAC/ROAS reporting in real time.
- [Creator Payouts](https://influencermarketing.ai/platform/creator-payouts): pay creators in 135+ currencies across 100+ countries.
- [Competitive Intelligence](https://influencermarketing.ai/platform/competitive-intelligence): share of voice, brand mentions and the creators driving them.

## Solutions
- [Enterprise](https://influencermarketing.ai/solutions/enterprise): SSO, SOC 2 Type II, role-based access, six workspaces in one login.
- [Agencies](https://influencermarketing.ai/solutions/agencies): white-label platform, multi-client management, client-ready reports.
- [SMB & startups](https://influencermarketing.ai/solutions/smb): launch campaigns in minutes; 7-day free trial.
- [Ecommerce](https://influencermarketing.ai/solutions/ecommerce): Shopify GMV attribution per creator and UGC video ads at scale.
- [UGC Video Ads](https://influencermarketing.ai/solutions/ugc): AI avatar video in 40+ languages with rights and whitelisting handled.
- [PR & Media](https://influencermarketing.ai/solutions/pr): pitch 1M+ journalists with AI and track coverage and EMV.
- [Consumer Intelligence](https://influencermarketing.ai/solutions/consumer-intelligence): monitor 2T+ conversations and activate the creators driving them.
- [LLM Visibility](https://influencermarketing.ai/solutions/llm-visibility): track and shape how ChatGPT, Perplexity and AI Overviews describe your brand.
- [AI Agents](https://influencermarketing.ai/solutions/ai-agents): voice and chat agents that qualify, book and support 24/7.

## Key pages
- [Pricing](https://influencermarketing.ai/pricing): plans and packages.
- [Find influencers](https://influencermarketing.ai/find-influencers): search 400M+ creators by niche, platform and audience.
- [Customers](https://influencermarketing.ai/customers): case studies and results.
- [About](https://influencermarketing.ai/about): company and mission.
"""
open(f'{OUT}/llms.txt','w').write(llms)

# 404 from fresh homepage nav/footer
home=open(f'{OUT}/index.html').read()
nav=re.search(r'(<nav class="nav">.*?</nav>)',home,re.S).group(1)
mobile=re.search(r'<div class="mobile-menu">.*</div></div>',home).group(0)
footer=re.search(r'(<footer class="footer">.*?</footer>)',home,re.S).group(1)
head='''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Page not found — InfluencerMarketing.ai</title>
<meta name="robots" content="noindex,follow" />
<meta name="theme-color" content="#7132F5" />
<link rel="icon" type="image/png" href="/assets/imai-mark.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Passion+One:wght@400;700;900&display=swap" media="print" onload="this.media='all'" />
<link rel="stylesheet" href="/ds/colors_and_type.css" />
<link rel="stylesheet" href="/css/ds-components.css" />
<link rel="stylesheet" href="/css/site.css" />
<link rel="stylesheet" href="/css/home.css" />
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
'''
body='''
<main id="main">
  <section class="section" style="text-align:center;min-height:52vh;display:flex;align-items:center">
    <div class="wrap" style="max-width:680px;margin:0 auto">
      <span class="eyebrow" style="justify-content:center"><span class="dot"></span>404</span>
      <h1 class="h-display" style="margin-top:16px">This page took an <span class="ac">unscheduled break.</span></h1>
      <p class="lead" style="margin-top:18px">The link may be broken or the page moved. Let's get you back to finding creators.</p>
      <div class="btn-row" style="justify-content:center;margin-top:28px">
        <a class="imai-btn imai-btn--primary imai-btn--lg" href="/">Back to home</a>
        <a class="imai-btn imai-btn--secondary imai-btn--lg" href="/find-influencers">Find influencers</a>
      </div>
      <p style="margin-top:30px;color:var(--fg3);font-size:var(--text-sm)">Popular: <a href="/platform" style="color:var(--violet-500);font-weight:600">Platform</a> &middot; <a href="/solutions" style="color:var(--violet-500);font-weight:600">Solutions</a> &middot; <a href="/pricing" style="color:var(--violet-500);font-weight:600">Pricing</a> &middot; <a href="/customers" style="color:var(--violet-500);font-weight:600">Customers</a></p>
    </div>
  </section>
</main>
'''
open(f'{OUT}/404.html','w').write(head+nav+'\n'+mobile+'\n'+body+'\n'+footer+'\n<script src="/js/motion.js"></script>\n</body>\n</html>\n')

print(f"extras: sitemap({sm.count('<url>')} urls), robots, llms.txt, manifest, 404")
