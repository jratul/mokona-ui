import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "계속하기",
    variant: "primary",
    size: "md",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">작게</Button>
      <Button size="md">기본</Button>
      <Button size="lg">크게</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: "처리 중...",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "비활성화",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: "전체 너비 버튼",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

// Storybook Interaction Test
export const ClickInteraction: Story = {
  args: {
    children: "클릭해보세요",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await expect(button).toBeInTheDocument();
  },
};
