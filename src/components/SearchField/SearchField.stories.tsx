import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchField } from "./SearchField";

const meta: Meta<typeof SearchField> = {
  title: "Components/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof SearchField>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="w-80">
        <SearchField value={value} onChange={setValue} />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState("토스");
    return (
      <div className="w-80">
        <SearchField value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "검색 불가" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};
