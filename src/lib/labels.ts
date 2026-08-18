export const DOC_KINDS = [
  { value: "terms", label: "이용약관", slug: "terms" },
  { value: "privacy", label: "개인정보 처리방침", slug: "privacy" },
  { value: "opensource", label: "오픈소스 고지", slug: "opensource" },
  { value: "refund", label: "환불 정책", slug: "refund" },
  { value: "custom", label: "직접 정하기", slug: "" },
] as const;

export const LOCALES = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
  { value: "zh", label: "简体中文" },
  { value: "zh-Hant", label: "繁體中文" },
  { value: "es", label: "Español" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
] as const;

export function localeLabel(code: string) {
  return LOCALES.find((l) => l.value === code)?.label ?? code;
}

export function kindLabel(kind: string) {
  return DOC_KINDS.find((k) => k.value === kind)?.label ?? "문서";
}

/** 문서 안의 날짜는 화면의 언어를 따른다. */
export function formatDate(iso: string, locale = "ko") {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
}
