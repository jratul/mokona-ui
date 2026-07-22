import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ArrowRight, Zap, Palette, Package, Shield } from "lucide-react";

const demos = [
  {
    href: "/demo/transfer",
    title: "송금 플로우",
    desc: "OTPInput, Stepper, Select, TextField 조합으로 만든 멀티스텝 송금 UI",
    emoji: "💸",
  },
  {
    href: "/demo/dashboard",
    title: "대시보드",
    desc: "Card, Badge, Progress, Amount, Tabs 컴포넌트로 구성한 금융 대시보드",
    emoji: "📊",
  },
  {
    href: "/demo/form",
    title: "폼 검증",
    desc: "react-hook-form + zod로 실시간 검증되는 회원가입 폼",
    emoji: "✏️",
  },
  {
    href: "/demo/components",
    title: "컴포넌트 갤러리",
    desc: "Button, Text, Badge, Chip, Icon, Loading, Accordion, SearchField, IconButton 한눈에 보기",
    emoji: "🎨",
  },
  {
    href: "/demo/feedback",
    title: "피드백 & 오버레이",
    desc: "Toast, Modal, Dialog, BottomSheet, BottomCTA, Result, Tooltip, Popover, DropdownMenu",
    emoji: "🔔",
  },
  {
    href: "/demo/inputs",
    title: "입력 컨트롤",
    desc: "SegmentedControl, Rating, NumericSpinner, Slider, Toggle, RadioGroup, Textarea, DatePicker",
    emoji: "🎛️",
  },
  {
    href: "/demo/data",
    title: "데이터 테이블",
    desc: "ListRow, Table, Pagination, Skeleton, Empty — 필터링 & 페이지네이션 포함",
    emoji: "📋",
  },
];

const features = [
  {
    icon: Zap,
    title: "디자인 시스템",
    desc: "CSS 변수 기반 일관된 디자인 토큰. 다크모드 포함.",
  },
  {
    icon: Palette,
    title: "35+ 컴포넌트",
    desc: "Button부터 Calendar까지. Radix UI 기반 접근성 보장.",
  },
  {
    icon: Package,
    title: "Subpath exports",
    desc: "필요한 컴포넌트만 import. 트리쉐이킹으로 번들 최소화.",
  },
  {
    icon: Shield,
    title: "TypeScript",
    desc: "모든 컴포넌트에 타입 정의 포함. 자동완성과 타입 안전성.",
  },
];

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 py-24 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-medium"
            style={{
              backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
              color: "var(--color-primary)",
            }}
          >
            <Zap size={12} />
            React UI Library
          </div>
          <h1
            className="mb-4 text-[48px] font-bold leading-tight tracking-tight"
            style={{ color: "var(--color-foreground)" }}
          >
            mokona-ui
          </h1>
          <p
            className="mb-10 text-[18px]"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            세련된 React 컴포넌트 라이브러리.
            <br />
            Radix UI + Tailwind CSS + Framer Motion.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/demo/transfer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[15px] font-semibold text-white transition-colors"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              데모 보기
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/jratul/mokona-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-[15px] font-semibold transition-colors"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-foreground)",
              }}
            >
              GitHub
            </a>
          </div>
        </section>

        {/* Install snippet */}
        <section
          className="border-y py-5"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-muted)",
          }}
        >
          <div className="mx-auto max-w-5xl px-4 text-center">
            <p className="mb-1 text-[13px]" style={{ color: "var(--color-muted-foreground)" }}>
              설치
            </p>
            <code
              className="font-mono text-[15px]"
              style={{ color: "var(--color-foreground)" }}
            >
              npm install mokona-ui
            </code>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-5xl px-4 py-20">
          <h2
            className="mb-10 text-center text-[24px] font-bold"
            style={{ color: "var(--color-foreground)" }}
          >
            특징
          </h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "var(--color-muted)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                    color: "var(--color-primary)",
                  }}
                >
                  <Icon size={20} />
                </div>
                <p
                  className="mb-1 text-[15px] font-semibold"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {title}
                </p>
                <p className="text-[13px]" style={{ color: "var(--color-muted-foreground)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Demo links */}
        <section
          className="border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="mx-auto max-w-5xl px-4 py-20">
            <h2
              className="mb-10 text-center text-[24px] font-bold"
              style={{ color: "var(--color-foreground)" }}
            >
              데모
            </h2>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {demos.map(({ href, title, desc, emoji }) => (
                <Link
                  key={href}
                  href={href}
                  className="group rounded-2xl p-6 transition-all hover:scale-[1.01]"
                  style={{
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-background)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div className="mb-3 text-[32px]">{emoji}</div>
                  <p
                    className="mb-1 text-[16px] font-semibold"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {title}
                  </p>
                  <p className="text-[14px]" style={{ color: "var(--color-muted-foreground)" }}>
                    {desc}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-1 text-[13px] font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    보러가기 <ArrowRight size={13} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        className="border-t py-8 text-center text-[13px]"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-muted-foreground)",
        }}
      >
        mokona-ui · MIT License · made by jratul
      </footer>
    </>
  );
}
