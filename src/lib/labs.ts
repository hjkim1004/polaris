/**
 * 소개 화면의 말과 자료.
 *
 * 약관은 여러 언어로 자라지만(`i18n.ts`), 소개는 아직 한국어 한 벌이다.
 * 그래도 문장은 화면이 아니라 여기 있다 — 언젠가 영어를 더할 때
 * 화면을 뜯을 일이 없도록, 처음부터 말과 화면을 갈라 둔다.
 *
 * 앱이 하나 늘면 `APPS` 에 한 줄을 더한다. 화면은 고치지 않는다.
 */

/** 앱이 지금 어디쯤 와 있는가. 배지의 말은 `STATUS` 가 정한다. */
export type AppStatus = "live" | "testing" | "building";

export type LabApp = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  status: AppStatus;
  /** `public/apps/` 의 아이콘. 없으면 이름의 첫 글자가 얼굴이 된다. */
  icon?: string;
  /** 스토어 주소 — 아직 공개 전이면 비운다. */
  store?: string;
  /** 이 앱의 약관 자리 (Polaris 안). */
  terms?: string;
};

export const STATUS: Record<AppStatus, string> = {
  live: "출시됨",
  testing: "비공개 테스트 중",
  building: "만드는 중",
};

export const CONTACT_EMAIL = "twinkle.ai.labs@gmail.com";
export const BLOG_URL = "https://blog.twinklelabs.kr";

export const APPS: LabApp[] = [
  {
    slug: "stock-calculator",
    name: "물타기 계산기",
    tagline: "평단가는 머리로 굴릴 일이 아니다",
    blurb:
      "이미 산 값과 새로 살 값을 넣으면 평단가가 얼마로 내려가는지 바로 보입니다. 반대로 원하는 평단가를 넣으면 얼마어치를 더 사야 하는지 알려 줍니다. 종목을 저장해 두면 계산한 자리가 이력으로 남습니다.",
    status: "testing",
    icon: "/apps/stock-calculator.png",
    terms: "/t/stock-calculator/",
  },
];

export const HERO = {
  eyebrow: "Twinkle Labs",
  title: "난 스스로 빛난다",
  lead: "한 사람과 AI가 만드는 작은 유틸리티 앱들. 켜자마자 할 일이 끝나고, 쓰는 동안 생각할 것이 없는 도구를 만듭니다.",
  primary: { label: "만든 앱 보기", href: "#apps" },
  secondary: { label: "이름의 뜻", href: "#names" },
} as const;

/** 이름이 무엇을 뜻하는지 — Twinkle 과 Polaris. */
export const NAMES = [
  {
    word: "Twinkle",
    reading: "트윙클 · 반짝이다",
    body:
      "별이 반짝이는 것은 남의 빛을 되비추기 때문이 아니라, 스스로 타고 있기 때문입니다. 그래서 Twinkle 은 이름이자 다짐입니다 — 난 스스로 빛난다. 누가 자리를 만들어 주기를 기다리지 않고, 만들고 싶은 것을 만들어 세상에 내놓습니다. Twinkle Labs 는 그 다짐을 제품으로 옮기는 자리입니다.",
  },
  {
    word: "Polaris",
    reading: "폴라리스 · 북극성",
    body:
      "지금 보고 계신 주소가 polaris.twinklelabs.kr 입니다. 북극성은 밤에 길을 잃었을 때 찾는 별이고, 여기 Polaris 는 모든 앱의 이용약관과 개인정보 처리방침이 모이는 한 자리입니다. 앱은 문서를 제 안에 베껴 넣는 대신 늘 이 주소를 가리킵니다. 그래서 약관이 바뀌어도 앱을 새로 올릴 필요가 없고, 누가 언제 열어도 같은 판을 봅니다.",
    link: { label: "약관 보관소 열기", href: "/t/" },
  },
] as const;

export const FOUNDER = {
  eyebrow: "만드는 사람",
  title: "배운 것을 증명하는 방식",
  body: [
    "풀스택으로 시작해 서버와 화면, 배포와 운영까지 두루 배웠습니다. 여러 해 남의 제품을 세우며 쌓은 것들입니다.",
    "그 배움을 «난 스스로 빛난다» 를 증명하는 데 쓰기로 하고, 1인 창업자로 활동을 다시 시작했습니다. 조직은 한 사람과 AI 둘입니다 — AI 는 저를 대신하지 않고, 제 생각을 넓힙니다.",
  ],
} as const;

export const HOW = {
  eyebrow: "만드는 방식",
  title: "동작하는 것과 완성된 것은 다르다",
  items: [
    {
      title: "아름답게 완성한다",
      body: "모든 픽셀에는 이유가 있고, 모든 인터랙션에는 목적이 있습니다. 되는 데까지가 아니라 아름다워질 때까지 만듭니다.",
    },
    {
      title: "디자인 시스템은 하나다",
      body: "Aurora Ledger — 색·간격·둥글기·움직임을 토큰 한 벌로 정해 두고 모든 앱이 그것만 부릅니다. 어느 앱을 열어도 같은 손끝의 감각입니다.",
    },
    {
      title: "사용자가 먼저다",
      body: "생각하지 않아도 쓸 수 있어야 합니다. 설명이 필요하다면 설명이 모자란 것이 아니라 화면이 모자란 것입니다.",
    },
    {
      title: "복잡한 것을 단순하게",
      body: "덜어낼 것이 없을 때까지 덜어냅니다. 기능이 늘어난 앱이 아니라, 할 일이 줄어든 앱을 만듭니다.",
    },
  ],
} as const;

export const MONEY = {
  eyebrow: "값에 대하여",
  title: "무료로 쓰고, 광고가 값을 대신 냅니다",
  body: [
    "앱은 내려받아 그냥 쓰시면 됩니다. 값은 화면 한켠의 광고가 대신 냅니다.",
    "광고가 거슬리면 한 번의 결제로 지울 수 있고, 그 뒤로는 다시 묻지 않습니다. 지금 파는 것은 «광고 제거» 하나뿐입니다.",
  ],
} as const;

export const CONTACT = {
  eyebrow: "문의",
  title: "무엇이든 이 주소 하나로",
  body: "앱에 대한 이야기, 버그, 제안 무엇이든 좋습니다. Twinkle Labs 는 법인이 아니라 개인이 만들고 운영하는 이름이고, 대외 창구는 메일 하나입니다.",
} as const;
