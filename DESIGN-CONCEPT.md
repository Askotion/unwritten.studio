# Design Konzept – unwritten.studio

*Lebendiges Dokument. Hier landen konzeptuelle Entscheidungen, offene Fragen und Designprinzipien, bevor sie Code werden.*

---

## Arbeitsphilosophie

### Stärken im Team

- **Designer**: Exzellentes Gespür für Atmosphäre und Ästhetik. Zeitlich eingeschränkt verfügbar. Sein Input ist wertvoll und sollte für die Hauptseite gezielt eingesetzt werden – für atmosphärische Leitplanken (Proportionen, Abstände, Farbphilosophie, Typografie-Logik), nicht für jeden einzelnen Schritt.
- **Technische Umsetzung**: Deutlich flexibler als früher – freie Ideen lassen sich heute direkt umsetzen, ohne externe Entwickler. Das verschiebt die Verantwortung: Die limitierende Frage ist nicht mehr „können wir das bauen?" sondern „sollten wir das bauen, und fühlt es sich richtig an?"

### Microsites als Designlabor

Microsites sind eigenständige, bewusst "unabhängige" Ableger. Stilistische Abweichungen von der "reinen Lehre" sind dort akzeptabler. Was dort funktioniert, kann auf die Hauptseite zurückfließen – aber destilliert, nicht direkt kopiert.

**unwritten.studio selbst ist die Bühne, wo alles zusammenfließt.** Hier gilt höchste Sorgfalt.

### Das zentrale Risiko

Mehr technische Umsetzungsgeschwindigkeit darf die Designkohärenz der Hauptseite nicht unterhöhlen – nicht böswillig, sondern durch viele kleine "das geht doch auch so"-Entscheidungen. Dagegen hilft: konzeptuell klären, bevor gebaut wird.

---

## Kernkonzept: Gewicht statt Kategorie

### Das Problem

Die Site hat bisher zwei harte Kategorien: **Showcase** (groß, prominent) und **Microsites** (kleiner, Galerie). Diese Trennung spiegelt nicht mehr die tatsächliche Qualitätshierarchie der Arbeit wider.

Experimente *und* Menschen haben bei unwritten.studio unterschiedliche "Schwere" – zeitlich, konzeptionell, im Involvement. Das ist kein binäres Entweder-oder, sondern ein **Spektrum**.

### Die Lösung: datengetriebenes Gewicht

Ein einziger Schalter (`weight`) im Hugo Frontmatter bestimmt die Darstellungsebene:

```yaml
weight: 1  →  Große Bühne: Hero-Video, voller Whitespace, prominente Darstellung
weight: 2  →  Zweite Reihe: kompakter, aber noch prominent
weight: 3  →  Galerie: Grid, gleichwertige Darstellung
(kein Flag) →  Archiv: nicht sichtbar auf der Hauptseite
```

**Was das bedeutet:** Einen Eintrag von der Galerie in die erste Reihe zu heben = eine Zahl in einer Markdown-Datei ändern. Kein Code, kein Umbauen, kein PR für eine redaktionelle Entscheidung.

**Das gleiche Prinzip gilt für Team-Mitglieder** – unterschiedliche Involvement-Ebenen werden durch dasselbe Weight-System abgebildet.

### Was das löst

- Kein "Degradieren" mehr – nur Gewichtsveränderung
- Kuratorische Entscheidungen sind reversibel und schnell
- Das visuelle System bleibt stabil; redaktionelle Entscheidungen sind fließend
- "Hallo World" mit weight:3 ist nicht degradiert – es hat einen anderen Platz im Spektrum

---

## Showcase-Sektion: Neudenken

### Aktuelle Situation (Stand: März 2026)

- 5 Showcases, historisch gewachsen (3 → 5)
- Showcases: groß, viel Whitespace, ausführliche Texte, kommen als erstes
- ~13 Microsites: deutlich kleiner, separate Sektion darunter
- Neue Microsites (flow, glitch, red, afterglow) sind z.T. stärker als ältere Showcases

### Offene Fragen (noch nicht entschieden)

1. **Kuratorik-Kriterium**: Was macht einen Showcase-Eintrag aus? Tiefe der Arbeit? Visuelle Qualität? Konzeptuelle Originalität? → Muss explizit definiert werden.

2. **Kandidaten für Hochstufung** (weight:1 oder weight:2): flow, glitch, red, afterglow?

3. **Was passiert mit "Hallo World"?** Hat einen anderen Wert als Qualitätsarbeit – es ist Herkunftsnarrative. Vielleicht gehört es in einen anderen Kontext ("wie es angefangen hat"), nicht in die Qualitätsschaufenster-Sektion.

4. **Bühnenform**: Bleibt die 5er-Grenze? Oder flexibles System mit 2–3 Featured + 3–5 Secondary?

5. **Reihenfolge**: Kommt Showcase weiterhin als erstes, oder wird die Hierarchie umgedreht?

### Geplante Interaktion: Scroll-triggered Videos

Beim Scrollen durch die Showcase-Sektion läuft das Hero-Video des jeweiligen Eintrags automatisch an, wenn er im Viewport sichtbar wird.

**Technische Regeln:**
- **Max. ein Video gleichzeitig** (Performance + kognitive Last)
- Intersection Observer: ~60% sichtbar → play; unter ~30% → pause
- Großzügiger Threshold verhindert Flackern beim schnellen Scrollen
- Mobile: Battery/CPU-Impact beachten

