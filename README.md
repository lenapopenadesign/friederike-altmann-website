# Friederike Altmann · Website

Static site built with **Eleventy 3** + **Tina CMS** (Tina Cloud).
Deployed on **Vercel**.

---

## Quick Setup (einmalig)

### 1. Lokale Dependencies installieren

```bash
npm install
```

### 2. Tina Cloud Account anlegen

1. Auf [app.tina.io](https://app.tina.io) registrieren (mit GitHub-Login)
2. **„New Project"** klicken
3. Repository **`lenapopenadesign/friederike-altmann-website`** auswählen
4. Branch: `main`
5. Tina generiert dann zwei Werte, die du brauchst:
   - `Client ID`
   - `Read-Only Token` (bzw. Read-Write Token)

### 3. Tina-Credentials hinterlegen

**Lokal:** `.env` Datei im Repo-Root anlegen (NICHT committen, ist gitignored):

```env
NEXT_PUBLIC_TINA_CLIENT_ID=<deine-client-id-von-tina>
TINA_TOKEN=<dein-token-von-tina>
```

**Auf Vercel:** Im Project-Settings → Environment Variables die gleichen zwei Variablen eintragen.

### 4. Local Dev starten

```bash
npm run dev
```

- Eleventy serviert die Seite auf `http://localhost:8080`
- Tina Admin UI ist erreichbar unter `http://localhost:8080/admin/index.html`
- Änderungen werden als Commits in deinem Git-Branch gespeichert

### 5. Production Build

```bash
npm run build
```

Vercel macht das automatisch bei jedem Push auf `main`.

---

## Verzeichnis-Struktur

```
.
├── src/                      ← Eleventy Source
│   ├── index.njk             ← Landing (/)
│   ├── methode.njk           ← /methode/
│   ├── angebot.njk           ← /angebot/
│   ├── b2b.njk               ← /b2b/
│   ├── meine-geschichte.njk  ← /meine-geschichte/
│   ├── impressum.md          ← /impressum/ (Markdown body)
│   ├── datenschutz.md        ← /datenschutz/
│   ├── styles.css
│   ├── app.js
│   ├── assets/               ← Bilder, Logo, SVGs
│   ├── _includes/
│   │   ├── layouts/          ← base.njk, legal.njk
│   │   └── partials/         ← head, nav, footer, modal, cta-block
│   └── _data/                ← Globale Daten (von Tina editiert)
│       ├── site.json         ← Brand-Name, Kontaktdaten
│       ├── nav.json          ← Hauptnavigation
│       ├── footer.json       ← Footer-Links
│       ├── modal.json        ← Modal-Formular-Optionen
│       ├── testimonials.json ← Stimmen (Slider auto >3)
│       ├── faq.json          ← FAQ-Liste
│       └── topics.json       ← Themen-Tags
├── content/                  ← (optional, falls weitere Collections nötig)
├── tina/
│   └── config.ts             ← Tina-Schema
├── eleventy.config.js        ← Eleventy-Konfig
├── package.json
├── vercel.json               ← Build = npm run build, Output = _site
└── brand-kit/                ← Source Material (excluded from deploy)
```

---

## Was Tina aktuell editieren kann

Nach Login auf Tina Cloud sieht Friederike folgende Collections:

| Collection         | Was editierbar ist                                            |
|--------------------|--------------------------------------------------------------|
| **Site Settings**  | Brand-Name, Untertitel, CTA-Label, alle Kontaktdaten          |
| **Stimmen**        | Testimonial-Liste (Zitat / Name / Rolle) — beliebig viele    |
| **FAQ**            | Fragen + Antworten — beliebig viele                          |
| **Themen-Tags**    | Tag-Liste auf der Landing                                     |
| **Navigation**     | Label + URL pro Nav-Punkt                                     |
| **Footer**         | Label + URL pro Footer-Link                                   |
| **Seiten**         | Impressum + Datenschutz (Titel + Markdown-Body)               |

### Was noch HTML/Template ist (nicht via Tina editierbar)

Die Inhalte der komplexen Seiten (Methode-Sections, B2B-Hero, Angebot-Karten,
Über-mich-Story-Sections etc.) stehen aktuell als HTML in den `.njk`-Templates.

Falls du auch diese editierbar machen willst, können wir das schrittweise machen:
1. Inhalte aus dem Template ins YAML-Frontmatter ziehen
2. Tina-Schema dafür erweitern
3. Template ersetzt feste Strings durch `{{ frontmatter-variable }}`

---

## Standard-Workflow für Friederike

1. **Editieren:** [app.tina.io](https://app.tina.io) → Projekt → Collection → Änderungen
2. **Speichern:** Tina committet automatisch in den `main`-Branch (oder erstellt PR)
3. **Deploy:** Vercel pickt den Push auf und deployed in ~30 Sek

Sie braucht weder Git-Knowledge noch Code-Editor — alles läuft über die Tina-UI.

---

## Troubleshooting

**Build schlägt fehl mit "Missing TINA_TOKEN":**
→ Tina-Credentials auf Vercel als Environment Variables setzen (siehe oben).

**Lokaler `npm run dev` zeigt nichts:**
→ Erst `npm install`, dann `.env` mit Tina-Creds füllen.

**Eleventy-Build OK, aber Tina UI zeigt "Cannot connect":**
→ Tina Cloud Branch-Setting muss zum aktuellen Branch passen (`main`).

**Vercel deployed die alte Site:**
→ `vercel.json` definiert `outputDirectory: "_site"` — Vercel muss diese Datei lesen.
   Falls Project-Settings überschreiben, dort manuell `_site` setzen.
