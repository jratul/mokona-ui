import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: "전체 동의" },
};

export const Checked: Story = {
  args: { label: "개인정보 처리방침 동의 (필수)", defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: "마케팅 수신 동의 (선택)", disabled: true },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Checkbox label="전체 동의" defaultChecked />
      <div style={{ width: 1, height: 1, background: "var(--color-border)" }} />
      <Checkbox label="이용약관 동의 (필수)" defaultChecked />
      <Checkbox label="개인정보 처리방침 동의 (필수)" />
      <Checkbox label="마케팅 수신 동의 (선택)" />
    </div>
  ),
};
