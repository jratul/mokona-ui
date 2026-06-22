import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("label과 함께 렌더링한다", () => {
    render(<Checkbox label="동의합니다" />);
    expect(screen.getByText("동의합니다")).toBeInTheDocument();
  });

  it("클릭 시 checked 상태가 변경된다", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="동의" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("disabled 상태에서 클릭이 작동하지 않는다", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="동의" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("size variant에 따라 크기 클래스가 달라진다", () => {
    const { rerender } = render(<Checkbox size="sm" />);
    expect(screen.getByRole("checkbox")).toHaveClass("h-4", "w-4");

    rerender(<Checkbox size="lg" />);
    expect(screen.getByRole("checkbox")).toHaveClass("h-6", "w-6");

    rerender(<Checkbox />);
    expect(screen.getByRole("checkbox")).toHaveClass("h-5", "w-5");
  });
});
