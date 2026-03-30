import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <Badge variant="primary">NEW</Badge>
      <Badge variant="positive">완료</Badge>
      <Badge variant="negative">오류</Badge>
      <Badge variant="warning">주의</Badge>
      <Badge variant="neutral">일반</Badge>
      <Badge variant="outline">선택</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
    </div>
  ),
};

export const WithNumber: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Badge>1</Badge>
      <Badge>12</Badge>
      <Badge variant="negative">99+</Badge>
    </div>
  ),
};
