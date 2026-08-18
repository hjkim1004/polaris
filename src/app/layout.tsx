import type { Metadata } from "next";
import { readSite } from "@/lib/content.mjs";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import "./globals.css";
import styles from "./layout.module.css";

const site = readSite();

export const metadata: Metadata = {
  title: { default: `${site.name} — 약관`, template: `%s · ${site.name}` },
  description: site.tagline || "여러 앱의 약관을 한 곳에서 기르고 뿌린다.",
};

// 화면이 그려지기 전에 테마를 정한다 — 늦으면 흰 화면이 한 번 번쩍인다.
const themeBoot = `(function(){try{var t=localStorage.getItem("polaris-theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
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
            <ThemeToggle />
          </div>
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <p className={styles.footerLine}>
              {site.name}
              {site.tagline ? ` — ${site.tagline}` : ""}
            </p>
            {site.contactEmail ? (
              <a href={`mailto:${site.contactEmail}`} className={styles.footerLink}>
                {site.contactEmail}
              </a>
            ) : null}
          </div>
        </footer>
      </body>
    </html>
  );
}
