import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { OTPInput } from "./OTPInput";

const meta: Meta<typeof OTPInput> = {
  title: "Components/OTPInput",
  component: OTPInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  args: { length: 6, autoFocus: true },
};

export const Masked: Story = {
  args: { length: 6, masked: true, autoFocus: true },
};

export const WithError: Story = {
  args: { length: 6, isError: true },
};

export const FourDigit: Story = {
  args: { length: 4 },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="flex flex-col items-center gap-4">
        <OTPInput
          length={6}
          value={value}
          onChange={setValue}
          onComplete={(v) => alert(`완료: ${v}`)}
          autoFocus
        />
        <p className="text-sm text-gray-500">입력값: {value || "(없음)"}</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { length: 6, value: "123456", disabled: true },
};
