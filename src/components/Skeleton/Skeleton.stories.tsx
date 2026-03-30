import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  render: () => (
    <div style={{ maxWidth: 320, display: "flex", flexDirection: "column", gap: 8 }}>
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" lines={3} />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ maxWidth: 320, padding: 20, background: "var(--color-background)", borderRadius: 16, boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Skeleton variant="circular" width={48} height={48} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="30%" />
        </div>
      </div>
      <Skeleton height={120} />
    </div>
  ),
};

export const TransactionSkeleton: Story = {
  render: () => (
    <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 16 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Skeleton variant="circular" width={40} height={40} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="25%" />
          </div>
          <Skeleton variant="text" width={60} />
        </div>
      ))}
    </div>
  ),
};
