import type { Meta, StoryObj } from "@storybook/react";
import { Empty } from "./Empty";
import { Button } from "../Button";

const meta: Meta<typeof Empty> = {
  title: "Components/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    title: "거래 내역이 없습니다",
    description: "아직 송금하거나 결제한 내역이 없어요",
  },
};

export const WithAction: Story = {
  args: {
    title: "연결된 계좌가 없습니다",
    description: "계좌를 연결하면 더 많은 기능을 이용할 수 있어요",
    action: <Button size="sm">계좌 연결하기</Button>,
  },
};
