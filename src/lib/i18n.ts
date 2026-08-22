/**
 * 화면의 말.
 *
 * 문서의 언어가 화면의 언어를 정한다 — 영어 약관을 열었는데 «시행일»이 한국어면,
 * 그건 번역이 덜 된 게 아니라 **읽을 수 없는 계약서를 건네는 일**이다.
 *
 * 문구는 여기 리소스에만 있다. 화면은 문장을 짓지 않고 `strings(locale)`을 부른다.
 */

export type Strings = {
  archive: string;
  allApps: string;
  effectiveOn: string;
  edition: string;
  language: string;
  editionNo: (n: number) => string;
  effectiveSince: (date: string) => string;
  upcoming: (date: string, n: number) => string;
  archivedNotice: string;
  currentOne: (kind: string) => string;
  pastVersions: string;
  docCount: (n: number) => string;
  nothingPublished: string;
  pickLanguage: string;
  toLight: string;
  toDark: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundCta: string;
  kinds: Record<string, string>;
};

const ko: Strings = {
  archive: "약관 보관소",
  allApps: "모든 앱",
  effectiveOn: "시행일",
  edition: "판",
  language: "언어",
  editionNo: (n) => `제 ${n} 판`,
  effectiveSince: (date) => `${date} 시행`,
  upcoming: (date, n) => `${date}부터 제 ${n} 판이 시행됩니다.`,
  archivedNotice: "지난 판본입니다 — 지금 유효한 것은",
  currentOne: (kind) => `현행 ${kind}`,
  pastVersions: "지난 판본",
  docCount: (n) => `문서 ${n}`,
  nothingPublished: "아직 펴낸 문서가 없습니다.",
  pickLanguage: "언어 고르기",
  toLight: "밝은 화면으로",
  toDark: "어두운 화면으로",
  notFoundTitle: "여기엔 아무 약관도 없습니다",
  notFoundBody: "주소를 다시 확인하시거나, 처음으로 돌아가 앱을 골라주세요.",
  notFoundCta: "모든 앱 보기",
  kinds: {
    terms: "이용약관",
    privacy: "개인정보 처리방침",
    opensource: "오픈소스 고지",
    refund: "환불 정책",
    custom: "문서",
  },
};

const en: Strings = {
  archive: "Legal documents",
  allApps: "All apps",
  effectiveOn: "Effective",
  edition: "Version",
  language: "Language",
  editionNo: (n) => `Version ${n}`,
  effectiveSince: (date) => `Effective ${date}`,
  upcoming: (date, n) => `Version ${n} takes effect on ${date}.`,
  archivedNotice: "This is a past version — the one in force is the",
  currentOne: (kind) => `current ${kind}`,
  pastVersions: "Past versions",
  docCount: (n) => `${n} document${n === 1 ? "" : "s"}`,
  nothingPublished: "Nothing has been published yet.",
  pickLanguage: "Choose a language",
  toLight: "Switch to light",
  toDark: "Switch to dark",
  notFoundTitle: "There is nothing here",
  notFoundBody: "Check the address, or go back and pick an app.",
  notFoundCta: "See all apps",
  kinds: {
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    opensource: "Open Source Notices",
    refund: "Refund Policy",
    custom: "Document",
  },
};

const ja: Strings = {
  archive: "規約と方針",
  allApps: "すべてのアプリ",
  effectiveOn: "施行日",
  edition: "版",
  language: "言語",
  editionNo: (n) => `第 ${n} 版`,
  effectiveSince: (date) => `${date} 施行`,
  upcoming: (date, n) => `${date}から第 ${n} 版が施行されます。`,
  archivedNotice: "これは過去の版です — 現在有効なのは",
  currentOne: (kind) => `現行の${kind}`,
  pastVersions: "過去の版",
  docCount: (n) => `文書 ${n}`,
  nothingPublished: "まだ公開された文書はありません。",
  pickLanguage: "言語を選ぶ",
  toLight: "ライトモードに",
  toDark: "ダークモードに",
  notFoundTitle: "ここには何もありません",
  notFoundBody: "アドレスをご確認いただくか、最初に戻ってアプリをお選びください。",
  notFoundCta: "すべてのアプリを見る",
  kinds: {
    terms: "利用規約",
    privacy: "プライバシーポリシー",
    opensource: "オープンソースライセンス",
    refund: "返金ポリシー",
    custom: "文書",
  },
};

const zhCN: Strings = {
  archive: "条款与政策",
  allApps: "全部应用",
  effectiveOn: "生效日期",
  edition: "版本",
  language: "语言",
  editionNo: (n) => `第 ${n} 版`,
  effectiveSince: (date) => `${date} 生效`,
  upcoming: (date, n) => `第 ${n} 版将于 ${date} 生效。`,
  archivedNotice: "这是历史版本 — 目前有效的是",
  currentOne: (kind) => `现行${kind}`,
  pastVersions: "历史版本",
  docCount: (n) => `${n} 份文件`,
  nothingPublished: "尚未发布任何文件。",
  pickLanguage: "选择语言",
  toLight: "切换到浅色",
  toDark: "切换到深色",
  notFoundTitle: "这里什么也没有",
  notFoundBody: "请检查网址，或返回首页选择应用。",
  notFoundCta: "查看全部应用",
  kinds: {
    terms: "服务条款",
    privacy: "隐私政策",
    opensource: "开源声明",
    refund: "退款政策",
    custom: "文件",
  },
};

