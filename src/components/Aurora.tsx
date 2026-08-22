import styles from "./Aurora.module.css";

/* 오로라 — 화면 뒤에 아주 느리게 흐르는 남보라 장막 셋.
   강조가 아니라 «공기»다. 진하면 그 순간 화면의 크롬이 브랜드색에 잠겨
   정작 눌러야 할 것이 묻힌다 — 그래서 옅게, 그리고 느리게. */

export default function Aurora() {
  return (
    <div className={styles.aurora} aria-hidden="true">
      <span className={`${styles.veil} ${styles.one}`} />
      <span className={`${styles.veil} ${styles.two}`} />
      <span className={`${styles.veil} ${styles.three}`} />
    </div>
  );
}
