#!/bin/sh
# dev 서버가 도는 중의 빌드는 dev의 청크를 깨뜨린다 — distDir을 갈라도 깨졌다.
# 그래서 빌드는 dev가 살아 있으면 서지 않는다. (CI에는 dev가 없으니 그냥 지나간다)
# LISTEN만 본다 — 죽은 클라이언트 소켓(CLOSE_WAIT)에 속지 않는다.
if lsof -ti:3942 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "✋ dev 서버(3942)가 돌고 있습니다. 먼저 내리고 빌드하세요 — 같이 돌리면 화면이 깨집니다." >&2
  exit 1
fi
