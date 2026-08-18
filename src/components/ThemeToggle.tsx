"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("polaris-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
    else setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  function flip() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("polaris-theme", next);
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={flip}
      aria-label={theme === "dark" ? "밝은 화면으로" : "어두운 화면으로"}
      title={theme === "dark" ? "밝은 화면으로" : "어두운 화면으로"}
    >
      <span className={styles.icon} aria-hidden="true">
        {theme === "dark" ? "☾" : "☀"}
      </span>
    </button>
  );
}
