import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { children: "전체" },
};

export const Selected: Story = {
  args: { children: "송금", selected: true },
};

export const Selectable: Story = {
  render: () => {
    const [selected, setSelected] = useState("전체");
    const items = ["전체", "송금", "결제", "충전", "환불"];
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {items.map((item) => (
          <Chip
            key={item}
            selected={selected === item}
            onClick={() => setSelected(item)}
          >
            {item}
          </Chip>
        ))}
      </div>
    );
  },
};

export const Removable: Story = {
  render: () => {
    const [tags, setTags] = useState(["토스뱅크", "카카오뱅크", "신한은행"]);
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <Chip key={tag} onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}>
            {tag}
          </Chip>
        ))}
      </div>
    );
  },
};
