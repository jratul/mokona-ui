"use client";

import { Card, Badge, Progress, Amount, Avatar, Alert, Tabs } from "mokona-ui";
import {
  TrendingUp, TrendingDown, Send, CreditCard, Wallet, Bell,
} from "lucide-react";

const transactions = [
  { id: "1", date: "오늘 14:32", name: "홍길동", bank: "토스뱅크", amount: -50000, status: "completed" as const },
  { id: "2", date: "오늘 11:05", name: "급여", bank: "국민은행", amount: 3200000, status: "completed" as const },
  { id: "3", date: "어제 22:41", name: "김철수", bank: "카카오뱅크", amount: -120000, status: "completed" as const },
  { id: "4", date: "어제 18:00", name: "편의점", bank: "신한카드", amount: -4500, status: "completed" as const },
  { id: "5", date: "2일 전", name: "이영희", bank: "우리은행", amount: -30000, status: "pending" as const },
];

const statusMap = {
  completed: { label: "완료", variant: "positive" as const },
  pending: { label: "처리중", variant: "warning" as const },
};

const quickMenus = [
  { icon: Send, label: "송금" },
  { icon: CreditCard, label: "카드" },
  { icon: Wallet, label: "저축" },
  { icon: Bell, label: "알림" },
];

const goals = [
  { label: "비상금", current: 650000, target: 1000000, color: "primary" as const },
  { label: "여행 적금", current: 320000, target: 500000, color: "positive" as const },
  { label: "노트북 구매", current: 780000, target: 1200000, color: "warning" as const },
];

const tabItems = [
  {
    value: "all",
    label: "전체",
    content: <TransactionList items={transactions} />,
  },
  {
    value: "income",
    label: "수입",
    content: <TransactionList items={transactions.filter((t) => t.amount > 0)} />,
  },
  {
    value: "expense",
    label: "지출",
    content: <TransactionList items={transactions.filter((t) => t.amount < 0)} />,
  },
];

function TransactionList({ items }: { items: typeof transactions }) {
  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-[14px]" style={{ color: "var(--color-muted-foreground)" }}>
        내역이 없습니다
      </p>
    );
  }
  return (
    <div className="flex flex-col divide-y" style={{ borderColor: "var(--color-border)" }}>
      {items.map((tx) => (
        <div key={tx.id} className="flex items-center gap-3 py-3.5">
          <Avatar
            alt={tx.name}
            size="md"
          />
          <div className="flex flex-1 flex-col">
            <span className="text-[15px] font-medium" style={{ color: "var(--color-foreground)" }}>
              {tx.name}
            </span>
            <span className="text-[13px]" style={{ color: "var(--color-muted-foreground)" }}>
              {tx.bank} · {tx.date}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Amount
              value={tx.amount}
              locale="ko-KR"
              currency="KRW"
              variant="body2"
              colorBySign
              showSign
            />
            <Badge variant={statusMap[tx.status].variant} size="sm">
              {statusMap[tx.status].label}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <Alert variant="info">이 페이지는 mokona-ui 컴포넌트로만 구성된 데모입니다.</Alert>

      {/* 상단 카드 3개 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="flex flex-col gap-2 p-5">
          <p className="text-[13px]" style={{ color: "var(--color-muted-foreground)" }}>총 자산</p>
          <Amount value={12543200} locale="ko-KR" currency="KRW" variant="title1" />
          <div className="flex items-center gap-1 text-[13px]" style={{ color: "var(--color-positive)" }}>
            <TrendingUp size={14} />
            <span>+2.4% 지난달 대비</span>
          </div>
        </Card>

        <Card className="flex flex-col gap-2 p-5">
          <p className="text-[13px]" style={{ color: "var(--color-muted-foreground)" }}>이번 달 수입</p>
          <Amount value={3200000} locale="ko-KR" currency="KRW" variant="title1" />
          <div className="flex items-center gap-1 text-[13px]" style={{ color: "var(--color-positive)" }}>
            <TrendingUp size={14} />
            <span>급여 수령 완료</span>
          </div>
        </Card>

        <Card className="flex flex-col gap-2 p-5">
          <p className="text-[13px]" style={{ color: "var(--color-muted-foreground)" }}>이번 달 지출</p>
          <Amount value={-204500} locale="ko-KR" currency="KRW" variant="title1" colorBySign />
          <div className="flex items-center gap-1 text-[13px]" style={{ color: "var(--color-negative)" }}>
            <TrendingDown size={14} />
            <span>예산의 68% 사용</span>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* 거래내역 */}
        <div className="md:col-span-2">
          <Card className="p-5">
            <p className="mb-4 text-[16px] font-semibold" style={{ color: "var(--color-foreground)" }}>
              거래 내역
            </p>
            <Tabs items={tabItems} defaultValue="all" variant="line" />
          </Card>
        </div>

        {/* 사이드 */}
        <div className="flex flex-col gap-4">
          {/* 퀵 메뉴 */}
          <Card className="p-5">
            <p className="mb-4 text-[15px] font-semibold" style={{ color: "var(--color-foreground)" }}>
              빠른 메뉴
            </p>
            <div className="grid grid-cols-4 gap-2">
              {quickMenus.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-1.5 rounded-xl py-3 text-[12px] font-medium transition-colors"
                  style={{ color: "var(--color-foreground)" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--color-muted)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  {label}
                </button>
              ))}
            </div>
          </Card>

          {/* 저축 목표 */}
          <Card className="p-5">
            <p className="mb-4 text-[15px] font-semibold" style={{ color: "var(--color-foreground)" }}>
              저축 목표
            </p>
            <div className="flex flex-col gap-4">
              {goals.map((g) => (
                <div key={g.label}>
                  <div className="mb-1.5 flex items-center justify-between text-[13px]">
                    <span style={{ color: "var(--color-foreground)" }}>{g.label}</span>
                    <span style={{ color: "var(--color-muted-foreground)" }}>
                      {Math.round((g.current / g.target) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={Math.round((g.current / g.target) * 100)}
                    color={g.color}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
