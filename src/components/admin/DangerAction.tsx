"use client";

import { useState } from "react";
import styles from "./DangerAction.module.css";

/** confirm()은 OS가 그린다 — 우리 확인창을 직접 세운다. */
export default function DangerAction({
  action,
  fields,
  label,
  question,
  detail,
}: {
  action: (formData: FormData) => void | Promise<void>;
  fields: Record<string, string>;
  label: string;
  question: string;
  detail?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={styles.trigger} onClick={() => setOpen(true)}>
        {label}
      </button>

      {open ? (
        <div className={styles.veil} role="dialog" aria-modal="true" aria-label={question}>
          <div className={styles.dialog}>
            <h2 className={styles.question}>{question}</h2>
            {detail ? <p className={styles.detail}>{detail}</p> : null}
            <div className={styles.row}>
              <button type="button" className={styles.cancel} onClick={() => setOpen(false)}>
                그만두기
              </button>
              <form action={action}>
                {Object.entries(fields).map(([key, value]) => (
                  <input key={key} type="hidden" name={key} value={value} />
                ))}
                <button type="submit" className={styles.confirm}>
                  {label}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
