import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog, ConfirmDialog } from "./Dialog";

const meta: Meta = {
  title: "Components/Dialog",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

export const Alert: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="h-10 px-5 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-[14px]"
        >
          AlertDialog 열기
        </button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="송금이 완료되었어요"
          description="홍길동님께 10,000원을 보냈어요."
          confirmLabel="확인"
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};

export const Confirm: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="h-10 px-5 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-[14px]"
        >
          ConfirmDialog 열기
        </button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="송금하시겠어요?"
          description="홍길동님께 10,000원을 보냅니다."
          confirmLabel="송금하기"
          cancelLabel="취소"
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="h-10 px-5 rounded-xl bg-[var(--color-negative)] text-white font-semibold text-[14px]"
        >
          삭제 확인 다이얼로그
        </button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="계정을 삭제할까요?"
          description="삭제된 계정은 복구할 수 없어요."
          confirmLabel="삭제하기"
          cancelLabel="취소"
          destructive
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </>
    );
  },
};
