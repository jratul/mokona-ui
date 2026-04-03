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

// ── Squish ─────────────────────────────────────────────────────────────────
// 공이 떨어지면서 납작해지고, 튀어오를 때 길어지는 탄성 애니메이션
function SquishLoader({ size, color }: { size: NonNullable<LoadingProps["size"]>; color: string }) {
  const { dot, height } = sizeMap[size];

  return (
    <div style={{ height, display: "flex", alignItems: "flex-end" }}>
      <m.div
        style={{
          width: dot,
          height: dot,
          borderRadius: "50%",
          backgroundColor: color,
          originY: 1, // 바닥 기준 변형
        }}
        animate={{
          // 바닥에서 위로 튀기 → scaleY 늘어남(길쭉) → 정상 → 떨어짐 → 납작
          y:        [0, -(height - dot) * 0.85, -(height - dot) * 0.85, 0, 0],
          scaleX:   [1, 0.75, 0.75, 1.3, 1],
          scaleY:   [1, 1.3,  1.3,  0.7, 1],
        }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          repeatDelay: 0.15,
          ease: ["easeIn", "easeOut", "easeIn", "easeOut", "easeOut"],
          times: [0, 0.35, 0.5, 0.85, 1],
        }}
      />
    </div>
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
