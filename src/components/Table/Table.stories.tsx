import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { Badge } from "../Badge/Badge";

const meta: Meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

interface Transaction {
  id: string;
  date: string;
  name: string;
  amount: number;
  status: "completed" | "pending" | "failed";
}

const data: Transaction[] = [
  { id: "1", date: "2024-01-15", name: "홍길동", amount: 50000, status: "completed" },
  { id: "2", date: "2024-01-14", name: "김철수", amount: 120000, status: "completed" },
  { id: "3", date: "2024-01-13", name: "이영희", amount: 30000, status: "pending" },
  { id: "4", date: "2024-01-12", name: "박민준", amount: 75000, status: "failed" },
];

const statusVariant = {
  completed: "positive",
  pending: "warning",
  failed: "negative",
} as const;

const statusLabel = { completed: "완료", pending: "처리중", failed: "실패" } as const;

const columns = [
  { key: "date", header: "날짜", width: "120px" },
  { key: "name", header: "받는 사람" },
  {
    key: "amount",
    header: "금액",
    align: "right" as const,
    render: (row: Transaction) => `${row.amount.toLocaleString()}원`,
  },
  {
    key: "status",
    header: "상태",
    align: "center" as const,
    render: (row: Transaction) => (
      <Badge variant={statusVariant[row.status]}>{statusLabel[row.status]}</Badge>
    ),
  },
];

export const Default: Story = {
  render: () => (
    <Table<Transaction>
      columns={columns}
      data={data}
      keyExtractor={(row) => row.id}
    />
  ),
};

export const Striped: Story = {
  render: () => (
    <Table<Transaction>
      columns={columns}
      data={data}
      keyExtractor={(row) => row.id}
      striped
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <Table<Transaction>
      columns={columns}
      data={[]}
      loading
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <Table<Transaction>
      columns={columns}
      data={[]}
      emptyMessage="거래 내역이 없습니다."
    />
  ),
};
