import type { Meta, StoryObj } from "@storybook/react";
import { BottomCTA } from "./BottomCTA";

const meta: Meta<typeof BottomCTA> = {
  title: "Components/BottomCTA",
  component: BottomCTA,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-96 border border-[var(--color-border)] rounded-2xl overflow-hidden"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof BottomCTA>;

export const Single: Story = {
  args: { primaryLabel: "송금하기" },
};

export const Double: Story = {
  args: {
    primaryLabel: "송금하기",
    secondaryLabel: "나중에",
  },
};

export const PrimaryDisabled: Story = {
  args: {
    primaryLabel: "다음",
    primaryDisabled: true,
  },
};

export const DoubleWithDisabled: Story = {
  args: {
    primaryLabel: "확인",
    secondaryLabel: "취소",
    primaryDisabled: false,
  },
};