const zhTW: Strings = {
  ...zhCN,
  archive: "條款與政策",
  allApps: "全部應用程式",
  effectiveOn: "生效日期",
  edition: "版本",
  language: "語言",
  effectiveSince: (date) => `${date} 生效`,
  upcoming: (date, n) => `第 ${n} 版將於 ${date} 生效。`,
  archivedNotice: "這是歷史版本 — 目前有效的是",
  currentOne: (kind) => `現行${kind}`,
  pastVersions: "歷史版本",
  docCount: (n) => `${n} 份文件`,
  nothingPublished: "尚未發布任何文件。",
  pickLanguage: "選擇語言",
  toLight: "切換至淺色",
  toDark: "切換至深色",
  notFoundTitle: "這裡什麼也沒有",
  notFoundBody: "請檢查網址，或返回首頁選擇應用程式。",
  notFoundCta: "查看全部應用程式",
  kinds: {
    terms: "服務條款",
    privacy: "隱私權政策",
    opensource: "開源聲明",
    refund: "退款政策",
    custom: "文件",
  },
};

const es: Strings = {
  archive: "Documentos legales",
  allApps: "Todas las apps",
  effectiveOn: "En vigor desde",
  edition: "Versión",
  language: "Idioma",
  editionNo: (n) => `Versión ${n}`,
  effectiveSince: (date) => `En vigor desde el ${date}`,
  upcoming: (date, n) => `La versión ${n} entra en vigor el ${date}.`,
  archivedNotice: "Esta es una versión anterior — la vigente es",
  currentOne: (kind) => `${kind} vigente`,
  pastVersions: "Versiones anteriores",
  docCount: (n) => `${n} documento${n === 1 ? "" : "s"}`,
  nothingPublished: "Todavía no se ha publicado nada.",
  pickLanguage: "Elegir idioma",
  toLight: "Cambiar a claro",
  toDark: "Cambiar a oscuro",
  notFoundTitle: "Aquí no hay nada",
  notFoundBody: "Comprueba la dirección o vuelve al inicio y elige una app.",
  notFoundCta: "Ver todas las apps",
  kinds: {
    terms: "Términos del servicio",
    privacy: "Política de privacidad",
    opensource: "Avisos de código abierto",
    refund: "Política de reembolsos",
    custom: "Documento",
  },
};

const de: Strings = {
  archive: "Rechtliche Dokumente",
  allApps: "Alle Apps",
  effectiveOn: "Gültig ab",
  edition: "Fassung",
  language: "Sprache",
  editionNo: (n) => `Fassung ${n}`,
  effectiveSince: (date) => `Gültig ab ${date}`,
  upcoming: (date, n) => `Fassung ${n} tritt am ${date} in Kraft.`,
  archivedNotice: "Dies ist eine frühere Fassung — gültig ist die",
  currentOne: (kind) => `aktuelle ${kind}`,
  pastVersions: "Frühere Fassungen",
  docCount: (n) => `${n} Dokument${n === 1 ? "" : "e"}`,
  nothingPublished: "Es wurde noch nichts veröffentlicht.",
  pickLanguage: "Sprache wählen",
  toLight: "Zu Hell wechseln",
  toDark: "Zu Dunkel wechseln",
  notFoundTitle: "Hier ist nichts",
  notFoundBody: "Prüfen Sie die Adresse oder wählen Sie auf der Startseite eine App.",
  notFoundCta: "Alle Apps ansehen",
  kinds: {
    terms: "Nutzungsbedingungen",
    privacy: "Datenschutzerklärung",
    opensource: "Open-Source-Hinweise",
    refund: "Rückerstattungsrichtlinie",
    custom: "Dokument",
  },
};

const fr: Strings = {
  archive: "Documents juridiques",
  allApps: "Toutes les applis",
  effectiveOn: "En vigueur le",
  edition: "Version",
  language: "Langue",
  editionNo: (n) => `Version ${n}`,
  effectiveSince: (date) => `En vigueur le ${date}`,
  upcoming: (date, n) => `La version ${n} entre en vigueur le ${date}.`,
  archivedNotice: "Ceci est une version antérieure — celle en vigueur est",
  currentOne: (kind) => `${kind} en vigueur`,
  pastVersions: "Versions antérieures",
  docCount: (n) => `${n} document${n === 1 ? "" : "s"}`,
  nothingPublished: "Rien n'a encore été publié.",
  pickLanguage: "Choisir la langue",
  toLight: "Passer en clair",
  toDark: "Passer en sombre",
  notFoundTitle: "Il n'y a rien ici",
  notFoundBody: "Vérifiez l'adresse, ou revenez à l'accueil et choisissez une appli.",
  notFoundCta: "Voir toutes les applis",
  kinds: {
    terms: "Conditions d'utilisation",
    privacy: "Politique de confidentialité",
    opensource: "Mentions open source",
    refund: "Politique de remboursement",
    custom: "Document",
  },
};


