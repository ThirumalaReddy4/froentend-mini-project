# Thirumala Reddy — 3D Developer Portfolio (Plain HTML/CSS/JS)

No npm, no build step, no install. Pure HTML, CSS, and JavaScript, with Three.js
loaded from a CDN. The 3D scene works the same way as the React version: drag to
orbit, scroll to zoom, click a glowing node to jump to that section.

## Run it

Just open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari).

**Note:** because this uses JavaScript modules (`<script type="module">`), some
browsers block module imports when opening a file directly via `file://`. If the
3D scene or content doesn't load when double-clicking `index.html`, serve the
folder locally instead — pick whichever you have:

- **VS Code**: install the "Live Server" extension, right-click `index.html` →
  "Open with Live Server".
- **Python** (already on most systems): open a terminal in this folder and run
  `python -m http.server 8000`, then visit `http://localhost:8000`.
- **Node** (if you have it): `npx serve .` then open the printed URL.

## Deploy it

This is a fully static site — drag the whole folder onto Netlify, Vercel,
GitHub Pages, or any static host. Nothing needs to be built or compiled.

## Customize your content

Everything personal lives in **`js/data.js`** — you don't need to touch HTML or
the 3D scene code to update your info. Look for anything wrapped in `[ADD ...]`
and replace it:

- `contact` — email, phone, LeetCode. Any field left blank is automatically
  hidden from the public Contact section.
- `RESUME_URL` — drop your resume PDF into `assets/resume.pdf` and set
  `RESUME_URL = '/assets/resume.pdf'`.
- `education` — fill in the two `[ADD ...]` placeholders (board name + years).
- `projects` — currently empty on purpose since none are finished yet. Add
  entries as you ship real projects and the "coming soon" state switches to
  project cards automatically.
- `achievements`, `currentlyLearning`, `skillGroups`, `dsaTopics` — edit freely.

## A couple of things worth double-checking

- Your LinkedIn URL was typed as `liankedin.com` — I corrected it to
  `linkedin.com` in `contact.linkedin`. Please verify the full URL is exactly right.
- No projects, resume file, email, or phone were provided, so those sections
  show honest "add this" placeholders instead of invented content.

## Structure

```
index.html          all sections/markup
css/style.css        design tokens + layout
js/data.js           ← all editable content lives here
js/scene.js           Three.js 3D scene (the core interactive experience)
js/main.js            renders sections, nav, animations, form handling
assets/               put resume.pdf or images here
```

## Notes on the 3D scene

- Built with Three.js (loaded via CDN import map, no build tooling needed) plus
  its `OrbitControls` and `CSS2DRenderer` addons for the floating node labels.
- Zoom is clamped and panning disabled to keep the scene focused.
- On mobile the node radius shrinks slightly and pixel ratio is capped for
  smoother performance.
- If WebGL isn't available, a static grid of the same section buttons is shown
  instead so the site is never unusable.
