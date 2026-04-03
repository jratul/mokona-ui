import type { Meta, StoryObj } from "@storybook/react";
import { Result } from "./Result";

const meta: Meta<typeof Result> = {
  title: "Components/Result",
  component: Result,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-96 border border-[var(--color-border)] rounded-2xl overflow-hidden"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Result>;

export const Success: Story = {
  args: {
    status: "success",
    title: "송금이 완료됐어요",
    description: "홍길동님께 10,000원이 전달됐어요.",
    extra: (
      <button className="w-full h-12 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-[15px]">
        확인
      </button>
    ),
  },
};

export const Error: Story = {
  args: {
    status: "error",
    title: "송금에 실패했어요",
    description: "일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.",
    extra: (
      <button className="w-full h-12 rounded-xl bg-[var(--color-muted)] text-[var(--color-foreground)] font-semibold text-[15px]">
        다시 시도
      </button>
    ),
  },
};

export const Warning: Story = {
  args: {
    status: "warning",
    title: "한도를 초과했어요",
    description: "1일 이체 한도를 초과해 송금할 수 없어요.",
  },
};

export const Info: Story = {
  args: {
    status: "info",
    title: "심사 중이에요",
    description: "영업일 기준 1~3일 내로 결과를 알려드릴게요.",
  },
};
