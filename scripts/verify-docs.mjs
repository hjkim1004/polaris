/**
 * 문서 검증 — 두 축.
 *
 *   npm run verify
 *
 * ## 축 1 — 옮긴 것이 «같은 약속»인가
 *
 * 화면 문구의 오역은 어색할 뿐이지만 약관의 오역은 다르다. 한 조항을 빠뜨리면 그 언어의
 * 사용자에게는 **그 약속을 안 한 것**이 되고, 한 문장을 세게 옮기면 지지 않아도 될 책임을
 * 지게 된다. 그래서 뜻보다 **뼈대**를 먼저 본다 — 제목 수·목록 수·번호·링크가 어긋나면
 * 그건 «표현이 다른 것»이 아니라 조항이 사라졌거나 생긴 것이다.
 *
 * ## 축 2 — 그 관할이 요구하는 항목이 문서에 있는가
 *
 * **«그 나라에서 유효한 약관인가»는 판정하지 않는다. 판정할 수 없다.**
 * 유효성은 그 관할의 변호사가 문서 전체를 읽고 답하는 것이지, 낱말을 세는 기계가 흉내 낼
 * 수 있는 종류가 아니다. 여기서 초록이 뜬다고 «법적으로 문제없다»는 뜻이 되는 순간
 * 이 스크립트는 있는 것보다 **없는 것이 낫다** — 없는 안전을 있다고 믿게 하므로.
 *
 * 대신 하는 일은 **대장 지키기**다. 관할마다 요구 항목을 사람이 적어 두면, 기계는 그것이
 * 문서에서 사라지지 않았는지, 새 언어가 대장 없이 들어오지 않았는지를 매번 확인한다.
 * 즉 «검토했다»가 아니라 **«검토한 결과를 잊지 않는다»**를 위한 장치다.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const CONTENT = "content";
const APPS = join(CONTENT, "apps");

// ── 대장 ────────────────────────────────────────────────────────────
//
// 사람이 손으로 유지한다. 법이 바뀌거나 언어가 늘면 여기부터 고친다.
// `missing` 에 적힌 것은 **아직 안 한 일**이고, 그 값이 왜 아직인지다.

const REQUIRED_EVERYWHERE = {
  "수집하는 항목": ["광고 ID", "Werbe-ID", "Identificador de publicidad", "Identifiant publicitaire",
    "ID pubblicità", "ID de publicidade", "広告 ID", "广告 ID", "廣告 ID", "ID iklan", "Advertising ID", "advertising ID"],
  "제3자 처리자": ["AdMob"],
  "연락처": ["twinkle.ai.labs@gmail.com"],
};

/** 다섯 축은 GDPR·PIPA·APPI·LGPD·PIPL 이 공통으로 요구한다. 지금 우리 방침에는 하나도 없다 */
const NOT_YET = {
  "처리의 법적 근거": "광고 처리의 근거를 «동의»로 둘지 «정당한 이익»으로 둘지 정한 적이 없다",
  "보유 기간": "«앱을 지우면 사라진다»는 적었지만 기간으로 적지 않았다. 광고 쪽 보유는 Google 이 정한다",
  "국외 이전": "AdMob 이 데이터를 어디로 보내는지 확인해 적은 적이 없다",
  "정보주체의 권리": "열람·정정·삭제·이의를 어떻게 받을지 절차를 정한 적이 없다. 받을 데이터가 없다는 것과 권리를 안 적는 것은 다른 문제다",
  "감독기관에 대한 불복": "관할마다 기관이 다르다. 관할별로 적어야 한다",
};

/** 관할 — 근거 법과, 그 나라가 «아동»으로 보는 나이 */
const JURISDICTIONS = {
  ko: { name: "대한민국", law: "개인정보 보호법", childAge: 14 },
  en: { name: "영어권(기본)", law: "—", childAge: 13 },
  de: { name: "독일", law: "GDPR + BDSG", childAge: 16 },
  fr: { name: "프랑스", law: "GDPR + Loi Informatique et Libertés", childAge: 15 },
  es: { name: "스페인", law: "GDPR + LOPDGDD", childAge: 14 },
  it: { name: "이탈리아", law: "GDPR + Codice Privacy", childAge: 14 },
  "pt-BR": { name: "브라질", law: "LGPD", childAge: 12 },
  ja: { name: "일본", law: "個人情報保護法", childAge: 15 },
  "zh-CN": { name: "중국", law: "个人信息保护法(PIPL)", childAge: 14 },
  "zh-TW": { name: "대만", law: "個人資料保護法", childAge: 14 },
  id: { name: "인도네시아", law: "UU PDP", childAge: 17 },
};

