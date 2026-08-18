import Link from "next/link";
import { listApps, listDocs, publishedLocales, readSite } from "@/lib/content.mjs";
import { localeLabel } from "@/lib/labels";
import styles from "./home.module.css";

export default function Home() {
  const site = readSite();
  const apps = listApps().map((app) => {
    const docs = listDocs(app.slug);
    const locales = new Set<string>();
    for (const doc of docs) for (const l of publishedLocales(app.slug, doc.slug)) locales.add(l);
    return { ...app, docs, locales: [...locales] };
  });

  return (
    <>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>약관 보관소</p>
        <h1 className={styles.title}>{site.name}</h1>
        <p className={styles.lead}>
          {site.tagline || "여러 앱의 약관을 한 곳에 두고, 어느 앱에서든 같은 주소로 연다."}
        </p>
      </div>

      {apps.length === 0 ? (
        <div className={styles.blank}>
          <p className={styles.blankTitle}>아직 등록된 앱이 없습니다</p>
          <p className={styles.blankBody}>
            <code>npm run dev</code> 로 편집기를 열어 첫 앱을 등록하세요.
          </p>
        </div>
      ) : (
        <ul className={styles.grid}>
          {apps.map((app) => (
            <li key={app.slug}>
              <Link href={`/t/${app.slug}/`} className={styles.card}>
                <span className={styles.cardName}>{app.name}</span>
                {app.description ? (
                  <span className={styles.cardDesc}>{app.description}</span>
                ) : null}
                <span className={styles.cardMeta}>
                  <span className={styles.count}>문서 {app.docs.length}</span>
                  {app.locales.map((l) => (
                    <span key={l} className={styles.chip}>
                      {localeLabel(l)}
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
