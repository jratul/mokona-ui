import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Select>;

const bankOptions = [
  { value: "kb", label: "국민은행" },
  { value: "toss", label: "토스뱅크" },
  { value: "kakao", label: "카카오뱅크" },
  { value: "shinhan", label: "신한은행" },
  { value: "woori", label: "우리은행" },
];

export const Default: Story = {
  args: {
    label: "은행 선택",
    options: bankOptions,
    placeholder: "은행을 선택하세요",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "은행 선택",
    options: bankOptions,
    helperText: "입금받을 은행을 선택하세요.",
  },
};

export const WithError: Story = {
  args: {
    label: "은행 선택",
    options: bankOptions,
    isError: true,
    errorMessage: "은행을 선택해주세요.",
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: "결제 수단",
    options: [
      { value: "card", label: "신용카드" },
      { value: "account", label: "계좌이체" },
      { value: "crypto", label: "가상화폐 (준비 중)", disabled: true },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: "은행 선택",
    options: bankOptions,
    disabled: true,
    defaultValue: "kb",
  },
};
