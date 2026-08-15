# Dream Media — Website

Marketing site for **Dream Media** (دريم ميديا), a Baghdad-based media, marketing
and commercials agency. Bilingual (Arabic / English), dark and light themes, and a
GSAP-driven motion layer.

🔗 **Live:** _add your Vercel URL here once deployed_

---

## Features

- **Bilingual AR / EN** with full RTL layout switching, remembered via `localStorage`
- **Dark / light themes**, also remembered between visits
- **GSAP motion layer** — animated preloader, kinetic split-text hero, scroll-triggered
  reveals, magnetic buttons, a custom cursor, and 3D card tilt
- **Lenis smooth scrolling**
- **Scroll-reactive marquees** — the capability strip and partner logos change speed and
  direction with your scroll
- **Pinned feature stepper** — the section locks to the viewport and steps through the
  three service cards as you scroll (desktop only)
- **Service hover backdrops** — hovering a service card reveals a matching photo behind
  the grid
- **Partner logo marquee** — the combined partner sheet is sliced into individual tiles
  with CSS sprites; grayscale by default, full colour on hover
- Responsive down to 375px, with a working mobile drawer nav

## Tech

Plain HTML, CSS and JavaScript — no build step, no framework, no `node_modules`.
Everything third-party loads from a CDN:

| Library | Purpose |
| --- | --- |
| [GSAP](https://gsap.com) + ScrollTrigger + SplitText | Animation |
| [Lenis](https://github.com/darkroomengineering/lenis) | Smooth scrolling |
| [Swiper](https://swiperjs.com) | Projects slider |
| [Phosphor Icons](https://phosphoricons.com) | Icons |
| Google Fonts (DM Sans) | Typography |

## Project structure

```
.
├── index.html        # All page markup
├── staily.css        # Design system + all component styles
├── diigeital.css     # Font declarations
├── scrapt.js         # Translations, theme/lang toggles, slider, lightbox, nav
├── motion.js         # GSAP motion layer (preloader, reveals, cursor, marquees)
├── images/           # Logos, service icons, project photos
├── vedoi/            # Reel videos + company profile PDF
└── كتاب/              # Company brochure (PDF)
```

## Running locally

No install needed — it's a static site. Serve the folder over HTTP:

```bash
npx http-server . -p 8080 -c-1
```

Then open <http://localhost:8080>.

> **Don't** open `index.html` directly via `file://`. Browsers restrict local files, so
> the scripts and video autoplay behave inconsistently.

## Deploying

The site is static, so Vercel needs no build configuration — `vercel.json` just sets
sensible caching headers. Any push to `main` triggers an automatic redeploy.

## Design system

Colours live as CSS custom properties at the top of `staily.css`. The palette is derived
from the Dream Media brand:

| Token | Value | Notes |
| --- | --- | --- |
| `--accent-navy` | `hsl(213, 85%, 24%)` | Sampled from the logo (`#083060`) |
| `--accent-blue` | `hsl(210, 100%, 56%)` | Electric blue, the primary accent |
| `--accent-sky` | `hsl(196, 95%, 62%)` | Gradient end / secondary |
| `--accent-gold` | `hsl(42, 90%, 58%)` | Used sparingly for highlights |
| `--bg-0` … `--bg-3` | navy-tinted darks | Surface ramp |

Changing a token updates the whole site — including the light theme, which overrides the
same variables under `html[data-theme="light"]`.

## Accessibility & performance notes

- Honours `prefers-reduced-motion`: the preloader, idle marquee drift and entrance
  animations are skipped. Scroll-linked motion still runs, since it's user-initiated.
- The custom cursor and magnetic/tilt effects are disabled on touch devices.
- **Known issue:** six videos (three reels, three footer Instagram cards) autoplay
  simultaneously and are never paused off-screen, which makes scrolling heavier than it
  should be. Worth fixing.

## Content TODO

- Replace the placeholder service/feature backdrop photos — several currently reuse the
  same event photography. Printing, Design & Creatives and Business Development need real
  imagery.
- Supply individual partner logos (SVG, or PNG with transparency). They're currently
  sliced from one combined JPEG, which caps quality and forces the white chip background.
- Some `alt` text is still generic.

---

© Dream Media. All rights reserved.
