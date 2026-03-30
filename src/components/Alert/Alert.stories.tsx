import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
      <Alert variant="info" title="안내">본인 인증이 필요합니다.</Alert>
      <Alert variant="positive" title="완료">계좌가 성공적으로 연결되었습니다.</Alert>
      <Alert variant="negative" title="오류">결제에 실패했습니다. 카드 정보를 확인해주세요.</Alert>
      <Alert variant="warning" title="주의">잔액이 부족합니다.</Alert>
      <Alert variant="neutral">이 계좌는 출금 전용 계좌입니다.</Alert>
    </div>
  ),
};

export const WithoutTitle: Story = {
  args: { variant: "info", children: "입력하신 정보는 안전하게 보호됩니다." },
};
