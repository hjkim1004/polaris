import Link from "next/link";
import { listApps, listDocs, publishedLocales, readSite } from "@/lib/content.mjs";
import { strings } from "@/lib/i18n";
import styles from "@/app/home.module.css";

/** 언어 이름은 그 언어 자신의 말로. */
function endonym(code: string) {
  try {
    return new Intl.DisplayNames([code], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
}

/** 홈의 몸통 — `/` 와 `/<언어>/` 가 같은 것을 다른 언어로 그린다. */
export default function HomeBody({ locale }: { locale: string }) {
  const site = readSite(locale);
  const t = strings(locale);
  const apps = listApps(locale).map((app) => {
    const docs = listDocs(app.slug);
    const locales = new Set<string>();
    for (const doc of docs) for (const l of publishedLocales(app.slug, doc.slug)) locales.add(l);
    return { ...app, docs, locales: [...locales] };
  });

  return (
    <>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>✦ {t.archive}</p>
        <h1 className={styles.title}>{site.name}</h1>
        <p className={styles.lead}>{site.tagline || t.homeLead}</p>
      </div>

      {apps.length === 0 ? (
        <div className={styles.blank}>
          <p className={styles.blankTitle}>{t.blankTitle}</p>
          <p className={styles.blankBody}>{t.blankBody}</p>
        </div>
      ) : (
        <ul className={styles.grid}>
          {apps.map((app) => (
            <li key={app.slug}>
              <Link href={`/t/${app.slug}/`} className={styles.card}>
                <span className={styles.monogram} aria-hidden="true">
                  {app.name.trim().charAt(0)}
                </span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
                <span className={styles.cardName}>{app.name}</span>
                {app.description ? <span className={styles.cardDesc}>{app.description}</span> : null}
                <span className={styles.cardMeta}>
                  <span className={styles.count}>{t.docCount(app.docs.length)}</span>
                  {app.locales.map((l) => (
                    <span key={l} className={styles.chip} lang={l}>
                      {endonym(l)}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
