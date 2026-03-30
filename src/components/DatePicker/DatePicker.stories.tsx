import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: "송금 날짜",
    placeholder: "날짜를 선택하세요",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "예약 송금 날짜",
    helperText: "오늘 이후 날짜를 선택하세요.",
    minDate: new Date(),
  },
};

export const WithError: Story = {
  args: {
    label: "출발일",
    isError: true,
    errorMessage: "날짜를 선택해주세요.",
  },
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <div className="flex flex-col gap-3 w-80">
        <DatePicker
          label="생년월일"
          value={date}
          onChange={setDate}
          maxDate={new Date()}
        />
        {date && (
          <p className="text-sm text-gray-500">
            선택됨: {date.toLocaleDateString("ko-KR")}
          </p>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "만료일",
    value: new Date(2025, 11, 31),
    disabled: true,
  },
};
