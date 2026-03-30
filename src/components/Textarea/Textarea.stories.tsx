import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { label: "메모", placeholder: "내용을 입력하세요" },
};

export const WithCount: Story = {
  args: { label: "소개", placeholder: "자기소개를 입력하세요", showCount: true, maxLength: 200 },
};

export const WithError: Story = {
  args: { label: "사유", isError: true, errorMessage: "사유를 입력해주세요", defaultValue: "" },
};
