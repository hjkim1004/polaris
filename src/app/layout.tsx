import type { Metadata } from "next";
import { readSite } from "@/lib/content.mjs";
import { strings } from "@/lib/i18n";
import ThemeToggle from "@/components/ThemeToggle";
import { BLOG_URL, CONTACT_EMAIL } from "@/lib/labs";
import Link from "next/link";
import "./globals.css";
import styles from "./layout.module.css";

const site = readSite();

export const metadata: Metadata = {
  metadataBase: site.domain ? new URL(`https://${site.domain}`) : undefined,
  title: { default: site.name, template: `%s · ${site.name}` },
  description:
    "한 사람과 AI가 만드는 작은 유틸리티 앱들. Twinkle Labs — 난 스스로 빛난다.",
};

// 화면이 그려지기 전에 테마를 정한다 — 늦으면 흰 화면이 한 번 번쩍인다.
const themeBoot = `(function(){try{var t=localStorage.getItem("polaris-theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = strings(site.defaultLocale);

  return (
    <html lang={site.defaultLocale} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.brand}>
              <span className={styles.star} aria-hidden="true" />
              <span className={styles.brandName}>{site.name}</span>
            </Link>
            <nav className={styles.nav}>
              <Link href="/t/" className={styles.navLink}>
                {t.archive}
              </Link>
              <ThemeToggle toLight={t.toLight} toDark={t.toDark} />
            </nav>
          </div>
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <p className={styles.footerLine}>
              {site.name} — 난 스스로 빛난다. 법인이 아니라 개인이 만들고 운영하는 이름입니다.
            </p>
            <nav className={styles.footerLinks}>
              <Link href="/t/" className={styles.footerLink}>
                {t.archive}
              </Link>
              <a href={BLOG_URL} className={styles.footerLink}>
                블로그
              </a>
              <a
                href={`mailto:${site.contactEmail || CONTACT_EMAIL}`}
                className={styles.footerLink}
              >
                {site.contactEmail || CONTACT_EMAIL}
              </a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
