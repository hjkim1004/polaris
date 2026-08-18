// 내용은 저장소의 파일이다 — 서버도 DB도 없다. 이력은 git이 기억한다.
//
//   content/site.json
//   content/apps/<app>/app.json
//   content/apps/<app>/<doc>/doc.json
//   content/apps/<app>/<doc>/<locale>/<version>.md
//
// 이 모듈은 화면(Next)과 API 생성 스크립트(node)가 함께 읽는다. 그래서 순수 ESM이다.

import fs from "node:fs";
import path from "node:path";

export const CONTENT_DIR = path.join(process.cwd(), "content");
const APPS_DIR = path.join(CONTENT_DIR, "apps");

/* ── 파일 머리말 ────────────────────────────────────────────── */

/** `---` 로 감싼 머리말을 읽는다. 값은 항상 한 줄짜리 문자열이라 YAML 전부는 필요 없다. */
export function parseFrontmatter(raw) {
  // 밖에서 고친 파일이 CRLF로 와도 읽는 쪽에서 한 번 고른다.
  const text = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return { data: {}, body: text.trim() };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const at = line.indexOf(":");
    if (at === -1) continue;
    const key = line.slice(0, at).trim();
    let value = line.slice(at + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    if (key) data[key] = value;
  }
  return { data, body: text.slice(match[0].length).trim() };
}

export function toFrontmatter(data, body) {
  // 브라우저의 textarea는 줄바꿈을 CRLF로 보낸다 — 파일에는 LF만 남긴다.
  const text = String(body).replace(/\r\n/g, "\n");
  const lines = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k}: "${String(v).replace(/"/g, '\\"')}"`);
  return `---\n${lines.join("\n")}\n---\n\n${text.trim()}\n`;
}

/* ── 읽기 ───────────────────────────────────────────────────── */

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function dirs(where) {
  try {
    return fs
      .readdirSync(where, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

export function readSite() {
  const site = readJson(path.join(CONTENT_DIR, "site.json"), {});
  return {
    name: site.name || "Polaris",
    tagline: site.tagline || "",
    domain: site.domain || "",
    contactEmail: site.contactEmail || "",
    // 목록 화면(홈·앱)에는 문서가 없으니 언어를 정해 줄 것도 없다. 사이트가 정한다.
    defaultLocale: site.defaultLocale || "ko",
  };
}

export function listApps() {
  return dirs(APPS_DIR)
    .map((slug) => readApp(slug))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

export function readApp(slug) {
  const file = path.join(APPS_DIR, slug, "app.json");
  if (!fs.existsSync(file)) return null;
  const meta = readJson(file, {});
  return {
    slug,
    name: meta.name || slug,
    description: meta.description || "",
    defaultLocale: meta.defaultLocale || "ko",
    homepage: meta.homepage || "",
  };
}

export function listDocs(appSlug) {
  return dirs(path.join(APPS_DIR, appSlug))
    .map((docSlug) => readDoc(appSlug, docSlug))
    .filter(Boolean)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.name.localeCompare(b.name, "ko"));
}

export function readDoc(appSlug, docSlug) {
  const file = path.join(APPS_DIR, appSlug, docSlug, "doc.json");
  if (!fs.existsSync(file)) return null;
  const meta = readJson(file, {});
  return {
    slug: docSlug,
    appSlug,
    name: meta.name || docSlug,
    kind: meta.kind || "custom",
    order: typeof meta.order === "number" ? meta.order : 99,
  };
}

export function listLocales(appSlug, docSlug) {
  return dirs(path.join(APPS_DIR, appSlug, docSlug));
}

/** 한 언어의 모든 판본. 새 것이 앞에 온다. */
export function listVersions(appSlug, docSlug, locale) {
  const where = path.join(APPS_DIR, appSlug, docSlug, locale);
  let files = [];
  try {
    files = fs.readdirSync(where).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  return files
    .map((f) => readVersion(appSlug, docSlug, locale, Number(f.replace(/\.md$/, ""))))
    .filter(Boolean)
    .sort((a, b) => b.version - a.version);
}

export function readVersion(appSlug, docSlug, locale, version) {
  const file = path.join(APPS_DIR, appSlug, docSlug, locale, `${version}.md`);
  if (!Number.isFinite(version) || !fs.existsSync(file)) return null;
  const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
  return {
    appSlug,
    docSlug,
    locale,
    version,
    title: data.title || "",
    status: data.status === "published" ? "published" : "draft",
    effectiveAt: data.effectiveAt || "",
    summary: data.summary || "",
    body,
  };
}

export function nextVersionNo(appSlug, docSlug, locale) {
  const all = listVersions(appSlug, docSlug, locale);
  return all.length ? all[0].version + 1 : 1;
}

/* ── 무엇을 내보낼 것인가 ───────────────────────────────────── */

const today = () => new Date().toISOString().slice(0, 10);

/** 지금 유효한 판본 — 펴냈고, 발효일이 지났고, 그중 가장 최근 것. */
export function currentVersion(appSlug, docSlug, locale, now = today()) {
  return (
    listVersions(appSlug, docSlug, locale)
      .filter((v) => v.status === "published" && v.effectiveAt && v.effectiveAt <= now)
      .sort((a, b) => (a.effectiveAt < b.effectiveAt ? 1 : a.effectiveAt > b.effectiveAt ? -1 : b.version - a.version))[0] || null
  );
}

/** 아직 오지 않은 판본 — 날짜만 기다린다. */
export function upcomingVersion(appSlug, docSlug, locale, now = today()) {
  return (
    listVersions(appSlug, docSlug, locale)
      .filter((v) => v.status === "published" && v.effectiveAt > now)
      .sort((a, b) => (a.effectiveAt < b.effectiveAt ? -1 : 1))[0] || null
  );
}

/** 지난 판본들 — 새 것부터. */
export function pastVersions(appSlug, docSlug, locale, now = today()) {
  const current = currentVersion(appSlug, docSlug, locale, now);
  return listVersions(appSlug, docSlug, locale).filter(
    (v) => v.status === "published" && v.effectiveAt <= now && v.version !== current?.version,
  );
}

/** 요청한 언어에 없으면 지역을 떼어 보고, 그래도 없으면 앱의 기본 언어로 되돌아간다. */
export function resolve(appSlug, docSlug, wanted) {
  const app = readApp(appSlug);
  if (!app) return null;
  const tries = [wanted, String(wanted || "").split("-")[0], app.defaultLocale].filter(
    (l, i, all) => l && all.indexOf(l) === i,
  );
  for (const locale of tries) {
    const version = currentVersion(appSlug, docSlug, locale);
    if (version) return { version, servedLocale: locale, requestedLocale: wanted };
  }
  return null;
}

/** 지금 내보낼 수 있는 언어들 — 화면의 언어 고르개와 정적 경로가 이걸 쓴다. */
export function publishedLocales(appSlug, docSlug) {
  return listLocales(appSlug, docSlug).filter((l) => currentVersion(appSlug, docSlug, l));
}

/** 정적으로 구울 모든 (앱, 문서, 언어) 조합. */
export function everyRoute() {
  const out = [];
  for (const app of listApps()) {
    for (const doc of listDocs(app.slug)) {
      for (const locale of publishedLocales(app.slug, doc.slug)) {
        out.push({ app: app.slug, doc: doc.slug, locale });
      }
    }
  }
  return out;
}
