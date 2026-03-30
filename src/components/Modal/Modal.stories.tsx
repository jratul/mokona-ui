import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: "송금 확인",
    description: "아래 내용으로 송금하시겠어요?",
    trigger: <Button>모달 열기</Button>,
    children: (
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">받는 사람</span>
          <span className="font-medium">홍길동</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">금액</span>
          <span className="font-medium">50,000원</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">은행</span>
          <span className="font-medium">토스뱅크</span>
        </div>
      </div>
    ),
    footer: (
      <>
        <Button variant="ghost">취소</Button>
        <Button>송금하기</Button>
      </>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: "알림",
    trigger: <Button variant="secondary">열기</Button>,
    children: <p>서비스 점검으로 인해 일부 기능이 제한될 수 있습니다.</p>,
    footer: <Button className="w-full">확인</Button>,
  },
};

export const Small: Story = {
  args: {
    title: "삭제 확인",
    size: "sm",
    trigger: <Button variant="danger">계정 삭제</Button>,
    children: <p className="text-sm text-gray-500">이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠어요?</p>,
    footer: (
      <>
        <Button variant="ghost">취소</Button>
        <Button variant="danger">삭제</Button>
      </>
    ),
  },
};
