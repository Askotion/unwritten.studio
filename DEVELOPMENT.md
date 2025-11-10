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

## Standard Development Workflow

### 1️⃣ **Setup: Branch erstellen**
```bash
# Immer mit feature branch starten (nie direkt auf main arbeiten!)
git checkout -b feature/echo-[kurze-beschreibung]
# Beispiele:
# - feature/echo-ui-polish
# - feature/echo-avatar-update
# - feature/echo-opening-message
```

### 2️⃣ **Entwickeln: Lokal testen**

**Template/UI-Änderungen:**
```bash
vim layouts/partials/echo-chatbot.html
hugo server
# → http://localhost:1313 → klick auf Glas-Sphäre → teste interaktiv
```

**Styling-Änderungen:**
```bash
vim assets/scss/custom.scss
# Hugo hot-reload (browser aktualisiert sich automatisch)
# Teste: Farben, Spacing, Responsiveness (mobile/tablet/desktop)
```

**Logik/JS-Änderungen:**
```bash
vim assets/js/echo-chatbot.js
# Hugo server lädt JS neu
# Teste: Chat funktioniert, keine Console-Errors (F12)
```

### 3️⃣ **Testen: Lokale Testing Checkliste**

Bevor du commitest — alles abhaken:

- [ ] `hugo server` baut erfolgreich (kein BUILD ERROR)
- [ ] Browser öffnet http://localhost:1313
- [ ] Blaue Kugel sichtbar (bottom-right)
- [ ] Klick auf Kugel → Modal öffnet
- [ ] Opening-Message erscheint
- [ ] Nachricht schreiben → abschicken funktioniert
- [ ] Bot antwortet (keine API-Fehler in Console)
- [ ] Markdown rendert korrekt (italic, bold, links, etc.)
- [ ] Kein Flickering/Flashing
- [ ] Responsive: Desktop, Tablet, Mobile (F12 DevTools)
- [ ] Keine Console-Errors oder Warnings (F12 → Console)

### 4️⃣ **Dokumentation: Änderungen beschreiben**

```bash
# README oder DEVELOPMENT.md updaten wenn nötig
vim README.md

# Beispiel: Neue Opening-Message hinzugefügt?
# → echo-chatbot.js section aktualisieren
```

### 5️⃣ **Committen: Aussagekräftige Messages**

```bash
# Stage all changes
git status  # nur deine Files?
git add .

# Commit mit aussagekräftiger Message
git commit -m "Add/Fix/Improve [was genau] in Echo

- Detail 1 der Änderung
- Detail 2 der Änderung
- Warum diese Änderung nötig war (optional)"

# Beispiel:
git commit -m "Polish Echo UI: improve avatar spacing and font weights

- Increase header padding (32px top, 40px bottom)
- Change body font to Plus Jakarta Sans Light (300)
- Fix avatar size to 80×80px
- Result: More airy, elegant aesthetic per design system"
```

### 6️⃣ **Push zu Feature Branch**

```bash
git push origin feature/echo-[kurze-beschreibung]
# Output zeigt GitHub Link zum PR erstellen
```

### 7️⃣ **GitHub: Pull Request erstellen**

```bash
# GitHub CLI (falls installiert):
gh pr create --title "Echo: [was ändert sich]" \
  --body "Beschreibung der Änderung

## Changes
- Detail 1
- Detail 2

## Testing
- [x] Lokal getestet
- [x] Hugo buildet erfolgreich
- [x] Chat funktioniert
- [x] No console errors"

# Oder manuell: GitHub.com → Open Pull Request
```

### 8️⃣ **Review & Merge**

```bash
# PR wird reviewed (selbst oder team)
# Code Review: Sind Änderungen sauber? Passt zum Style?
# → Approve → Merge to main

# Nach merge:
git checkout main
git pull origin main
# Feature ist live auf unwritten.studio ✅
```

---

## Workflow für verschiedene Änderungstypen

### **Kleine Fixes (Typos, CSS-Tweaks)**
→ Feature Branch ist optional, aber recommended

### **Neue Features (z.B. Opening Message)**
→ **IMMER** Feature Branch + PR

### **Breaking Changes (z.B. API-Endpoint ändern)**
→ Feature Branch + PR + ausführliches Testing

### **Notfall-Hotfixes (Production kaputt)**
→ Feature Branch + PR (auch bei Notfall!)
→ Erst testen, dann mergen

---

## Wichtige Git-Konventionen

```bash
# Feature Branch Namen (kebab-case):
git checkout -b feature/echo-avatar-update
git checkout -b feature/echo-animation-fix
git checkout -b feature/echo-system-prompt

# Commit Message Format:
"[Type] [Component]: [Kurze Beschreibung]

[Optional: Detaillierte Erklärung]
[Optional: Related Issues/PRs]"

# Types: Add, Fix, Improve, Polish, Refactor, Update, Remove
# Components: Echo, Flow, Analytics, etc.

# Beispiele:
"Add Echo: New opening message variant for depth>6"
"Fix Echo: Prevent flickering on message render"
"Improve Echo: Better mobile responsiveness"
"Polish Echo: Tighter spacing in modal header"
```

---

## GitHub ↔ Lokal Sync (mit Feature Branches)

### **Vor Entwicklung**
```bash
git checkout main
git fetch --all
git pull --rebase origin main
# → main ist jetzt up to date mit GitHub
```

### **Feature Branch erstellen**
```bash
git checkout -b feature/echo-my-change
# Develop, test, commit...
```

### **Push zu Feature Branch**
```bash
git push origin feature/echo-my-change
# → GitHub zeigt "Create Pull Request" Link
```

### **Nach Merge (PR accepted)**
```bash
git checkout main
git pull --rebase origin main
# → main ist jetzt mit deinen Änderungen updated
```

### **Cleanup (optional)**
```bash
# Lokalen Feature Branch löschen
git branch -d feature/echo-my-change

# Remote Feature Branch löschen
git push origin --delete feature/echo-my-change
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