const it: Strings = {
  archive: "Termini e informative",
  allApps: "Tutte le app",
  effectiveOn: "In vigore dal",
  edition: "Versione",
  language: "Lingua",
  editionNo: (n) => `Versione ${n}`,
  effectiveSince: (date) => `In vigore dal ${date}`,
  upcoming: (date, n) => `La versione ${n} entrerà in vigore il ${date}.`,
  archivedNotice: "Questa è una versione passata — quella in vigore è",
  currentOne: (kind) => `${kind} in vigore`,
  pastVersions: "Versioni precedenti",
  docCount: (n) => `${n} documenti`,
  nothingPublished: "Non è ancora stato pubblicato nulla.",
  pickLanguage: "Scegli la lingua",
  toLight: "Passa al tema chiaro",
  toDark: "Passa al tema scuro",
  notFoundTitle: "Qui non c'è nulla",
  notFoundBody: "Controlla l'indirizzo oppure torna all'inizio e scegli un'app.",
  notFoundCta: "Vedi tutte le app",
  kinds: {
    terms: "Termini di servizio",
    privacy: "Informativa sulla privacy",
    opensource: "Note open source",
    refund: "Politica di rimborso",
    custom: "Documento",
  },
};

const ptBR: Strings = {
  archive: "Termos e políticas",
  allApps: "Todos os aplicativos",
  effectiveOn: "Em vigor desde",
  edition: "Versão",
  language: "Idioma",
  editionNo: (n) => `Versão ${n}`,
  effectiveSince: (date) => `Em vigor desde ${date}`,
  upcoming: (date, n) => `A versão ${n} entra em vigor em ${date}.`,
  archivedNotice: "Esta é uma versão anterior — a que vale agora é",
  currentOne: (kind) => `${kind} em vigor`,
  pastVersions: "Versões anteriores",
  docCount: (n) => `${n} documentos`,
  nothingPublished: "Nada publicado ainda.",
  pickLanguage: "Escolher idioma",
  toLight: "Mudar para o tema claro",
  toDark: "Mudar para o tema escuro",
  notFoundTitle: "Não há nada aqui",
  notFoundBody: "Confira o endereço ou volte ao início e escolha um aplicativo.",
  notFoundCta: "Ver todos os aplicativos",
  kinds: {
    terms: "Termos de serviço",
    privacy: "Política de privacidade",
    opensource: "Avisos de código aberto",
    refund: "Política de reembolso",
    custom: "Documento",
  },
};

const id: Strings = {
  archive: "Ketentuan dan kebijakan",
  allApps: "Semua aplikasi",
  effectiveOn: "Berlaku sejak",
  edition: "Versi",
  language: "Bahasa",
  editionNo: (n) => `Versi ${n}`,
  effectiveSince: (date) => `Berlaku sejak ${date}`,
  upcoming: (date, n) => `Versi ${n} berlaku mulai ${date}.`,
  archivedNotice: "Ini versi lama — yang berlaku sekarang adalah",
  currentOne: (kind) => `${kind} yang berlaku`,
  pastVersions: "Versi sebelumnya",
  docCount: (n) => `${n} dokumen`,
  nothingPublished: "Belum ada dokumen yang diterbitkan.",
  pickLanguage: "Pilih bahasa",
  toLight: "Ke tampilan terang",
  toDark: "Ke tampilan gelap",
  notFoundTitle: "Tidak ada apa pun di sini",
  notFoundBody: "Periksa kembali alamatnya, atau kembali ke awal dan pilih aplikasi.",
  notFoundCta: "Lihat semua aplikasi",
  kinds: {
    terms: "Ketentuan Layanan",
    privacy: "Kebijakan Privasi",
    opensource: "Pemberitahuan sumber terbuka",
    refund: "Kebijakan pengembalian dana",
    custom: "Dokumen",
  },
};

/*
 * 열쇠는 **앱이 부르는 코드**다.
 *
 * 안드로이드 앱이 `policy_locale` 로 보내는 그대로여야 `/api/v1/…/<locale>.json` 이 맞는다.
 * 그래서 중국어가 `zh`·`zh-Hant` 가 아니라 `zh-CN`·`zh-TW` 다 — 표준이 하나가 아닐 때는
 * **먼저 배포된 쪽**에 맞춘다. 이미 사용자의 기기에 들어가 있는 코드는 우리가 못 바꾼다.
 * `zh` 하나만 오는 경우를 위해 별칭을 남겨 둔다.
 */
const TABLE: Record<string, Strings> = {
  ko, en, ja, es, de, fr, it, id,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  "pt-BR": ptBR,
  zh: zhCN,
  pt: ptBR,
};

/** 화면의 말 한 벌. 모르는 언어는 영어로 — 한국어로 되돌리면 못 읽는 사람이 생긴다. */
export function strings(locale: string): Strings {
  return TABLE[locale] ?? TABLE[locale.split("-")[0]] ?? en;
}
