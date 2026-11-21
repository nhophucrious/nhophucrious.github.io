# AGENTS.md

Personal portfolio (GitHub Pages). No package manager, no tests, no linter.

## Layout
- Site = Hugo project in `portfolio-hugo/` (config `hugo.toml`, custom layouts, no theme/submodule).
- `resume/main.tex` = LaTeX resume source.
- Legacy pre-Hugo static site (root `index.html`, `assets/`, `resources/`) was deleted; recover from git history only if asked.

## Deploy
- Single workflow `.github/workflows/hugo.yaml`, runs on every push to `main`: compiles `resume/main.tex` -> copies PDF to `portfolio-hugo/static/docs/` -> `hugo --minify --gc --cleanDestinationDir` in `portfolio-hugo/` -> uploads `portfolio-hugo/public`.
- Hugo version pinned via `HUGO_VERSION` in the workflow; keep local Hugo close to it.
- The resume PDF is built in CI and gitignored. Never commit it; edit `main.tex`. Locally the `/docs/...pdf` link 404s unless you copy a built PDF into `portfolio-hugo/static/docs/`.

## Hugo
- Run from `portfolio-hugo/`: `hugo server -D` (dev), `hugo --minify` (CI build).
- `portfolio-hugo/public/` and `resources/_gen/` are gitignored build output. Never commit them. Stale files in a tracked/old `public/` previously leaked drafts to the live site.
- Static assets live in `portfolio-hugo/static/`, served at `/` (`/css/base.css`, `/images/hero.jpg`). Layouts use these absolute paths; `baseURL` is the root domain.
- Email, GitHub, LinkedIn, Twitter handle, default description/image are in `hugo.toml` `[params]`; templates read them via `site.Params.*`. Do not hard-code them in layouts.
- Archetype sets `draft = true`. Drafts are excluded from CI build; remove `draft` to publish.
- Content sections `content/blogs`, `content/projects` share `layouts/_default/list.html` and `single.html`. Home page is `layouts/index.html`. Taxonomies are disabled (`disableKinds`).
- Page `<head>` meta (title, description, OG/Twitter) is generated in `_default/baseof.html` from front matter: `title`, `summary`, `thumbnail`.

## Front-end
- No CSS/JS build step; plain files in `static/css` (`base.css` tokens/reset/buttons, `navbar.css`, `index.css` home sections + footer, `blog.css` listings/articles, `motion.css` animations, `responsive.css` breakpoints) loaded in that order from `baseof.html`. Colors/spacing/radius are CSS variables in `base.css :root`; do not hard-code hex values elsewhere.
- Header, footer, `<main>` and back-to-top button live in `baseof.html`; page layouts only define `main`. One header partial (`partials/navbar.html`) serves all pages; anchor links get a `/` prefix off the home page.
- Icons are inline SVG: `{{ partial "icon.html" "name" }}` reads `assets/icons/ui/` (Feather, stroke) or `assets/icons/brand/` (Simple Icons, filled). Unknown names fail the build. No icon font/CDN.
- Motion is CSS-first. Add `.reveal` for scroll fade-in (`data-stagger` on a parent staggers children); JS removes `.reveal` after it settles. All motion must stay disabled under `prefers-reduced-motion`. No animation libraries.
- `static/js/index.js` (vanilla) handles menu, scroll-spy, reveal, hero typewriter, read-progress bar, contact form (Formspree).
