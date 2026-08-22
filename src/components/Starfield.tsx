import type { CSSProperties } from "react";
import StarMark from "./StarMark";
import styles from "./Starfield.module.css";

/* 별하늘 — 문서의 한 자리에 깔리는 하늘.
   서버에서 한 번 그려져 정적으로 구워지므로 자리는 시드로 고정한다 —
   빌드할 때마다 별자리가 바뀌면 그것은 하늘이 아니라 노이즈다. */

/** mulberry32 — 시드 하나로 늘 같은 수열을 내놓는 작은 난수원. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = {
  left: number;
  top: number;
  /** px — 장식용 점이라 글자와 함께 커지지 않는다. */
  size: number;
  base: number;
  scale: number;
  delay: number;
};

type Keepout = { x: [number, number]; y: [number, number] };

function scatter(
  rnd: () => number,
  count: number,
  size: [number, number],
  keepout?: Keepout,
): Star[] {
  const stars: Star[] = [];
  let guard = 0;
  while (stars.length < count && guard++ < count * 40) {
    const left = rnd() * 100;
    const top = rnd() * 100;
    /* 글이 서는 자리는 비워 둔다 — 별은 읽는 것을 방해하지 않는다. */
    if (
      keepout &&
      left > keepout.x[0] &&
      left < keepout.x[1] &&
      top > keepout.y[0] &&
      top < keepout.y[1]
    ) {
      continue;
    }
    stars.push({
      left: Math.round(left * 100) / 100,
      top: Math.round(top * 100) / 100,
      size: Math.round((size[0] + rnd() * (size[1] - size[0])) * 10) / 10,
      base: Math.round((0.28 + rnd() * 0.52) * 100) / 100,
      scale: Math.round((0.7 + rnd() * 0.9) * 100) / 100,
      delay: Math.round(rnd() * 100) / 100,
    });
  }
  return stars;
}

function starStyle(star: Star): CSSProperties {
  return {
    left: `${star.left}%`,
    top: `${star.top}%`,
    width: star.size,
    height: star.size,
    "--tw-base": star.base,
    "--tw-scale": star.scale,
    "--tw-delay": star.delay,
  } as CSSProperties;
}

export default function Starfield({
  seed = 20260822,
  height = "62rem",
  dots = 84,
  sparkles = 9,
  shooting = 0,
  keepout,
  className,
}: {
  seed?: number;
  /** 하늘의 키. 아래로 갈수록 마스크로 스러진다. */
  height?: string;
  dots?: number;
  sparkles?: number;
  /** 이따금 지나가는 별똥별. 0 이면 없다. */
  shooting?: number;
  keepout?: Keepout;
  className?: string;
}) {
  const rnd = mulberry32(seed);
  const points = scatter(rnd, dots, [1.5, 3], keepout);
  const marks = scatter(rnd, sparkles, [10, 19], keepout);
  const streaks = Array.from({ length: shooting }, (_, i) => ({
    top: Math.round(rnd() * 42 * 100) / 100,
    left: Math.round((10 + rnd() * 55) * 100) / 100,
    delay: Math.round(rnd() * 100) / 100,
    order: i,
  }));

  return (
    <div
      className={className ? `${styles.sky} ${className}` : styles.sky}
      style={{ height }}
      aria-hidden="true"
    >
      {points.map((star, i) => (
        <span key={`d${i}`} className={styles.dot} style={starStyle(star)} />
      ))}
      {marks.map((star, i) => (
        <span key={`s${i}`} className={styles.sparkle} style={starStyle(star)}>
          <StarMark />
        </span>
      ))}
      {streaks.map((s) => (
        <span
          key={`f${s.order}`}
          className={styles.shooting}
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              "--tw-delay": s.delay + s.order,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
