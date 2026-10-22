# Knowledge Graph Playbook — Umair Hoque Chowdhury

Everything here is **invisible on the rendered page**. The `<body>` of `index.html` is
byte-for-byte identical to your live file; only `<head>` changed. (View-source still shows it —
that's how Google reads it. Nothing can be visible to Google and hidden from view-source.)

---

## 1. What's in the package

```
index.html                    ← overwrite yours (head-only change, body untouched)
press.html                    ← NEW, unlinked media-kit page (not in nav/footer)
sitemap.xml                   ← NEW, URL + image sitemap
robots.txt                    ← NEW (overwrite if you already have one)
kg/README.md                  ← NEW, photo instructions (steps 1-6)
kg/entity.jsonld              ← NEW, reference copy of the schema
kg/gallery.jsonld             ← NEW, reference copy of the gallery schema
kg/umair-01.png … umair-12.png  ← YOU add these (see kg/README.md)
KNOWLEDGE-GRAPH-PLAYBOOK.md   ← this file (safe to keep in repo or delete)
```

### What the entity layer declares
| Field | Value |
|---|---|
| Name / alternates | Umair Hoque Chowdhury · Umair · Umairr · Umair Chowdhury · UHC · Umair Hoque |
| **Subtitle** (`disambiguatingDescription`) | **Digital Creator & Artist** |
| Born | 2008-03-23 · male · nationality Bangladesh |
| Based | New York City (Queens, NY) |
| Email | contact@umairhoquechowdhury.site |
| Instagram | `_.uma._.random._` (primary) + `umairrawrr` |
| Music identity (`sameAs` + `rel="me"`) | Spotify artist `53u8cUTzLvbmctIm72ny9B` · Apple Music artist `1798383993` · iHeart artist `45885504` · YouTube Music · Amazon Music · JioSaavn |
| Visual | Visual Artist · Editorial Model · Filmmaker · Influencer · colleague Waimeer Chowdhury |
| Development | visual core programmer of umairhoquechowdhury.site & nghsians.com · Chit-Shat (SoftwareApplication, "In development", by request) · Graphic Designer · VFX Specialist · Video Editor · 3D Modeler · Drone expert |
| Production | Musician (MusicAlbum + MusicRecording "Tomar Golpo", 2025-02-20, 2:54, Pop, with Jahi Sajid, cover art, 5 ListenAction targets) · Cinematographer · Photographer · Visualist · Creative Director · Producer |
| Academics | "high-achieving student leader on track for Fall 2027 college enrollment" (description only) |
| Photos | portrait + og image + 12-image ImageGallery (`/kg/`) |

### Deliberately excluded (per your instructions)
Schools, Brandstart / BHALO / English Track, certificates & awards, GitHub, YouTube channel,
the gmail address, the insurance credential from the generic guide.

---

## 2. Deploy — exact order

1. **Photos first.** Do `kg/README.md` steps 1–3 and drop `umair-01.png … umair-12.png` into `kg/`.
   A schema pointing at 404 images lowers trust — don't deploy the gallery without them.
2. Unzip `umair-knowledge-graph.zip` into the **root** of your GitHub repo (same level as your
   current `index.html`, `styles.css`, `script.js`). Say **yes** to overwrite `index.html`. Commit + push.
3. Wait for the deploy, then in an incognito window:
   - `https://umairhoquechowdhury.site/` → looks exactly the same as before ✔
   - `https://umairhoquechowdhury.site/sitemap.xml` → XML renders ✔
   - `https://umairhoquechowdhury.site/press.html` → all 12 photos load ✔
4. Validate:
   - https://search.google.com/test/rich-results → paste your homepage URL → expect **ProfilePage** +
     **Image metadata** detected, 0 errors.
   - https://validator.schema.org → 0 errors (warnings about optional fields are fine).
5. **Google Search Console** (search.google.com/search-console, free):
   add property `umairhoquechowdhury.site` (Domain type; verify via a DNS TXT record at your
   registrar) → **Sitemaps** → submit `sitemap.xml` → **URL Inspection** → request indexing
   for `/` and `/press.html`.
6. **Bing Webmaster Tools** → "Import from Google Search Console" (one click; Bing powers
   DuckDuckGo and Copilot panels).
7. Set up the mailbox `contact@umairhoquechowdhury.site` (Cloudflare Email Routing / your registrar's
   email forwarding → gmail) **before** the site is re-crawled, so the declared email actually works.

---

## 3. Reciprocal links — the part that makes Google believe it

Schema is a *claim*. Google trusts a claim when the other side links back with the **exact same
name string** and your domain.

| Where | Do this |
|---|---|
| **Instagram `_.uma._.random._`** | Edit profile → **Website** = `https://umairhoquechowdhury.site` · **Name** = `Umair Hoque Chowdhury` (keep the handle) · category stays **Digital creator**. This is the single most important link. |
| **Instagram `umairrawrr`** | Same website link, or bio "→ @_.uma._.random._". If you've abandoned it, tell me and I'll drop it from `sameAs`. |
| **Spotify for Artists** (artists.spotify.com) | Claim artist `53u8cUTzLvbmctIm72ny9B` → add profile photos, set bio first line to "Umair Hoque Chowdhury is a Digital Creator & Artist based in New York City." and link Instagram. (Your current bio there already says *Digital creator, Public figure…* — good, keep that wording consistent.) |
| **Apple Music for Artists** (artists.apple.com) | Claim artist `1798383993` → add the same photo + bio. Claimed profiles are high-trust entity sources and feed Siri/Apple's own knowledge data. |
| **Distributor (CD Baby per iHeart metadata)** | Artist profile website = your domain. For every future release keep the artist name **exactly** "Umair Hoque Chowdhury". |
| **nghsians.com footer** | `<a href="https://umairhoquechowdhury.site" rel="me author">Built by Umair Hoque Chowdhury</a>` |
| **Waimeer Chowdhury's portfolio** | Where it credits "(Umair)", make it `<a href="https://umairhoquechowdhury.site">Umair Hoque Chowdhury</a>` |
| **Wikidata** (www.wikidata.org — highest-impact single step) | Create item: label *Umair Hoque Chowdhury*; description *Bangladeshi-American digital creator and artist*; instance of → human; sex or gender → male; date of birth → 23 March 2008; occupation → digital creator, filmmaker, model, musician; official website → your domain; Instagram username → `_.uma._.random._`; Spotify artist ID → `53u8cUTzLvbmctIm72ny9B`; Apple Music artist ID → `1798383993`; iHeartRadio artist ID → `45885504`. Add a **reference** on each statement (Apple Music page, Spotify page, your site). Wikidata is the backbone of Google's Knowledge Graph. |
| **MusicBrainz** (musicbrainz.org) | Add artist *Umair Hoque Chowdhury* (type Person, born 2008-03-23, area New York) + release *Tomar Golpo* (2025-02-20, single, with Jahi Sajid) + URL relationships to Spotify, Apple Music, your website, Instagram. Google ingests MusicBrainz for music entities. |

---

## 4. When the panel appears

Search your full name in incognito. When a panel shows, click **"Claim this knowledge panel"**
→ verify via your Instagram (or Spotify/Apple) → you can then **suggest edits** to the subtitle,
featured image and social links directly, and Google weighs your site's schema even more.

## 5. Honest expectations

- No one can force a panel; this is the complete, correct toolkit. Typical timing after
  Search Console indexing: **weeks to a few months**, driven by how often the open web
  mentions the exact string "Umair Hoque Chowdhury".
- Birthdate shows only with ≥ 2 trusted sources → put it on Wikidata with this site as reference.
- Photos show only after Google Images indexes them → upload the 12, keep `press.html`, submit the sitemap.
- Keep the name spelled identically everywhere; nicknames are already declared as `alternateName`.

## 6. Updating later

Edit `kg/entity.jsonld` → validate → paste into the `#kg-entity` `<script>` in `index.html`
(escape `</` as `<\/`) → bump `dateModified` and `<lastmod>` in `sitemap.xml`. Or send me the
change (new release, new link) and I'll regenerate the package.
