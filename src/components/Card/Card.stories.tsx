import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Text } from "../Text";
import { Badge } from "../Badge";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Elevated: Story = {
  render: () => (
    <Card style={{ maxWidth: 320 }}>
      <Text variant="body2" color="muted">토스뱅크 통장</Text>
      <Text variant="title2" style={{ marginTop: 4 }}>1,234,567원</Text>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" style={{ maxWidth: 320 }}>
      <Text variant="body1">카드 내용</Text>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card interactive style={{ maxWidth: 320 }} onClick={() => alert("클릭!")}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Text variant="body2" color="muted">3월 지출</Text>
          <Text variant="title3" style={{ marginTop: 2 }}>324,000원</Text>
        </div>
        <Badge variant="positive">정상</Badge>
      </div>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
      <Card variant="elevated"><Text>Elevated</Text></Card>
      <Card variant="outlined"><Text>Outlined</Text></Card>
      <Card variant="filled"><Text>Filled</Text></Card>
    </div>
  ),
};
