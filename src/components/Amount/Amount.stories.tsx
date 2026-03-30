import type { Meta, StoryObj } from "@storybook/react";
import { Amount } from "./Amount";

const meta: Meta<typeof Amount> = {
  title: "Components/Amount",
  component: Amount,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Amount>;

export const Default: Story = {
  args: { value: 1234567 },
};

export const KRW: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Amount value={1234567} currency="KRW" variant="title1" />
      <Amount value={500} currency="KRW" variant="body1" color="muted" />
      <Amount value={0} currency="KRW" variant="body2" />
    </div>
  ),
};

export const MultiCurrency: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ width: 40, fontSize: 12, color: "var(--color-muted-foreground)" }}>KRW</span>
        <Amount value={1234567} currency="KRW" variant="title3" />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ width: 40, fontSize: 12, color: "var(--color-muted-foreground)" }}>USD</span>
        <Amount value={1234.56} currency="USD" locale="en-US" variant="title3" />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ width: 40, fontSize: 12, color: "var(--color-muted-foreground)" }}>JPY</span>
        <Amount value={154321} currency="JPY" locale="ja-JP" variant="title3" />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ width: 40, fontSize: 12, color: "var(--color-muted-foreground)" }}>EUR</span>
        <Amount value={987.65} currency="EUR" locale="de-DE" variant="title3" />
      </div>
    </div>
  ),
};

export const WithSign: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Amount value={5000} currency="KRW" showSign colorBySign variant="body1" />
      <Amount value={-3500} currency="KRW" showSign colorBySign variant="body1" />
      <Amount value={0} currency="KRW" showSign colorBySign variant="body1" />
    </div>
  ),
};

export const TransactionList: Story = {
  render: () => {
    const transactions = [
      { label: "카페 결제", value: -4500, date: "오늘" },
      { label: "월급", value: 3200000, date: "어제" },
      { label: "구독 결제", value: -13900, date: "어제" },
      { label: "이체 수령", value: 50000, date: "3일 전" },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
        {transactions.map((tx) => (
          <div
            key={tx.label}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 500, color: "var(--color-foreground)" }}>{tx.label}</div>
              <div style={{ fontSize: 13, color: "var(--color-muted-foreground)", marginTop: 2 }}>{tx.date}</div>
            </div>
            <Amount
              value={tx.value}
              currency="KRW"
              showSign
              colorBySign
              variant="body1"
            />
          </div>
        ))}
      </div>
    );
  },
};

export const FractionDigits: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Amount value={1234.5678} currency="USD" locale="en-US" variant="body1" />
      <Amount value={1234.5678} currency="USD" locale="en-US" minimumFractionDigits={4} maximumFractionDigits={4} variant="body1" />
      <Amount value={1234.5678} maximumFractionDigits={0} variant="body1" />
    </div>
  ),
};
