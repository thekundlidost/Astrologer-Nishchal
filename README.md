# Astrologer Nishchal — The Kundli Dost

Premium astrology consultancy website. Next.js 15 (App Router) + TypeScript + Tailwind CSS.
Royal blue + gold theme, dark mode, fully responsive, SEO-optimized, zero-cost architecture
(static hosting + WhatsApp click-to-chat + UPI payment links — no paid backend or database).

## One-file configuration

**Everything editable lives in `lib/constants.ts`:**
- Brand name, secondary brand, handle, tagline
- WhatsApp number, phone, email, Instagram URL
- UPI ID + payee name (powers the pre-filled payment QR/links)
- Trust stats (4.94★, 50,000+, etc.) — `TRUST_STATS`
- All 5 services + prices — `SERVICES`
- Availability schedule, client cities, trust badges

Reviews → `lib/testimonials.ts` (built to hold 100+; just append).
Feedback screenshots → `lib/feedback.ts` + images in `/public/feedback/`.
FAQs → `lib/faqs.ts`. Blog posts → `lib/blog-posts.ts`.

## Before launch — replace these placeholders
1. **`/public/upi-qr.png`** — swap in your real UPI QR code (same dimensions).
2. **Trust numbers** in `TRUST_STATS` — only display figures that are truthful.
3. **Professional photo** — the About/hero photo areas use a zodiac placeholder.
4. **Google Maps embed** on the Contact page.
5. **Verify the UPI ID** `9714338888@okbizaxis` is correct.

## Local development
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & deploy (Vercel — recommended, free tier)
```bash
npm run build
```
1. Push this repo to GitHub.
2. Import the repo at vercel.com → it auto-detects Next.js.
3. (Optional) set env vars to override defaults:
   `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`,
   `NEXT_PUBLIC_PHONE_NUMBER`, `NEXT_PUBLIC_CONTACT_EMAIL`.
4. Deploy. Add your custom domain in Vercel's dashboard.

Also deployable to Netlify or any static/Node host that supports Next.js 15.

## Tech notes
- Dark mode: class-based, no-flash inline script in `app/layout.tsx`.
- SEO: per-page metadata, Open Graph, Twitter cards, JSON-LD (Organization,
  Service, FAQ, Review/AggregateRating), `sitemap.ts`, `robots.ts`.
- Booking flow: 4 steps (service → details → UPI payment → WhatsApp handoff),
  no backend; details are pre-filled into the WhatsApp message.
