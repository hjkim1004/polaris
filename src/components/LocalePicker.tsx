"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { localeLabel } from "@/lib/labels";
import styles from "./LocalePicker.module.css";

/** 네이티브 <select>는 OS가 그린다 — 우리 디자인 시스템 밖이라 직접 만든다. */
export default function LocalePicker({
  locales,
  current,
  base,
}: {
  locales: string[];
  current: string;
  /** 문서의 뿌리 주소 — 여기에 언어를 붙여 옮겨간다. */
  base: string;
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
        {localeLabel(current)}
        <span className={`${styles.chevron} ${open ? styles.chevronUp : ""}`} aria-hidden="true">
          ⌄
        </span>
      </button>

      {open ? (
        <ul className={styles.menu} role="listbox" aria-label="언어 고르기">
          {locales.map((locale) => (
            <li key={locale}>
              <button
                type="button"
                role="option"
                aria-selected={locale === current}
                className={`${styles.option} ${locale === current ? styles.optionOn : ""}`}
                onClick={() => go(locale)}
              >
                {localeLabel(locale)}
                {locale === current ? <span aria-hidden="true">✓</span> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
