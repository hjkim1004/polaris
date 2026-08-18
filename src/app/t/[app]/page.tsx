import Link from "next/link";
import { notFound } from "next/navigation";
import {
  currentVersion,
  listApps,
  listDocs,
  publishedLocales,
  readApp,
} from "@/lib/content.mjs";
import { formatDate, kindLabel, localeLabel } from "@/lib/labels";
import styles from "./app.module.css";

export function generateStaticParams() {
  return listApps().map((app) => ({ app: app.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ app: string }> }) {
  const { app } = await params;
  const meta = readApp(app);
  return { title: meta ? `${meta.name} 약관` : "약관" };
}

export default async function AppPage({ params }: { params: Promise<{ app: string }> }) {
  const { app } = await params;
  const meta = readApp(app);
  if (!meta) notFound();

  const docs = listDocs(app).map((doc) => {
    const locales = publishedLocales(app, doc.slug);
    const primary = currentVersion(app, doc.slug, meta.defaultLocale) ??
      (locales[0] ? currentVersion(app, doc.slug, locales[0]) : null);
    return { ...doc, locales, primary };
  });
  const live = docs.filter((d) => d.primary);

  return (
    <>
      <nav className={styles.crumb}>
        <Link href="/">모든 앱</Link>
      </nav>

      <div className={styles.intro}>
        <h1 className={styles.title}>{meta.name}</h1>
        {meta.description ? <p className={styles.lead}>{meta.description}</p> : null}
      </div>

      {live.length === 0 ? (
        <p className={styles.blank}>아직 펴낸 문서가 없습니다.</p>
      ) : (
        <ul className={styles.list}>
          {live.map((doc) => (
            <li key={doc.slug}>
              <Link href={`/t/${app}/${doc.slug}/`} className={styles.row}>
                <span className={styles.rowMain}>
                  <span className={styles.rowKind}>{kindLabel(doc.kind)}</span>
                  <span className={styles.rowName}>{doc.primary?.title || doc.name}</span>
                  <span className={styles.rowWhen}>
                    {doc.primary?.effectiveAt
                      ? `${formatDate(doc.primary.effectiveAt)} 시행`
                      : ""}
                  </span>
                </span>
                <span className={styles.rowLocales}>
                  {doc.locales.map((l) => (
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
