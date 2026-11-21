+++
date = '2026-11-21T14:54:52+07:00'
draft = true
title = 'Generate A Latex Résumé with GitHub Actions'
summary = 'Quick overview of how I solved the download-something problem for my portfolio.'
+++

## What it was back then
It's a standard thing for a portfolio or a personal website to have call-to-action buttons, usually to download something. In my case, it's my résumé PDF.

The initial process posed serious logistical challenges: I'd have to do something over at `Overleaf`, download the résumé's PDF, and then put it here as a static file for downloads. Paired with my micro-surgery-habit-of-résumé-editing, guess what happened when I realised *"I should have put something here instead"*? Consequently, everything quickly became tiring and frustrating.

I'm also no fan of using Google Drive or anything like that to host my portfolio. Just a personal preference, I simply don't like it. But it'd be the same anyway with having to replace the hyperlink that leads to a new file, a new image, or whatever.

## Taking something from work home
One thing **I learnt at YQueue** was the use of GitHub Actions for CI/CD. Don't get me wrong, this site is sometimes a pain in the butt to use given recent downtimes, but you gotta use what's free and available. The idea is simple: Why do I have to manually bring stuff over from Overleaf to here where I can have the system do it for me? It's a no-brainer to use Actions given this site being a `github.io` site as well.

You can find my full workflow file [here](https://github.com/nhophucrious/nhophucrious.github.io/blob/main/.github/workflows/hugo.yaml). Here is a snippet that I'm intending to share in this conversation:

```yaml
name: Deploy Hugo site to Pages

# yaddy yadda yaddo Victor Hugo

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Compile resume PDF
        uses: xu-cheng/latex-action@v3
        with:
          root_file: main.tex
          working_directory: resume

      - name: Copy resume PDF into static assets
        run: |
          mkdir -p portfolio-hugo/static/docs
          cp resume/main.pdf portfolio-hugo/static/docs/PhucNguyen-Mobile-developer-resume.pdf
```

As you can see, it's quite simple: build out my `main.tex` file and then copy the result to somewhere the Download button references.

## Takeaways
This is no world-altering genius, but I'm more than happy that I could apply something I learnt on the job for my own good.

Furthermore, given `Overleaf`'s greed in their quota: initially good enough to attract and make users depend on them to limiting it so that no one escapes, I think this is generally a good approach nonetheless.

I can modify my Latex file here and have it published quite easily. I can also be sure that my intended layout is exactly what is gonna be produced by the action.

So, until next time, have a great day!
