import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: { label: "알림 허용" },
};

export const WithDescription: Story = {
  args: {
    label: "야간 알림",
    description: "오후 9시 이후에도 알림을 받습니다",
  },
};

export const Checked: Story = {
  args: {
    label: "자동 로그인",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "생체 인증",
    description: "기기에서 지원하지 않는 기능입니다",
    disabled: true,
  },
};

export const List: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 360 }}>
      <Toggle label="푸시 알림" defaultChecked />
      <Toggle label="마케팅 알림" description="혜택 및 이벤트 소식을 받습니다" />
      <Toggle label="야간 알림" description="오후 9시 이후 수신" disabled />
    </div>
  ),
};
