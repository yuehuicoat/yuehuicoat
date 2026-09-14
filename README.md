# Yuehui Coating Equipment — Corporate Website

The public corporate website for **Yuehui Coating Equipment (Hong Kong) Co., Limited**, published at [yuehuicoat.com](https://yuehuicoat.com/) via GitHub Pages with enforced HTTPS.

## Structure

```
.
├── index.html              # Home
├── 404.html                # Custom 404
├── CNAME                   # Custom domain → yuehuicoat.com
├── .nojekyll               # Skip Jekyll processing on GitHub Pages
├── app-ads.txt             # IAB authorised advertising sellers
├── robots.txt              # Search-engine & AI-crawler rules
├── sitemap.xml             # XML sitemap
├── css/
│   └── styles.css          # Single design system (dark, Cadillac-inspired)
├── js/
│   └── app.js              # Header scroll, mobile menu, reveal animations, counters, contact form
├── images/
│   ├── logo.svg            # Master logo
│   ├── favicon.svg         # Browser tab icon
│   ├── icons/              # 15 hand-coded SVG icons
│   ├── animals/            # 7 hand-coded SVG mascots (fox, cat, panda, owl, bear, rabbit, penguin, dragon)
│   ├── backgrounds/        # hero pattern
│   └── banners/            # PNG hero / news images
├── services/index.html     # Service portfolio
├── culture/index.html      # Mission, values, history, team
├── news/index.html         # Articles & dispatch subscription
├── contact/index.html      # Contact form, address, regional offices
└── legal/
    ├── privacy.html        # Full privacy policy (multi-jurisdiction, 20+ ad networks)
    └── terms.html          # Full terms of service (25 sections)
```

## Tech

- **HTML + CSS + JS + SVG** — no framework, no build step.
- **Inter + Cormorant Garamond** — webfonts, with system-font fallbacks.
- **Cadillac-inspired** — deep black backgrounds, gold accents, large hero, smooth scroll-driven reveals, mascot interactions.
- **SEO-friendly** — semantic HTML, JSON-LD (Organization, WebSite, Service, ContactPage, PrivacyPolicy, TermsOfService, AboutPage, Blog), canonical URLs, OpenGraph, Twitter Card, mobile-first responsive.
- **Accessibility** — skip-to-main, aria labels, prefers-reduced-motion respected, focus-visible.
- **Privacy-aware** — TCF v2.2 ready, app-ads.txt, granular cookie banner.

## Local preview

Open `index.html` in a modern browser, or run any static server:

```sh
npx serve .
# then visit http://localhost:3000
```

## Publishing

This repository is automatically published via GitHub Pages from the `main` branch. The custom domain `yuehuicoat.com` is configured in the `CNAME` file, and HTTPS is enforced.

## License

© 2026 Yuehui Coating Equipment (Hong Kong) Co., Limited. All rights reserved.
