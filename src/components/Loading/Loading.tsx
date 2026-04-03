import * as React from "react";
import { LazyMotion, domAnimation, m } from "../../utils/motion";
import { cn } from "../../utils/cn";

export interface LoadingProps {
  variant?: "squish" | "wave";
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const sizeMap = {
  sm: { dot: 8, gap: 6, height: 32 },
  md: { dot: 12, gap: 8, height: 48 },
  lg: { dot: 16, gap: 10, height: 64 },
};

// ── Squish (Blob morph) ────────────────────────────────────────────────────
// 하나의 젤리 blob이 상하좌우로 늘어났다 줄어들었다 하는 유기적 모프 애니메이션
function SquishLoader({ size, color }: { size: NonNullable<LoadingProps["size"]>; color: string }) {
  const { dot } = sizeMap[size];

  return (
    <m.div
      style={{
        width: dot,
        height: dot,
        backgroundColor: color,
      }}
      animate={{
        borderRadius: [
          "50%",
          "60% 40% 60% 40% / 40% 60% 40% 60%",
          "40% 60% 40% 60% / 60% 40% 60% 40%",
          "55% 45% 55% 45% / 45% 55% 45% 55%",
          "40% 60% 60% 40% / 55% 40% 60% 45%",
          "60% 40% 40% 60% / 40% 60% 55% 45%",
          "50%",
        ],
        scaleX: [1, 1.25, 0.8, 1.1, 0.9, 1.15, 1],
        scaleY: [1, 0.8, 1.25, 0.9, 1.1, 0.85, 1],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: [0, 0.18, 0.36, 0.52, 0.68, 0.84, 1],
      }}
    />
  );
}

// ── Wave ───────────────────────────────────────────────────────────────────
// 도트 3개가 순서대로 통통 튀는 파동
function WaveLoader({ size, color }: { size: NonNullable<LoadingProps["size"]>; color: string }) {
  const { dot, gap, height } = sizeMap[size];
  const amplitude = (height - dot) * 0.5;

  return (
    <div style={{ height, display: "flex", alignItems: "center", gap }}>
      {[0, 1, 2].map((i) => (
        <m.div
          key={i}
          style={{
            width: dot,
            height: dot,
            borderRadius: "50%",
            backgroundColor: color,
            flexShrink: 0,
          }}
          animate={{
            y: [0, -amplitude, 0],
            scaleX: [1, 0.85, 1],
            scaleY: [1, 1.2,  1],
          }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
            type: "tween",
          }}
        />
      ))}
    </div>
  );
}

// ── Loading ────────────────────────────────────────────────────────────────
const Loading = ({
  variant = "wave",
  size = "md",
  color = "var(--color-primary)",
  className,
}: LoadingProps) => (
  <LazyMotion features={domAnimation}>
    <div
      className={cn("inline-flex items-center justify-center", className)}
      role="status"
      aria-label="로딩 중"
    >
      {variant === "squish" ? (
        <SquishLoader size={size} color={color} />
      ) : (
        <WaveLoader size={size} color={color} />
      )}
    </div>
  </LazyMotion>
);

export { Loading };
