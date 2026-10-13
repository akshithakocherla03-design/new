# BSNR website redesign: context for a new chat

## What this is
A redesign of the **Bharat Sustainable Natural Rubber (BSNR)** website (https://bsnr.rubberboard.org.in/), run by the Rubber Board of India with TRST01 as the technology partner. The original site uses Bootstrap with plenty of text. The goal is a very modern, cinematic, animated site that keeps the existing content.

- **Repo:** `akshithakocherla03-design/new`, branch `claude/sweet-mccarthy-pvu3zz` (continued from `claude/magical-pasteur-owx3vy`) (the repo is otherwise an unrelated project; only the files below matter).
- **Deliverable:** ONE file, `bsnr-landing.html`. **All pages and all future changes go into this same file** (the user asked for this explicitly). Send the updated file back to the user after every change.
- The user gives feedback section by section, often with reference screenshots or screen recordings, and wants changes made directly.

## How the file works
- `<base href="https://bsnr.rubberboard.org.in/">` makes relative `assets/...` and page links resolve against the live site, so the file previews anywhere. Asset loading tries, in order: next to the file, the live site, then a **jsDelivr CDN copy pinned to a repo commit** (`https://cdn.jsdelivr.net/gh/akshithakocherla03-design/new@<commit>/assets/...`). When new assets are added: commit them first, then use that commit hash for the CDN fallback.
- **Pages inside one file:** `<main class="page" data-page="home|about|defo|risk">`. Routing is by hash (`ROUTES` in the script): `#bsnr-about` shows About, `#deforestation-analysis` shows Deforestation Analysis, `#risk-legality` shows Risk & Legality, anything else shows Home. Links use `data-route="about|defo|risk|home"`. `showPage()` dispatches `pageshow:<name>` events; page entrance animations listen for these (not for clicks). Videos on hidden pages are paused, and open dropdowns close on navigation.
- URL helpers `localURL` / `siteURL` guard against `about:srcdoc` previews, where `new URL` would throw and stop the whole script.
- Live stats come from `POST https://bsnrapp.rubberboard.org.in/api/Farmer/GetStackholderDetails`. CORS only allows the live origin, so locally the stats show fallbacks. The result is stored in `liveStats`; `countUp()` and `fmt()` are shared helpers.
- One main `<script>` (an IIFE) holds the shared helpers `$`, `$$` and `reduce` (prefers-reduced-motion). Page-specific blocks are wrapped in `{ }`. There is no three.js any more.

## Design language
- **Colours** (CSS variables): `--ink #0b1f16`, `--forest #0e3324`, `--leaf #4baf47`, `--lime #c8f169`, `--cream #f5f3ec`, `--paper #fff`, `--muted #5d6d64`, `--ease cubic-bezier(.22,1,.36,1)`.
- **Fonts:** Manrope (sans) and Instrument Serif (italic accents, class `.serif`).
- **Look:** dark forest panels with rounded corners, real cinematic photos and videos (graded: deeper shadows, greener foliage, vignette), glass cards, lime accents, grain.
- **Motion:** blur-to-sharp word reveals, cards tilting back under the cursor, counters that count up, scroll-driven sections. `prefers-reduced-motion` is respected.
- **The user rejects anything cartoonish or 3D-rendered: always use REAL footage and photos** (free Pexels/Pixabay; credit is optional). Check that text stays readable over images, and test at laptop sizes (the user often views at about 1000×555–640).

## Home page (`data-page="home"`), top to bottom
1. **Header:** glass pill nav with dropdowns (About EUDR, Resources, Register) and a mobile sheet menu.
2. **Hero:** pinned scroll section with a real 1080p forward walk down a rubber estate road (`assets/video/hero-walk.*`, two Pexels clips joined, graded greener). Scroll drives playback (native playbackRate catch-up, not frame seeking). Four headlines change with scroll, there's a 01–04 counter, and the mouse gives strong 3D look-around (±160px, ±14°). Then an updates ticker.
3. **Initiative:** dark panel over a cinematic looping plantation video (`rubber-plantation.*`), with three cycling points, heading text and a **Watch Film** lightbox (Vimeo 1104446880).
4. **Live stats:** light frosted 3D coverflow of six cards (Plot Area, Growers, Dealer, Processor, Manufacturer, Exporters) with graded subject photos (`assets/img/stats/`), a glass panel of live numbers, hover tilt, mist transition, autoplay, swipe.
5. **About EUDR** statement (words light up on scroll).
6. **Critical aspects of EUDR compliance:** dark panel about 16:9 over real latex-dripping footage (`latex.*`). The video holds dim until hovered, then plays, zooms and moves with 3D parallax. Three glass cards (Deforestation, Risk & Legality, Traceability) with shine, chips and links.
7. **Implementation plan:** stacked sticky rows (Mapping, Training, System Setup, Next Phases) that fold to title strips. A scrambled label decodes and the text lights up.
8. **Register yourself:** role list with small real looping clips per role (`assets/video/roles/`).
9. **CTA** and **footer**.

## About BSNR page (`#bsnr-about`)
1. **Hero:** dark photo of a tapped tree (`assets/img/about/hero.jpg`) with a centred eyebrow, the headline "India's national platform for *EUDR-compliant natural rubber.*", one CTA and a floating 3D card cluster below:
   - Photo card with ticks, which tilts back under the cursor with glare.
   - "Free for every farmer" bubble.
   - Nodal-agency badge.
   - Stat card counting growers onboarded.
   - Intro: fade from dark, blur-in words, header drop. Spacing and cluster size are fitted to the screen height.
2. **Our Story:** dark panel with three cards (grower photo = challenge, lime card with Padmanabhan's shortened quote, aerial photo = response), then condensed story text below. Cards swing in, photos wipe in, words light up, hover tilt.
3. **National Recognition:** pinned section. The conference photo (`assets/img/aboutbsnr.jpg` from the live site, never cropped, 3:2) starts large and centred and slides right on scroll; the heading blurs in on the left with two fact tiles.
4. **Built in Partnership with TRST01:**
   - Big headline written in centred, breathing (scale-only), then gliding left. TRST01 is NOT italic; no green arc.
   - Two body paragraphs from the left.
   - Four counting stats (10+ countries, 200+ adoptions, 1.4M ha, 779K+ farmers) like an "Urban Stillness"-style layout.
   - Recognition and EUDR products rows.
5. **FAQ:** expanding list. Three TRST01 FAQs were left out because the source text was cut off; ask the user for them if needed.

## Deforestation Analysis page (`#deforestation-analysis`)
1. **Hero:** full-height dark forest panel over a drifting aerial plantation photo with grain.
   - Headline "Deforestation / **Analysis**" (lime): words rise from blur in the centre with a scale-only "breathe", held about 2s, then glide left (centring uses the `translate` property, not `transform`, so `scale` doesn't offset it). No arc.
   - Then the "About EUDR" label, a lead line and a glass index of five questions, plus a "Scroll to explore" cue.
   - Scrolling out lifts, fades and shrinks the hero content while the questions rise in.
2. **Questions** (pinned scrollytelling, 5 × 100vh): question, answer and facts on the left swap with blur/rise; a progress rail; the matching photo (`assets/img/defo/`) wipes in from the right.
   - Q1 EUDR rules (4 fact tiles)
   - Q2 mapping (5 steps)
   - Q3 consequences (4% fine panel)
   - Q4 contribute (Farmer / Dealer / Processor / Exporter tabs)
   - Q5 system analysis and redressal
   - Phones get a stacked version with a photo per question.
3. **CTA:** "Get your farm mapped."

## Risk & Legality Assessments page (`#risk-legality`)
Built on the Deforestation layout: same `df-*` markup and CSS, plus `rk-*` extras. The script is shared: `questionPage(name, hash)` runs the hero intro, scrollytelling, index links and tabs for both pages (scoped to each page, so no IDs are needed).
1. **Hero:** "Risk & Legality / **Assessments**" over a dark plantation with collection cups (`assets/img/risk/hero.jpg`), eyebrow "EUDR · Article 10", lead line and an index of five questions.
2. **Questions** (5 × 100vh):
   - Q1 why (Article 10, 4 fact tiles)
   - Q2 farmer coverage (9 numbered area tiles, `.rk-areas`)
   - Q3 risk rating (Low / Medium / High tabs with a sliding meter, `.rk-meter`, driven by `--t` set on `.df-body`)
   - Q4 dealer coverage (4 fact tiles)
   - Q5 after approval (Sub-dealer / Main dealer tabs)
3. **General FAQs** (9 questions, About-page FAQ style), then a **CTA**: "Know your risk rating."

## Asset folders (in the repo; must be uploaded to the live site before going live)
- `assets/video/`: `hero-walk.*`, `rubber-plantation.*`, `latex.*` (webm, mp4, jpg poster)
- `assets/video/roles/`: estate, dealer, manufacturer, processor, exporter (mp4 and jpg)
- `assets/img/stats/`: plot, growers, dealer, processor, manufacturer, exporter
- `assets/img/about/hero.jpg`
- `assets/img/defo/`: eudr, mapping, consequences, contribute, analysis
- `assets/img/risk/`: hero, why, farmer, rating, dealer, approval
- To go live: upload `bsnr-landing.html` as the site's `index.html`, plus these asset folders.

## Pages not yet redesigned (still link to the live site)
Traceability & Due Diligence, EUDR FAQ, Resources/User Guide, Blog, Pricing, Contact, register pages. When redesigning one, add it as a new `<main class="page" data-page="...">` with a hash route (as was done for Deforestation Analysis) and switch its menu, footer and in-page links to `data-route`.

## Working conventions used so far
- Test with Playwright (Chromium at `/opt/pw-browsers`, module at `/opt/node22/lib/node_modules/playwright`) at 1440×860, about 1000×600 and 390×844. Check for script errors and horizontal overflow; for the intro, capture frames over time.
- Keep test screenshots out of the repo (use the scratchpad).
- Commit and push after each change to `claude/sweet-mccarthy-pvu3zz`; don't open a PR unless asked.
- Reply plainly: what changed, any content written by the assistant (flag it for review), what was verified, and anything to upload before going live.
