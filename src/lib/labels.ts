export const DOC_KINDS = [
  { value: "terms", label: "이용약관", slug: "terms" },
  { value: "privacy", label: "개인정보 처리방침", slug: "privacy" },
  { value: "opensource", label: "오픈소스 고지", slug: "opensource" },
  { value: "refund", label: "환불 정책", slug: "refund" },
  { value: "custom", label: "직접 정하기", slug: "" },
] as const;

/**
 * 펴낼 수 있는 언어 — **앱이 부르는 코드 그대로**다.
 *
 * 중국어가 `zh`·`zh-Hant` 가 아니라 `zh-CN`·`zh-TW` 인 이유: 안드로이드 앱이 그 코드로
 * `/api/v1/…/<locale>.json` 을 부른다. 표준이 하나가 아닐 때는 **먼저 배포된 쪽**에 맞춘다 —
 * 이미 사용자 기기에 들어간 코드는 우리가 못 바꾸고, 못 바꾸는 쪽이 기준이 된다.
 */
export const LOCALES = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
  { value: "zh-CN", label: "简体中文" },
  { value: "zh-TW", label: "繁體中文" },
  { value: "es", label: "Español" },
  { value: "de", label: "Deutsch" },
  { value: "fr", label: "Français" },
  { value: "it", label: "Italiano" },
  { value: "pt-BR", label: "Português (BR)" },
  { value: "id", label: "Bahasa Indonesia" },
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
