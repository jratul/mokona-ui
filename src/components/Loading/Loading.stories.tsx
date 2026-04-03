import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./Loading";

const meta: Meta<typeof Loading> = {
  title: "Components/Loading",
  component: Loading,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "radio", options: ["wave", "squish", "spin"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    color: { control: "color" },
  },
};
export default meta;
type Story = StoryObj<typeof Loading>;

export const Wave: Story = {
  args: { variant: "wave", size: "md" },
};

export const Squish: Story = {
  args: { variant: "squish", size: "md" },
};

export const Spin: Story = {
  args: { variant: "spin", size: "md" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-10">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <span className="text-[12px] text-[var(--color-muted-foreground)]">{size}</span>
          <div className="flex items-center gap-12">
            <Loading variant="wave" size={size} />
            <Loading variant="squish" size={size} />
            <Loading variant="spin" size={size} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-end gap-16">
      <div className="flex flex-col items-center gap-4">
        <Loading variant="wave" size="lg" />
        <span className="text-[13px] text-[var(--color-muted-foreground)]">wave</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Loading variant="squish" size="lg" />
        <span className="text-[13px] text-[var(--color-muted-foreground)]">squish</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Loading variant="spin" size="lg" />
        <span className="text-[13px] text-[var(--color-muted-foreground)]">spin</span>
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Loading variant="wave" color="var(--color-primary)" />
      <Loading variant="wave" color="var(--color-positive)" />
      <Loading variant="wave" color="var(--color-negative)" />
      <Loading variant="wave" color="var(--color-warning)" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div
      className="flex h-48 w-80 items-center justify-center rounded-2xl"
      style={{ backgroundColor: "var(--color-muted)" }}
    >
      <div className="flex flex-col items-center gap-3">
        <Loading variant="squish" size="md" />
        <p className="text-[14px]" style={{ color: "var(--color-muted-foreground)" }}>
          잔액을 불러오는 중...
        </p>
      </div>
    </div>
  ),
};
