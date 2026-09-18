# Obiianuju-Nnenna Media Foundation Website

A static, multi-page website for the Obiianuju-Nnenna Media (ONM) Foundation, built to the
brand book (colours, Bahnschrift/Poppins pairing) and the PRD. Ready to deploy to Vercel
as-is, with no build step required.

## 1. Where to put your image assets (IMPORTANT)

Image paths are relative, so the folder structure below must be preserved **exactly** in
your GitHub repo, at the project root, next to `index.html`. Filenames are matched
exactly, including the intentional typos in the conference logo and flyer filenames.

```
/images
├── onmfoundation_logo.png                    main Foundation logo
├── hero_onmfoundation.jpg                    homepage hero background
├── about_us_page_hero.jpg                    About page header       ← NEW
├── our_work_page_hero.jpg                    Our Work page header    ← NEW
├── Impact_image.jpg                          Impact page header      ← NEW
├── get_involved.jpg                          Get Involved header     ← NEW
├── news_and_media_page.jpg                   News & Media header     ← NEW
├── contact_page.webp                         Contact page header     ← NEW
├── mama_nnena.png                            Mama Nnenna (Our Story + homepage story card)
├── riamagazinelogo.jpg                       RIA Magazine Africa logo  ← NEW
├── board/
│   ├── obianujuasika.jpg
│   ├── evaristasika.jpg
│   ├── emmanuelasika.png
│   └── joanaidakwo.jpg                       Dr. Joana Idakwo        ← NEW
├── team/
│   ├── vivianachu.jpg
│   └── Oriyomi-Olowolagba.jpg                                        ← NEW
├── news/                                     ← NEW folder
│   ├── omn_Foundation_GSS_Karu.webp          menstrual hygiene article thumbnail
│   └── OMN_TRAINS_DIGITAL_LITERACY.webp      digital literacy article thumbnail
├── gallery/                                  (Impact page gallery + homepage)
│   ├── 0.webp                    homepage "Community Training Programmes" card
│   ├── 1.webp                    gallery tile: Conferences
│   ├── 5.webp                    gallery tile: School Programmes
│   ├── Community-Outreach.webp   gallery tile: Community Outreach
│   ├── Health-Programmes.webp    gallery tile: Health Programmes
│   ├── Leadership-Sessions.JPG   gallery tile: Leadership Sessions
│   ├── Training.jpeg             gallery tile: Training
│   ├── Womens-event.webp         gallery tile: Women's Events
│   └── Digital-Litaracy.jpg      gallery tile: Digital Literacy
├── events/                                   ← NEW folder
│   └── wellness-chronicles.jpg               The Wellness Chronicles flyer
├── sdg/                                      ← NEW folder (see section 5)
│   ├── sdggoal3.png   sdggoal4.png   sdggoal5.png
│   └── sdggoal8.png   sdggoal17.png
└── conference/
    ├── the-resilientt-woman-logo.jpg
    ├── resilient-women-conferennce-flyer.jpg
    ├── TRW.jpg                               dress code graphic  ← NEW
    └── speakers/
        ├── lilianochemba.jpg
        ├── Mayo-Okunnu.jpg
        ├── favouremmanuel.jpg                ← NEW
        ├── oloriadewoleflex.jpg              ← NEW
        ├── drsarahamana.jpg                  ← NEW
        └── ToingrickByanyiko.jpg             ← NEW
```

Every image placeholder tile on the site has now been replaced with a real photograph
slot. `2.jpg`, `6.webp`, `7.webp`, `8.jpeg` and `9.jpeg` are no longer referenced after
the gallery reshuffle, so you can drop them.

Filenames are case-sensitive on Vercel. `Leadership-Sessions.JPG` uses a capital
extension and `Digital-Litaracy.jpg` keeps the spelling exactly as supplied. Copy them
across verbatim.

## 2. Deploying to Vercel

1. Push this whole folder to a GitHub repository, keeping the `images/`, `css/` and `js/`
   folders at the repo root.
2. In Vercel choose **New Project → Import** and select your repo.
3. Framework Preset: **Other**. No build command and no output directory are needed.
4. Deploy. No environment variables are required.

## 3. Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage, with Stories, Upcoming Events and the Spotify wellness playlist |
| `about.html` | Our Story, Vision/Mission/Values, SDG goal tiles, Board and Team |
| `our-work.html` | The 8 programme areas |
| `impact.html` | Stats, photo gallery, reports |
| `get-involved.html` | Donate, Volunteer, Partner |
| `resilient-women.html` | Conference landing page with countdown, speaker carousel, five ticket tiers, registration and FAQ |
| `news.html` | Press coverage, RIA Magazine Africa, wellness playlist |
| `contact.html` | Contact form, office info, map |

## 4. What changed in this revision

1. The foundation's name now reads **Obiianuju-Nnenna Media Foundation** in every title,
   header, footer, meta description and body paragraph across all eight pages. The
   founder is named **Obiianuju Asika** and her company **Obiianuju Media Limited (OML)**
   throughout. Note that the photo filename stays `images/board/obianujuasika.jpg`,
   spelled exactly as supplied, so do not rename that file.
2. `partners@onmfoundation.org` has been replaced everywhere with
   **`admin@onmfoundation.org`**.
3. All long dashes have been removed from the site. The decorative dash that sat before
   every eyebrow label (the line before "WHO WE ARE" and every other section label) has
   been deleted from `css/style.css` and `css/resilient.css`, and every sentence that
   used a dash has been rewritten into natural prose.
