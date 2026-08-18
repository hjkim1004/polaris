export type Site = {
  name: string;
  tagline: string;
  domain: string;
  contactEmail: string;
  defaultLocale: string;
};
export type AppMeta = {
  slug: string;
  name: string;
  description: string;
  defaultLocale: string;
  homepage: string;
};
export type DocMeta = { slug: string; appSlug: string; name: string; kind: string; order: number };
export type VersionDoc = {
  appSlug: string;
  docSlug: string;
  locale: string;
  version: number;
  title: string;
  status: "draft" | "published";
  effectiveAt: string;
  summary: string;
  body: string;
};

export const CONTENT_DIR: string;
export function parseFrontmatter(raw: string): { data: Record<string, string>; body: string };
export function toFrontmatter(data: Record<string, unknown>, body: string): string;
export function readSite(): Site;
export function listApps(): AppMeta[];
export function readApp(slug: string): AppMeta | null;
export function listDocs(appSlug: string): DocMeta[];
export function readDoc(appSlug: string, docSlug: string): DocMeta | null;
export function listLocales(appSlug: string, docSlug: string): string[];
export function listVersions(appSlug: string, docSlug: string, locale: string): VersionDoc[];
export function readVersion(
  appSlug: string,
  docSlug: string,
  locale: string,
  version: number,
): VersionDoc | null;
export function nextVersionNo(appSlug: string, docSlug: string, locale: string): number;
export function currentVersion(
  appSlug: string,
  docSlug: string,
  locale: string,
  now?: string,
): VersionDoc | null;
export function upcomingVersion(
  appSlug: string,
  docSlug: string,
  locale: string,
  now?: string,
): VersionDoc | null;
export function pastVersions(
  appSlug: string,
  docSlug: string,
  locale: string,
  now?: string,
): VersionDoc[];
export function resolve(
  appSlug: string,
  docSlug: string,
  wanted: string,
): { version: VersionDoc; servedLocale: string; requestedLocale: string } | null;
export function publishedLocales(appSlug: string, docSlug: string): string[];
export function everyRoute(): { app: string; doc: string; locale: string }[];