// ── 읽기 ────────────────────────────────────────────────────────────

function parse(path) {
  const raw = readFileSync(path, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${path}: 머리말이 없다`);
  const front = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*"?(.*?)"?\s*$/);
    if (kv) front[kv[1]] = kv[2];
  }
  return { front, body: m[2] };
}

/** 뼈대 — 이 넷이 어긋나면 다른 문서가 된 것이다 */
function skeleton(body) {
  const lines = body.split("\n");
  const headings = lines.filter((l) => /^##\s/.test(l)).length;
  const groups = [];
  let run = 0;
  const ordered = [];
  for (const l of lines) {
    const bullet = /^[-*]\s/.test(l);
    const num = l.match(/^(\d{1,2})\.\s/);
    if (bullet || num) {
      run++;
      if (num) ordered.push(num[1]);
    } else if (l.trim() === "" || /^##\s/.test(l)) {
      if (run) groups.push(run);
      run = 0;
    }
  }
  if (run) groups.push(run);
  const links = [...body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => m[2]);
  return { headings, groups, ordered, links };
}

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// ── 검사 ────────────────────────────────────────────────────────────

const problems = [];
const notes = [];
const fail = (m) => problems.push(m);

for (const app of readdirSync(APPS)) {
  const appDir = join(APPS, app);
  for (const kind of readdirSync(appDir).filter((d) => existsSync(join(appDir, d, "doc.json")))) {
    const kindDir = join(appDir, kind);
    const locales = readdirSync(kindDir).filter((d) => existsSync(join(kindDir, d, "1.md")));
    const canon = parse(join(kindDir, "ko", "1.md"));
    const canonSkel = skeleton(canon.body);

    for (const locale of locales) {
      const where = `${app}/${kind}/${locale}`;
      const { front, body } = parse(join(kindDir, locale, "1.md"));

      // ── 축 1 · 그릇과 판 ──
      if (!front.title) fail(`${where}: title 이 없다`);
      if (!front.summary) fail(`${where}: summary 가 없다`);
      if (front.effectiveAt !== canon.front.effectiveAt)
        fail(`${where}: 시행일이 정본과 다르다 (${front.effectiveAt} ≠ ${canon.front.effectiveAt})`);
      if (front.status !== "published") notes.push(`${where}: status=${front.status}`);

      // ── 축 1 · 뼈대 ──
      const s = skeleton(body);
      if (s.headings !== canonSkel.headings)
        fail(`${where}: 제목 수 ${s.headings} ≠ 정본 ${canonSkel.headings} — 조항이 사라졌거나 생겼다`);
      if (!eq(s.groups, canonSkel.groups))
        fail(`${where}: 목록 묶음 [${s.groups}] ≠ 정본 [${canonSkel.groups}]`);
      if (!eq(s.ordered, canonSkel.ordered))
        fail(`${where}: 번호 [${s.ordered}] ≠ 정본 [${canonSkel.ordered}]`);
      if (!eq(s.links, canonSkel.links))
        fail(`${where}: 링크 [${s.links}] ≠ 정본 [${canonSkel.links}]`);

      // ── 축 1 · 이름과 연락처 ──
      if (/(?<!AI )\bTwinkle Labs\b/.test(body)) fail(`${where}: «Twinkle Labs» — 이름은 «Twinkle AI Labs» 한 벌이다`);
      for (const bad of ["회사", "corporation", "Corporation", "Inc.", "GmbH"])
        if (body.includes(bad)) fail(`${where}: «${bad}» 가 있다 — 법인이 아니다`);
      const mails = new Set([...body.matchAll(/[\w.+-]+@[\w-]+(?:\.[\w-]+)*/g)].map((m) => m[0]));
      for (const m of mails)
        if (m !== "twinkle.ai.labs@gmail.com") fail(`${where}: 대표 메일이 아닌 주소 «${m}»`);

      // ── 축 1 · 옮기다 만 자리 ──
      if (locale !== "ko" && /[가-힣]/.test(body)) fail(`${where}: 한글이 남아 있다`);
      if (["ja", "zh-CN", "zh-TW"].includes(locale)) {
        const allow = new Set(["Twinkle", "AI", "Labs", "Google", "AdMob", "IP", "ID", "OS",
          "twinkle", "ai", "labs", "gmail", "com", "policies", "google", "privacy", "https", "stock", "calculator"]);
        const stray = [...new Set([...body.matchAll(/[A-Za-z]{2,}/g)].map((m) => m[0]))].filter((w) => !allow.has(w));
        if (stray.length) fail(`${where}: 옮기지 않은 낱말 ${stray.join(", ")}`);
      }

      // ── 축 1 · 문단 수 ──
      // 뼈대가 같아도 한 문단을 통째로 빠뜨리면 안 걸린다. 문단 수까지 세야 «덜 옮긴 것»이 보인다
      const paras = (t) => t.split(/\n\s*\n/).filter((b) => b.trim() && !/^##\s/.test(b.trim())).length;
      if (paras(body) !== paras(canon.body))
        fail(`${where}: 문단 수 ${paras(body)} ≠ 정본 ${paras(canon.body)} — 한 덩이를 빠뜨렸거나 더했다`);

      // ── 축 1 · 숫자 ──
      // «30일 전 공지»가 «15일»이 되면 다른 약속이다. 연령은 관할마다 다르므로 축 2 에서 따로 본다
      const nums = (t) => [...t.matchAll(/(?<![\w.])(\d{2,})(?![\w.])/g)].map((m) => m[1]).sort();
      if (!eq(nums(body), nums(canon.body)))
        notes.push(`${where}: 숫자가 정본과 다르다 [${nums(body)}] ≠ [${nums(canon.body)}]`);

      // ── 축 1 · 링크 라벨 ──
      // 주소는 같아야 하고(위에서 봄) **라벨은 그 언어여야** 한다. 주소만 옮기고 말은 두고 온 자리를 잡는다
      if (locale !== "ko") {
        const label = (t) => [...t.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => m[1]);
        const mine = label(body), theirs = label(canon.body);
        mine.forEach((l, i) => {
          if (theirs[i] && l === theirs[i]) fail(`${where}: 링크 라벨 «${l}» 이 정본 그대로다 — 옮기지 않았다`);
        });
      }

      // ── 축 1 · 머리말이 본문과 같은 언어인가 ──
      if (locale !== "ko" && (/[가-힣]/.test(front.title) || /[가-힣]/.test(front.summary)))
        fail(`${where}: 머리말(title·summary)에 한글이 남아 있다`);

      // ── 축 2 · 관할 대장 ──
      if (kind === "privacy") {
        const j = JURISDICTIONS[locale];
        if (!j) {
          fail(`${where}: 관할 대장에 없다 — 무슨 법을 따르는지 정하지 않았다`);
        } else {
          for (const [topic, kws] of Object.entries(REQUIRED_EVERYWHERE))
            if (!kws.some((k) => body.includes(k))) fail(`${where}: «${topic}» 가 문서에서 안 보인다`);
          const age = body.match(/(\d{2})\s*(?:세|歳|周岁|歲|years|Jahren|años|ans|anni|anos|tahun)/);
          if (age && Number(age[1]) !== j.childAge)
            notes.push(`${where}: 연령 ${age[1]} · ${j.name}(${j.law}) 기준 ${j.childAge}`);
        }
      }
    }
  }
}

// ── 보고 ────────────────────────────────────────────────────────────

console.log("── 축 1 · 같은 약속인가 / 축 2 · 요구 항목이 있는가 ──\n");
if (problems.length) {
  console.log(`✗ ${problems.length}건\n`);
  problems.forEach((p) => console.log(`   ${p}`));
  console.log();
} else {
  console.log("✓ 어긋남 없음\n");
}

console.log("── 아직 없는 항목 (관할 공통) ──");
for (const [topic, why] of Object.entries(NOT_YET)) console.log(`   ${topic}\n      ${why}`);

if (notes.length) {
  console.log("\n── 사람이 정할 것 ──");
  notes.forEach((n) => console.log(`   ${n}`));
}

console.log("\n※ 이 스크립트가 초록이라고 «법적으로 문제없다»는 뜻이 아니다.");
console.log("  유효성은 그 관할의 변호사가 판정한다. 여기가 세는 것은 «적어 둔 것이 사라지지 않았는가» 뿐이다.");

process.exit(problems.length ? 1 : 0);
