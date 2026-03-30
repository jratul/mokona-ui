import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { Button } from "../Button/Button";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary">더보기</Button>,
    items: [
      { label: "편집", icon: <EditIcon />, onSelect: () => alert("편집") },
      { label: "복사", icon: <CopyIcon />, shortcut: "⌘C", onSelect: () => alert("복사") },
      { type: "separator" },
      { label: "삭제", icon: <TrashIcon />, destructive: true, onSelect: () => alert("삭제") },
    ],
  },
};

export const WithLabel: Story = {
  args: {
    trigger: <Button variant="ghost">계정</Button>,
    items: [
      { type: "label", label: "내 계정" },
      { label: "프로필 수정" },
      { label: "알림 설정" },
      { type: "separator" },
      { type: "label", label: "보안" },
      { label: "비밀번호 변경" },
      { label: "2단계 인증" },
      { type: "separator" },
      { label: "로그아웃", destructive: true },
    ],
  },
};

export const WithShortcuts: Story = {
  args: {
    trigger: <Button>파일</Button>,
    items: [
      { label: "새로 만들기", shortcut: "⌘N" },
      { label: "열기", shortcut: "⌘O" },
      { label: "저장", shortcut: "⌘S" },
      { type: "separator" },
      { label: "내보내기", shortcut: "⌘E", disabled: true },
    ],
  },
};
