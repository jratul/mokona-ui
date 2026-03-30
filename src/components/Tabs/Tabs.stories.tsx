import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

const items = [
  { value: "transfer", label: "송금", content: <div className="text-sm text-gray-600">송금 내역이 여기에 표시됩니다.</div> },
  { value: "payment", label: "결제", content: <div className="text-sm text-gray-600">결제 내역이 여기에 표시됩니다.</div> },
  { value: "savings", label: "저축", content: <div className="text-sm text-gray-600">저축 현황이 여기에 표시됩니다.</div> },
];

export const Line: Story = {
  args: {
    items,
    defaultValue: "transfer",
    variant: "line",
  },
};

export const Pill: Story = {
  args: {
    items,
    defaultValue: "transfer",
    variant: "pill",
  },
};
