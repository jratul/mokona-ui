import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    label: "송금 금액",
    defaultValue: [50000],
    min: 0,
    max: 1000000,
    step: 10000,
    showValue: true,
    formatValue: (v) => `${v.toLocaleString()}원`,
  },
};

export const Range: Story = {
  args: {
    label: "금액 범위",
    defaultValue: [10000, 500000],
    min: 0,
    max: 1000000,
    step: 10000,
    showValue: true,
    formatValue: (v) => `${v.toLocaleString()}원`,
  },
};

export const Percentage: Story = {
  args: {
    label: "투자 비율",
    defaultValue: [30],
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    formatValue: (v) => `${v}%`,
  },
};

export const Disabled: Story = {
  args: {
    label: "한도",
    defaultValue: [500000],
    min: 0,
    max: 1000000,
    showValue: true,
    disabled: true,
    formatValue: (v) => `${v.toLocaleString()}원`,
  },
};
