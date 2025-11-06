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
- **Echo Companion Bot**: AI-powered chatbot integration (see below)

## Echo Companion Bot

The site includes **Echo**, a poetischer Transformator chatbot that appears as a fixed widget (bottom-right).

### Integration Overview

**Frontend Components:**
- `layouts/partials/echo-chatbot.html` - Chat UI (glass-aesthetic modal)
- `layouts/partials/echo-cdn.html` - CDN resources (Alpine.js, Marked.js, DOMPurify)
- `assets/js/echo-chatbot.js` - Alpine.js component with chat logic
- `assets/scss/custom.scss` - Glass-aesthetic styles with Unwritten-Blau (#3987b8)
- `layouts/_default/baseof.html` - Integration in base template

**Backend:**
- Cloudflare Worker: `https://echo-api.post-666.workers.dev`
- AI Model: Claude Haiku 4.5 via OpenRouter
- See [Echo documentation](https://github.com/Askotion/sites.unwritten.studio/tree/main/echo.unwritten.studio) for details

**Tech Stack:**
- [Alpine.js](https://alpinejs.dev/) - Reactive state management
- [Marked.js](https://marked.js.org/) - Markdown parsing
- [DOMPurify](https://github.com/cure53/DOMPurify) - XSS protection
- Cloudflare Workers + KV - Serverless API and storage

### Customization

Edit system prompts and persona in the worker code:
```bash
/Users/sp/projects/unwritten.microsites/echo.unwritten.studio/api/worker.js
```

Modify styles in:
```bash
assets/scss/custom.scss
```

## Documentation

- **SEO Audit**: See `claude-context-dump-unwritten-studio.md` for detailed SEO status
- **Engineering Principles**: See `../unwritten.microsites/CLAUDE.md`
- **Microsites Repo**: [sites.unwritten.studio](https://github.com/Askotion/sites.unwritten.studio)
- **Echo Bot**: [Echo documentation](https://github.com/Askotion/sites.unwritten.studio/tree/main/echo.unwritten.studio)

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
