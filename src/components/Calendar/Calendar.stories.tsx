import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Calendar } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: new Date(2024, 0, 15),
  },
};

export const WithMinMax: Story = {
  args: {
    minDate: new Date(),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 3, 0),
  },
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar value={date} onChange={setDate} />
        <p className="text-sm text-gray-500">
          {date ? `선택된 날짜: ${date.toLocaleDateString("ko-KR")}` : "날짜를 선택하세요"}
        </p>
      </div>
    );
  },
};
