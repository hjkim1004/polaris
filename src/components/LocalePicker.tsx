"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./LocalePicker.module.css";

/** 언어의 이름은 그 언어 자신의 말로 적는다 — 한국어 화면에서도 «English»다. */
function endonym(code: string) {
  try {
    return new Intl.DisplayNames([code], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
}

/** 네이티브 <select>는 OS가 그린다 — 우리 디자인 시스템 밖이라 직접 만든다. */
export default function LocalePicker({
  locales,
  current,
  base,
  label,
}: {
  locales: string[];
  current: string;
  /** 문서의 뿌리 주소 — 여기에 언어를 붙여 옮겨간다. */
  base: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    function away(e: MouseEvent) {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    }
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  if (locales.length < 2) return null;

  function go(locale: string) {
    setOpen(false);
    if (locale !== current) router.push(`${base}/${locale}/`);
  }

  return (
    <div className={styles.wrap} ref={box}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.globe} aria-hidden="true">
          ⌾
        </span>
        {endonym(current)}
        <span className={`${styles.chevron} ${open ? styles.chevronUp : ""}`} aria-hidden="true">
          ⌄
        </span>
      </button>

      {open ? (
        <ul className={styles.menu} role="listbox" aria-label={label}>
          {locales.map((locale) => (
            <li key={locale}>
              <button
                type="button"
                role="option"
                aria-selected={locale === current}
                className={`${styles.option} ${locale === current ? styles.optionOn : ""}`}
                onClick={() => go(locale)}
              >
                {endonym(locale)}
                {locale === current ? <span aria-hidden="true">✓</span> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
