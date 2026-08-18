import Link from "next/link";
import type { AppMeta, DocMeta, VersionDoc } from "@/lib/content.mjs";
import { formatDate } from "@/lib/labels";
import { strings } from "@/lib/i18n";
import HtmlLang from "./HtmlLang";
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
  // 문서의 언어가 화면의 언어를 정한다.
  const t = strings(locale);
  const kind = t.kinds[doc.kind] ?? t.kinds.custom;

  return (
    <article className={styles.page} lang={locale}>
      <HtmlLang locale={locale} />

      <nav className={styles.crumb}>
        <Link href={`/t/${app.slug}/`}>{app.name}</Link>
      </nav>

      <header className={styles.head}>
        <p className={styles.kind}>{kind}</p>
        <div className={styles.headRow}>
          <h1 className={styles.title}>{version.title || doc.name}</h1>
          <LocalePicker locales={locales} current={locale} base={base} label={t.pickLanguage} />
        </div>
        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>{t.effectiveOn}</dt>
            <dd>{formatDate(version.effectiveAt, locale)}</dd>
          </div>
          <div className={styles.fact}>
            <dt>{t.edition}</dt>
            <dd>{t.editionNo(version.version)}</dd>
          </div>
          <div className={styles.fact}>
            <dt>{t.language}</dt>
            <dd>{new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale}</dd>
          </div>
        </dl>
      </header>

      {archived ? (
        <p className={`${styles.notice} ${styles.noticePast}`}>
          {t.archivedNotice}{" "}
          <Link href={`${base}/${locale}/`}>{t.currentOne(kind)}</Link>
        </p>
      ) : null}

      {!archived && upcoming ? (
        <p className={styles.notice}>
          {t.upcoming(formatDate(upcoming.effectiveAt, locale), upcoming.version)}
        </p>
      ) : null}

      {version.summary ? <p className={styles.summary}>{version.summary}</p> : null}

      <div className={styles.body}>
        <Markdown>{version.body}</Markdown>
      </div>

      {!archived && past.length > 0 ? (
        <section className={styles.history}>
          <h2 className={styles.historyTitle}>{t.pastVersions}</h2>
          <ul className={styles.historyList}>
            {past.map((v) => (
              <li key={v.version}>
                <Link href={`${base}/${locale}/v/${v.version}/`} className={styles.historyRow}>
                  <span>{t.editionNo(v.version)}</span>
                  <span className={styles.historyWhen}>
                    {t.effectiveSince(formatDate(v.effectiveAt, locale))}
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
