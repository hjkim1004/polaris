import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>여기엔 아무 약관도 없습니다</h1>
      <p className={styles.body}>주소를 다시 확인하시거나, 처음으로 돌아가 앱을 골라주세요.</p>
      <Link href="/" className={styles.cta}>
        모든 앱 보기
      </Link>
    </div>
  );
}
