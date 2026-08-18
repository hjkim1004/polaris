"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * 앱이 쓰는 안정된 주소(/t/앱/문서/)는 기본 언어로 그려진다.
 * 브라우저가 다른 언어를 원하고 그 언어의 판본이 있으면, 그쪽으로 한 번만 옮겨준다.
 * 언어가 박힌 주소(/t/앱/문서/en/)에서는 절대 옮기지 않는다 — 사람이 고른 것이 이긴다.
 */
export default function LocaleAutoSwitch({
  available,
  served,
  base,
}: {
  available: string[];
  served: string;
  base: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const key = `polaris-lang:${base}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    for (const raw of navigator.languages ?? [navigator.language]) {
      const wanted = [raw, raw.split("-")[0]];
      const hit = wanted.find((w) => available.includes(w));
      if (!hit) continue;
      if (hit !== served) router.replace(`${base}/${hit}/`);
      return;
    }
  }, [available, served, base, router]);

  return null;
}
