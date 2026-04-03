import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const items2 = [
  { value: "all", label: "전체" },
  { value: "income", label: "수입" },
];
const items3 = [
  { value: "day", label: "일" },
  { value: "week", label: "주" },
  { value: "month", label: "월" },
];
const items4 = [
  { value: "1m", label: "1개월" },
  { value: "3m", label: "3개월" },
  { value: "6m", label: "6개월" },
  { value: "1y", label: "1년" },
];

export const TwoItems: Story = {
  render: () => {
    const [v, setV] = React.useState("all");
    return <SegmentedControl items={items2} value={v} onChange={setV} />;
  },
};

export const ThreeItems: Story = {
  render: () => {
    const [v, setV] = React.useState("day");
    return <SegmentedControl items={items3} value={v} onChange={setV} />;
  },
};

export const FourItems: Story = {
  render: () => {
    const [v, setV] = React.useState("1m");
    return <SegmentedControl items={items4} value={v} onChange={setV} />;
  },
};

export const FullWidth: Story = {
  render: () => {
    const [v, setV] = React.useState("day");
    return (
      <div className="w-80">
        <SegmentedControl items={items3} value={v} onChange={setV} fullWidth />
      </div>
    );
  },
};

export const SmallSize: Story = {
  render: () => {
    const [v, setV] = React.useState("day");
    return <SegmentedControl items={items3} value={v} onChange={setV} size="sm" />;
  },
};