4. The WhatsApp community link is now
   `https://chat.whatsapp.com/E9bC8LtakeX8GZGqpjYWFS` in the footer, the floating button,
   the mobile bar and every in-body mention.
5. The Global Alignment section on the About page now shows clickable SDG goal tiles that
   link to the matching goal page on the UN website. See section 5 below.
6. Instagram handle **@theresilientwomanafrica** appears as a visible coloured pill on the
   homepage, Our Work, News, Get Involved, Contact and the conference page.
7. Footer social buttons are now full-colour brand logos (WhatsApp green, Instagram
   gradient) instead of the old "W" and "IG" initials.
8. RIA Magazine placeholders now use `images/riamagazinelogo.jpg`.
9. The Wellness Chronicles appears as an upcoming event for 1 November 2026 at 5:00 PM.
10. Conference ticket tiers are Online ₦5,000, Regular ₦15,000, Individual VIP ₦35,000,
    and Vendors ₦50,000. Every "Make Purchase" button points to
    `https://selar.com/033882d1a2`.
11. Four new speakers have been added and all six now sit in a sliding carousel with
    arrows, dots, swipe support and expandable bios.
12. A click-to-play YouTube carousel of seven films sits on the News & Media page at
    `#watch`, with a card on the homepage pointing to it. Nothing loads from YouTube
    until a visitor presses play, so the page stays light on mobile data. Video titles
    are placeholders, see section 10.
13. Press thumbnails and homepage story cards use the supplied photography.
14. The Impact gallery is populated with the eight supplied photographs.

## 5. SDG icons

The five goal tiles on `about.html` expect the official UN icon files in `images/sdg/`.
Download the icon pack from <https://sdgs.un.org/goals> (the Communications Materials
section) and save the five PNGs as `sdggoal3.png`, `sdggoal4.png`, `sdggoal5.png`,
`sdggoal8.png` and `sdggoal17.png`. Filenames are case-sensitive on Vercel, so keep them
lowercase exactly as written.

If a file is missing, that tile falls back automatically to a branded colour plate in the
official goal colour showing the goal number and name, so the section never shows a
broken image. The icons remain the property of the United Nations.

## 6. Ambient motion background

The static tiled leaf pattern behind the hero, promo strip, page headers and the
Resilient Woman sections is drawn by `js/ambient-bg.js`, a small dependency-free canvas
layer (`<canvas class="ambient-canvas" data-theme="navy|pink|cream">`) that draws slow
drifting colour fields plus a parallax dust layer responding to pointer movement. It:

- resizes responsively with the section it sits in;
- runs on a single shared `requestAnimationFrame` loop, pauses when a canvas scrolls out
  of view and when the browser tab is hidden;
- falls back to one static frame when the visitor has `prefers-reduced-motion: reduce`;
- uses only brand colours per `data-theme`.

To add it to a new section, wrap it in a positioned container
(`position:relative; overflow:hidden`) and drop in
`<canvas class="ambient-canvas" data-theme="navy" aria-hidden="true"></canvas>` as the
first child.

## 7. Notes on typography

The brand book specifies **Bahnschrift** (primary) and **Poppins** (secondary). Bahnschrift
is a Windows-licensed system font and is not distributable via web font services, so this
build pairs **Space Grotesk** for headlines with **Poppins** for body copy. If you have a
licensed web-font version of Bahnschrift, swap the `--display` font stack in
`css/style.css`.

## 8. Forms

All forms (newsletter, volunteer, partner, contact, conference registration) submit
statically with a client-side confirmation message. No backend is wired up. Connect them
to your form handler of choice (Formspree, a serverless function, or your CRM) by updating
the `<form>` `action` and `method` attributes and removing the `data-static-form` and
`data-rw-form` interceptors in `js/main.js` and `js/countdown.js`.

Conference ticket payment is handled entirely by Selar, so the registration forms only
capture attendee details.

## 9. Key links already wired in

- Donate: `https://selar.com/8y017u`
- Conference tickets: `https://selar.com/033882d1a2`
- WhatsApp Community: `https://chat.whatsapp.com/E9bC8LtakeX8GZGqpjYWFS`
- RIA Magazine Africa on Instagram: `https://www.instagram.com/riamagazineafrica/`
- The Resilient Woman Africa on Instagram: `https://www.instagram.com/theresilientwomanafrica`
- Wellness playlist on Spotify: `https://open.spotify.com/album/3CMFBOBe6o1LbdmaDxgeZl`
- Press: the two Leadership.ng articles on `news.html`

## 10. Video carousel and the wellness playlist

The seven YouTube films live on `news.html` in the `#watch` section. Each card is
generated from a `data-yt` attribute holding the video ID, so adding or removing a film
means copying one `<article class="vid-card">` block and changing the ID in two places
(the `data-yt` attribute and the two YouTube URLs inside it).

Titles currently read "Foundation Video 1" through "Foundation Video 7". Replace the text
inside each `<h4>` with the real video title, and update the matching `aria-label` on the
play button in the same card so screen readers announce the same thing.

The Spotify playlist is a placeholder. Every "Listen to our Wellness Playlist" button
points at `https://open.spotify.com/` for now. Once your playlist is live, update
`SPOTIFY_PAGE` wherever it appears: the homepage Watch & Listen card and the playlist
section on `news.html`. A find-and-replace on `https://open.spotify.com/` across both
files will catch all of them.
