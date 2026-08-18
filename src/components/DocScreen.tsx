import Link from "next/link";
import type { AppMeta, DocMeta, VersionDoc } from "@/lib/content.mjs";
import { formatDate, kindLabel, localeLabel } from "@/lib/labels";
import LocalePicker from "./LocalePicker";
import Markdown from "./Markdown";
import styles from "./DocScreen.module.css";

export default function DocScreen({
  app,
  doc,
  version,
  locales,
  locale,
  past,
  upcoming,
  archived = false,
}: {
  app: AppMeta;
  doc: DocMeta;
  version: VersionDoc;
  locales: string[];
  locale: string;
  past: VersionDoc[];
  upcoming: VersionDoc | null;
  archived?: boolean;
}) {
  const base = `/t/${app.slug}/${doc.slug}`;

  return (
    <article className={styles.page}>
      <nav className={styles.crumb}>
        <Link href={`/t/${app.slug}/`}>{app.name}</Link>
      </nav>

      <header className={styles.head}>
        <p className={styles.kind}>{kindLabel(doc.kind)}</p>
        <div className={styles.headRow}>
          <h1 className={styles.title}>{version.title || doc.name}</h1>
          <LocalePicker locales={locales} current={locale} base={base} />
        </div>
        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>시행일</dt>
            <dd>{formatDate(version.effectiveAt, locale)}</dd>
          </div>
          <div className={styles.fact}>
            <dt>판</dt>
            <dd>제 {version.version} 판</dd>
          </div>
          <div className={styles.fact}>
            <dt>언어</dt>
            <dd>{localeLabel(locale)}</dd>
          </div>
        </dl>
      </header>

      {archived ? (
        <p className={`${styles.notice} ${styles.noticePast}`}>
          지난 판본입니다 — 지금 유효한 것은{" "}
          <Link href={`${base}/${locale}/`}>현행 {kindLabel(doc.kind)}</Link>입니다.
        </p>
      ) : null}

      {!archived && upcoming ? (
        <p className={styles.notice}>
          {formatDate(upcoming.effectiveAt, locale)}부터 제 {upcoming.version} 판이 시행됩니다.
        </p>
      ) : null}

      {version.summary ? <p className={styles.summary}>{version.summary}</p> : null}

      <div className={styles.body}>
        <Markdown>{version.body}</Markdown>
      </div>

      {!archived && past.length > 0 ? (
        <section className={styles.history}>
          <h2 className={styles.historyTitle}>지난 판본</h2>
          <ul className={styles.historyList}>
            {past.map((v) => (
              <li key={v.version}>
                <Link href={`${base}/${locale}/v/${v.version}/`} className={styles.historyRow}>
                  <span>제 {v.version} 판</span>
                  <span className={styles.historyWhen}>
                    {formatDate(v.effectiveAt, locale)} 시행
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
