# Resume LaTeX Source

`main.tex` is the source of the resume PDF served at `/docs/PhucNguyen-Mobile-developer-resume.pdf`.

## Build and deploy

The PDF is not committed. `.github/workflows/hugo.yaml` compiles `main.tex`, copies the result to `portfolio-hugo/static/docs/`, then builds and deploys the Hugo site. Every push to `main` redeploys, so resume edits go live with the next push.

## Local build

```bash
cd resume
pdflatex main.tex
```

Or with Docker:

```bash
docker run --rm -v "$(pwd)":/workspace -w /workspace/resume ghcr.io/xu-cheng/texlive-full pdflatex main.tex
```

LaTeX auxiliary files are gitignored (see `.gitignore` in this directory).
