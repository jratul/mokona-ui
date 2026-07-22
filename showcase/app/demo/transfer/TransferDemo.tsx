"use client";

import { useState } from "react";
import { Stepper, Select, TextField, Button, OTPInput, Alert, Amount } from "mokona-ui";

type Step = 0 | 1 | 2 | 3;

const steps = [
  { title: "은행 선택" },
  { title: "계좌 입력" },
  { title: "금액 입력" },
  { title: "인증" },
];

const bankOptions = [
  { value: "toss", label: "토스뱅크" },
  { value: "kb", label: "국민은행" },
  { value: "kakao", label: "카카오뱅크" },
  { value: "shinhan", label: "신한은행" },
  { value: "woori", label: "우리은행" },
];

export function TransferDemo() {
  const [step, setStep] = useState<Step>(0);
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [done, setDone] = useState(false);

  const bankLabel = bankOptions.find((b) => b.value === bank)?.label ?? "";

  function handleComplete(v: string) {
    setOtp(v);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full text-[36px]"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-positive) 15%, transparent)" }}
        >
          ✓
        </div>
        <div>
          <p className="text-[22px] font-bold" style={{ color: "var(--color-foreground)" }}>
            송금 완료
          </p>
          <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted-foreground)" }}>
            {bankLabel} · {account}
          </p>
        </div>
        <Amount
          value={Number(amount.replace(/,/g, ""))}
          locale="ko-KR"
          currency="KRW"
          variant="title1"
          colorBySign
        />
        <Button className="w-full" onClick={() => { setStep(0); setBank(""); setAccount(""); setAmount(""); setOtp(""); setDone(false); }}>
          다시 송금하기
        </Button>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-6"
      style={{
        backgroundColor: "var(--color-background)",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--color-border)",
      }}
    >
      <Stepper steps={steps} currentStep={step} className="mb-8" />

      {step === 0 && (
        <div className="flex flex-col gap-5">
          <p className="text-[18px] font-bold" style={{ color: "var(--color-foreground)" }}>
            어느 은행으로 보낼까요?
          </p>
          <Select
            label="은행"
            options={bankOptions}
            value={bank}
            onValueChange={setBank}
            placeholder="은행을 선택하세요"
          />
          <Button className="w-full" disabled={!bank} onClick={() => setStep(1)}>
            다음
          </Button>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-5">
          <p className="text-[18px] font-bold" style={{ color: "var(--color-foreground)" }}>
            계좌번호를 입력하세요
          </p>
          <TextField
            label="계좌번호"
            placeholder="계좌번호 입력 (숫자만)"
            value={account}
            onChange={(e) => setAccount(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            helperText={`${bankLabel}으로 송금합니다`}
          />
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => setStep(0)}>
              이전
            </Button>
            <Button className="flex-1" disabled={account.length < 10} onClick={() => setStep(2)}>
              다음
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-5">
          <p className="text-[18px] font-bold" style={{ color: "var(--color-foreground)" }}>
            얼마를 보낼까요?
          </p>
          <TextField
            label="금액"
            placeholder="0"
            value={amount}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              setAmount(raw ? Number(raw).toLocaleString() : "");
            }}
            inputMode="numeric"
            helperText="최소 1,000원 이상"
          />
          {amount && Number(amount.replace(/,/g, "")) >= 1000 && (
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: "var(--color-muted)" }}
            >
              <div className="flex justify-between text-[14px]" style={{ color: "var(--color-muted-foreground)" }}>
                <span>받는 분</span>
                <span style={{ color: "var(--color-foreground)" }}>{bankLabel} · {account}</span>
              </div>
              <div className="mt-2 flex justify-between text-[14px]" style={{ color: "var(--color-muted-foreground)" }}>
                <span>금액</span>
                <span className="font-semibold" style={{ color: "var(--color-foreground)" }}>
                  {amount}원
                </span>
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => setStep(1)}>
              이전
            </Button>
            <Button
              className="flex-1"
              disabled={!amount || Number(amount.replace(/,/g, "")) < 1000}
              onClick={() => setStep(3)}
            >
              다음
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-5">
          <p className="text-[18px] font-bold" style={{ color: "var(--color-foreground)" }}>
            인증번호를 입력하세요
          </p>
          <Alert variant="info">테스트용 인증번호는 123456입니다.</Alert>
          <div className="flex justify-center">
            <OTPInput
              length={6}
              value={otp}
              onChange={setOtp}
              onComplete={handleComplete}
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => setStep(2)}>
              이전
            </Button>
            <Button
              className="flex-1"
              disabled={otp.length < 6}
              onClick={() => otp === "123456" && setDone(true)}
            >
              송금하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
