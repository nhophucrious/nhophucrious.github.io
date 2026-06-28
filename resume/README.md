# Resume LaTeX Source

This directory contains the LaTeX source code for the resume PDF that is automatically built and deployed via GitHub Actions.

## Structure

- `main.tex` - The main resume LaTeX file

## Automated Build

Every time changes are pushed to the `resume/` directory on the main branch:

1. GitHub Actions automatically compiles `main.tex` to PDF
2. The generated PDF is copied to `assets/docs/PhucNguyen-Mobile-developer-resume.pdf`
3. The PDF is committed back to the repository
4. The website download button automatically serves the latest version

## Manual Build

To build locally, you need a LaTeX distribution installed:

### macOS
```bash
brew install --cask mactex
cd resume
pdflatex main.tex
```

### Linux
```bash
sudo apt-get install texlive-full
cd resume
pdflatex main.tex
```

### Docker (Recommended for consistency)
```bash
docker run --rm -v $(pwd):/workspace -w /workspace/resume ghcr.io/xu-cheng/texlive-full pdflatex main.tex
```

## Editing the Resume

1. Edit `main.tex` with your content
2. Commit and push to main branch
3. GitHub Actions will automatically build and deploy the PDF
4. Check the "Actions" tab on GitHub to monitor the build

## Manual Trigger

You can also manually trigger the build from the GitHub Actions tab without making changes to the resume files.
