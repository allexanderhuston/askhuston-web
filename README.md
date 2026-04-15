# askhuston.com — Portfolio Site

Next.js 14 (App Router) + Tailwind CSS + Framer Motion.

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# fill in NEXT_PUBLIC_FORMSPREE_ID (get one free at formspree.io)
npm run dev
```

Site runs at http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Import the repo at vercel.com/new
3. Add env vars: `NEXT_PUBLIC_FORMSPREE_ID` and `NEXT_PUBLIC_SITE_URL`
4. Deploy — done. Point askhuston.com DNS to Vercel.

## Adding a Project

Edit `lib/projects.ts`. Each project has:

- `slug` — URL path (`/work/slug`)
- `title` — Short title shown in hero
- `brand` — Client or brand name
- `year` — Year completed
- `category` — One of: 'Speculative Campaign' | 'Short Film' | 'UGC Series' | 'Product Photography'
- `tagline` — One sentence shown in project header
- `brief` — What the project was
- `approach` — How you made it
- `tools` — Array of tool names
- `coverGradient` — Tailwind gradient classes (fallback until real thumbnail added)
- `accentColor` — Hex color for category label and dots
- `videoUrl` — YouTube or Vimeo URL (optional)
- `embedType` — 'youtube' | 'vimeo' (required if videoUrl set)
- `images` — Array of paths relative to /public (optional)
- `featured` — Show on home page
- `order` — Display order
- `status` — 'live' | 'in-progress'

## Adding Real Media

**Thumbnail images:** Add files to `/public/work/[slug]/cover.jpg` then update the WorkCard component to use `<Image>` instead of the gradient placeholder.

**Project hero:** Add `videoUrl` + `embedType` to the project in `lib/projects.ts`. The VideoEmbed component handles YouTube and Vimeo automatically.

**For Instagram Reels:** Upload to YouTube (unlisted is fine) and use that URL as `videoUrl`.

## Contact Form

Uses Formspree (free tier = 50 submissions/month).
1. Go to formspree.io, create a free form
2. Copy the form ID (the part after `/f/` in the endpoint)
3. Add it as `NEXT_PUBLIC_FORMSPREE_ID` in `.env.local`

If `NEXT_PUBLIC_FORMSPREE_ID` is not set, the form falls back to a `mailto:` link.

## Customisation

**Colors:** `tailwind.config.ts` → extend.colors
**Fonts:** `app/layout.tsx` → next/font/google imports
**Email:** Search for `alex@askhuston.com` and replace globally
**Social links:** `components/Nav.tsx` and `components/Footer.tsx`
