# Amirani Store

**Afghan fashion for the European diaspora — premade pieces and fully custom orders, shipped across Europe.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-f72585)](https://framer.com/motion)
[![Zustand](https://img.shields.io/badge/Zustand-state-orange)](https://github.com/pmndrs/zustand)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com)

---

## Overview

Amirani Store is a portfolio-grade Afghan e-commerce MVP rebuilt from scratch after the original business was sold. The original store ran on TikTok-linked marketing, shipped handcrafted Afghan garments to Belgium and across Europe, and handled orders through WhatsApp.

This rebuild demonstrates what a modern Afghan clothing brand can look and feel like — warm earth tones, Playfair Display headings, a clean Afghan-cultural aesthetic, and a full custom order wizard.

**Live demo:** [amirani-store.vercel.app](https://amirani-store.vercel.app) _(update after deployment)_

---

## Features

### Premade Catalog
- Filterable product grid (category, type, price, stock status)
- Dynamic product detail pages with color/size selectors
- Add to cart with Zustand state management

### Custom Order Flow (4-step wizard)
1. **Fabric Selector** — browse silk, cotton, chiffon, velvet, linen, satin swatches with price modifiers
2. **Design Description** — garment type, color preference, reference image URL, special modifications
3. **Body Measurements** — cm/inches toggle, all 6 measurements with illustrated guide
4. **Review & Checkout** — full order summary, contact/shipping form, dummy submission

### Other Pages
- **Home** — hero, featured products, how it works, custom order CTA, testimonials
- **Cart** — premade + custom items, quantity controls, order summary
- **About** — brand story, mission, craftsmanship ethos
- **Contact** — contact form, email, WhatsApp link, social icons

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 with custom Afghan design tokens |
| Animations | Framer Motion |
| State | Zustand (cart + custom order) |
| Data | Static mock data (no backend) |
| Deployment | Vercel |

---

## Design System

Afghan cultural aesthetic with warm earth tones:

```
ivory        #FAF6F0   page base
linen        #EFE8DC   section alternates
dusty-rose   #C9897A   CTAs + accents
warm         #5C4A42   headings
stone        #8C7B70   body copy
blush        #E8C9B8   highlights
```

Typography: **Playfair Display** (headings) + **Inter** (body)

---

## Local Setup

```bash
# Clone and install
git clone https://github.com/yourusername/amirani-store.git
cd amirani-store
npm install

# Run dev server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build
npm start
```

No environment variables required for MVP.

---

## Project Structure

```
amirani-store/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx
│   ├── page.tsx            # Home
│   ├── catalog/            # Premade catalog + [slug] detail
│   ├── custom-order/       # 4-step wizard (fabric/design/measurements/review)
│   ├── cart/
│   ├── about/
│   └── contact/
├── components/
│   ├── layout/             # Navbar, Footer, MobileMenu
│   ├── home/               # HeroSection, FeaturedProducts, HowItWorks, etc.
│   ├── catalog/            # ProductCard, ProductGrid, FilterSidebar, ProductDetail
│   ├── custom-order/       # StepIndicator, FabricCard, DesignForm, MeasurementForm, OrderReview
│   ├── cart/               # CartItem, CartSummary
│   └── ui/                 # Button, Badge, PatternDivider, SectionHeader
├── lib/
│   ├── data/               # products.ts, fabrics.ts, testimonials.ts
│   ├── store/              # cartStore.ts, customOrderStore.ts
│   ├── types/              # index.ts — all interfaces
│   └── utils/              # formatPrice.ts
└── public/
    └── patterns/           # afghan-motif.svg
```

---

## Business Context

Amirani Store was a real business — an Afghan clothing e-commerce brand that shipped custom and premade garments from Belgium to diaspora communities across Europe. Orders came in via TikTok-linked content and were handled through WhatsApp. The original business was sold in early 2026.

This is a portfolio rebuild of the same concept, demonstrating a production-quality Next.js e-commerce implementation with a culturally-rooted design system.

---

## Deployment

```bash
# Push to GitHub
git init
git add .
git commit -m "feat: Amirani Store MVP — Afghan fashion e-commerce"
git remote add origin https://github.com/yourusername/amirani-store.git
git push -u origin main

# Deploy on Vercel
# 1. Connect GitHub repo at vercel.com/new
# 2. Framework: Next.js (auto-detected)
# 3. No environment variables needed
# 4. Deploy
```

---

*Made with care for the Afghan diaspora.*
