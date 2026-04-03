import type { Meta, StoryObj } from "@storybook/react";
import { CreditCard, Settings, Shield, User } from "lucide-react";
import { ListRow } from "./ListRow";

const meta: Meta<typeof ListRow> = {
  title: "Components/ListRow",
  component: ListRow,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-96 border border-[var(--color-border)] rounded-2xl overflow-hidden divide-y divide-[var(--color-border)]">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ListRow>;

export const Default: Story = {
  args: { title: "프로필 설정", chevron: true },
};

export const WithSubtitle: Story = {
  args: { title: "홍길동", subtitle: "토스뱅크 · 1234-5678", chevron: true },
};

export const WithIcon: Story = {
  render: () => (
    <>
      <ListRow
        left={<div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white"><User size={18} /></div>}
        title="프로필"
        subtitle="개인정보 관리"
        chevron
        onClick={() => {}}
      />
      <ListRow
        left={<div className="w-10 h-10 rounded-full bg-[var(--color-muted)] flex items-center justify-center"><CreditCard size={18} /></div>}
        title="카드 관리"
        subtitle="등록된 카드 2개"
        chevron
        onClick={() => {}}
      />
      <ListRow
        left={<div className="w-10 h-10 rounded-full bg-[var(--color-muted)] flex items-center justify-center"><Shield size={18} /></div>}
        title="보안 설정"
        chevron
        onClick={() => {}}
      />
      <ListRow
        left={<div className="w-10 h-10 rounded-full bg-[var(--color-muted)] flex items-center justify-center"><Settings size={18} /></div>}
        title="앱 설정"
        chevron
        onClick={() => {}}
      />
    </>
  ),
};

export const WithRightLabel: Story = {
  render: () => (
    <>
      <ListRow title="이번 달 지출" rightLabel="324,000원" rightSubLabel="전달 대비 +12%" />
      <ListRow title="저축률" rightLabel="32%" />
      <ListRow title="포인트" rightLabel="1,200P" />
    </>
  ),
};

export const TransactionList: Story = {
  render: () => (
    <>
      <ListRow
        left={<div className="w-10 h-10 rounded-full bg-[var(--color-muted)] flex items-center justify-center text-[20px]">🍔</div>}
        title="맥도날드"
        subtitle="오늘 12:30"
        rightLabel="-8,900원"
        rightSubLabel="식비"
      />
      <ListRow
        left={<div className="w-10 h-10 rounded-full bg-[var(--color-muted)] flex items-center justify-center text-[20px]">🚇</div>}
        title="서울 지하철"
        subtitle="오늘 09:15"
        rightLabel="-1,400원"
        rightSubLabel="교통"
      />
      <ListRow
        left={<div className="w-10 h-10 rounded-full bg-[var(--color-positive)]/20 flex items-center justify-center text-[20px]">💰</div>}
        title="급여"
        subtitle="어제 09:00"
        rightLabel="+3,200,000원"
        rightSubLabel="수입"
      />
    </>
  ),
};
