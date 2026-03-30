import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormRoot, FormField, FormItem, FormLabel, FormMessage } from "./Form";
import { TextField } from "../TextField/TextField";
import { Select } from "../Select/Select";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";

const meta: Meta = {
  title: "Foundation/Form",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

// ── 송금 폼 예시 ──────────────────────────────────────────────────────────────
const transferSchema = z.object({
  bank: z.string().min(1, "은행을 선택해주세요."),
  account: z
    .string()
    .min(10, "계좌번호는 10자리 이상이어야 합니다.")
    .regex(/^\d+$/, "숫자만 입력해주세요."),
  amount: z
    .string()
    .min(1, "금액을 입력해주세요.")
    .refine((v) => parseInt(v.replace(/,/g, ""), 10) >= 1000, "최소 1,000원 이상 입력하세요."),
  memo: z.string().optional(),
  agree: z.boolean().refine((v) => v === true, { message: "약관에 동의해주세요." }),
});

type TransferForm = z.infer<typeof transferSchema>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any

function TransferFormExample() {
  const form = useForm<TransferForm>({
    resolver: zodResolver(transferSchema),
    defaultValues: { bank: "", account: "", amount: "", memo: "", agree: false as unknown as true },
  });

  function onSubmit(data: TransferForm) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <FormRoot form={form} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-sm">
      <p className="text-[18px] font-semibold text-[var(--color-foreground)]">송금하기</p>

      <FormField
        name="bank"
        control={form.control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>은행</FormLabel>
            <Select
              label=""
              options={[
                { value: "kb", label: "국민은행" },
                { value: "toss", label: "토스뱅크" },
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
              isError={!!fieldState.error}
              inputMode="numeric"
              {...field}
            />
            <FormMessage error={fieldState.error?.message} />
          </FormItem>
        )}
      />

      <FormField
        name="amount"
        control={form.control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>금액</FormLabel>
            <TextField
              placeholder="0 원"
              isError={!!fieldState.error}
              inputMode="numeric"
              {...field}
            />
            <FormMessage error={fieldState.error?.message} />
          </FormItem>
        )}
      />

      <FormField
        name="memo"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>메모 (선택)</FormLabel>
            <TextField placeholder="받는 분께 표시될 메모" {...field} />
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
              <label htmlFor="agree" className="text-[14px] cursor-pointer text-[var(--color-foreground)]">
                송금 약관에 동의합니다
              </label>
            </div>
            <FormMessage error={fieldState.error?.message} />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full">
        송금하기
      </Button>
    </FormRoot>
  );
}

export const TransferForm: Story = {
  render: () => <TransferFormExample />,
};
