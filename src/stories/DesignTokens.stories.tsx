import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta: Meta = {
  title: "Foundation/Design Tokens",
  parameters: { layout: "padded", options: { showPanel: false } },
};
export default meta;
type Story = StoryObj;

// ── 색상 ──────────────────────────────────────────────────────────────────────
function ColorSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-12 w-full rounded-xl border border-[var(--color-border)]"
        style={{ background: value }}
      />
      <p className="text-[12px] font-medium text-[var(--color-foreground)]">{name}</p>
      <p className="text-[11px] text-[var(--color-muted-foreground)]">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[18px] font-semibold text-[var(--color-foreground)] border-b border-[var(--color-border)] pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <Section title="Primary">
        <div className="grid grid-cols-4 gap-4">
          <ColorSwatch name="primary" value="var(--color-primary)" />
          <ColorSwatch name="primary-hover" value="var(--color-primary-hover)" />
          <ColorSwatch name="primary-active" value="var(--color-primary-active)" />
          <ColorSwatch name="primary-foreground" value="var(--color-primary-foreground)" />
        </div>
      </Section>

      <Section title="Semantic">
        <div className="grid grid-cols-4 gap-4">
          <ColorSwatch name="positive" value="var(--color-positive)" />
          <ColorSwatch name="negative" value="var(--color-negative)" />
          <ColorSwatch name="warning" value="var(--color-warning)" />
        </div>
      </Section>

      <Section title="Neutral">
        <div className="grid grid-cols-4 gap-4">
          <ColorSwatch name="background" value="var(--color-background)" />
          <ColorSwatch name="foreground" value="var(--color-foreground)" />
          <ColorSwatch name="muted" value="var(--color-muted)" />
          <ColorSwatch name="muted-foreground" value="var(--color-muted-foreground)" />
          <ColorSwatch name="border" value="var(--color-border)" />
          <ColorSwatch name="overlay" value="var(--color-overlay)" />
        </div>
      </Section>

      <Section title="Gray Scale">
        <div className="grid grid-cols-5 gap-4">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => (
            <ColorSwatch key={n} name={`gray-${n}`} value={`var(--color-gray-${n})`} />
          ))}
        </div>
      </Section>
    </div>
  ),
};

// ── 타이포그래피 ───────────────────────────────────────────────────────────────
export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {[
        { name: "display1", class: "text-display1", size: "28px / 700 / 1.3" },
        { name: "title1", class: "text-title1", size: "22px / 700 / 1.4" },
        { name: "title2", class: "text-title2", size: "20px / 700 / 1.4" },
        { name: "title3", class: "text-title3", size: "18px / 600 / 1.4" },
        { name: "body1", class: "text-body1", size: "16px / 400 / 1.5" },
        { name: "body2", class: "text-body2", size: "14px / 400 / 1.5" },
        { name: "caption1", class: "text-caption1", size: "12px / 400 / 1.4" },
      ].map(({ name, class: cls, size }) => (
        <div key={name} className="flex items-baseline gap-6 py-2 border-b border-[var(--color-border)]">
          <div className="w-28 shrink-0">
            <p className="text-[12px] font-mono text-[var(--color-muted-foreground)]">{name}</p>
            <p className="text-[11px] text-[var(--color-muted-foreground)] mt-0.5">{size}</p>
          </div>
          <p className={cls + " text-[var(--color-foreground)]"}>
            가나다라마바사 ABCDEFG 1234567890
          </p>
        </div>
      ))}
    </div>
  ),
};

// ── 그림자 ────────────────────────────────────────────────────────────────────
export const Shadows: Story = {
  render: () => (
    <div className="flex gap-8 flex-wrap p-8">
      {[
        { name: "shadow-sm", value: "var(--shadow-sm)" },
        { name: "shadow-md", value: "var(--shadow-md)" },
        { name: "shadow-lg", value: "var(--shadow-lg)" },
        { name: "shadow-overlay", value: "var(--shadow-overlay)" },
      ].map(({ name, value }) => (
        <div key={name} className="flex flex-col items-center gap-3">
          <div
            className="h-20 w-32 rounded-2xl bg-[var(--color-background)]"
            style={{ boxShadow: value }}
          />
          <p className="text-[13px] text-[var(--color-foreground)] font-medium">{name}</p>
        </div>
      ))}
    </div>
  ),
};

// ── 스페이싱 ──────────────────────────────────────────────────────────────────
export const Spacing: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {[
        { name: "spacing-1", value: "var(--spacing-1)", px: "4px" },
        { name: "spacing-2", value: "var(--spacing-2)", px: "8px" },
        { name: "spacing-3", value: "var(--spacing-3)", px: "12px" },
        { name: "spacing-4", value: "var(--spacing-4)", px: "16px" },
        { name: "spacing-5", value: "var(--spacing-5)", px: "20px" },
        { name: "spacing-6", value: "var(--spacing-6)", px: "24px" },
        { name: "spacing-8", value: "var(--spacing-8)", px: "32px" },
        { name: "spacing-10", value: "var(--spacing-10)", px: "40px" },
        { name: "spacing-12", value: "var(--spacing-12)", px: "48px" },
        { name: "spacing-16", value: "var(--spacing-16)", px: "64px" },
      ].map(({ name, value, px }) => (
        <div key={name} className="flex items-center gap-4">
          <p className="w-28 text-[12px] font-mono text-[var(--color-muted-foreground)]">{name}</p>
          <div
            className="h-5 rounded bg-[var(--color-primary)] opacity-70"
            style={{ width: value }}
          />
          <p className="text-[12px] text-[var(--color-muted-foreground)]">{px}</p>
        </div>
      ))}
    </div>
  ),
};

// ── 모션 ──────────────────────────────────────────────────────────────────────
export const Motion: Story = {
  render: () => {
    const [trigger, setTrigger] = React.useState(false);

    return (
      <div className="flex flex-col gap-8">
        <button
          onClick={() => { setTrigger((v) => !v); }}
          className="self-start px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-[14px]"
        >
          애니메이션 실행
        </button>

        <div className="flex flex-col gap-4">
          {[
            { name: "fast (100ms) + ease-out", duration: "var(--duration-fast)", easing: "var(--ease-out)" },
            { name: "normal (200ms) + ease-in-out", duration: "var(--duration-normal)", easing: "var(--ease-in-out)" },
            { name: "slow (300ms) + spring", duration: "var(--duration-slow)", easing: "var(--ease-spring)" },
          ].map(({ name, duration, easing }) => (
            <div key={name} className="flex items-center gap-6">
              <p className="w-52 text-[12px] text-[var(--color-muted-foreground)] font-mono">{name}</p>
              <div className="relative h-8 w-64 rounded-full bg-[var(--color-muted)] overflow-hidden">
                <div
                  className="absolute top-1 bottom-1 left-1 w-6 rounded-full bg-[var(--color-primary)]"
                  style={{
                    transform: trigger ? "translateX(220px)" : "translateX(0)",
                    transition: `transform ${duration} ${easing}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
