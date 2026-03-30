import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "클릭하면 송금이 시작됩니다",
    children: <Button>송금하기</Button>,
  },
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-6 flex-wrap justify-center p-12">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} content={`${side} 방향`} side={side}>
          <Button variant="secondary" size="sm">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    content: "자세한 설명이 필요한 경우 툴팁을 사용하세요. 최대 280px 너비까지 지원합니다.",
    children: <Button variant="ghost">도움말</Button>,
  },
};
