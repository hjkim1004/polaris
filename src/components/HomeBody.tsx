import Link from "next/link";
import { listApps, listDocs, publishedLocales, readSite } from "@/lib/content.mjs";
import StarMark from "@/components/StarMark";
import Starfield from "@/components/Starfield";
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
    /* 지금 읽고 있는 언어를 맨 앞에 세운다 — «내 언어가 있나»가 첫 질문이라서다. */
    const ordered = [...locales].sort((a, b) =>
      a === locale ? -1 : b === locale ? 1 : a.localeCompare(b),
    );
    return { ...app, docs, locales: ordered };
  });

  return (
    <>
      <div className={styles.hero}>
        {/* 하늘은 첫 화면의 것이다 — 이름이 서는 가운데 기둥만 비워 둔다. */}
        <Starfield
          height="34rem"
          dots={64}
          sparkles={7}
          shooting={1}
          keepout={{ x: [22, 78], y: [4, 58] }}
        />
        <div className={styles.intro}>
          <span className={styles.heroMark}>
            <StarMark gradientId="polaris-hero" />
          </span>
          <p className={styles.eyebrow}>{t.archive}</p>
          <h1 className={styles.title}>{site.name}</h1>
          <p className={styles.lead}>{site.tagline || t.homeLead}</p>
        </div>
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
                  {/* 열둘을 다 세우면 칩이 카드를 덮는다 — 셋만 세우고 나머지는 수로 접는다.
                      «+9» 는 어느 언어에서도 같은 뜻이라 옮길 말이 없다. */}
                  {app.locales.slice(0, 3).map((l) => (
                    <span key={l} className={styles.chip} lang={l}>
                      {endonym(l)}
                    </span>
                  ))}
                  {app.locales.length > 3 ? (
                    <span className={styles.chipMore}>+{app.locales.length - 3}</span>
                  ) : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
