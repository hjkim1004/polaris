"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Choice.module.css";

/** 네이티브 <select> 대신 우리가 그리는 고르개. 값은 숨은 input으로 폼에 실린다. */
export default function Choice({
  name,
  defaultValue,
  options,
  onPick,
}: {
  name: string;
  defaultValue: string;
  options: { value: string; label: string }[];
  onPick?: (value: string) => void;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

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

  const current = options.find((o) => o.value === value);

  return (
    <div className={styles.wrap} ref={box}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.value}>{current?.label ?? value}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronUp : ""}`} aria-hidden="true">
          ⌄
        </span>
      </button>

      {open ? (
        <ul className={styles.menu} role="listbox">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={`${styles.option} ${option.value === value ? styles.optionOn : ""}`}
                onClick={() => {
                  setValue(option.value);
                  setOpen(false);
                  onPick?.(option.value);
                }}
              >
                {option.label}
                {option.value === value ? <span aria-hidden="true">✓</span> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
