import { defineConfig } from "tinacms";

// Tina Cloud credentials — siehe README für Setup
const branch = process.env.GITHUB_BRANCH || process.env.HEAD || "main";
const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "";
const token = process.env.TINA_TOKEN || "";

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
      // ---------- Site Config ----------
      {
        name: "site",
        label: "Site Settings",
        path: "src/_data",
        format: "json",
        match: { include: "site" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "name", label: "Brand Name" },
          { type: "string", name: "subtitle", label: "Untertitel" },
          { type: "string", name: "cta_label", label: "CTA-Button Label" },
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

      // ---------- Testimonials ----------
      {
        name: "testimonials",
        label: "Stimmen / Testimonials",
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
            ui: {
              itemProps: (item) => ({
                label: `${item?.name || "—"} · ${item?.role || ""}`,
              }),
            },
            fields: [
              { type: "string", name: "quote", label: "Zitat", ui: { component: "textarea" } },
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "role", label: "Rolle / Position" },
            ],
          },
        ],
      },

      // ---------- FAQ ----------
      {
        name: "faq",
        label: "FAQ",
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
            ui: {
              itemProps: (item) => ({ label: item?.question || "Neue Frage" }),
            },
            fields: [
              { type: "string", name: "question", label: "Frage" },
              { type: "string", name: "answer", label: "Antwort", ui: { component: "textarea" } },
            ],
          },
        ],
      },

      // ---------- Topics / Tags ----------
      {
        name: "topics",
        label: "Themen-Tags (Landing)",
        path: "src/_data",
        format: "json",
        match: { include: "topics" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "eyebrow", label: "Überschrift" },
          { type: "string", name: "tags", label: "Tags", list: true },
        ],
      },

      // ---------- Nav ----------
      {
        name: "nav",
        label: "Navigation",
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
            ui: { itemProps: (item) => ({ label: item?.label || "—" }) },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "url", label: "URL" },
            ],
          },
        ],
      },

      // ---------- Footer ----------
      {
        name: "footer",
        label: "Footer",
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
            ui: { itemProps: (item) => ({ label: item?.label || "—" }) },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "url", label: "URL" },
            ],
          },
        ],
      },

      // ---------- Pages (Hero + Frontmatter editierbar) ----------
      {
        name: "pages",
        label: "Seiten (Hero + Meta)",
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
