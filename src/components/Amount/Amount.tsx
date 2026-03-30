import * as React from "react";
import { cn } from "../../utils/cn";
import { textVariants, type TextProps } from "../Text/Text";

export interface AmountProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** 표시할 숫자 */
  value: number;
  /**
   * ISO 4217 통화 코드. 지정하면 통화 기호가 앞/뒤에 붙습니다.
   * @example "KRW" | "USD" | "JPY" | "EUR"
   */
  currency?: string;
  /**
   * BCP 47 언어 태그. 기본값은 브라우저 환경 기준.
   * @example "ko-KR" | "en-US" | "ja-JP"
   */
  locale?: string;
  /** +/- 부호 표시 여부 */
  showSign?: boolean;
  /** 소수점 최소 자릿수 */
  minimumFractionDigits?: number;
  /** 소수점 최대 자릿수 */
  maximumFractionDigits?: number;
  /** 타이포그래피 variant */
  variant?: TextProps["variant"];
  /** 색상 */
  color?: TextProps["color"];
  /**
   * 양수/음수에 따라 color를 자동 적용.
   * showSign과 함께 쓸 때 유용합니다.
   */
  colorBySign?: boolean;
}

const localeMap: Record<string, string> = {
  KRW: "ko-KR",
  USD: "en-US",
  JPY: "ja-JP",
  EUR: "de-DE",
  GBP: "en-GB",
  CNY: "zh-CN",
};

function formatAmount({
  value,
  currency,
  locale,
  showSign,
  minimumFractionDigits,
  maximumFractionDigits,
}: Pick<
  AmountProps,
  | "value"
  | "currency"
  | "locale"
  | "showSign"
  | "minimumFractionDigits"
  | "maximumFractionDigits"
>): string {
  const resolvedLocale = locale ?? (currency ? (localeMap[currency] ?? "ko-KR") : "ko-KR");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    ...(currency ? { style: "currency", currency } : { style: "decimal" }),
    minimumFractionDigits:
      minimumFractionDigits ?? (currency === "KRW" || currency === "JPY" ? 0 : undefined),
    maximumFractionDigits:
      maximumFractionDigits ?? (currency === "KRW" || currency === "JPY" ? 0 : undefined),
    signDisplay: showSign ? "exceptZero" : "auto",
  };

  return new Intl.NumberFormat(resolvedLocale, options).format(value);
}

const Amount = React.forwardRef<HTMLSpanElement, AmountProps>(
  (
    {
      className,
      value,
      currency,
      locale,
      showSign = false,
      minimumFractionDigits,
      maximumFractionDigits,
      variant,
      color: colorProp,
      colorBySign = false,
      ...props
    },
    ref
  ) => {
    const autoColor: TextProps["color"] =
      colorBySign
        ? value > 0
          ? "positive"
          : value < 0
          ? "negative"
          : "default"
        : undefined;

    const color = colorProp ?? autoColor;

    const formatted = formatAmount({
      value,
      currency,
      locale,
      showSign,
      minimumFractionDigits,
      maximumFractionDigits,
    });

    return (
      <span
        ref={ref}
        className={cn(variant && textVariants({ variant, color }), !variant && color && textVariants({ color }), className)}
        aria-label={`${formatted}`}
        {...props}
      >
        {formatted}
      </span>
    );
  }
);
Amount.displayName = "Amount";

export { Amount, formatAmount };
