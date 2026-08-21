import Link from "next/link";
import { readSite } from "@/lib/content.mjs";
import { strings } from "@/lib/i18n";
import styles from "./not-found.module.css";

export default function NotFound() {
  const t = strings(readSite().defaultLocale);
  return (
    <div className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>{t.notFoundTitle}</h1>
      <p className={styles.body}>{t.notFoundBody}</p>
      <Link href="/t/" className={styles.cta}>
        {t.notFoundCta}
      </Link>
    </div>
  );
}
