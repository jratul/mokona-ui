import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NumericSpinner } from "./NumericSpinner";

const meta: Meta<typeof NumericSpinner> = {
  title: "Components/NumericSpinner",
  component: NumericSpinner,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof NumericSpinner>;

export const Default: Story = {
  render: () => {
    const [v, setV] = React.useState(1);
    return <NumericSpinner value={v} onChange={setV} min={0} max={10} />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <NumericSpinner defaultValue={3} size="sm" />
      <NumericSpinner defaultValue={3} size="md" />
      <NumericSpinner defaultValue={3} size="lg" />
    </div>
  ),
};

export const WithLimits: Story = {
  render: () => {
    const [v, setV] = React.useState(1);
    return (
      <div className="flex flex-col items-center gap-2">
        <NumericSpinner value={v} onChange={setV} min={1} max={5} />
        <p className="text-[12px] text-[var(--color-muted-foreground)]">최소 1 / 최대 5</p>
      </div>
    );
  },
};

export const Step: Story = {
  render: () => {
    const [v, setV] = React.useState(0);
    return (
      <div className="flex flex-col items-center gap-2">
        <NumericSpinner value={v} onChange={setV} step={10} />
        <p className="text-[12px] text-[var(--color-muted-foreground)]">step: 10</p>
      </div>
    );
  },
};
