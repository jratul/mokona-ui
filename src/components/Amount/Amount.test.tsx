import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Amount, formatAmount } from "./Amount";

describe("formatAmount", () => {
  it("3자리마다 콤마를 붙인다", () => {
    expect(formatAmount({ value: 1234567 })).toBe("1,234,567");
  });

  it("KRW 통화 기호를 붙인다", () => {
    const result = formatAmount({ value: 1000, currency: "KRW" });
    expect(result).toContain("1,000");
    expect(result).toContain("₩");
  });

  it("USD 소수점 2자리를 표시한다", () => {
    const result = formatAmount({ value: 99.9, currency: "USD", locale: "en-US" });
    expect(result).toContain("99.90");
  });

  it("JPY 소수점 없이 표시한다", () => {
    const result = formatAmount({ value: 1000.5, currency: "JPY", locale: "ja-JP" });
    expect(result).not.toContain(".");
  });

  it("showSign — 양수에 + 부호를 붙인다", () => {
    const result = formatAmount({ value: 5000, showSign: true });
    expect(result).toContain("+");
  });

  it("showSign — 음수에 - 부호를 붙인다", () => {
    const result = formatAmount({ value: -3000, showSign: true });
    expect(result).toContain("-");
  });

  it("0은 부호 없이 표시한다", () => {
    const result = formatAmount({ value: 0, showSign: true });
    expect(result).not.toContain("+");
    expect(result).not.toContain("-");
  });
});

describe("Amount", () => {
  it("포맷된 금액을 렌더링한다", () => {
    render(<Amount value={1234567} />);
    expect(screen.getByText("1,234,567")).toBeInTheDocument();
  });

  it("aria-label 속성이 있다", () => {
    const { container } = render(<Amount value={1000} currency="KRW" />);
    expect(container.firstChild).toHaveAttribute("aria-label");
  });

  it("colorBySign — 양수면 positive 색상 클래스가 적용된다", () => {
    const { container } = render(<Amount value={1000} colorBySign />);
    expect(container.firstChild).toHaveClass("text-[var(--color-positive)]");
  });

  it("colorBySign — 음수면 negative 색상 클래스가 적용된다", () => {
    const { container } = render(<Amount value={-1000} colorBySign />);
    expect(container.firstChild).toHaveClass("text-[var(--color-negative)]");
  });
});
