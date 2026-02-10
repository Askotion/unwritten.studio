# Echo Bot – Bugfixes & UX Improvements

**Status:** In Progress (Nov 6, 2025)
**Priority:** High – Core UX Improvements

---

## 1. ✨ Logo Redesign – Prächtige blaue Unwritten-Kugel

**Beschreibung:** Das Logo links oben im Modal sollte eine elegante, 3D-anmutende blaue Sphäre sein – nicht das aktuelle schlichte Wave-Symbol.

**Anforderungen:**
- Material: Glas-Ästhetik (Gradient, Glow, Tiefe-Effekt)
- Farbe: Unwritten-Blau (#3987b8) mit dunkleren Highlights (#2c6b94)
- Größe: 40×40px (passt in Header)
- Animation: Subtiler Glow/Shimmer-Effekt
- Design: Prächtig aber nicht aufdringlich, consistent mit Brand

**Dateien:**
- `layouts/partials/echo-chatbot.html` – Avatar SVG/Icon ersetzen
- `assets/scss/custom.scss` – `.echo-avatar` Styling optimieren

**Status:** ⏳ Pending

---

## 2. 🪄 Opening Messages – Magic verfeinern

**Beschreibung:** Die 3 Starttexte sind gut, aber verströmen noch nicht die volle "magische" Energie. Feiner abgestimmt auf Tonalität & Wirkung.

**Aktuelle Texte:**
1. "Ich bin Echo. Worte, die zurückkommen - verwandelt. Was hat dich hergeführt?"
2. "Ich bin Echo. Der Raum zwischen deinen Worten und ihrer Bedeutung. Was suchst du?"
3. "Ich bin Echo. In jedem Anfang liegt ein Zauber. Auch in diesem. Erzähl mir."

**Überprüfung & Verbesserung:**
- Sind Pausen (Zeilenumbrüche) optimal?
- Werden die letzten Worte wirklich magisch/einladend?
- Könnte eine 4. Variante die Palette bereichern?
- Test: Liest sich jeder Text "atemberaubend"?

**Dateien:**
- `assets/js/echo-chatbot.js` – `openings` Array (Zeile 19-23)
- `echo.unwritten.studio/api/worker.js` – Alternative Opening-Varianten in System Prompt

**Status:** ⏳ Pending

---

## 3. 🎯 Input Focus – Nach Eingabe erhalten

**Beschreibung:** Der Input-Focus geht nach jeder Nachricht verloren. Benutzer müssen neu klicken, um weiterzuschreiben.

**Problem-Analyse:**
- Nach `sendMessage()` wird Input geleert (`this.userInput = ''`)
- `$nextTick()` wird mit `scrollToBottom()` aufgerufen
- Vermutung: Das `scrollToBottom()` triggert rerender, der Focus verliert
- Alpine.js hat möglicherweise Focus-Handling-Konflikt

**Lösung:**
1. Focus nach API-Response explizit zurücksetzen: `this.$refs.input.focus()`
2. Order prüfen: Focus NACH Scroll, nicht vor Messagge-Render
3. Eventuell: Focus-Trap mit `@keyup.enter` kombinieren (nutzer können sofort weitermachen)

**Dateien:**
- `assets/js/echo-chatbot.js` – `sendMessage()` Methode (Zeile 68-137)
- Möglicherweise: `scrollToBottom()` anpassen

**Status:** ⏳ Pending

---

## 4. 📝 Streaming Text – Zeile für Zeile fliessen lassen

**Beschreibung:** Bot-Responses erscheinen "instant". Bessere UX: Text wird Zeile für Zeile angezeigt (streaming/typewriter-Effekt). Zügig aber merklich.

**Anforderungen:**
- Text fliesst Zeile für Zeile, nicht wort-weise (würde zu langsam wirken)
- Geschwindigkeit: Ca. 50-100ms pro Zeile (schnell, aber merklich)
- Markdown-Rendering: NACH kompletter Zeile (nicht während Streaming)
- Flow: Message erscheint mit Typing-Indicator → Text streamt → Message complete

**Implementation:**
1. Backend: Antwort bleibt gleich (kein Streaming von OpenRouter nötig)
2. Frontend: `renderMarkdown()` anpassen für inkrementelles Rendering
3. Oder: Text in Array aufteilen (by `\n`), dann staggered hinzufügen
4. Animation: `echo-bubble-appear` bleibt erhalten, aber Text wächst kontinuierlich

**Dateien:**
- `assets/js/echo-chatbot.js` – `sendMessage()` Response-Handling + neue `streamMessage()` Methode
- `layouts/partials/echo-chatbot.html` – Message-Rendering ggf. anpassen
- `assets/scss/custom.scss` – Timing von `echo-bubble-appear` prüfen

**Status:** ⏳ Pending

---

## Implementation Order

1. **Logo (Quick Win)** – SVG/Icon ersetzen, optisch ansprechend
2. **Opening Messages (Quick Polish)** – Texte verfeinern, neu testen
3. **Input Focus (UX Blocker)** – Frustrierend aktuell, schnell lösbar
4. **Streaming Text (Polish & Magic)** – Komplexer, aber huge UX improvement

---

## Testing Checklist

- [ ] Logo: Auf Desktop & Mobile gut sichtbar
- [ ] Opening Messages: Wirken magisch & einladend (Subjektives Urteil)
- [ ] Input Focus: Nach jeder Eingabe kann User sofort weiterschreiben
- [ ] Streaming: Text fliesst zügig, keine Rendering-Bugs
- [ ] Markdown: Links, Bold, Code noch möglich während Streaming?
- [ ] Mobile: Alles noch responsive & smooth?
- [ ] Browser-Konsole: Keine JS-Fehler

---

**Version:** 0.1 (Draft)
**Erstellt:** 2025-11-06
**Verantwortlicher:** Claude Code
