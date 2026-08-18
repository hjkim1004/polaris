import type { NextConfig } from "next";

// 배포본은 서버가 없다 — 정적으로 굽는다.
// 편집기는 `*.dev.tsx` / `*.dev.ts` 라서, 배포 빌드에서는 확장자 목록에서 빠져 아예 실리지 않는다.
const exporting = process.env.POLARIS_EXPORT === "1";

const config: NextConfig = {
  output: exporting ? "export" : undefined,
  // 배포 빌드는 제 방을 쓴다 — dev 서버가 도는 중에 구워도 서로의 청크를 깨지 않는다.
  distDir: exporting ? ".next-export" : ".next",
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: exporting
    ? ["tsx", "ts"]
    : ["dev.tsx", "dev.ts", "tsx", "ts"],
};

export default config;
