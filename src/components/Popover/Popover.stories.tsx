import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";
import { Button } from "../Button/Button";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary">필터</Button>,
    children: (
      <div className="p-4 flex flex-col gap-3 w-64">
        <p className="text-[15px] font-semibold text-[var(--color-foreground)]">필터 설정</p>
        <div className="flex flex-col gap-2 text-[14px]">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked /> 송금
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked /> 결제
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" /> ATM 출금
          </label>
        </div>
        <Button size="sm" className="w-full">적용</Button>
      </div>
    ),
  },
};

export const InfoPopover: Story = {
  args: {
    trigger: (
      <button className="h-5 w-5 rounded-full border border-gray-300 text-[12px] text-gray-500 hover:bg-gray-100 transition-colors">
        ?
      </button>
    ),
    children: (
      <div className="p-4 max-w-[240px] text-[13px] text-[var(--color-muted-foreground)] leading-relaxed">
        수수료는 월 20회까지 무료이며, 이후 건당 500원이 부과됩니다.
      </div>
    ),
  },
};
