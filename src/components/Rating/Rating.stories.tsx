import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./Rating";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Rating>;

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState(3);
    return (
      <div className="flex flex-col items-center gap-3">
        <Rating value={value} onChange={setValue} />
        <p className="text-[13px] text-[var(--color-muted-foreground)]">{value}점</p>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => <Rating value={4} readOnly />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Rating value={3} size="sm" readOnly />
      <Rating value={3} size="md" readOnly />
      <Rating value={3} size="lg" readOnly />
    </div>
  ),
};
