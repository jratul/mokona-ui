"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormRoot, FormField, FormItem, FormLabel, FormMessage,
  TextField, Select, Checkbox, Button, Alert,
} from "mokona-ui";

const schema = z.object({
  name: z.string().min(2, "이름은 2자 이상 입력해주세요."),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .regex(/[A-Z]/, "대문자를 포함해야 합니다.")
    .regex(/[0-9]/, "숫자를 포함해야 합니다."),
  bank: z.string().min(1, "은행을 선택해주세요."),
  account: z
    .string()
    .min(10, "계좌번호는 10자리 이상이어야 합니다.")
    .regex(/^\d+$/, "숫자만 입력해주세요."),
  agree: z.boolean().refine((v) => v === true, { message: "약관에 동의해주세요." }),
});

type FormValues = z.infer<typeof schema>;

export function SignupForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "", email: "", password: "", bank: "", account: "", agree: false,
    },
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full text-[28px]"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-positive) 15%, transparent)" }}
        >
          ✓
        </div>
        <div>
          <p className="text-[20px] font-bold" style={{ color: "var(--color-foreground)" }}>
            가입 완료!
          </p>
          <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted-foreground)" }}>
            {form.getValues("email")}으로 가입했습니다
          </p>
        </div>
        <Button className="w-full" onClick={() => { setSubmitted(false); form.reset(); }}>
          다시 시도하기
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
      <p className="mb-6 text-[22px] font-bold" style={{ color: "var(--color-foreground)" }}>
        회원가입
      </p>

      <Alert variant="info" className="mb-5">입력 내용은 저장되지 않습니다. 검증 동작 데모입니다.</Alert>

      <FormRoot
        form={form}
        onSubmit={form.handleSubmit(() => setSubmitted(true))}
        className="flex flex-col gap-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <TextField placeholder="홍길동" isError={!!fieldState.error} {...field} />
              <FormMessage error={fieldState.error?.message} />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <TextField
                placeholder="hello@example.com"
                type="email"
                isError={!!fieldState.error}
                {...field}
              />
              <FormMessage error={fieldState.error?.message} />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <TextField
                placeholder="8자 이상, 대문자·숫자 포함"
                type="password"
                isError={!!fieldState.error}
                {...field}
              />
              <FormMessage error={fieldState.error?.message} />
            </FormItem>
          )}
        />

        <FormField
          name="bank"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>주거래 은행</FormLabel>
              <Select
                label=""
                options={[
                  { value: "toss", label: "토스뱅크" },
                  { value: "kb", label: "국민은행" },
                  { value: "kakao", label: "카카오뱅크" },
                  { value: "shinhan", label: "신한은행" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
                isError={!!fieldState.error}
              />
              <FormMessage error={fieldState.error?.message} />
            </FormItem>
          )}
        />

        <FormField
          name="account"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>계좌번호</FormLabel>
              <TextField
                placeholder="계좌번호 입력 (숫자만)"
                inputMode="numeric"
                isError={!!fieldState.error}
                {...field}
                onChange={(e) =>
                  field.onChange(e.target.value.replace(/\D/g, ""))
                }
              />
              <FormMessage error={fieldState.error?.message} />
            </FormItem>
          )}
        />

        <FormField
          name="agree"
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="agree"
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
                <label
                  htmlFor="agree"
                  className="cursor-pointer text-[14px]"
                  style={{ color: "var(--color-foreground)" }}
                >
                  이용약관 및 개인정보처리방침에 동의합니다
                </label>
              </div>
              <FormMessage error={fieldState.error?.message} />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-2 w-full">
          가입하기
        </Button>
      </FormRoot>
    </div>
  );
}
