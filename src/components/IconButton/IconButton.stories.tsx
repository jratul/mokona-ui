import type { Meta, StoryObj } from "@storybook/react";
import { Bell, Heart, Search, Settings, Share2, Trash2 } from "lucide-react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "radio", options: ["primary", "secondary", "outline", "ghost", "danger"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    shape: { control: "radio", options: ["rounded", "circle"] },
  },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: { "aria-label": "알림", variant: "secondary", size: "md" },
  render: (args) => <IconButton {...args}><Bell size={18} /></IconButton>,
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton aria-label="primary" variant="primary"><Heart size={18} /></IconButton>
      <IconButton aria-label="secondary" variant="secondary"><Bell size={18} /></IconButton>
      <IconButton aria-label="outline" variant="outline"><Search size={18} /></IconButton>
      <IconButton aria-label="ghost" variant="ghost"><Settings size={18} /></IconButton>
      <IconButton aria-label="danger" variant="danger"><Trash2 size={18} /></IconButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton aria-label="sm" size="sm"><Share2 size={14} /></IconButton>
      <IconButton aria-label="md" size="md"><Share2 size={18} /></IconButton>
      <IconButton aria-label="lg" size="lg"><Share2 size={22} /></IconButton>
    </div>
  ),
};

export const Circle: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton aria-label="primary circle" variant="primary" shape="circle"><Bell size={18} /></IconButton>
      <IconButton aria-label="secondary circle" variant="secondary" shape="circle"><Heart size={18} /></IconButton>
      <IconButton aria-label="outline circle" variant="outline" shape="circle"><Search size={18} /></IconButton>
    </div>
  ),
};
