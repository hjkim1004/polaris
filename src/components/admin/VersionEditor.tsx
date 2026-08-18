"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Choice from "./Choice";
import md from "../Markdown.module.css";
import styles from "./VersionEditor.module.css";

type Version = {
  title: string;
  status: "draft" | "published";
  effectiveAt: string;
  summary: string;
  body: string;
};

export default function VersionEditor({
  app,
  doc,
  locale,
  version,
  value,
  action,
  saved,
}: {
  app: string;
  doc: string;
  locale: string;
  version: number;
  value: Version;
  action: (formData: FormData) => void | Promise<void>;
  saved: boolean;
}) {
  const [body, setBody] = useState(value.body);
  const [pane, setPane] = useState<"write" | "read">("write");

  return (
    <form action={action} className={styles.form}>
      <input type="hidden" name="app" value={app} />
      <input type="hidden" name="doc" value={doc} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="version" value={version} />

      <div className={styles.meta}>
        <label className={styles.field}>
          <span className={styles.label}>제목</span>
          <input
            className={styles.input}
            name="title"
            defaultValue={value.title}
            placeholder="이용약관"
            required
          />
        </label>

        <div className={styles.field}>
          <span className={styles.label}>상태</span>
          <Choice
            name="status"
            defaultValue={value.status}
            options={[
              { value: "draft", label: "초안 — 아무도 못 봅니다" },
              { value: "published", label: "펴냄 — 시행일부터 보입니다" },
            ]}
          />
        </div>

        <label className={styles.field}>
          <span className={styles.label}>시행일</span>
          {/* 네이티브 달력은 OS가 그린다 — 우리 화면 안에 두려고 글자로 받는다. */}
          <input
            className={`${styles.input} ${styles.mono}`}
            name="effectiveAt"
            defaultValue={value.effectiveAt}
            placeholder="2026-08-01"
            pattern="\d{4}-\d{2}-\d{2}"
            inputMode="numeric"
            title="YYYY-MM-DD 로 적어주세요"
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>한 줄 요약</span>
        <input
          className={styles.input}
          name="summary"
          defaultValue={value.summary}
          placeholder="본문 위에 먼저 놓일 한 문장 (없어도 됩니다)"
        />
      </label>

      <div className={styles.paneBar}>
        <div className={styles.segment}>
          <button
            type="button"
            className={`${styles.segItem} ${pane === "write" ? styles.segOn : ""}`}
            onClick={() => setPane("write")}
          >
            쓰기
          </button>
          <button
            type="button"
            className={`${styles.segItem} ${pane === "read" ? styles.segOn : ""}`}
            onClick={() => setPane("read")}
          >
            미리보기
          </button>
        </div>
        <span className={styles.count}>{body.length.toLocaleString("ko")}자</span>
      </div>

      <div className={styles.panes} data-pane={pane}>
        <textarea
          className={styles.textarea}
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          spellCheck={false}
        />
        <div className={styles.preview}>
          <div className={md.prose}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.save}>
          저장
        </button>
        {saved ? <span className={styles.saved}>파일에 담았습니다</span> : null}
      </div>
    </form>
  );
}
