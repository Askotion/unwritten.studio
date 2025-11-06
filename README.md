# Unwritten.Studio

Main website for Unwritten Studio GmbH – AI-first content platform.

**Live Site**: [unwritten.studio](https://unwritten.studio)

## Overview

The corporate website for Unwritten Studio, showcasing our AI-powered microsites and services. Built with Hugo for performance and TailwindCSS for modern styling.

## Tech Stack

- **Static Site Generator**: Hugo v0.123.7+ (extended)
- **CSS Framework**: TailwindCSS 3.x
- **Theme**: Custom (forked from zeon-studio/hugoplate)
- **Deployment**: Cloudflare Pages (auto-deploy from `main`)
- **Build Tools**: PostCSS, PurgeCSS, Prettier

## Project Structure

```
hugo/
├── assets/           # Source files (CSS, JS, images)
├── content/english/  # Markdown content
├── data/             # Data files
├── static/           # Static assets (robots.txt, llms.txt)
├── themes/hugoplate/ # Hugo theme
├── config/           # Hugo config files
├── hugo.toml         # Main Hugo config
├── tailwind.config.js
└── postcss.config.js
```

## Local Development

### Prerequisites

- Hugo Extended v0.123.7+ ([installation guide](https://gohugo.io/installation/))
- Node.js 18+ (for TailwindCSS)
- npm or yarn

### Setup

```bash
cd hugo
npm install
hugo server
```

The site will be available at `http://localhost:1313`

### Build for Production

```bash
cd hugo
hugo --minify
```

Output goes to `hugo/public/`

## Key Features

- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags, JSON-LD schema, sitemap
- **WebP Images**: Automatic image optimization
- **AI Discovery**: `llms.txt` for AI/LLM systems
- **Fast Loading**: Static HTML, optimized assets

## Documentation

- **SEO Audit**: See `claude-context-dump-unwritten-studio.md` for detailed SEO status
- **Engineering Principles**: See CLAUDE.md (if present)
- **Microsites Repo**: [sites.unwritten.studio](https://github.com/Askotion/sites.unwritten.studio)

## Deployment

The site auto-deploys to Cloudflare Pages when changes are pushed to `main`.

**Important**: Always test locally with `hugo server` before pushing.

## Contact & Support

**Unwritten Studio GmbH**
- Email: post@unwritten.studio
- Phone: +49 9129 1400929
- Address: Adlerweg 6, 90530 Wendelstein, Germany

## License

MIT License (see LICENSE file)
