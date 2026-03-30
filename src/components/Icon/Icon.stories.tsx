import type { Meta, StoryObj } from "@storybook/react";
import {
  Send, Heart, Star, Bell, Search, Settings, User, Home,
  ArrowRight, ChevronDown, Check, X, Plus, Minus,
  CreditCard, Wallet, Building2, Smartphone,
  TrendingUp, TrendingDown, AlertCircle, Info, CheckCircle,
} from "lucide-react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Foundation/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: Send,
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-1">
          <Icon icon={Bell} size={size} />
          <span className="text-[11px] text-gray-400">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={CheckCircle} size="lg" className="text-[var(--color-positive)]" />
      <Icon icon={AlertCircle} size="lg" className="text-[var(--color-negative)]" />
      <Icon icon={Info} size="lg" className="text-[var(--color-primary)]" />
      <Icon icon={Star} size="lg" className="text-[var(--color-warning)]" />
      <Icon icon={Heart} size="lg" className="text-[var(--color-muted-foreground)]" />
    </div>
  ),
};

export const FinanceIcons: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-6">
      {[
        { icon: Send, label: "송금" },
        { icon: Wallet, label: "지갑" },
        { icon: CreditCard, label: "카드" },
        { icon: Building2, label: "은행" },
        { icon: Smartphone, label: "모바일" },
        { icon: TrendingUp, label: "상승" },
        { icon: TrendingDown, label: "하락" },
        { icon: Search, label: "검색" },
        { icon: Bell, label: "알림" },
        { icon: Settings, label: "설정" },
        { icon: User, label: "내정보" },
        { icon: Home, label: "홈" },
        { icon: ArrowRight, label: "이동" },
        { icon: ChevronDown, label: "열기" },
        { icon: Check, label: "확인" },
        { icon: X, label: "닫기" },
        { icon: Plus, label: "추가" },
        { icon: Minus, label: "삭제" },
      ].map(({ icon, label }) => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <Icon icon={icon} size="md" className="text-[var(--color-foreground)]" />
          <span className="text-[11px] text-[var(--color-muted-foreground)]">{label}</span>
        </div>
      ))}
    </div>
  ),
};

export const WithAccessibleLabel: Story = {
  args: {
    icon: Send,
    size: "md",
    label: "송금하기",
  },
};
