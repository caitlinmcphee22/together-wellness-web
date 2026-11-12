# Together Wellness website

Next.js site, content in Sanity, hosted on Vercel. Built from the approved Claude Design canvas (11 Nov 2026).

## Run locally
```
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000, Studio at /studio
```

## Content
- Sanity project `ti60wn36`, dataset `production`. The new site uses its own document types
  (`websitePage`, `policyPage`, `teamMember`, `websiteSettings`), so the old site's content in the same dataset is untouched.
- Edit at `/studio` on any deployment (add the deployment's URL as a CORS origin in Sanity first).
- Every image shows its design placeholder from `/public/images` until a photo is uploaded in the Studio.
- If Sanity can't be reached, the site falls back to the approved copy in `/content`, so it always renders.
- To regenerate the Sanity seed documents from `/content`: `node --experimental-strip-types scripts/dump.mts && node scripts/build-seed.mjs`

## Still to connect
- Momence: paste the embed code into Site settings › Momence timetable embed code.
- Mailchimp: paste the waitlist form action URL into Site settings.
- Phone number: Site settings › Phone (the Call link appears once it's set).
- Launch day: set `NEXT_PUBLIC_ALLOW_INDEXING=true` and move the domain from the holding page.
