import { defineConfig } from "tinacms";

// Tina Cloud credentials — siehe README für Setup
const branch = process.env.GITHUB_BRANCH || process.env.HEAD || "main";
const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "";
const token = process.env.TINA_TOKEN || "";

// Reusable field builders ----------------------------------------------------
const headlineFields = [
  { type: "string" as const, name: "eyebrow", label: "Eyebrow (kleine Überschrift)" },
  { type: "string" as const, name: "headline", label: "Headline" },
  { type: "string" as const, name: "headline_accent", label: "Headline (Akzent — wird fett)" },
];
const leadField = {
  type: "string" as const,
  name: "lead",
  label: "Einleitungstext",
  ui: { component: "textarea" as const },
};

export default defineConfig({
  branch,
  clientId,
  token,
  build: {
    outputFolder: "admin",
    publicFolder: "_site",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "src",
    },
  },

  schema: {
    collections: [
      // ===========================================================
      // STARTSEITE
      // ===========================================================
      {
        name: "page_index",
        label: "📄 Startseite",
        path: "src/_data/pages",
        format: "json",
        match: { include: "index" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "subtitle", label: "Seiten-Untertitel (im Title-Tag)" },
          {
            type: "object",
            name: "hero",
            label: "Hero (oben auf der Seite)",
            fields: [
              ...headlineFields,
              leadField,
              { type: "string", name: "cta_secondary", label: "Sekundärer CTA-Button Text" },
              { type: "string", name: "cta_secondary_url", label: "Sekundärer CTA-Button Link" },
              { type: "image", name: "image", label: "Hero-Bild" },
              { type: "string", name: "image_credit_label", label: "Bild-Credit (Text)" },
              { type: "string", name: "image_credit_url", label: "Bild-Credit (Link)" },
            ],
          },
          {
            type: "object",
            name: "methode_teaser",
            label: "Methode-Teaser",
            fields: [
              ...headlineFields,
              leadField,
              { type: "string", name: "cta_label", label: "Link-Text" },
              { type: "string", name: "cta_url", label: "Link-Ziel" },
              {
                type: "object",
                name: "tokens",
                label: "3 Punkte rechts",
                list: true,
                ui: { itemProps: (item: any) => ({ label: item?.title || "Neuer Punkt" }) },
                fields: [
                  { type: "string", name: "num", label: "Nummer" },
                  { type: "string", name: "title", label: "Titel" },
                  { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "services_teaser",
            label: "Angebot-Teaser",
            fields: [
              ...headlineFields,
              leadField,
              {
                type: "object",
                name: "items",
                label: "3 Format-Karten",
                list: true,
                ui: { itemProps: (item: any) => ({ label: item?.title || "Neue Karte" }) },
                fields: [
                  { type: "string", name: "num", label: "Nummer" },
                  { type: "string", name: "title", label: "Titel" },
                  { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
                  { type: "string", name: "url", label: "Link" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "image_break_1",
            label: "Bild-Sektion 1 (Gruppen-Tisch)",
            fields: [
              { type: "image", name: "image", label: "Bild" },
              { type: "string", name: "alt", label: "Alt-Text" },
            ],
          },
          {
            type: "object",
            name: "about_teaser",
            label: "Über mich-Teaser",
            fields: [
              ...headlineFields,
              { type: "string", name: "paragraph_1", label: "Absatz 1", ui: { component: "textarea" } },
              { type: "string", name: "paragraph_2", label: "Absatz 2 (kleiner)", ui: { component: "textarea" } },
              { type: "string", name: "cta_label", label: "Link-Text" },
              { type: "string", name: "cta_url", label: "Link-Ziel" },
              { type: "image", name: "image", label: "Über mich-Bild" },
              { type: "string", name: "image_credit_label", label: "Bild-Credit (Text)" },
              { type: "string", name: "image_credit_url", label: "Bild-Credit (Link)" },
            ],
          },
          {
            type: "object",
            name: "testimonials_section",
            label: "Stimmen-Header",
            fields: headlineFields,
          },
          {
            type: "object",
            name: "image_break_2",
            label: "Bild-Sektion 2 (Praxis-Raum)",
            fields: [
              { type: "image", name: "image", label: "Bild" },
              { type: "string", name: "alt", label: "Alt-Text" },
            ],
          },
          {
            type: "object",
            name: "process",
            label: "Ablauf",
            fields: [
              ...headlineFields,
              leadField,
              {
                type: "object",
                name: "steps",
                label: "4 Schritte",
                list: true,
                ui: { itemProps: (item: any) => ({ label: item?.title || "Neuer Schritt" }) },
                fields: [
                  { type: "string", name: "num", label: "Nummer (z.B. Schritt 01)" },
                  { type: "string", name: "title", label: "Titel" },
                  { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "quote",
            label: "Zitat (mittig auf Seite)",
            fields: [
              { type: "string", name: "text", label: "Zitat", ui: { component: "textarea" } },
              { type: "string", name: "author", label: "Autor*in" },
            ],
          },
          {
            type: "object",
            name: "faq_section",
            label: "FAQ-Header",
            fields: [...headlineFields, leadField],
          },
          {
            type: "object",
            name: "contact",
            label: "Kontakt-Sektion",
            fields: [...headlineFields, { type: "string", name: "text", label: "Text", ui: { component: "textarea" } }],
          },
        ],
      },

      // ===========================================================
      // METHODE
      // ===========================================================
      {
        name: "page_methode",
        label: "📄 Methode-Seite",
        path: "src/_data/pages",
        format: "json",
        match: { include: "methode" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "subtitle", label: "Seiten-Untertitel" },
          { type: "object", name: "hero", label: "Hero", fields: [...headlineFields, leadField] },
          {
            type: "object",
            name: "section_systemisch",
            label: "Sektion: Systemisch denken",
            fields: [
              ...headlineFields,
              { type: "string", name: "paragraphs", label: "Absätze", list: true, ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "pull_quote",
            label: "Pull-Quote (zwischen Sektionen)",
            fields: [
              { type: "string", name: "text", label: "Zitat", ui: { component: "textarea" } },
              { type: "string", name: "cite", label: "Quelle" },
            ],
          },
          {
            type: "object",
            name: "section_loesungsorientiert",
            label: "Sektion: Lösungsorientiert",
            fields: [
              ...headlineFields,
              { type: "string", name: "paragraphs", label: "Absätze", list: true, ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "factors",
            label: "Sechs Resilienz-Faktoren",
            fields: [
              ...headlineFields,
              leadField,
              {
                type: "object",
                name: "items",
                label: "Faktoren",
                list: true,
                ui: { itemProps: (item: any) => ({ label: item?.title || "Neuer Faktor" }) },
                fields: [
                  { type: "string", name: "num", label: "Nummer" },
                  { type: "string", name: "title", label: "Titel" },
                  { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "section_profil",
            label: "Sektion: Resilienz-Profil",
            fields: [
              ...headlineFields,
              { type: "string", name: "paragraphs", label: "Absätze", list: true, ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "section_science",
            label: "Sektion: Wissenschaftlich fundiert",
            fields: [
              ...headlineFields,
              { type: "string", name: "paragraphs", label: "Absätze", list: true, ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "compare",
            label: "Compare-Block (Was du NICHT bekommst / Was du bekommst)",
            fields: [
              {
                type: "object",
                name: "minus",
                label: "Linke Karte: Was du NICHT bekommst",
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "headline", label: "Headline" },
                  { type: "string", name: "items", label: "Punkte", list: true },
                ],
              },
              {
                type: "object",
                name: "plus",
                label: "Rechte Karte: Was du bekommst",
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "headline", label: "Headline" },
                  { type: "string", name: "items", label: "Punkte", list: true },
                ],
              },
            ],
          },
        ],
      },

      // ===========================================================
      // ANGEBOT
      // ===========================================================
      {
        name: "page_angebot",
        label: "📄 Angebot-Seite",
        path: "src/_data/pages",
        format: "json",
        match: { include: "angebot" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "subtitle", label: "Seiten-Untertitel" },
          { type: "object", name: "hero", label: "Hero", fields: [...headlineFields, leadField] },
          {
            type: "object",
            name: "offers",
            label: "Angebote (3 Formate)",
            list: true,
            ui: { itemProps: (item: any) => ({ label: item?.title || "Neues Angebot" }) },
            fields: [
              { type: "string", name: "id", label: "Anker-ID (z.B. einzel)" },
              { type: "string", name: "num", label: "Format-Nummer" },
              { type: "string", name: "title_prefix", label: "Titel-Prefix (z.B. Das)" },
              { type: "string", name: "title", label: "Titel (fett)" },
              { type: "string", name: "lead", label: "Einleitung", ui: { component: "textarea" } },
              { type: "string", name: "format_label", label: "Format-Label (z.B. Format)" },
              { type: "string", name: "format_items", label: "Format-Punkte", list: true },
              { type: "string", name: "investment_label", label: "Investition-Label" },
              { type: "string", name: "investment_text", label: "Investition-Text" },
              { type: "string", name: "cta_label", label: "Button-Text" },
              {
                type: "string",
                name: "cta_modal",
                label: "Welches Formular?",
                options: ["einzel", "prozess", "gruppe", "allgemein"],
              },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "CTA-Block am Seitenende",
            fields: [...headlineFields, { type: "string", name: "text", label: "Text", ui: { component: "textarea" } }],
          },
        ],
      },

      // ===========================================================
      // B2B
      // ===========================================================
      {
        name: "page_b2b",
        label: "📄 B2B-Seite",
        path: "src/_data/pages",
        format: "json",
        match: { include: "b2b" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "subtitle", label: "Seiten-Untertitel" },
          { type: "object", name: "hero", label: "Hero", fields: [...headlineFields, leadField] },
          {
            type: "object",
            name: "method",
            label: "Methode-Sektion (3 Säulen)",
            fields: [
              ...headlineFields,
              leadField,
              {
                type: "object",
                name: "items",
                label: "3 Methoden-Karten",
                list: true,
                ui: { itemProps: (item: any) => ({ label: item?.title || "Neue Karte" }) },
                fields: [
                  { type: "string", name: "num", label: "Nummer" },
                  { type: "string", name: "title", label: "Titel" },
                  { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "image_break",
            label: "Bild-Sektion",
            fields: [
              { type: "image", name: "image", label: "Bild" },
              { type: "string", name: "alt", label: "Alt-Text" },
            ],
          },
          {
            type: "object",
            name: "services",
            label: "Angebot-Sektion (3 Formate)",
            fields: [
              ...headlineFields,
              leadField,
              {
                type: "object",
                name: "items",
                label: "3 Service-Karten",
                list: true,
                ui: { itemProps: (item: any) => ({ label: item?.title || "Neue Karte" }) },
                fields: [
                  { type: "string", name: "num", label: "Nummer" },
                  { type: "string", name: "title", label: "Titel" },
                  { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
                  {
                    type: "string",
                    name: "cta_modal",
                    label: "Welches Formular?",
                    options: ["einzel", "prozess", "gruppe", "allgemein"],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "topics",
            label: "Themen-Tags",
            fields: [
              { type: "string", name: "eyebrow", label: "Überschrift" },
              { type: "string", name: "tags", label: "Tags", list: true },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "CTA-Block am Seitenende",
            fields: [...headlineFields, { type: "string", name: "text", label: "Text", ui: { component: "textarea" } }],
          },
        ],
      },

      // ===========================================================
      // MEINE GESCHICHTE
      // ===========================================================
      {
        name: "page_meine_geschichte",
        label: "📄 Meine-Geschichte-Seite",
        path: "src/_data/pages",
        format: "json",
        match: { include: "meine_geschichte" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "subtitle", label: "Seiten-Untertitel" },
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              ...headlineFields,
              leadField,
              { type: "image", name: "image", label: "Portrait" },
              { type: "string", name: "image_credit_label", label: "Bild-Credit (Text)" },
              { type: "string", name: "image_credit_url", label: "Bild-Credit (Link)" },
            ],
          },
          {
            type: "object",
            name: "section_herkunft",
            label: "Sektion: Wo ich herkomme",
            fields: [
              ...headlineFields,
              { type: "string", name: "paragraphs", label: "Absätze", list: true, ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "section_wendepunkt",
            label: "Sektion: Der Wendepunkt",
            fields: [
              ...headlineFields,
              { type: "string", name: "paragraphs", label: "Absätze", list: true, ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "pull_quote",
            label: "Pull-Quote",
            fields: [{ type: "string", name: "text", label: "Zitat", ui: { component: "textarea" } }],
          },
          {
            type: "object",
            name: "section_ueberzeugungen",
            label: "Sektion: Überzeugungen (mit Sessel-Bild)",
            fields: [
              { type: "image", name: "image", label: "Bild (Sessel)" },
              { type: "string", name: "image_alt", label: "Alt-Text" },
              ...headlineFields,
              {
                type: "object",
                name: "convictions",
                label: "Überzeugungen",
                list: true,
                ui: { itemProps: (item: any) => ({ label: item?.bold || "Neue Überzeugung" }) },
                fields: [
                  { type: "string", name: "bold", label: "Fett-Beginn der Überzeugung" },
                  { type: "string", name: "text", label: "Text danach", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "section_heute",
            label: "Sektion: Heute",
            fields: [
              ...headlineFields,
              { type: "string", name: "paragraph_1", label: "Absatz 1", ui: { component: "textarea" } },
              { type: "string", name: "paragraph_2_html", label: "Absatz 2 (kann HTML enthalten — z.B. <a> Links)", ui: { component: "textarea" } },
              { type: "string", name: "paragraph_3", label: "Absatz 3" },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "CTA-Block am Seitenende",
            fields: [...headlineFields, { type: "string", name: "text", label: "Text", ui: { component: "textarea" } }],
          },
        ],
      },

      // ===========================================================
      // SITE / NAV / FOOTER / SHARED COLLECTIONS
      // ===========================================================
      {
        name: "site",
        label: "⚙️ Globale Einstellungen",
        path: "src/_data",
        format: "json",
        match: { include: "site" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "name", label: "Brand Name" },
          { type: "string", name: "subtitle", label: "Untertitel" },
          { type: "string", name: "cta_label", label: "Globaler CTA-Button Text" },
          {
            type: "object",
            name: "contact",
            label: "Kontakt",
            fields: [
              { type: "string", name: "email", label: "E-Mail" },
              { type: "string", name: "phone", label: "Telefon" },
              { type: "string", name: "website", label: "Website" },
              { type: "string", name: "social", label: "Social" },
              { type: "string", name: "location", label: "Standort" },
            ],
          },
        ],
      },

      {
        name: "testimonials",
        label: "💬 Stimmen / Testimonials",
        path: "src/_data",
        format: "json",
        match: { include: "testimonials" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Zitate",
            list: true,
            ui: { itemProps: (item: any) => ({ label: `${item?.name || "—"} · ${item?.role || ""}` }) },
            fields: [
              { type: "string", name: "quote", label: "Zitat", ui: { component: "textarea" } },
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "role", label: "Rolle / Position" },
            ],
          },
        ],
      },

      {
        name: "faq",
        label: "❓ FAQ",
        path: "src/_data",
        format: "json",
        match: { include: "faq" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Fragen & Antworten",
            list: true,
            ui: { itemProps: (item: any) => ({ label: item?.question || "Neue Frage" }) },
            fields: [
              { type: "string", name: "question", label: "Frage" },
              { type: "string", name: "answer", label: "Antwort", ui: { component: "textarea" } },
            ],
          },
        ],
      },

      {
        name: "topics",
        label: "🏷️ Themen-Tags (Landing)",
        path: "src/_data",
        format: "json",
        match: { include: "topics" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "eyebrow", label: "Überschrift" },
          { type: "string", name: "tags", label: "Tags", list: true },
        ],
      },

      {
        name: "nav",
        label: "🧭 Navigation",
        path: "src/_data",
        format: "json",
        match: { include: "nav" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Nav-Punkte",
            list: true,
            ui: { itemProps: (item: any) => ({ label: item?.label || "—" }) },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "url", label: "URL" },
            ],
          },
        ],
      },

      {
        name: "footer",
        label: "🦶 Footer",
        path: "src/_data",
        format: "json",
        match: { include: "footer" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "links",
            label: "Footer Links",
            list: true,
            ui: { itemProps: (item: any) => ({ label: item?.label || "—" }) },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "url", label: "URL" },
            ],
          },
        ],
      },

      // ===========================================================
      // RECHTLICHES (Impressum / Datenschutz)
      // ===========================================================
      {
        name: "pages",
        label: "📜 Rechtliches (Impressum / Datenschutz)",
        path: "src",
        format: "md",
        match: { include: "{impressum,datenschutz}" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Seitentitel" },
          { type: "string", name: "eyebrow", label: "Eyebrow" },
          { type: "string", name: "subtitle", label: "Untertitel" },
          { type: "rich-text", name: "body", label: "Inhalt", isBody: true },
        ],
      },
    ],
  },
});
