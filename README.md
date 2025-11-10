# Unwritten.Studio – Hauptwebseite

Agentur-Webseite für Unwritten GmbH (https://unwritten.studio) mit integriertem **Echo Bot**.

## Struktur

```
unwritten.studio/                     # Hugo site root
├── content/                          # Hugo content (German)
├── static/                           # Assets (images, fonts, etc.)
├── themes/hugoplate/                 # Hugo theme (customized)
├── config.toml                       # Hugo configuration
└── README.md                         # This file
```

## Echo Bot Integration

Die Hauptseite hat den **Echo Bot** integriert — einen poetischen Transformator, der auf der unwritten.studio Startseite verfügbar ist.

### Echo Bot Features
- **Persona**: Poetischer Transformator & Appetitmacher
- **Model**: Claude Haiku 4.5 via OpenRouter (Temperatur: 0.8)
- **Gesprächsführung**: 3-phasig (Begegnung → Verwandlung → Einladung)
- **Integration**: Pulsierende Glas-Sphäre (bottom-right, fixed position)
- **Technologie**: Alpine.js + Marked.js + DOMPurify
- **UI**: Avatar mit Leserin-Grafik, Unwritten Design System Fonts, fester Opening-Text

### Echo Bot API
- **Endpoint**: `https://echo-api.post-666.workers.dev`
- **Cloudflare Worker**: `/Users/sp/projects/unwritten/sites.unwritten.studio/echo.unwritten.studio/api/worker.js`
- **Logs**: Cloudflare KV Storage (90 Tage TTL)
- **Session IDs**: Deterministisch

### ⚠️ WICHTIG: GitHub ist Source of Truth
**Das Echo Bot Widget MUSS vollständig im Repository unter Version Control sein.** Die Live-Site wird direkt aus diesem Repo generiert (Hugo → GitHub Pages).

- **Keine manuellen Änderungen auf der Live-Site ohne Commit!**
- Alle UI-Verbesserungen müssen in den Source-Dateien (HTML/CSS/JS) passieren
- Nach Änderungen: `hugo` ausführen, testen, dann committen & pushen

Vollständige Dokumentation: siehe `sites.unwritten.studio/echo.unwritten.studio/README.md`

## Tech Stack

- **Generator**: Hugo (static site generator)
- **Theme**: Hugoplate (customized)
- **Language**: German (de)
- **Hosting**: GitHub Pages
- **Chat Integration**: Echo Bot (Cloudflare Worker)

## Development

### Hugo Server starten
```bash
cd /Users/sp/projects/unwritten/unwritten.studio
hugo server -D
```

Öffnet dann http://localhost:1313

### Echo Bot testen
1. Hugo Server läuft auf http://localhost:1313
2. Klick auf Echo-Sphäre (bottom-right)
3. Chat wird via `https://echo-api.post-666.workers.dev` connected

Für Lokal-Testen des Workers:
```bash
cd /Users/sp/projects/unwritten/sites.unwritten.studio/echo.unwritten.studio/api
npx wrangler dev --env=""
# Dann den API_URL in der Hugo-Datei auf http://localhost:8787 ändern
```

## Git Workflow

- **Default**: Feature Branches → PRs → Code Review → Merge zu `main`
- **Main Branch**: Triggert automatisches Deployment auf GitHub Pages
- **Commits**: Immer mit aussagekräftiger Message + Doku

## Verwandte Projekte

- **Microsites**: `/Users/sp/projects/unwritten/sites.unwritten.studio` (separate Repo)
  - Flow Bot (https://flow.unwritten.studio)
  - Concierge Bot (https://concierge.unwritten.studio)
  - Henry Bot (https://wastedwetware.unwritten.studio)
  - Companion, Lagerfeuer, Analytics

- **Dokumentation**: Siehe `sites.unwritten.studio/README.md` für komplette Bot-Infrastruktur

## Dokumentation

**Start hier:** Komplette Dokumentation im [`sites.unwritten.studio`](https://github.com/Askotion/sites.unwritten.studio) Repository:
- **[DEVELOPMENT.md](https://github.com/Askotion/sites.unwritten.studio/blob/main/DEVELOPMENT.md)** - Complete PR workflow, testing checklist, branch naming
- **[README.md](https://github.com/Askotion/sites.unwritten.studio/blob/main/README.md)** - Bot infrastructure, microsites overview, engineering principles

Weitere Ressourcen:
- **Engineering Principles**: `CLAUDE.md`
- **Privacy Policy**: `content/english/pages/privacy-policy.md`
- **Hugo Docs**: https://gohugo.io/documentation/
