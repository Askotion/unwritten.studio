# Claude Code Learnings - Unwritten Studio

Dokumentation von Erkenntnissen aus der Zusammenarbeit, um bessere Entscheidungen in zukünftigen Sessions zu treffen.

## 🔍 Auf Automatisierte Tool-Ergebnisse nicht blind vertrauen

**Situation:** WebFetch konnte JSON-LD Organization Schema nicht in der HTML-Response erkennen und meldete "0 Vorkommen". Daraufhin wurde es als fehlend dokumentiert und in die To-Do-Liste aufgenommen.

**Problem:** WebFetch arbeitet mit der geparsed HTML-Response. Wenn das Schema dort nicht sichtbar ist, heißt das nicht automatisch, dass es nicht in den Source-Dateien implementiert ist. Es könnte:
- Dynamisch generiert werden (Hugo-Template)
- Nicht in der WebFetch-Response enthalten sein
- Durch Frontend-Rendering erst hinzugefügt werden

**Besser:** Bei Discrepanzen zwischen Tool-Output und erwarteten Ergebnissen → Immer die **lokalen Source-Dateien direkt lesen** (Read-Tool) statt auf Tool-Ergebnisse zu vertrauen.

---

## 🤔 Alte Audit-Items kritisch hinterfragen

**Situation:** Ein früheres Audit aus 2025-10-24 listete 14 "kritische Probleme" auf. Bei der Überprüfung stellte sich heraus:
- Viele waren nicht relevant (Canonicals für Single-Page-Site)
- Manche waren falsch (Bilder existierten alle)
- Manche waren bereits gelöst (JSON-LD, CSS)

**Problem:** Audit-Dokumente sollten nicht blind als "truth" übernommen werden, besonders wenn:
- Sie älter sind (Tech hat sich geändert, Code wurde aktualisiert)
- Sie viele Items listen (Quantität ≠ Qualität)
- Sie von automatisierten Audits stammen

**Besser:** Bei Audit-Reviews → **Kritische Perspektive**: Ist das wirklich relevant? Ist das noch aktuell? Ist das schon gelöst?

---

## 📋 User-Input ernst nehmen statt "know-it-all" spielen

**Situation:** User fragte dreimal nach, ob bestimmte Dinge wirklich Probleme sind:
1. "Brauchen wir Canonicals hier wirklich?" → Nein, nicht nötig
2. "Die Bilder sind alle da" → Stimmt, waren da
3. "Impressum/AGB/Privacy für SEO relevant?" → Nein, nicht relevant

**Problem:** Statt User zu hören und zu validieren, wurden die Audit-Items einfach mitgeschleppt. Das führte zu:
- 3 Runden unnötiger Diskussion
- Vergeudeter Zeit
- Sinkender Vertrauenswert

**Besser:** User-Widerspruch als **Signal nehmen**. Wenn User sagt "das stimmt nicht", → Überprüfen, nicht verteidigen.

---

## 🎯 Realistische Prioritäten setzen

**Situation:** Großes Audit mit 14 Items → Nach Bereinigung nur noch 2 echte Probleme → Final 0 Probleme (bereits gelöst).

**Problem:** "Viel Liste = viel Arbeit nötig" ist falsch. Eine lange Liste von teils irrelevanten Items:
- Verwirrt und demotiviert
- Lenkt von echten Prioritäten ab
- Verschlechtert Klarheit

**Besser:**
- Lieber 3 echte Probleme benennen als 15 potenzielle
- Kritisch: "Ist das ein echtes Problem oder nur eine Best Practice?"
- Impact/Effort Matrix: Was bringt viel für wenig Aufwand?

---

## 💡 Erkenntnisse sind kontextabhängig

Diese Learnings sind spezifisch für:
- Dieses Projekt (Hugo-basierte Website)
- Diesen Kontext (SEO-Audit mit alten Items)
- Diese User-Interaktion

Sie gelten aber generell für ähnliche Situationen:
- Tool-Output vs. Realität mismatch
- Alte Dokumentation überprüfen
- User-Feedback als Qualitätssignal

---

**Zuletzt aktualisiert:** 2025-11-14
