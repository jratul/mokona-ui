import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const items = [
  {
    value: "fee",
    trigger: "수수료는 어떻게 계산되나요?",
    content: "토스뱅크 간 송금은 무제한 무료입니다. 타행 송금 시 월 20회까지 무료이며, 이후 건당 500원이 부과됩니다.",
  },
  {
    value: "limit",
    trigger: "1회 송금 한도는 얼마인가요?",
    content: "기본 1회 송금 한도는 100만원입니다. 한도 확대 서비스를 신청하시면 최대 1,000만원까지 가능합니다.",
  },
  {
    value: "cancel",
    trigger: "송금을 취소할 수 있나요?",
    content: "송금 완료 후에는 취소가 불가합니다. 받는 분께 직접 반환을 요청하거나, 착오송금 반환 청구 서비스를 이용하세요.",
  },
];

export const Default: Story = {
  args: { items },
};

export const Multiple: Story = {
  args: {
    items,
    type: "multiple",
  },
};

export const DefaultOpen: Story = {
  args: {
    items,
    defaultValue: "fee",
  },
};
