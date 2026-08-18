import Link from "next/link";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export const metadata = { title: "편집기 · Polaris" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.bar}>
        <Link href="/admin/" className={styles.barBrand}>
          편집기
        </Link>
        <p className={styles.barNote}>
          저장하면 <code>content/</code> 의 파일이 바뀝니다 — 커밋하면 배포됩니다.
        </p>
        <Link href="/" className={styles.barLink}>
          공개 화면 보기
        </Link>
      </div>
      {children}
    </div>
  );
}
