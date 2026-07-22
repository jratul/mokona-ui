"use client";

import { useState } from "react";
import {
  Text, Divider, Slider, Toggle, RadioGroup, Textarea,
  DatePicker, Calendar, Card, Amount,
  SegmentedControl, Rating, NumericSpinner,
} from "mokona-ui";

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

function SliderSection() {
  const [volume, setVolume] = useState([60]);
  const [range, setRange] = useState([20, 80]);
  const [budget, setBudget] = useState([500000]);

  return (
    <Section title="Slider — 슬라이더">
      <div className="flex flex-col gap-6">
        <Card className="flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between">
            <Text variant="body2" color="muted">볼륨</Text>
            <Text variant="body2" style={{ color: "var(--color-foreground)" }}>{volume[0]}%</Text>
          </div>
          <Slider
            label="볼륨"
            value={volume}
            onValueChange={setVolume}
            min={0}
            max={100}
          />
        </Card>

        <Card className="flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between">
            <Text variant="body2" color="muted">예산 범위</Text>
            <Text variant="body2" style={{ color: "var(--color-foreground)" }}>
              {range[0].toLocaleString()}원 ~ {range[1].toLocaleString()}원
            </Text>
          </div>
          <Slider
            label="예산 범위"
            value={range}
            onValueChange={setRange}
            min={0}
            max={100}
          />
        </Card>

        <Card className="flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between">
            <Text variant="body2" color="muted">월 목표 저축액</Text>
          </div>
          <Slider
            label="월 목표 저축액"
            value={budget}
            onValueChange={setBudget}
            min={100000}
            max={2000000}
            step={50000}
            showValue
            formatValue={(v) => `${(v / 10000).toFixed(0)}만원`}
          />
          <Amount value={budget[0]} locale="ko-KR" currency="KRW" variant="title2" />
        </Card>
      </div>
    </Section>
  );
}

function ToggleSection() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const toggles = [
    { label: "푸시 알림", description: "새로운 알림을 푸시로 받습니다.", value: push, onChange: setPush, size: "sm" as const },
    { label: "이메일 알림", description: "주요 업데이트를 이메일로 받습니다.", value: email, onChange: setEmail, size: "md" as const },
    { label: "SMS 인증", description: "로그인 시 SMS 2단계 인증을 사용합니다.", value: sms, onChange: setSms, size: "md" as const },
    { label: "다크 모드", description: "어두운 테마를 사용합니다.", value: darkMode, onChange: setDarkMode, size: "lg" as const },
    { label: "자동 저장", description: "작업 내용을 자동으로 저장합니다.", value: autoSave, onChange: setAutoSave, size: "md" as const },
  ];

  return (
    <Section title="Toggle — 토글 스위치">
      <Card className="flex flex-col divide-y p-0" style={{ borderColor: "var(--color-border)" }}>
        {toggles.map(({ label, description, value, onChange, size }) => (
          <div key={label} className="px-5 py-4">
            <Toggle
              label={label}
              description={description}
              checked={value}
              onCheckedChange={onChange}
              size={size}
            />
          </div>
        ))}
      </Card>
    </Section>
  );
}

function RadioSection() {
  const [plan, setPlan] = useState("basic");
  const [notify, setNotify] = useState("push");

  return (
    <Section title="RadioGroup — 라디오 그룹">
      <div className="flex flex-col gap-6">
        <Card className="flex flex-col gap-4 p-5">
          <Text variant="body1" style={{ color: "var(--color-foreground)" }}>요금제 선택</Text>
          <RadioGroup
            value={plan}
            onValueChange={setPlan}
            size="lg"
            items={[
              { value: "free", label: "무료", description: "월 10회 송금, 기본 조회" },
              { value: "basic", label: "베이직 — 월 2,900원", description: "월 50회 송금, 전체 내역 조회" },
              { value: "pro", label: "프로 — 월 6,900원", description: "무제한 송금, 해외 이체, 자동이체" },
            ]}
          />
        </Card>

        <Card className="flex flex-col gap-4 p-5">
          <Text variant="body1" style={{ color: "var(--color-foreground)" }}>알림 방식</Text>
          <RadioGroup
            value={notify}
            onValueChange={setNotify}
            orientation="horizontal"
            size="sm"
            items={[
              { value: "push", label: "푸시" },
              { value: "email", label: "이메일" },
              { value: "sms", label: "SMS" },
              { value: "none", label: "수신 안함" },
            ]}
          />
        </Card>
      </div>
    </Section>
  );
}

function TextareaSection() {
  const [memo, setMemo] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <Section title="Textarea — 텍스트 영역">
      <div className="flex flex-col gap-4">
        <Textarea
          label="송금 메모"
          placeholder="받는 분에게 전달할 메시지를 입력하세요"
          value={memo}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMemo(e.target.value)}
          showCount
          maxLength={100}
          helperText="메모는 받는 분의 앱에 표시됩니다."
        />
        <Textarea
          label="서비스 피드백"
          placeholder="서비스 이용 중 불편하셨던 점을 알려주세요"
          value={feedback}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
          showCount
          maxLength={500}
          isError={feedback.length > 0 && feedback.length < 10}
          errorMessage="최소 10자 이상 입력해주세요."
          rows={5}
        />
      </div>
    </Section>
  );
}

