import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: "이름",
    placeholder: "이름을 입력하세요",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "휴대폰 번호",
    placeholder: "010-0000-0000",
    helperText: "인증번호가 발송됩니다",
  },
};

export const WithError: Story = {
  args: {
    label: "이메일",
    placeholder: "example@email.com",
    defaultValue: "invalid-email",
    isError: true,
    errorMessage: "올바른 이메일 형식이 아닙니다",
  },
};

export const Disabled: Story = {
  args: {
    label: "계좌번호",
    defaultValue: "110-123-456789",
    disabled: true,
  },
};
