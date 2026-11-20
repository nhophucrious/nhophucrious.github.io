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
- Static assets live in `portfolio-hugo/static/`, served at `/` (`/css/index.css`, `/images/hero.jpg`). Layouts use these absolute paths; `baseURL` is the root domain.
- Email, GitHub, LinkedIn, Twitter handle, default description/image are in `hugo.toml` `[params]`; templates read them via `site.Params.*`. Do not hard-code them in layouts.
- Archetype sets `draft = true`. Drafts are excluded from CI build; remove `draft` to publish.
- Content sections `content/blogs`, `content/projects` share `layouts/_default/list.html` and `single.html`. Home page is `layouts/index.html`. Taxonomies are disabled (`disableKinds`).
- Page `<head>` meta (title, description, OG/Twitter) is generated in `_default/baseof.html` from front matter: `title`, `summary`, `thumbnail`.
