# /kg/ — Knowledge-panel photo folder  (READ THIS FIRST)

**Where do the photos go?**  →  Right here, in this `kg/` folder, in your GitHub repo.
When the repo deploys, they become `https://umairhoquechowdhury.site/kg/umair-01.png` etc.,
which is exactly what the schema, the image sitemap and `press.html` already point to.

---

## Why you (not Google) have to move the photos

Google does not pull a knowledge-panel carousel from Instagram posts. Instagram blocks
crawlers and serves images from CDN URLs that expire. The carousel is built from images
Google has **indexed from crawlable pages on the open web** and can confidently attach to
the entity "Umair Hoque Chowdhury". The strongest possible place for that is your own
domain, with your name in the filename, alt text, caption, image sitemap, ImageObject
schema and IPTC metadata — all of which is wired up. You only move the files.

---

## STEP 1 — Get the originals out of Instagram (5 min)

Option A — quick (per post):
1. Open Instagram on desktop → your profile → open a post → `⋯` → there is no download,
   so use the original file from your phone/camera roll or editing software instead.
   **Never use screenshots** (low-res + Instagram UI baked in).

Option B — bulk (all posts & reels in original quality):
1. Instagram app → Profile → `☰` → **Your activity** → **Download your information**
   → **Download or transfer information** → choose your account → **Some of your information**
   → tick **Posts** and **Reels** → **Download to device** → format **HTML**, media quality **High**,
   date range **All time** → **Create files**.
2. Instagram emails a ZIP (minutes to a few hours). Unzip → `media/posts/…` has the full-res originals,
   `media/reels/…` has MP4s.
3. For reels, grab a frame: open the MP4 in any player, pause on the best frame →
   screenshot at full resolution **or** export a still from DaVinci Resolve / Premiere (better).

Pick your **12 strongest / most popular** images (highest likes/saves, best lighting,
face clearly visible for at least 6 of them — Google's face-matching helps merge them
into one entity).

## STEP 2 — Prepare the files (10 min)

| Rule | Why |
|---|---|
| Format **PNG** (`.png`, lowercase) | matches schema + sitemap — every reference expects `.png` |
| Size **1080×1350** (4:5) or **1080×1080**; longest side ≥ 1000 px | Google prefers large images (`max-image-preview:large` is set) |
| Aim **≤ 1–2 MB** each (PNG is larger than JPG — that is OK; just avoid 10 MB+ files) | fast crawl |
| Filenames **exactly** `umair-01.png` … `umair-12.png` | every reference is already written for these names |
| No borders, no watermark text over the face | cleaner for face-matching |

Slot guide (captions are already in the schema; swap content freely, it's only a hint):

| File | Suggested content |
|---|---|
| `umair-01.png` | **Your single best portrait — becomes the lead image** |
| `umair-02.png` | on-set filmmaking |
| `umair-03.png` | cinematography / camera work |
| `umair-04.png` | editorial modeling |
| `umair-05.png` | drone / aerial photography |
| `umair-06.png` | behind the scenes production |
| `umair-07.png` | visual artist portrait |
| `umair-08.png` | creative direction |
| `umair-09.png` | studio portrait |
| `umair-10.png` | street editorial |
| `umair-11.png` | Tomar Golpo release visual / cover |
| `umair-12.png` | photography / visual work |

Fewer than 12? Fine — but then **delete** the unused entries in three places so nothing 404s:
`index.html` → `kg-gallery` script → the `ImageObject` for that number;
`sitemap.xml` → the two `<image:image>` blocks for that number;
`press.html` → the `<figure>` for that number.

## STEP 3 — Stamp your name INTO the files (optional, 2 min, strong signal)

Google reads IPTC/XMP `Creator` / `Credit` / `Copyright` inside the image file (works for PNG too) for image attribution.

Photoshop: File → File Info → Author: `Umair Hoque Chowdhury`, Copyright: `© 2026 Umair Hoque Chowdhury`.

Or with the free `exiftool` (Mac: `brew install exiftool`, Win: exiftool.org):

    exiftool -overwrite_original -Artist="Umair Hoque Chowdhury" -Creator="Umair Hoque Chowdhury" \
      -Credit="Umair Hoque Chowdhury" -Copyright="© 2026 Umair Hoque Chowdhury" \
      -By-line="Umair Hoque Chowdhury" -Description="Umair Hoque Chowdhury — Digital Creator & Artist" umair-*.png

## STEP 4 — Put them in the repo

GitHub website: open your repo → folder `kg` → **Add file → Upload files** → drag the 12 PNGs
→ **Commit changes**.  (Or `git add kg/*.png && git commit -m "kg photos" && git push`.)

## STEP 5 — Confirm they're live

Open `https://umairhoquechowdhury.site/kg/umair-01.png` and
`https://umairhoquechowdhury.site/press.html` in an incognito window. All 12 must load.

## STEP 6 — Tell Google

Google Search Console → **Sitemaps** → submit `sitemap.xml` →
**URL Inspection** → paste `https://umairhoquechowdhury.site/press.html` → **Request indexing**
(do the same for `https://umairhoquechowdhury.site/`). Images usually appear in Google Images
within 1–4 weeks; the panel carousel follows once the entity itself exists.

---

Reference copies: `entity.jsonld` (the `#kg-entity` graph) and `gallery.jsonld` (the `#kg-gallery`
block) — paste into https://validator.schema.org to test any future edits.
