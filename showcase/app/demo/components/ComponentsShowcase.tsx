"use client";

import { useState } from "react";
import {
  Button, Text, Divider, Badge, Chip, Spinner, Skeleton, Empty, Amount, Icon,
  Loading, Accordion, SearchField, IconButton, Progress,
} from "mokona-ui";
import { Inbox, Search, Star, Heart, Download, RefreshCw, Trash2, Settings, Bell, Plus, Edit, X } from "lucide-react";

const buttonVariants = ["primary", "secondary", "outline", "ghost", "danger"] as const;
const buttonSizes = ["sm", "md", "lg"] as const;
const badgeVariants = ["primary", "positive", "negative", "warning", "neutral", "outline"] as const;
const badgeLabels: Record<string, string> = {
  primary: "기본",
  positive: "성공",
  negative: "오류",
  warning: "주의",
  neutral: "중립",
  outline: "외곽선",
};
const textVariants = [
  { variant: "display1", label: "Display 1 — 큰 제목" },
  { variant: "title1", label: "Title 1 — 섹션 제목" },
  { variant: "title2", label: "Title 2 — 소제목" },
  { variant: "title3", label: "Title 3 — 강조" },
  { variant: "body1", label: "Body 1 — 본문 텍스트" },
  { variant: "body2", label: "Body 2 — 작은 본문" },
  { variant: "caption1", label: "Caption 1 — 캡션" },
] as const;

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="flex flex-col gap-4 scroll-mt-20">
      <Text variant="title2" style={{ color: "var(--color-foreground)" }}>
        {title}
      </Text>
      <Divider spacing="none" />
      {children}
    </div>
  );
}

