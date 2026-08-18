"use client";

import { useEffect } from "react";

/**
 * 문서의 언어를 <html lang>에 옮겨 적는다.
 *
 * 정적으로 구운 HTML은 뿌리 레이아웃 하나를 함께 쓰므로 처음엔 사이트 기본 언어로 나간다.
 * 화면이 서면 이 조각이 실제 문서의 언어로 고쳐 놓는다 — 화면 낭독기와 번역기가
 * 영어 약관을 한국어로 읽지 않게 하는 일이다. (본문 자체는 <article lang>이 이미 정확하다)
 */
export default function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
