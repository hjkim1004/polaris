import type { NextConfig } from "next";

// 배포본은 서버가 없다 — 정적으로 굽는다.
// 편집기는 `*.dev.tsx` / `*.dev.ts` 라서, 배포 빌드에서는 확장자 목록에서 빠져 아예 실리지 않는다.
const exporting = process.env.POLARIS_EXPORT === "1";

const config: NextConfig = {
  output: exporting ? "export" : undefined,
  // 배포 빌드는 제 방을 쓴다 — dev 서버의 .next 와 겹치지 않아
  // 서버가 도는 중에 구워도 서로의 청크를 깨지 않는다.
  // output:"export" 는 구운 사이트를 이 방에 그대로 놓는다 (distDir 을 out 으로
  // 두면 Next 가 제 내보내는 자리와 부딪힌다). 그래서 빌드 명령이 out 으로 옮긴다.
  distDir: exporting ? ".next-export" : ".next",
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: exporting
    ? ["tsx", "ts"]
    : ["dev.tsx", "dev.ts", "tsx", "ts"],
};

export default config;
