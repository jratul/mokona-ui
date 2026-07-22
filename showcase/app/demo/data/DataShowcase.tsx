"use client";

import { useState } from "react";
import {
  Text, Divider, Table, Pagination, Skeleton, Empty,
  Badge, Amount, Avatar, Button, Tabs, ListRow, Card,
} from "mokona-ui";
import { FileSearch, RefreshCw, CreditCard, Wallet, Send, Bell, ChevronRight, Settings } from "lucide-react";

type TransactionStatus = "completed" | "pending" | "failed";

interface Transaction {
  id: string;
  name: string;
  bank: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  category: string;
}

const allTransactions: Transaction[] = [
  { id: "1", name: "홍길동", bank: "토스뱅크", date: "2026.04.03", amount: -50000, status: "completed", category: "송금" },
  { id: "2", name: "급여", bank: "국민은행", date: "2026.04.01", amount: 3200000, status: "completed", category: "수입" },
  { id: "3", name: "김철수", bank: "카카오뱅크", date: "2026.03.31", amount: -120000, status: "completed", category: "송금" },
  { id: "4", name: "편의점", bank: "신한카드", date: "2026.03.31", amount: -4500, status: "completed", category: "소비" },
  { id: "5", name: "이영희", bank: "우리은행", date: "2026.03.30", amount: -30000, status: "pending", category: "송금" },
  { id: "6", name: "구독 결제", bank: "하나카드", date: "2026.03.29", amount: -9900, status: "completed", category: "구독" },
  { id: "7", name: "박민준", bank: "기업은행", date: "2026.03.28", amount: -80000, status: "failed", category: "송금" },
  { id: "8", name: "용돈", bank: "농협은행", date: "2026.03.27", amount: 200000, status: "completed", category: "수입" },
  { id: "9", name: "온라인 쇼핑", bank: "삼성카드", date: "2026.03.26", amount: -67000, status: "completed", category: "소비" },
  { id: "10", name: "커피", bank: "신한카드", date: "2026.03.25", amount: -5500, status: "completed", category: "소비" },
  { id: "11", name: "정수기 구독", bank: "하나카드", date: "2026.03.24", amount: -29000, status: "completed", category: "구독" },
  { id: "12", name: "이자 수령", bank: "토스뱅크", date: "2026.03.23", amount: 1200, status: "completed", category: "수입" },
  { id: "13", name: "최지원", bank: "카카오뱅크", date: "2026.03.22", amount: -15000, status: "pending", category: "송금" },
  { id: "14", name: "마트", bank: "KB카드", date: "2026.03.21", amount: -43500, status: "completed", category: "소비" },
  { id: "15", name: "프리랜서", bank: "국민은행", date: "2026.03.20", amount: 500000, status: "completed", category: "수입" },
];

const PAGE_SIZE = 5;

const statusMap: Record<TransactionStatus, { label: string; variant: "positive" | "warning" | "negative" }> = {
  completed: { label: "완료", variant: "positive" },
  pending: { label: "처리중", variant: "warning" },
  failed: { label: "실패", variant: "negative" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <Text variant="title2" style={{ color: "var(--color-foreground)" }}>
        {title}
      </Text>
      <Divider spacing="none" />
      {children}
    </div>
  );
}

function TableSection() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const filtered =
    filter === "all"
      ? allTransactions
      : filter === "income"
        ? allTransactions.filter((t) => t.amount > 0)
        : allTransactions.filter((t) => t.amount < 0);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilter(v: string) {
    setFilter(v);
    setPage(1);
  }

  function handleRefresh() {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }

  const columns = [
    {
      key: "name",
      header: "거래처",
      render: (row: Transaction) => (
        <div className="flex items-center gap-2">
          <Avatar alt={row.name} size="sm" />
          <div>
            <div className="text-[14px] font-medium" style={{ color: "var(--color-foreground)" }}>
              {row.name}
            </div>
            <div className="text-[12px]" style={{ color: "var(--color-muted-foreground)" }}>
              {row.bank}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      header: "날짜",
      render: (row: Transaction) => (
        <span className="text-[13px]" style={{ color: "var(--color-muted-foreground)" }}>
          {row.date}
        </span>
      ),
    },
    {
      key: "category",
      header: "분류",
      render: (row: Transaction) => (
        <Badge variant="neutral" size="sm">{row.category}</Badge>
      ),
    },
    {
      key: "amount",
      header: "금액",
      align: "right" as const,
      render: (row: Transaction) => (
        <Amount
          value={row.amount}
          locale="ko-KR"
          currency="KRW"
          variant="body2"
          colorBySign
          showSign
        />
      ),
    },
    {
      key: "status",
      header: "상태",
      align: "center" as const,
      render: (row: Transaction) => (
        <Badge variant={statusMap[row.status].variant} size="sm">
          {statusMap[row.status].label}
        </Badge>
      ),
    },
  ];

  const tabItems = [
    { value: "all", label: "전체", content: null },
    { value: "income", label: "수입", content: null },
    { value: "expense", label: "지출", content: null },
  ];

  return (
    <Section title="Table — 데이터 테이블">
      <div className="flex items-center justify-between">
        <Tabs
          items={tabItems}
          value={filter}
          onValueChange={handleFilter}
          variant="pill"
        />
        <Button variant="ghost" size="sm" onClick={handleRefresh}>
          <RefreshCw size={14} />&nbsp;새로고침
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3 rounded-2xl p-4" style={{ border: "1px solid var(--color-border)" }}>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton variant="circular" width={32} height={32} />
              <div className="flex flex-1 flex-col gap-1.5">
                <Skeleton variant="text" width="50%" height={14} />
                <Skeleton variant="text" width="30%" height={12} />
              </div>
              <Skeleton variant="text" width={80} height={14} />
              <Skeleton variant="rectangular" width={48} height={22} />
            </div>
          ))}
        </div>
      ) : paged.length === 0 ? (
        <Empty
          icon={<FileSearch size={40} style={{ color: "var(--color-muted-foreground)" }} />}
          title="거래 내역이 없습니다"
          description="선택한 필터에 해당하는 거래가 없습니다."
        />
      ) : (
        <Table
          columns={columns}
          data={paged}
          keyExtractor={(row: Transaction) => row.id}
          striped
        />
      )}

      {!loading && totalPages > 1 && (
        <div className="flex justify-center pt-2">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <Text variant="caption1" color="muted">
        총 {filtered.length}건 · {page}/{totalPages} 페이지
      </Text>
    </Section>
  );
}

