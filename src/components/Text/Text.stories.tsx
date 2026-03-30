import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Text variant="display1">Display1 — 잔액 조회</Text>
      <Text variant="title1">Title1 — 송금하기</Text>
      <Text variant="title2">Title2 — 내 계좌</Text>
      <Text variant="title3">Title3 — 최근 거래</Text>
      <Text variant="body1">Body1 — 오늘 사용 금액 12,500원</Text>
      <Text variant="body2">Body2 — 결제일 매월 25일</Text>
      <Text variant="caption1">Caption1 — 부가세 포함</Text>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Text color="default">Default</Text>
      <Text color="muted">Muted</Text>
      <Text color="primary">Primary</Text>
      <Text color="positive">Positive</Text>
      <Text color="negative">Negative</Text>
      <Text color="warning">Warning</Text>
    </div>
  ),
};