function DateSection() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [calDate, setCalDate] = useState<Date | undefined>(new Date());

  return (
    <Section title="DatePicker & Calendar — 날짜 선택">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <DatePicker
              label="시작일"
              placeholder="날짜를 선택하세요"
              value={date}
              onChange={setDate}
              helperText="조회 기간의 시작일을 선택합니다."
            />
          </div>
          <div className="flex-1">
            <DatePicker
              label="종료일"
              placeholder="날짜를 선택하세요"
              value={date}
              onChange={setDate}
              minDate={date}
              helperText="시작일 이후 날짜만 선택 가능합니다."
            />
          </div>
        </div>

        <Card className="flex flex-col items-center gap-3 p-5">
          <Text variant="body1" style={{ color: "var(--color-foreground)" }}>
            인라인 캘린더
          </Text>
          <Calendar value={calDate} onChange={setCalDate} />
          {calDate && (
            <Text variant="body2" color="muted">
              선택: {calDate.toLocaleDateString("ko-KR")}
            </Text>
          )}
        </Card>
      </div>
    </Section>
  );
}

function SegmentedControlSection() {
  const [period, setPeriod] = useState("1m");
  const [view, setView] = useState("list");

  return (
    <Section title="SegmentedControl — 세그먼트 컨트롤">
      <div className="flex flex-col gap-4">
        <Card className="flex flex-col gap-4 p-5">
          <Text variant="body2" color="muted">조회 기간</Text>
          <SegmentedControl
            value={period}
            onChange={setPeriod}
            items={[
              { value: "1w", label: "1주" },
              { value: "1m", label: "1개월" },
              { value: "3m", label: "3개월" },
              { value: "6m", label: "6개월" },
              { value: "1y", label: "1년" },
            ]}
            fullWidth
          />
          <Text variant="caption1" color="muted">선택: {period}</Text>
        </Card>
        <Card className="flex flex-col gap-4 p-5">
          <Text variant="body2" color="muted">보기 방식</Text>
          <SegmentedControl
            value={view}
            onChange={setView}
            size="sm"
            items={[
              { value: "list", label: "목록" },
              { value: "grid", label: "그리드" },
            ]}
          />
        </Card>
      </div>
    </Section>
  );
}

function RatingSection() {
  const [rating, setRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(4);

  return (
    <Section title="Rating — 별점">
      <div className="flex flex-col gap-4">
        <Card className="flex flex-col gap-4 p-5">
          <Text variant="body1" style={{ color: "var(--color-foreground)" }}>서비스 만족도</Text>
          <div className="flex flex-col items-center gap-3">
            <Rating value={rating} onChange={setRating} size="lg" />
            <Text variant="body2" color="muted">
              {rating === 0 ? "별점을 선택해주세요" : `${rating}점 / 5점`}
            </Text>
          </div>
        </Card>
        <Card className="flex flex-col gap-4 p-5">
          <Text variant="body1" style={{ color: "var(--color-foreground)" }}>평점 (읽기 전용)</Text>
          <div className="flex items-center gap-3">
            <Rating value={serviceRating} onChange={setServiceRating} size="sm" readOnly />
            <Text variant="body2" color="muted">{serviceRating}.0 / 5.0</Text>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function NumericSpinnerSection() {
  const [count, setCount] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  return (
    <Section title="NumericSpinner — 숫자 스피너">
      <div className="flex flex-col gap-4">
        <Card className="flex flex-col gap-4 p-5">
          <Text variant="body1" style={{ color: "var(--color-foreground)" }}>수량 선택</Text>
          <div className="flex items-center justify-between">
            <Text variant="body2" color="muted">상품 수량</Text>
            <NumericSpinner
              value={count}
              onChange={setCount}
              min={1}
              max={99}
            />
          </div>
          <Text variant="caption1" color="muted">최소 1개, 최대 99개</Text>
        </Card>
        <Card className="flex flex-col gap-4 p-5">
          <Text variant="body1" style={{ color: "var(--color-foreground)" }}>인원 선택</Text>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body2" style={{ color: "var(--color-foreground)" }}>성인</Text>
                <Text variant="caption1" color="muted">만 13세 이상</Text>
              </div>
              <NumericSpinner value={adults} onChange={setAdults} min={1} max={9} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body2" style={{ color: "var(--color-foreground)" }}>어린이</Text>
                <Text variant="caption1" color="muted">만 2~12세</Text>
              </div>
              <NumericSpinner value={children} onChange={setChildren} min={0} max={9} size="sm" />
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

export function InputsShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <SegmentedControlSection />
      <RatingSection />
      <NumericSpinnerSection />
      <SliderSection />
      <ToggleSection />
      <RadioSection />
      <TextareaSection />
      <DateSection />
    </div>
  );
}