function SkeletonTableSection() {
  return (
    <Section title="Skeleton — 로딩 스켈레톤 (테이블)">
      <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--color-border)" }}>
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ backgroundColor: "var(--color-muted)", borderBottom: "1px solid var(--color-border)" }}
        >
          {["거래처", "날짜", "분류", "금액", "상태"].map((h) => (
            <Skeleton key={h} variant="text" width={h === "거래처" ? 80 : 60} height={13} />
          ))}
        </div>
        <div className="flex flex-col divide-y" style={{ borderColor: "var(--color-border)" }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3.5">
              <div className="flex items-center gap-2">
                <Skeleton variant="circular" width={32} height={32} />
                <div className="flex flex-col gap-1">
                  <Skeleton variant="text" width={72} height={13} />
                  <Skeleton variant="text" width={52} height={11} />
                </div>
              </div>
              <Skeleton variant="text" width={80} height={13} />
              <Skeleton variant="rectangular" width={44} height={20} />
              <Skeleton variant="text" width={90} height={13} />
              <Skeleton variant="rectangular" width={44} height={20} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ListRowSection() {
  const accounts = [
    { bank: "토스뱅크", number: "100-012-345678", balance: 12543200, icon: CreditCard },
    { bank: "국민은행", number: "123-45-678901", balance: 3200000, icon: Wallet },
    { bank: "카카오뱅크", number: "3333-01-2345678", balance: 540000, icon: Send },
  ];

  const menuItems = [
    { label: "알림 설정", desc: "푸시·이메일·SMS", icon: Bell },
    { label: "보안 설정", desc: "생체인증·OTP 관리", icon: Settings },
    { label: "계좌 관리", desc: "연결 계좌 추가·삭제", icon: CreditCard },
  ];

  return (
    <Section title="ListRow — 목록 행">
      <div className="flex flex-col gap-4">
        <Card className="overflow-hidden p-0">
          {accounts.map(({ bank, number, balance, icon: Icon }, i) => (
            <ListRow
              key={bank}
              left={
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                    color: "var(--color-primary)",
                  }}
                >
                  <Icon size={18} />
                </div>
              }
              title={bank}
              subtitle={number}
              rightLabel={balance.toLocaleString() + "원"}
              rightSubLabel="잔액"
              chevron
              onClick={() => {}}
              className={i < accounts.length - 1 ? "border-b border-(--color-border)" : ""}
            />
          ))}
        </Card>

        <Card className="overflow-hidden p-0">
          {menuItems.map(({ label, desc, icon: Icon }, i) => (
            <ListRow
              key={label}
              left={
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "var(--color-muted)", color: "var(--color-muted-foreground)" }}
                >
                  <Icon size={16} />
                </div>
              }
              title={label}
              subtitle={desc}
              right={<ChevronRight size={16} style={{ color: "var(--color-muted-foreground)" }} />}
              onClick={() => {}}
              className={i < menuItems.length - 1 ? "border-b border-(--color-border)" : ""}
            />
          ))}
        </Card>

        <Card className="overflow-hidden p-0">
          <ListRow
            left={<Avatar size="md" fallback="홍" />}
            title="홍길동"
            subtitle="자주 보내는 연락처"
            rightLabel="50,000원"
            rightSubLabel="최근 송금"
            chevron
            onClick={() => {}}
          />
          <ListRow
            left={<Avatar size="md" fallback="김" />}
            title="김철수"
            subtitle="카카오뱅크"
            rightLabel="120,000원"
            rightSubLabel="최근 송금"
            chevron
            onClick={() => {}}
            className="border-t border-(--color-border)"
          />
          <ListRow
            left={<Avatar size="md" fallback="이" />}
            title="이영희 (비활성)"
            subtitle="우리은행"
            chevron
            disabled
            onClick={() => {}}
            className="border-t border-(--color-border)"
          />
        </Card>
      </div>
    </Section>
  );
}

export function DataShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <ListRowSection />
      <TableSection />
      <SkeletonTableSection />
    </div>
  );
}