function LoadingSection({ id }: { id?: string }) {
  return (
    <Section id={id} title="Loading — 로딩 애니메이션">
      <div className="grid grid-cols-3 gap-4">
        {(["wave", "squish", "spin"] as const).map((variant) => (
          <div
            key={variant}
            className="flex flex-col items-center gap-4 rounded-2xl p-8"
            style={{ backgroundColor: "var(--color-muted)" }}
          >
            <Loading variant={variant} size="lg" />
            <Text variant="caption1" color="muted">{variant}</Text>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-6">
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Loading variant="squish" size={size} />
            <Text variant="caption1" color="muted">{size}</Text>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AccordionSection({ id }: { id?: string }) {
  return (
    <Section id={id} title="Accordion — 아코디언">
      <div className="flex flex-col gap-4">
        <Accordion
          type="single"
          collapsible
          items={[
            {
              value: "fee",
              trigger: "수수료는 얼마인가요?",
              content: "mokona-ui를 통한 모든 국내 송금은 완전 무료입니다. 해외 송금은 건당 2,500원의 수수료가 부과됩니다.",
            },
            {
              value: "limit",
              trigger: "1일 송금 한도는 어떻게 되나요?",
              content: "기본 한도는 1일 5,000만원이며, 본인 인증 완료 후 최대 1억원까지 상향됩니다. 프로 요금제 사용 시 추가 한도를 신청할 수 있습니다.",
            },
            {
              value: "time",
              trigger: "송금 소요 시간은 얼마나 걸리나요?",
              content: "국내 은행 간 송금은 실시간으로 처리됩니다. 단, 은행별 점검 시간(보통 자정~새벽 1시)에는 다음 날 처리될 수 있습니다.",
            },
            {
              value: "cancel",
              trigger: "송금 취소가 가능한가요?",
              content: "실시간 처리 특성상 송금 완료 후 취소는 불가능합니다. 받는 분에게 직접 반환을 요청해주세요.",
            },
          ]}
        />
        <Accordion
          type="multiple"
          defaultValue={["plan", "security"]}
          items={[
            {
              value: "plan",
              trigger: "요금제 비교",
              content: "무료: 월 10회 송금 / 베이직(2,900원): 월 50회 / 프로(6,900원): 무제한 + 해외 이체",
            },
            {
              value: "security",
              trigger: "보안 정책",
              content: "256-bit AES 암호화 및 TLS 1.3 통신 보안을 적용합니다. 생체인증 및 OTP 2단계 인증을 지원합니다.",
            },
            {
              value: "support",
              trigger: "고객센터 운영시간",
              content: "평일 09:00 ~ 18:00 (주말·공휴일 휴무). 앱 내 챗봇은 24시간 운영됩니다.",
              disabled: false,
            },
          ]}
        />
        <Text variant="caption1" color="muted">위: single 모드 (하나만 열림) / 아래: multiple 모드 (여러 개 열림)</Text>
      </div>
    </Section>
  );
}

function SearchFieldSection({ id }: { id?: string }) {
  const [query, setQuery] = useState("");

  return (
    <Section id={id} title="SearchField — 검색 입력">
      <div className="flex flex-col gap-3">
        <SearchField
          value={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
          placeholder="은행, 거래처 검색"
        />
        {query && (
          <Text variant="caption1" color="muted">검색어: {query}</Text>
        )}
      </div>
    </Section>
  );
}

function IconButtonSection({ id }: { id?: string }) {
  return (
    <Section id={id} title="IconButton — 아이콘 버튼">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {(["primary", "secondary", "outline", "ghost", "danger"] as const).map((variant) => (
            <IconButton key={variant} variant={variant} aria-label={variant}>
              <Bell size={18} />
            </IconButton>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-3">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <IconButton size={size} aria-label={`size ${size}`}>
                <Plus size={size === "sm" ? 14 : size === "md" ? 18 : 22} />
              </IconButton>
              <Text variant="caption1" color="muted">{size}</Text>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <IconButton shape="rounded" aria-label="수정">
            <Edit size={18} />
          </IconButton>
          <IconButton shape="circle" aria-label="닫기" variant="outline">
            <X size={18} />
          </IconButton>
          <IconButton disabled aria-label="비활성화">
            <Settings size={18} />
          </IconButton>
        </div>
        <Text variant="caption1" color="muted">rounded / circle shape, disabled 지원</Text>
      </div>
    </Section>
  );
}

export function ComponentsShowcase() {
  const [selectedChips, setSelectedChips] = useState<string[]>(["react", "typescript"]);
  const [loadingBtn, setLoadingBtn] = useState(false);

  function toggleChip(id: string) {
    setSelectedChips((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function handleLoadingClick() {
    setLoadingBtn(true);
    setTimeout(() => setLoadingBtn(false), 2000);
  }

  const chips = [
    { id: "react", label: "React" },
    { id: "typescript", label: "TypeScript" },
    { id: "nextjs", label: "Next.js" },
    { id: "tailwind", label: "Tailwind" },
    { id: "zod", label: "Zod" },
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* Loading */}
      <LoadingSection id="loading" />

      {/* Accordion */}
      <AccordionSection id="accordion" />

      {/* SearchField */}
      <SearchFieldSection id="searchfield" />

      {/* IconButton */}
      <IconButtonSection id="iconbutton" />

      {/* Text */}
      <Section id="text" title="Text — 타이포그래피">
        <div className="flex flex-col gap-3 rounded-2xl p-5" style={{ backgroundColor: "var(--color-muted)" }}>
          {textVariants.map(({ variant, label }) => (
            <Text key={variant} variant={variant} style={{ color: "var(--color-foreground)" }}>
              {label}
            </Text>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {(["default", "muted", "primary", "positive", "negative", "warning"] as const).map((color) => (
            <Text key={color} variant="body1" color={color}>
              {color}
            </Text>
          ))}
        </div>
      </Section>

      {/* Button */}
      <Section id="button" title="Button — 버튼">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            {buttonVariants.map((v) => (
              <Button key={v} variant={v}>
                {v}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {buttonSizes.map((s) => (
              <Button key={s} size={s}>
                size {s}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button loading={loadingBtn} onClick={handleLoadingClick}>
              {loadingBtn ? "처리 중..." : "로딩 버튼 (클릭)"}
            </Button>
            <Button disabled>비활성화</Button>
            <Button fullWidth>전체 너비 버튼</Button>
          </div>
        </div>
      </Section>

      {/* Badge */}
      <Section id="badge" title="Badge — 배지">
        <div className="flex flex-col gap-3">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-2">
              <Text variant="caption1" color="muted">{size}</Text>
              {badgeVariants.map((v) => (
                <Badge key={v} variant={v} size={size}>
                  {badgeLabels[v]}
                </Badge>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* Chip */}
      <Section id="chip" title="Chip — 선택 태그">
        <div className="flex flex-wrap gap-2">
          {chips.map(({ id, label }) => (
            <Chip
              key={id}
              selected={selectedChips.includes(id)}
              onClick={() => toggleChip(id)}
            >
              {label}
            </Chip>
          ))}
        </div>
        <Text variant="caption1" color="muted">
          선택됨: {selectedChips.join(", ") || "없음"}
        </Text>
      </Section>

      {/* Icon */}
      <Section id="icon" title="Icon — 아이콘">
        <div className="flex flex-wrap items-end gap-4">
          {([
            { icon: Star, label: "Star" },
            { icon: Heart, label: "Heart" },
            { icon: Download, label: "Download" },
            { icon: RefreshCw, label: "RefreshCw" },
            { icon: Trash2, label: "Trash2" },
            { icon: Settings, label: "Settings" },
          ] as const).map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon icon={icon} size="lg" style={{ color: "var(--color-primary)" }} />
              <Text variant="caption1" color="muted">{label}</Text>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-4">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <Icon icon={Star} size={size} style={{ color: "var(--color-foreground)" }} />
              <Text variant="caption1" color="muted">{size}</Text>
            </div>
          ))}
        </div>
      </Section>

      {/* Amount */}
      <Section id="amount" title="Amount — 금액 표시">
        <div className="flex flex-col gap-3 rounded-2xl p-5" style={{ backgroundColor: "var(--color-muted)" }}>
          <Amount value={12543200} locale="ko-KR" currency="KRW" variant="display1" />
          <Amount value={3200000} locale="ko-KR" currency="KRW" variant="title1" colorBySign showSign />
          <Amount value={-204500} locale="ko-KR" currency="KRW" variant="title2" colorBySign showSign />
          <Amount value={0} locale="ko-KR" currency="KRW" variant="body1" colorBySign showSign />
        </div>
      </Section>

      {/* Divider */}
      <Section id="divider" title="Divider — 구분선">
        <div className="flex flex-col gap-3">
          <Divider spacing="sm" />
          <Divider spacing="md" />
          <Divider spacing="lg" />
          <div className="flex h-16 items-center gap-4">
            <Text variant="body2" color="muted">수평</Text>
            <Divider orientation="vertical" />
            <Text variant="body2" color="muted">구분선</Text>
            <Divider orientation="vertical" />
            <Text variant="body2" color="muted">예시</Text>
          </div>
        </div>
      </Section>

      {/* Progress */}
      <Section id="progress" title="Progress — 진행률 표시">
        <div className="flex flex-col gap-3">
          {[0, 35, 72, 100].map((v) => (
            <Progress key={v} value={v} showLabel />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col gap-1">
              <Text variant="caption1" color="muted">{size}</Text>
              <Progress value={60} size={size} />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {(["primary", "positive", "negative", "warning"] as const).map((color) => (
            <div key={color} className="flex flex-col gap-1">
              <Text variant="caption1" color="muted">{color}</Text>
              <Progress value={60} color={color} />
            </div>
          ))}
        </div>
      </Section>

      {/* Spinner */}
      <Section id="spinner" title="Spinner — 로딩 스피너">
        <div className="flex flex-wrap items-end gap-8">
          {(["sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Spinner size={size} />
              <Text variant="caption1" color="muted">{size}</Text>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-8">
          {(["primary", "muted"] as const).map((color) => (
            <div key={color} className="flex flex-col items-center gap-2">
              <Spinner size="md" color={color} />
              <Text variant="caption1" color="muted">{color}</Text>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "var(--color-primary)" }}>
              <Spinner size="sm" color="white" />
            </div>
            <Text variant="caption1" color="muted">white</Text>
          </div>
        </div>
      </Section>

      {/* Skeleton */}
      <Section id="skeleton" title="Skeleton — 스켈레톤">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton variant="text" width="60%" height={18} />
              <Skeleton variant="text" width="40%" height={14} />
            </div>
          </div>
          <Skeleton variant="rectangular" width="100%" height={120} />
          <Skeleton variant="text" lines={3} />
        </div>
      </Section>

      {/* Empty */}
      <Section id="empty" title="Empty — 빈 상태">
        <div
          className="rounded-2xl"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <Empty
            icon={<Inbox size={40} style={{ color: "var(--color-muted-foreground)" }} />}
            title="검색 결과가 없습니다"
            description="다른 검색어로 다시 시도해보세요."
            action={
              <Button variant="outline" size="sm">
                <Search size={14} />
                &nbsp;다시 검색
              </Button>
            }
          />
        </div>
      </Section>
    </div>
  );
}
