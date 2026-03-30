/**
 * Form compound components — react-hook-form 연동용
 *
 * 사용 예시:
 * const form = useForm<Schema>({ resolver: zodResolver(schema) });
 *
 * <FormRoot form={form} onSubmit={form.handleSubmit(onSubmit)}>
 *   <FormField name="email" control={form.control} render={({ field, fieldState }) => (
 *     <FormItem>
 *       <FormLabel>이메일</FormLabel>
 *       <TextField {...field} isError={!!fieldState.error} />
 *       <FormMessage error={fieldState.error?.message} />
 *     </FormItem>
 *   )} />
 * </FormRoot>
 */
import * as React from "react";
import {
  useFormContext,
  FormProvider,
  Controller,
  type FieldValues,
  type FieldPath,
  type ControllerProps,
  type UseFormReturn,
} from "react-hook-form";
import { cn } from "../../utils/cn";

// ── FormRoot ──────────────────────────────────────────────────────────────────
interface FormRootProps<T extends FieldValues>
  extends React.FormHTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<T>;
}

function FormRoot<T extends FieldValues>({
  form,
  children,
  ...props
}: FormRootProps<T>) {
  return (
    <FormProvider {...form}>
      <form {...props}>{children}</form>
    </FormProvider>
  );
}

// ── FormField ─────────────────────────────────────────────────────────────────
function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return <Controller {...props} />;
}

// ── FormItem ──────────────────────────────────────────────────────────────────
const FormItemContext = React.createContext<{ id: string }>({ id: "" });

function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("flex flex-col gap-1.5", className)} {...props} />
    </FormItemContext.Provider>
  );
}

// ── FormLabel ─────────────────────────────────────────────────────────────────
function FormLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { id } = React.useContext(FormItemContext);
  const form = useFormContext();
  // fieldState를 label에서 직접 읽을 수 없으므로 스타일링만 담당
  return (
    <label
      htmlFor={id}
      className={cn("text-[14px] font-medium text-[var(--color-foreground)]", className)}
      {...props}
    />
  );
}

// ── FormDescription ───────────────────────────────────────────────────────────
function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { id } = React.useContext(FormItemContext);
  return (
    <p
      id={`${id}-description`}
      className={cn("text-[13px] text-[var(--color-muted-foreground)]", className)}
      {...props}
    />
  );
}

// ── FormMessage ───────────────────────────────────────────────────────────────
interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: string;
}

function FormMessage({ error, className, children, ...props }: FormMessageProps) {
  const { id } = React.useContext(FormItemContext);
  const body = error ?? children;
  if (!body) return null;

  return (
    <p
      id={`${id}-message`}
      role="alert"
      className={cn("text-[13px] text-[var(--color-negative)]", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export { FormRoot, FormField, FormItem, FormLabel, FormDescription, FormMessage };
