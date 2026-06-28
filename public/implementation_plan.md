# National Packers & Movers — Website Development Blueprint
**Version:** v1.0 FINAL | **Date:** June 2026 | **Status:** ✅ Ready for Approval

## Project Overview

| Field | Detail |
|-------|--------|
| **Client** | National Packers & Movers |
| **Owner** | Debabrata Jhampaty | 
| **Led by** | Chetan Jhampaty |
| **Founded** | 1987 (38+ Years in Business) |
| **HQ** | Kasturba Nagar, Near Dhanbad Thana, Dhanbad, Jharkhand — 826001 |
| **HQ Phones** | 9835168368 / 9934166164 |
| **Domain** | thenationalpackersmovers.com |
| **Tagline** | *"Honesty is not our policy, but our Principle."* |
| **Stack** | Next.js 14 (App Router) — modern, scalable, SEO-optimized |
| **Budget** | Under ₹50,000 |
| **Timeline** | 1–2 months |
| **Design** | Navy Blue + Gold + Red Accent — Bold, energetic, trustworthy |
| **YouTube** | [@NationalPackersandMovers11](https://www.youtube.com/@NationalPackersandMovers11) |
| **Instagram** | [@national.packers.and.movers](https://www.instagram.com/national.packers.and.movers/) |
| **Facebook** | [National Packers Movers](https://www.facebook.com/people/National-Packers-Movers/100077275401485/) |
| **Threads** | [@national.packers.and.movers](https://www.threads.com/@national.packers.and.movers) |

---

## ✅ ALL INFO LOCKED — Blueprint Complete. Ready for Development.

---

## Open Questions (Minor — Non-Blocking)

---

## Open Questions

> [!NOTE]
> 1. **UP City Names:** Provide when ready — state-level page `/branches/uttar-pradesh` will go live first, city pages added as confirmed.
> 2. **Branch Phone Numbers:** Add individual branch numbers later when needed — all calls routed to HQ for now.
> 3. **Video Testimonials:** Upload IOCL/Coal India review videos to your YouTube channel before Phase 4. We embed them in the site.
> 4. **Corporate Client Names:** Will display as *"Leading PSU & Corporate Clients"* with video testimonials (no direct naming).
> 5. **More Photos:** Share batches of 5 as we build each section — real photos will be used throughout.

---

## Proposed Architecture

### Technology Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend Framework | **Next.js 14 (App Router)** | SEO, SSG for branch pages, fast |
| Styling | **Vanilla CSS + CSS Modules** | Full control, no bloat |
| Animation | **Framer Motion** | Premium feel, micro-animations |
| Form Handling | **React Hook Form + EmailJS** | No backend needed, free |
| CMS (Content) | **Sanity.io (Free Tier)** | Non-tech admins can update content |
| Tracking Module | **Admin-updated status table** | Simple, within budget |
| Deployment | **Vercel (Free Tier)** | Zero-cost, CDN-backed, fast |
| Analytics | **Google Analytics 4** | Free, powerful |

---

## Website Structure (Sitemap)

```
/ (Home)
├── /about
├── /services
│   ├── /services/home-relocation
│   ├── /services/office-shifting
│   ├── /services/industrial-transport
│   ├── /services/warehousing-storage
│   ├── /services/vehicle-transport
│   ├── /services/insurance
│   └── /services/loading-unloading
├── /branches
│   ├── /branches/west-bengal
│   │   ├── /branches/west-bengal/kolkata
│   │   ├── /branches/west-bengal/durgapur
│   │   └── /branches/west-bengal/asansol
│   ├── /branches/jharkhand
│   │   ├── /branches/jharkhand/dhanbad
│   │   ├── /branches/jharkhand/ranchi
│   │   ├── /branches/jharkhand/bokaro
│   │   └── /branches/jharkhand/deoghar
│   ├── /branches/odisha
│   ├── /branches/madhya-pradesh
│   ├── /branches/bihar
│   └── /branches/uttar-pradesh
├── /track-shipment
├── /get-quote
├── /blog
├── /gallery
├── /testimonials
├── /contact
└── /admin (password-protected admin panel)
```

---

## Page-by-Page Blueprint

### 1. 🏠 Home Page (`/`)
**Goal:** WOW factor. Convert visitors into leads in under 10 seconds.

**Sections:**
- **Hero Section** — Full-screen with animated tagline *"Trusted Since 1987. Moving India Forward."*, real photo background (packing/truck photo from your collection). Two CTAs: `Get Free Quote` + `Track Shipment`.
- **Trust Bar** — Animated counter row: **"38+ Years | 10,000+ Moves | 6 States | 15+ Cities | 100% Insured"**
- **Services Grid** — 4 category cards (Household, Corporate, Industrial, Vehicle) with icons, hover animation
- **Why Choose Us** — USPs: Trained Staff, On-Time Delivery, Full Insurance, All-India Network, Trusted Since 1987, Serving PSUs
- **🌟 Corporate Clients Section** — *"Trusted by India's Biggest Organizations"* — Video testimonials from IOCL & Coal India officers embedded from YouTube. **This section alone will close corporate deals.**
- **Branch Coverage Map** — Interactive India SVG map showing all branch cities (clickable, highlights on hover)
- **Testimonials Carousel** — Customer reviews with star rating, city, service used
- **How It Works** — 4-step animated process: Request Quote → We Pack → We Transport → Safe Delivery
- **Photo Gallery Preview** — Grid of 6 real work photos with "View Full Gallery" CTA
- **Blog Preview** — Latest 3 SEO blog articles
- **CTA Banner** — Bold Navy/Red gradient banner: *"Ready to Move? Get a Free Quote in 2 Minutes"*
- **Footer** — Full footer with all branch links, services, social media, phone numbers, license info

---

### 2. 📄 About Page (`/about`)
- Company story (founded by Debabrata Jhampaty, vision by Chetan)
- Mission & vision statement
- Team section (optional, can add later)
- Milestones timeline (animated horizontal scroll)
- Government registrations / IBA approval badges

---

### 3. 🚛 Services Pages (`/services` + sub-pages)
Each service gets its own dedicated landing page for SEO. Structure:
- Hero with service name + real photo from your collection
- What's included (checklist)
- Process steps (animated)
- Pricing indicator (on request / starting from ₹X)
- Related services
- Enquiry form

**Service Categories & Sub-Pages:**

| Category | Page URL |
|----------|----------|
| Household Relocation | `/services/household-relocation` |
| Corporate Relocation | `/services/corporate-relocation` |
| Industrial Relocation | `/services/industrial-relocation` |
| Vehicle Relocation | `/services/vehicle-relocation` |
| Warehousing & Storage | `/services/warehousing-storage` |
| Transit Insurance | `/services/transit-insurance` |
| Loading & Unloading | `/services/loading-unloading` |

> [!NOTE]
> The **Corporate Relocation** page will be the most premium page — featuring IOCL, Coal India video testimonials, corporate process workflow, and a dedicated B2B enquiry form. This is your biggest revenue opportunity.

---

### 4. 🗺️ Branch Pages — 3-Tier Structure

We build THREE levels of location pages for **National → State → City** SEO domination:

**Navigation:** Mega-menu on desktop (Branches → State → City, nested hover dropdowns). Accordion on mobile.

#### Tier 1: National Page (Homepage)
- Target: "Packers and Movers India", "National Packers and Movers", "All India relocation service"
- National-scope hero, all-India coverage map, corporate clients, full service range

#### Tier 2: State-Level Pages (6 pages)
Each state gets its own page: `/branches/jharkhand`, `/branches/west-bengal`, etc.
- Target: "Packers and Movers in Jharkhand", "Best movers in West Bengal"
- Lists all city offices in that state, state-specific testimonials, service info
- Created for ALL 6 states, even Odisha (virtual)

#### Tier 3: City-Level Pages (12+ pages)
`/branches/[state]/[city]` — Each city gets full dedicated landing page:
- City-specific hero: *"Packers & Movers in [City] — National Packers & Movers"*
- Branch contact details (HQ number for now, branch number later)
- Services available, local testimonials, Google Maps, Free quote form

**Complete Branch Map (FINALIZED):**
| State | State Page | City Pages | Status |
|-------|-----------|-----------|--------|
| **Jharkhand (HQ)** | `/branches/jharkhand` | Dhanbad, Ranchi, Bokaro, Deoghar | ✅ Active |
| **West Bengal** | `/branches/west-bengal` | Kolkata, Durgapur, Asansol | ✅ Active |
| **Madhya Pradesh** | `/branches/madhya-pradesh` | Singrauli | ✅ Active |
| **Bihar** | `/branches/bihar` | Patna, Bhagalpur | ✅ Active |
| **Odisha** | `/branches/odisha` | (Virtual Office) | 🔵 Virtual |
| **Uttar Pradesh** | `/branches/uttar-pradesh` | Cities TBD | ⚠️ Pending |

**Total pages: 6 state pages + 12 city pages = 18 location pages (+ UP cities when confirmed)**

> [!NOTE]
> "Packers and Movers in Singrauli" has near-ZERO competition online. We will OWN that keyword within weeks of launch. Same for Bokaro, Deoghar, Bhagalpur — these are your hidden goldmines.

---

### 5. 📦 Track Shipment (`/track-shipment`)
- Input field: Enter AWB/Booking Number
- Status displayed: Booked → Packed → In Transit → Delivered
- Admin updates status from dashboard
- Phase 2 option: Integrate real GPS/SMS tracking

---

### 6. 💬 Get a Quote (`/get-quote`)
- Multi-step form (Step 1: From/To cities | Step 2: Move type | Step 3: Items | Step 4: Date + Contact)
- Submits via EmailJS to your inbox (no backend needed)
- WhatsApp quick-quote button

---

### 7. 📰 Blog (`/blog`)
- SEO-focused articles: "How to Pack for a Move in Ranchi", "Best Packers in Kolkata", "Corporate Relocation Checklist for PSU Employees"
- Managed via Sanity CMS (admin can write without coding)
- Each article targets specific city + service keyword
- Target: 1 article per week for first 3 months

---

### 8. 🖼️ Gallery (`/gallery`)
- Grid of photos: trucks, packing, deliveries, team
- Filter by service type or city

---

### 9. ⭐ Testimonials (`/testimonials`)
- **Video Testimonials Section** (TOP of page) — IOCL, Coal India officers embedded from YouTube
- Written testimonials with star rating, city, service used, client name
- Corporate client logos section (with permission)
- Google Reviews embed
- Submit a review CTA

---

### 10. 📞 Contact (`/contact`)
- Main HQ contact details
- Branch directory (all cities listed with phone numbers)
- Contact form (EmailJS)
- WhatsApp floating button (present on ALL pages)

---

### 11. 🔐 Admin Panel (`/admin`)
- Password-protected (simple auth or Sanity Studio)
- Update shipment tracking statuses
- View/manage enquiries from contact forms
- Add/edit branch details, services, blog posts (via Sanity CMS)

---

## Design System

### Color Palette (FINALIZED — Navy + Gold + Red Accent)
| Role | Color | Hex |
|------|-------|-----|
| **Primary Background** | Deep Navy | `#0D1B2A` |
| **Surface / Cards** | Dark Navy Blue | `#1A2744` |
| **Primary Brand** | Rich Gold | `#F7B731` |
| **Action / Accent** | Bold Red | `#C1121F` |
| **Text Primary** | White | `#FFFFFF` |
| **Text Secondary** | Silver Gray | `#A8B2C1` |
| **Success / Confirmed** | Emerald | `#2D9A60` |
| **Hero Gradient** | Navy → Dark Navy | `linear-gradient(135deg, #0D1B2A, #1A2744)` |
| **CTA Gradient** | Gold → Red | `linear-gradient(135deg, #F7B731, #C1121F)` |
| **Brand Gradient** | Navy → Gold | `linear-gradient(135deg, #1A2744, #F7B731)` |

*Matches logo exactly: Dark Navy background, Gold brand color, Red for high-energy CTAs.*

### Typography
- **Headings:** `Rajdhani` (bold, industrial, impactful) — from Google Fonts
- **Body:** `Inter` (clean, readable, professional)
- **Accent / Brand:** `Barlow Condensed` (for taglines and number counters)

### Micro-animations
- Page transitions: slide + fade
- Number counters: count up on scroll
- Cards: hover lift + shadow
- CTA buttons: shimmer/pulse effect on idle
- India map: state highlight on hover

---

## Development Phases

### Phase 1 — Foundation (Week 1-2)
- [ ] Set up Next.js 14 project with folder structure
- [ ] Create design system (CSS variables, fonts, components)
- [ ] Build Header (with mobile nav), Footer
- [ ] Build Home Page (all sections)
- [ ] Build About Page

### Phase 2 — Core Pages (Week 3-4)
- [ ] Build all 7 Services sub-pages
- [ ] Build Get a Quote multi-step form
- [ ] Build Contact page
- [ ] Set up EmailJS integration

### Phase 3 — Branch & SEO Pages (Week 5-6)
- [ ] Set up Sanity CMS
- [ ] Build dynamic branch page template
- [ ] Create all branch city pages (15+ pages)
- [ ] SEO metadata for all pages

### Phase 4 — Features & Polish (Week 7-8)
- [ ] Build Track Shipment page + admin status update
- [ ] Build Gallery page
- [ ] Build Blog system (Sanity-powered)
- [ ] Build Testimonials page
- [ ] Admin panel (protected route)
- [ ] WhatsApp floating button
- [ ] Google Analytics integration
- [ ] Performance optimization + final testing

---

## SEO Strategy

- **Target Keywords per branch:** "Packers and Movers in [City]", "[City] to [City] transport service"
- **Schema Markup:** LocalBusiness schema for each branch page
- **Sitemap:** Auto-generated via Next.js
- **Meta tags:** Unique title + description for every page
- **Image alt tags:** Descriptive, keyword-rich
- **Blog:** 1 article/week targeting long-tail keywords

---

## Budget Breakdown (Estimated)

| Item | Estimated Cost |
|------|---------------|
| Domain name (1 year) | ₹800 – ₹1,500 |
| Hosting (Vercel Free Tier) | ₹0 |
| Sanity CMS (Free Tier) | ₹0 |
| EmailJS (Free Tier — 200/mo) | ₹0 |
| Google Analytics | ₹0 |
| Design Assets / Stock Photos | ₹1,000 – ₹3,000 (or use AI-generated) |
| **Development (self/Chetan/team)** | ₹0 – ₹40,000 |
| **Total Estimated** | **₹1,800 – ₹44,500** |

> [!TIP]
> By using Vercel + Sanity free tiers, your monthly running cost after launch is **essentially ₹0** (only domain renewal annually). This is a huge advantage for keeping costs low while scaling.

---

## Verification Plan

### Automated
- Next.js build check (`npm run build`) — no errors
- Lighthouse audit: Target 90+ on Performance, SEO, Accessibility

### Manual Verification
- All forms submit and deliver email correctly
- All branch pages load with correct city data
- Shipment tracking updates work from admin panel
- WhatsApp button opens with correct number
- Mobile responsiveness on Android/iPhone
- All 15+ branch pages indexed by Google Search Console

---

*Blueprint created by Antigravity for Chetan Jhampaty | National Packers & Movers | June 2026*
