# Development Guide – unwritten.studio

Schnelleinstieg für lokale Entwicklung. Damit nicht jede neue Session wieder bei null anfangen muss.

## TL;DR – Quick Start

```bash
# 1. Repo sync
git fetch --all
git pull --rebase origin main

# 2. Hugo starten (lokal testen)
hugo server

# 3. Browser: http://localhost:1313
# 4. Klick auf blaue Kugel rechts unten → Echo Bot testen
```

## Struktur – Was ist wo

```
unwritten.studio/
├── layouts/
│   ├── _default/baseof.html          ← Echo ist hier eingebunden (Zeile ~18, ~80)
│   └── partials/
│       ├── echo-chatbot.html         ← Echo UI Komponente (Avatar, Messages, Input)
│       └── echo-cdn.html             ← Alpine.js, Marked.js, DOMPurify CDN Resources
├── assets/
│   ├── js/echo-chatbot.js            ← Echo Logik (Alpine.js State, API Calls)
│   └── scss/custom.scss              ← Echo Styles (Glass aesthetic, Fonts, Spacing)
├── static/
│   └── echo-logo.png                 ← Avatar Grafik (Leserin in Kugel, 80×80px)
└── content/english/_index.md         ← Homepage Content (Markdown)
```

## Wichtige Dateien für Echo-Entwicklung

### 1. **echo-chatbot.html** (UI Struktur)
- **Was**: HTML-Template für Chat-Widget (Header, Messages, Input)
- **Wo ändern**: Layout, HTML-Struktur, neue UI-Elemente
- **Beispiele**:
  - Avatar-Bild: `<img src="/echo-logo.png" alt="Echo" class="echo-logo" />`
  - Titel: `<h2 class="echo-title">Echo</h2>`
  - Slogan: `<p class="echo-subtitle">Worte, die zurückkommen - verwandelt</p>`
  - Input-Placeholder: `placeholder="Lass mich dich verwandeln..."`

### 2. **echo-chatbot.js** (Alpine.js Logik)
- **Was**: Chat-Logik, API-Calls zu `https://echo-api.post-666.workers.dev`, Message-Handling
- **Wo ändern**: Behavior, State Management, Opening Messages, Validations
- **Wichtige Funktionen**:
  - `echoChat()` — Alpine.js Daten & Methoden
  - `sendMessage()` — Nachricht senden
  - `renderMarkdown()` — Markdown-Rendering (DOMPurify)

### 3. **custom.scss** (Styling)
- **Was**: Alle Echo-Styles (Farben, Fonts, Spacing, Animations)
- **Wo ändern**: Visuelles Design, Responsiveness, Animations
- **Wichtige Klassen**:
  - `.echo-sphere` — Floating Button (unten rechts)
  - `.echo-modal-container` — Chat-Dialog
  - `.echo-header` — Blauer Header mit Avatar & Slogan
  - `.echo-message-echo` — Bot-Nachrichten (blau)
  - `.echo-message-user` — User-Nachrichten (grau)
  - `.echo-input` — Text-Input Feld

### 4. **echo-logo.png** (Avatar)
- **Was**: Grafik der Leserin in Glas-Kugel (80×80px)
- **Wo ändern**: Avatar austauschen (wenn andere Leserin/Person)

## Workflow für Echo-Änderungen

### Template/UI-Änderungen
```bash
# 1. echo-chatbot.html editieren
vim layouts/partials/echo-chatbot.html

# 2. Lokal testen
hugo server
# → http://localhost:1313 → klick auf Kugel

# 3. Zufrieden?
git add layouts/partials/echo-chatbot.html
git commit -m "Update Echo UI: [was geändert wurde]"
git push origin main
```

### Styling-Änderungen
```bash
# 1. custom.scss editieren (Echo-Klassen)
vim assets/scss/custom.scss

# 2. Hugo hot-reload sieht Änderungen sofort
hugo server  # läuft noch im Browser

# 3. Wenn zufrieden:
git add assets/scss/custom.scss
git commit -m "Polish Echo styling: [was geändert wurde]"
git push origin main
```

### Logik/JS-Änderungen
```bash
# 1. echo-chatbot.js editieren
vim assets/js/echo-chatbot.js

# 2. Hugo server aktualisiert Browser
# → Testen im Browser-Chat

# 3. Commit & Push
git add assets/js/echo-chatbot.js
git commit -m "Improve Echo behavior: [was geändert wurde]"
git push origin main
```

## GitHub ↔ Lokal Sync

**Wichtig:** GitHub ist **Source of Truth**. Live-Site wird direkt daraus generiert.

### Lokale Änderungen holen
```bash
# Immer vor Entwicklung!
git fetch --all           # Hol alle Remote-Branches
git pull --rebase origin main  # Merge mit lokalem main (rebase = saubere History)
```

### Lokale Änderungen pushen
```bash
# Nur nach lokalem Test!
git push origin main      # Push zu GitHub
# → Auto-Deploy auf unwritten.studio ✅
```

### Wenn divergente Branches
```bash
# Falls lokal ahead von origin/main:
git pull --rebase origin main

# Falls Conflicts: resolve und
git add [datei]
git rebase --continue
```

## Testing Checkliste

Bevor du pusht:

- [ ] `hugo server` läuft und baut erfolgreich
- [ ] Browser: http://localhost:1313 öffnet sich
- [ ] Klick auf blaue Kugel → Chat öffnet sich
- [ ] Opening-Message erscheint
- [ ] Input-Feld aktiv (schreiben möglich)
- [ ] Nachricht absenden funktioniert
- [ ] Markdown in Bot-Antwort rendert (Italics, Bold, etc.)
- [ ] Kein Konsolen-Errors (F12 → Console)
- [ ] Responsive: Desktop, Tablet, Mobile testen
- [ ] Keine Flickering/Flashing beim Laden

## Häufige Probleme & Lösungen

### "Echo wird nicht angezeigt"
```bash
# 1. Cache clearen
rm -rf public/

# 2. Hugo neu bauen
hugo

# 3. Datei-Änderungen?
git status
# → Falls untracked Files: git add & commit

# 4. Remote holen?
git fetch --all
git pull --rebase origin main
```

### "Hugo kompiliert nicht"
```bash
# Hugo Version checken (muss v0.123.7+ sein)
hugo version

# Config-Fehler? Logoutput lesen
hugo server 2>&1 | grep -i "error"
```

### "Änderungen sichtbar, aber nicht committed"
```bash
# Alle uncommitted changes sehen
git status

# Nicht gepusht?
git log --oneline origin/main..main

# Dann pushen!
git push origin main
```

## Umgebungsvariablen & Secrets

Echo braucht **keine lokalen Secrets**. Die Cloudflare Worker API (`echo-api.post-666.workers.dev`) ist öffentlich.

Aber: `OPENROUTER_API_KEY` ist in der Worker konfiguriert (nicht lokal nötig).

## Weitere Resources

- **Echo Bot Dokumentation**: `/Users/sp/projects/unwritten/sites.unwritten.studio/echo.unwritten.studio/README.md`
- **Hugo Docs**: https://gohugo.io/documentation/
- **TailwindCSS**: https://tailwindcss.com/docs
- **Alpine.js**: https://alpinejs.dev/

## Fragen?

Falls was unklar ist oder nicht funktioniert:
1. Check git status: `git status`
2. Check Hugo build: `hugo` (ohne server)
3. Check Browser Console: F12 → Console
4. Check git log: `git log --oneline -10`