*Status: Idee, noch nicht umgesetzt. Implementierung erst nach redaktionellen Entscheidungen.*

---

## llms.txt — Struktur und Pflege

### Aktueller Stand

- Haupt-`llms.txt` im Root: gut geschrieben, erklärt das "Warum" des Studios
- **Problem:** Nur 5 von 15 Microsites gelistet, letztes Update November 2025 — bereits veraltet
- Jede Microsite hat eine eigene `llms.txt` mit spezifischem Kontext

### Offene Fragen

**Was bedeutet "aktiv nutzen"?**

Option A — **Echo-Integration:** Echo kennt den Kontext aller Microsites. Wenn jemand im Chat über "Flow" oder "Lagerfeuer" spricht, hat Echo konkreten Inhalt. Dafür müsste der Echo-Prompt die relevanten llms.txt-Inhalte einbinden (oder RAG darüber laufen).

Option B — **Aggregation:** Die Haupt-llms.txt wird zum maschinenlesbaren Gesamtbild des Studios — mit allen 15 Microsites, aktuell gehalten. Wertvoller für externe AI-Systeme, Crawler, und Partnerkommunikation.

Beide Optionen schließen sich nicht aus.

### Sofort-Aktion (unabhängig von Redesign)

Die Haupt-`llms.txt` sollte zeitnah aktualisiert werden:
- Alle 15 Microsites listen
- Uncover-Buch und Episoden-Projekt erwähnen
- Datum aktualisieren

*Status: Ausstehend, aber klein und unabhängig umsetzbar.*

---

## Team-Sektion: Storytelling statt Karussell

### Reframing

Die Team-Sektion ist keine "Über uns"-Seite. Sie wird zu einer **Erzählsektion**:
- 20 Menschen (Die Unbeschreiblichen)
- Ziel: 20 Interview-Episoden — eine pro Person
- Das Uncover-Buch: entsteht parallel aus den Episoden, CC-lizenziert, offen auf GitHub

Das ist fundamental anders als ein Karussell mit Fotos und Kurzbiografien. Die Episoden *sind* der Inhalt.

### Weight-System für Team

```
weight: 1  →  Episode existiert: Bühne mit Bild + Text + Link zur Episode
weight: 2  →  Aktiv beteiligt, noch keine Episode: kurze Erwähnung
weight: 3  →  Im Hintergrund: nicht sichtbar auf der Hauptseite
```

Wenn alle 20 Episoden existieren, sind alle weight:1 — das System skaliert.

### Das Uncover-Buch als Klammer

Das Buch ist nicht "auch noch ein Link" — es ist die konzeptionelle Klammer, die erklärt *warum* es diese Episoden gibt und *wohin* das führt. Es sollte prominent und eigenständig auf der Website transportiert werden, nicht als Fußnote unter der Team-Sektion.

**Mögliche Formen:**
- Eigene kleine Sektion direkt über oder unter dem Team
- Prominent in der Hauptnavigation
- Als Featured-Element in der Showcase-Sektion (es ist selbst ein Experiment)

*Status: Konzept, noch nicht ausgearbeitet. Wo lebt der Episoden-Content aktuell?*

### Sektionsreihenfolge

Team bleibt letzte Sektion vor dem Footer — eigenständig, nicht mit anderen Sektionen vermischt.

---

## Echo: Aktivierung & Präsenz

### Aktueller Stand

Echo wird über die pulsierende Glaskugel rechts unten aktiviert (`#echo-toggle`, `fixed bottom-6 right-6`). Das funktioniert gut.

### Idee: Klick auf Echo im Hero-Video

**Überlegung:** Echo im Hero-Video direkt anklicken → Chat öffnet sich. Poetic, direkt.

**Problem:** Technisch fragil. Das Video nutzt `object-fit: cover` – die Position der Kugel im Video verschiebt sich je nach Viewport-Verhältnis. Ein Overlay-Div müsste für jeden Breakpoint kalibriert werden und würde bei Videoänderungen brechen. Auf Mobile zusätzliche Konflikte mit nativen Videosteuerelementen.

**Entscheidung:** Idee vorerst zurückgestellt. Stattdessen: Die bestehende Glaskugel (bottom-right) noch stärker in den Fokus rücken – bessere Sichtbarkeit, stärkere visuelle Präsenz. Konkrete Umsetzung offen.

---

## Team-Sektion

### Aktueller Stand

Team-Karussell aus dem hugoplate-Template, aus der Not entstanden. ~20 Menschen, unterschiedliches Involvement.

### Richtung

Dasselbe Weight-Konzept wie bei Experimenten: Menschen mit unterschiedlichem Involvement bekommen unterschiedliche Darstellungsebenen. Kein Template-Karussell, sondern eine eigene Lösung, die zur Atmosphäre von unwritten.studio passt.

*Status: Konzept, noch nicht ausgearbeitet.*

---

## Offene Grundsatzfragen

- [ ] Welche Kriterien definieren "erste Reihe" (weight:1)?
- [ ] Wie viele Einträge soll die erste Reihe maximal fassen?
- [ ] Gilt für Experimente und Team dieselbe Seite, oder eigene Bereiche?
- [ ] Wann wird der Designer für Input eingebunden (vor oder nach redaktionellen Entscheidungen)?
- [ ] Soll die "Bühnen"-Redesign in einem Schritt passieren oder schrittweise?

---

*Zuletzt aktualisiert: März 2026*
