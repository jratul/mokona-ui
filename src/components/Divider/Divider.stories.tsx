import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";
import { Text } from "../Text";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <div>
      <Text>위 내용</Text>
      <Divider spacing="md" />
      <Text>아래 내용</Text>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16, height: 40 }}>
      <Text>항목 1</Text>
      <Divider orientation="vertical" />
      <Text>항목 2</Text>
      <Divider orientation="vertical" />
      <Text>항목 3</Text>
    </div>
  ),
};
