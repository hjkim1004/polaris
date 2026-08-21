import Image from "next/image";
import Link from "next/link";
import {
  APPS,
  CONTACT,
  CONTACT_EMAIL,
  FOUNDER,
  HERO,
  HOW,
  MONEY,
  NAMES,
  STATUS,
} from "@/lib/labs";
import styles from "./home.module.css";

export const metadata = {
  // 홈은 제 이름을 통째로 쓴다 — 꼬리표(`· Twinkle Labs`)가 붙으면 이름이 두 번이다.
  title: { absolute: "Twinkle Labs — 난 스스로 빛난다" },
  description:
    "한 사람과 AI가 만드는 작은 유틸리티 앱들. 이름의 뜻과 만드는 방식, 그리고 지금까지 만든 앱.",
};

export default function Home() {
  return (
    <>
      {/* ── 히어로 ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>✦ {HERO.eyebrow}</p>
        <h1 className={styles.heroTitle}>{HERO.title}</h1>
        <p className={styles.heroLead}>{HERO.lead}</p>
        <div className={styles.actions}>
          {/* 그라데이션은 «다음 한 걸음»에만 — 한 화면에 하나다. */}
          <a className={styles.cta} href={HERO.primary.href}>
            {HERO.primary.label}
          </a>
          <a className={styles.ghost} href={HERO.secondary.href}>
            {HERO.secondary.label}
          </a>
        </div>
      </section>

      {/* ── 이름 — Twinkle 과 Polaris ──────────────────────── */}
      <section id="names" className={styles.section}>
        <h2 className={styles.sectionTitle}>이름의 뜻</h2>
        <ul className={styles.nameGrid}>
          {NAMES.map((name) => (
            <li key={name.word} className={styles.nameCard}>
              <h3 className={styles.word}>{name.word}</h3>
              <p className={styles.reading}>{name.reading}</p>
              <p className={styles.body}>{name.body}</p>
              {"link" in name && name.link ? (
                <Link className={styles.inlineLink} href={name.link.href}>
                  {name.link.label} <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {/* ── 만드는 사람 ────────────────────────────────────── */}
      <section className={styles.section}>
        <p className={styles.kicker}>{FOUNDER.eyebrow}</p>
        <h2 className={styles.sectionTitle}>{FOUNDER.title}</h2>
        <div className={styles.prose}>
          {FOUNDER.body.map((line) => (
            <p key={line} className={styles.body}>
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* ── 앱 ─────────────────────────────────────────────── */}
      <section id="apps" className={styles.section}>
        <p className={styles.kicker}>앱</p>
        <h2 className={styles.sectionTitle}>지금까지 만든 것</h2>
        <ul className={styles.appGrid}>
          {APPS.map((app) => (
            <li key={app.slug} className={styles.appCard}>
              {app.icon ? (
                <Image
                  className={styles.appIcon}
                  src={app.icon}
                  alt=""
                  width={56}
                  height={56}
                />
              ) : (
                <span className={styles.monogram} aria-hidden="true">
                  {app.name.trim().charAt(0)}
                </span>
              )}
              <h3 className={styles.appName}>{app.name}</h3>
              <p className={styles.appTagline}>{app.tagline}</p>
              <p className={styles.body}>{app.blurb}</p>
              <p className={styles.appMeta}>
                <span className={styles.badge}>{STATUS[app.status]}</span>
              </p>
              <p className={styles.appLinks}>
                {app.store ? (
                  <a className={styles.inlineLink} href={app.store}>
                    스토어에서 받기 <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
                {app.terms ? (
                  <Link className={styles.quietLink} href={app.terms}>
                    약관 보기
                  </Link>
                ) : null}
              </p>
            </li>
          ))}
          <li className={`${styles.appCard} ${styles.nextCard}`}>
            <h3 className={styles.appName}>다음 앱</h3>
            <p className={styles.body}>
              하나를 끝까지 다듬은 다음에 다음을 시작합니다. 지금은 물타기 계산기를 다듬는
              중입니다.
            </p>
          </li>
        </ul>
      </section>

      {/* ── 만드는 방식 ────────────────────────────────────── */}
      <section className={styles.section}>
        <p className={styles.kicker}>{HOW.eyebrow}</p>
        <h2 className={styles.sectionTitle}>{HOW.title}</h2>
        <ul className={styles.howGrid}>
          {HOW.items.map((item) => (
            <li key={item.title} className={styles.howItem}>
              <h3 className={styles.howTitle}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 값에 대하여 ────────────────────────────────────── */}
      <section className={styles.section}>
        <p className={styles.kicker}>{MONEY.eyebrow}</p>
        <h2 className={styles.sectionTitle}>{MONEY.title}</h2>
        <div className={styles.prose}>
          {MONEY.body.map((line) => (
            <p key={line} className={styles.body}>
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* ── 문의 ───────────────────────────────────────────── */}
      <section id="contact" className={styles.section}>
        <p className={styles.kicker}>{CONTACT.eyebrow}</p>
        <h2 className={styles.sectionTitle}>{CONTACT.title}</h2>
        <div className={styles.prose}>
          <p className={styles.body}>{CONTACT.body}</p>
          <p className={`${styles.actions} ${styles.contactActions}`}>
            <a className={styles.mail} href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
