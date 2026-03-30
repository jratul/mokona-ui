import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./Radio";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    items: [
      { value: "kb", label: "국민은행" },
      { value: "toss", label: "토스뱅크" },
      { value: "kakao", label: "카카오뱅크" },
    ],
  },
};

export const WithDescription: Story = {
  args: {
    items: [
      { value: "standard", label: "일반 송금", description: "수수료 무료" },
      { value: "express", label: "빠른 송금", description: "24시간 이내 처리" },
      { value: "reserved", label: "예약 송금", description: "지정한 날짜에 송금", disabled: true },
    ],
  },
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    items: [
      { value: "1month", label: "1개월" },
      { value: "3month", label: "3개월" },
      { value: "6month", label: "6개월" },
      { value: "1year", label: "1년" },
    ],
  },
};
