# BSNR website redesign: context for a new chat

## What this is
A redesign of the **Bharat Sustainable Natural Rubber (BSNR)** website (https://bsnr.rubberboard.org.in/), run by the Rubber Board of India with TRST01 as the technology partner. The original site uses Bootstrap with plenty of text. The goal is a very modern, cinematic, animated site that keeps the existing content.

- **Repo:** `akshithakocherla03-design/new`, branch `claude/sweet-mccarthy-pvu3zz` (continued from `claude/magical-pasteur-owx3vy`) (the repo is otherwise an unrelated project; only the files below matter).
- **Deliverable:** ONE file, `bsnr-landing.html`. **All pages and all future changes go into this same file** (the user asked for this explicitly). Send the updated file back to the user after every change.
- The user gives feedback section by section, often with reference screenshots or screen recordings, and wants changes made directly.

## How the file works
- `<base href="https://bsnr.rubberboard.org.in/">` makes relative `assets/...` and page links resolve against the live site, so the file previews anywhere. Asset loading tries, in order: next to the file, the live site, then a **jsDelivr CDN copy pinned to a repo commit** (`https://cdn.jsdelivr.net/gh/akshithakocherla03-design/new@<commit>/assets/...`). When new assets are added: commit them first, then use that commit hash for the CDN fallback.
- **Pages inside one file:** `<main class="page" data-page="home|about|defo|risk|trace|faq|res|blog|contact|farmer|estate|dealer|manufacturer|processor">`. Routing is by hash (`ROUTES` in the script): `#bsnr-about` shows About, `#deforestation-analysis` shows Deforestation Analysis, `#risk-legality` shows Risk & Legality, `#traceability-due-diligence` shows Traceability & Due Diligence, `#eudr-faq` shows the EUDR FAQs, `#resources` shows Resources & Guides, `#blog` shows the Blog, `#contact` shows Contact, `#register-farmer` shows Farmer Registration, `#register-estate` shows Estate Registration, `#register-dealer` shows Dealer Registration, `#register-manufacturer` shows Manufacturer Registration, `#register-processor` shows Processor Registration, anything else shows Home. Links use `data-route="about|defo|risk|trace|faq|res|blog|contact|farmer|estate|dealer|manufacturer|processor|home"`. `showPage()` dispatches `pageshow:<name>` events; page entrance animations listen for these (not for clicks). Videos on hidden pages are paused, and open dropdowns close on navigation.
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
Keeps the live page's structure and wording (the user asked for all existing content and functionality to stay), styled like Deforestation. The hero uses the shared `questionPage()` (it skips the scrollytelling when a page has no `.df-scroll`).
1. **Hero:** "Risk & Legality / **Assessments**" over a dark plantation (`assets/img/risk/hero.jpg`), with the live intro paragraph and two glass shortcuts that open each tab.
2. **Role tabs** (`.rk-roles`, gliding pill): "Risk Assessment for Farmer" / "Risk Assessment for Dealer/Sub-Dealer". Each panel has copy on the left and a sticky photo on the right (`farmer.jpg`, `dealer.jpg`).
   - **Farmer:** intro, "What is covered under Farmer Risk Assessment?" (9 tiles), then **Read more** opens "What happens upon the completion of Risk Assessment?" with Low / Medium / High Risk Farmer tabs and a sliding meter. Medium has 5 points.
   - **Dealer:** intro, "What is covered under dealer/sub-dealer risk assessment?" (4 tiles), then **Read more** opens "What happens upon completion of risk assessment?" with Sub-Dealer and Main-Dealer / Manufacturer / Processor cards.
3. **General FAQs on Risk Assessment:** the live page's 9 questions, verbatim, as an accordion. Then a short **CTA**, which is new and not on the live page.

## Traceability & Due Diligence page (`#traceability-due-diligence`)
All live text is kept, apart from one typo fix: "processors, and processors" became "processors, and manufacturers". The page uses `questionPage('trace', ...)` with `tr-*` extras.
1. **Hero:** "Traceability & / **Due Diligence**" over rows of tapped trees (`assets/img/trace/hero.jpg`), with an index linking to the three sections.
2. **How Traceability is Achieved:** the live page's five steps as pinned scrollytelling, each with a large tinted number and a photo (`register`, `mapping`, `transactions`, `storage`, `certificate`).
3. **Your Responsibilities in Establishing Traceability:** a dark panel with three glass cards (Dealers/Sub-Dealers, For Processors / Manufacturers, For Exporters). Each card has a looping role clip from `assets/video/roles/` and tilts under the cursor.
4. **Due Diligence (Article 8):**
   - **Copy:** the live text, with an "Art. 8" watermark that drifts on scroll and lime highlighter sweeps on two key phrases.
   - **Three DD elements:** a cycle (`#trCycle`) where one card lights up at a time and a track fills before it loops. Hovering a card holds it.
   - **Flow** (`#trFlow`): SVG connectors measured from the nodes, so they redraw on resize and run through the documents when they stack on phones. They draw in, then carry moving lime dashes. A packet travels Exporter → Register → one document → Buyer → EU Portal, cycling through the three documents. Hovering a node lights its links and dims the rest. The panel tilts toward the cursor with a glare, and the dark and lime nodes pulse.
   - **DDS card:** a dark card with a fan of three document sheets that spreads on hover, the live portal paragraph and a Rubber Board Portal button.
5. **CTA**, which is new and not on the live page.

## EUDR FAQ page (`#eudr-faq`)
All 32 live questions and answers in the live page's 4 categories (7 / 6 / 8 / 11), word for word. The only changes are small typo fixes and one link: the live "provided here." had no link, so it now points to the EU's list of countries.
1. **Hero:** "EUDR / **FAQs**" over a latex cup close-up (`assets/img/faq/hero.jpg`), a glass search box and four category chips with counts.
2. **Body:** a sticky category menu with a live "x of 32" count and a sliding bar that follows scroll, plus an Expand all / Collapse all button. Below 1080px the menu becomes a horizontal row.
3. **Questions:** animated accordions (`.fq-item`). Each has a green accent bar, a plus that turns into a lime cross, and list items that slide in. Category headers draw an underline and spin in their icon.
4. **Search** (`#fqSearch`, "/" focuses it): matches the start of words, highlights hits, opens answers whose match is in the body, hides empty categories, shows per-category counts and has an empty state.
5. **CTA:** "Still have questions?", which is new and not on the live page.

## Resources page (`#resources`)
The live content is kept: the headline "Your Step-by-Step Guide to EUDR Compliance" and its five cards (Tutorial Videos plus four PDF guides) with their live titles, text, links and buttons. The card layout and motion follow the user's screen recording.
1. **Hero:** the headline only, centred over a path through a rubber plantation (`assets/img/res/hero.jpg`). The user asked for no sub-text or index. `data-centre` on the hero keeps the headline centred instead of gliding left.
2. **Card stack** (`#rsStack`, sticky). Each card rises over the previous one as you scroll; the earlier cards shrink, dim and peek above.
   - **Captions:** the serif title, text and button sit beside each card and alternate sides, fading in with a blur.
   - **Clips:** each card plays real footage, and only the leading card's clip plays. Tutorial Videos uses the plantation clip, the three user guides use the dealer, manufacturer and exporter role clips, and Country Classification uses the latex clip.
   - **Chips:** each card has a live chip drawn from its content: a player with a progress bar, a search bar that types questions, a checklist that ticks itself, a certificate download with a percentage, and an "India · EUDR country classification" meter that slides to Low.
   - **Dots:** progress dots sit under the cards.
3. **Scatter** (`#rsScatter`): site photos drift at different speeds around a serif "6" that counts up, with "stakeholder groups guided from registration to DDS & polygon file download".
4. **CTA:** "Watch, then get started.", which is new.

On phones the cards stack in a column; each card leads while it's in view and its caption sits below it.

## Blog page (`#blog`)
The live "All Blogs" page shows only one post, "How India is Building the World's Largest Rubber Traceability System for EUDR Compliance". Two more cards on the live page are commented out (hidden), so they are not shown here. The horizontal card layout follows the user's second screen recording.
1. **Hero:** "All / **Blogs**", headline only, centred (`data-centre`), over the article's own photo (`assets/img/blog/featured.jpg`).
2. **Featured post card:** the live listing card (title, excerpt, Read More), with the photo and a "Featured article" pill. It links to the live article page `New%20Blog%20Page%20isnr.html`.
3. **"Inside the article"** (`#blRow`, sticky). The heading is the article's subtitle, with a dark "Read the full article" button. Below it is a horizontal row of the article's 7 chapters, which slides sideways as you scroll down.
   - **Middle card:** full colour, with a "Chapter 0X · of 07" tab above and a panel below holding the chapter's opening lines (word for word) and "Read chapter".
   - **Other cards:** greyed out; clicking one brings it to the middle.
   - **Fit:** cards scale with screen height and fit down to 1000×555.
   - **Phones:** the row is a swipeable strip that snaps to each card.

Article photos (graded copies of the live article's images) are in `assets/img/blog/` (featured, farm, tapper, vessel); the other chapters reuse site images.

## Contact page (`#contact`)
The live page has only Location, Email and Phone, and no form. Those three details are kept word for word.
1. **Hero:** "Contact / **BSNR**", headline only, centred, over an aerial road through Kerala forest (`assets/img/contact/hero.jpg`).
2. **Contact panel and map:**
   - A dark panel ("Talk to the *BSNR team*") with the three details as rows. Each row has hover motion (an icon ring pulse) and actions: Open in Maps, Copy and Write for email, Copy and Call for phone.
   - A live Kottayam (IST) clock and a lime glow that follows the cursor.
   - Beside it, an embedded Google Map of the Rubber Board office. It wipes in, a custom pin drops onto it, and it turns full colour on hover. The reveal observes the grid, because the map's starting clip hides it from IntersectionObserver.
3. **"Before you write":** three quick-link cards to the EUDR FAQs, Resources and Register yourself.

## Farmer Registration page (`#register-farmer`, from Register → Farmer)
The live page is "How it works · Farmer Registration" with four tabs. Every step title, point and Register button (linking to `https://bsnrapp.rubberboard.org.in/#/farmer`) is kept word for word. The user stressed that animations matter.
1. **Hero** (`#fmTop`): compact, not the full-screen breathing hero; the user asked for a different, smaller hero so the steps stand out.
   - **Left:** the headline rises out of masks, with four step chips joined by a drawing line. The chips jump to their step.
   - **Right:** the farmer photo in an arch that wipes up, with floating "4 simple steps" and "Free for every farmer" badges.
   - **Intro:** replays on `pageshow:farmer`.
2. **Pinned journey** (`#fmSteps`, 4 × 90vh): the page's highlight, set on a dark forest panel with a big ghost step number. The scene column is wider (grid .82fr / 1.18fr).
   - **Steps column:** a progress rail fills through numbered nodes (past nodes go dark, the active one pulses lime). The active step opens with its points sliding in and its Register button. Step titles are clickable, like the live tabs.
   - **Scenes:** the right column holds a photo per step that wipes in, with a looping demo (restarted by toggling `.go` every 7s): a large sign-up form whose fields type themselves (driven by script) before the button confirms, labelled "Preview · Register on the BSNR portal" because real registration happens on the BSNR app; buyers (Dealer, Processor, Manufacturer) ticked off the pre-registered list; plot polygons drawing over the aerial photo, pins dropping and a plot checklist; a review checklist, a Declare & submit press, then the "Submitted · Rubber Board will contact you…" card.
   - **Positioning:** scenes sit inside each step and are positioned past the right edge of `.fm-list`, its containing block.
3. **Marquee:** two crossing bands (dark sans, lime serif) with the step names and "Free for every farmer". They drift and speed up with scroll velocity.
4. **"Keep these ready":** three cards (one KYC document, one land document, your plot details) that flip up in turn and tilt on hover.
5. **CTA:** "Register as a *farmer.*" with a magnetic Register button.

On phones the steps stack, each with its scene above its points, and each scene plays while it's in view.

## Estate Registration page (`#register-estate`, from Register → Estate)
Same design as Farmer, sharing one script: `regPage(name, hash)` drives both pages, scoped by `.page[data-page]` with no IDs. Live text is kept word for word, and the Register links go to `bsnrapp.rubberboard.org.in/#/estate`. There are five steps: Register, Pay One-Time Registration Fee, Map your Dealers / Processor / Manufacturer, Areas for Mapping (with the live "Declaration of Area for Mapping" and "Payment for the Declared Area" points), and Review and Submit.
- **Fee scene** (`.es-fee`, `feeDemo`): the estate area counts from 0 to 60 ha along a bar with a 50 ha marker. When it passes 50, "Under 50 ha: exempt" is struck out and "60 ha × ₹250 = ₹15,000 + GST" appears, then "Pay & continue" turns into "Fee paid".
- **Hero:** "Estate / Registration" over rows of tapped trees (`assets/img/estate/hero.jpg`), with badges "5 simple steps" and "Exempt under 50 ha".
- **Fit:** short-screen rules (`max-height:780px` and `600px`) tighten the step column so the long fee and mapping steps fit down to 1000×555. These rules apply to Farmer too.

## Dealer Registration page (`#register-dealer`, from Register → Dealer)
Uses the same `regPage()` design. The live page has three tabs (Register, Map your Farmer/Supplier, Map your Exporter/ Buyer), and their text is kept word for word, with links to `bsnrapp.rubberboard.org.in/#/dealer`. The live HTML also has two panels (London02/London03) that no tab opens, so visitors never see them; they are left out.
- **Supplier scene** (`.dl-sup`): farmers appear as "Auto-populated · mapped by Rubber Board", and a dealer and a processor as "Selected from the registered list", each ticking.
- **Match scene** (`.dl-match`): "Your buyers" and "Their suppliers" rows connect with drawing lines, then "Both sides match: transactions enabled" appears.
- The step 2 "Farmer Registration" link routes to `#register-farmer`.
- **Hero badges:** "3 simple steps" and "No fee for dealers" (from the FAQ). The "Keep these ready" cards are supplier list, buyer list and matching records.

## Manufacturer Registration page (`#register-manufacturer`, from Register → Manufacturer)
Built from the Dealer page. It has the four live steps, word for word: Register (company CIN number and contact details), Map your Farmer, Map your Supplier and Map your Exporter/Buyer. Register links go to `bsnrapp.rubberboard.org.in/#/manufacturer`.
- **Scenes:** a typing form (company name, CIN number, mobile); farmers auto-populating with "+ Add farmer"; registered dealers selected as suppliers; the two-sided buyer match.
- **Hero:** the tyre-factory photo, with "4 simple steps" and "No fee for non-exporting manufacturers" (from the FAQ).
- **Fitting long steps:** pages marked `.fm-steps.fm-long` (Estate, Dealer, Manufacturer) tighten the step column below 880px tall; Farmer only tightens below 780px. The 600px rules are prefixed with `.fm-steps` so they win over the `.fm-long` ones.

## Processor Registration page (`#register-processor`, from Register → Processor)
Built from the Manufacturer page, with the live Processor wording for its four steps (Map your Farmers; suppliers are "dealer/manufacturer" picked from "dealers/processors/manufacturer"). The hero shows the latex cup (`stats/processor.jpg`) and the step 1 scene the mixing mill (`roles/processor.jpg`); the badge reads "No fee for processors" (from the FAQ). The live Register buttons point to the old `isnrapp.rubberboard.org.in/#/processor`, but this page uses `bsnrapp.rubberboard.org.in/#/processor` like every other page. The user has been asked to confirm.

## Asset folders (in the repo; must be uploaded to the live site before going live)
- `assets/video/`: `hero-walk.*`, `rubber-plantation.*`, `latex.*` (webm, mp4, jpg poster)
- `assets/video/roles/`: estate, dealer, manufacturer, processor, exporter (mp4 and jpg)
- `assets/img/stats/`: plot, growers, dealer, processor, manufacturer, exporter
- `assets/img/about/hero.jpg`
- `assets/img/defo/`: eudr, mapping, consequences, contribute, analysis
- `assets/img/risk/`: hero, farmer, dealer
- `assets/img/trace/`: hero, register, mapping, transactions, storage, certificate
- `assets/img/faq/hero.jpg`
- `assets/img/res/hero.jpg`
- `assets/img/blog/`: featured, farm, tapper, vessel
- `assets/img/contact/hero.jpg`
- `assets/img/farmer/hero.jpg`
- `assets/img/estate/hero.jpg`
- To go live: upload `bsnr-landing.html` as the site's `index.html`, plus these asset folders.

## Pages not yet redesigned (still link to the live site)
Pricing and the other register pages (Trader, Exporters). When redesigning one, add it as a new `<main class="page" data-page="...">` with a hash route (as was done for Deforestation Analysis) and switch its menu, footer and in-page links to `data-route`.

## Working conventions used so far
- Test with Playwright (Chromium at `/opt/pw-browsers`, module at `/opt/node22/lib/node_modules/playwright`) at 1440×860, about 1000×600 and 390×844. Check for script errors and horizontal overflow; for the intro, capture frames over time.
- Keep test screenshots out of the repo (use the scratchpad).
- Commit and push after each change to `claude/sweet-mccarthy-pvu3zz`; don't open a PR unless asked.
- Reply plainly: what changed, any content written by the assistant (flag it for review), what was verified, and anything to upload before going live.
