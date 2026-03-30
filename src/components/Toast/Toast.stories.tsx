import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastProvider, ToastViewport } from "./Toast";
import { Button } from "../Button";
import { Toaster } from "./Toaster";
import { toast } from "./useToast";

const meta: Meta = {
  title: "Components/Toast",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const AllVariants: Story = {
  render: () => (
    <ToastProvider>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 360 }}>
        <Toast open variant="default">
          송금이 완료되었습니다
        </Toast>
        <Toast open variant="positive">
          계좌가 성공적으로 연결되었습니다
        </Toast>
        <Toast open variant="negative" description="잠시 후 다시 시도해주세요">
          오류가 발생했습니다
        </Toast>
        <Toast open variant="warning">
          인터넷 연결을 확인해주세요
        </Toast>
      </div>
      <ToastViewport style={{ position: "static", transform: "none", padding: 0 }} />
    </ToastProvider>
  ),
};

export const Default: Story = {
  render: () => (
    <Button onClick={() => toast("송금이 완료되었습니다")}>기본 토스트</Button>
  ),
};

export const Positive: Story = {
  render: () => (
    <Button variant="secondary" onClick={() => toast.positive("계좌가 연결되었습니다")}>
      성공 토스트
    </Button>
  ),
};

export const Negative: Story = {
  render: () => (
    <Button variant="danger" onClick={() => toast.negative("오류가 발생했습니다", { description: "잠시 후 다시 시도해주세요" })}>
      에러 토스트
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button variant="outline" onClick={() => toast.warning("인터넷 연결을 확인해주세요")}>
      경고 토스트
    </Button>
  ),
};
