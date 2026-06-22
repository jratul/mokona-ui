import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("label을 렌더링한다", () => {
    render(<Toggle label="알림 허용" />);
    expect(screen.getByText("알림 허용")).toBeInTheDocument();
  });

  it("클릭 시 상태가 변경된다", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Toggle label="알림" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("description을 렌더링한다", () => {
    render(<Toggle description="설명 텍스트" />);
    expect(screen.getByText("설명 텍스트")).toBeInTheDocument();
  });

  it("size variant에 따라 크기 클래스가 달라진다", () => {
    const { rerender } = render(<Toggle size="sm" />);
    expect(screen.getByRole("switch")).toHaveClass("h-6", "w-10");

    rerender(<Toggle size="lg" />);
    expect(screen.getByRole("switch")).toHaveClass("h-8", "w-14");

    rerender(<Toggle />);
    expect(screen.getByRole("switch")).toHaveClass("h-7", "w-12");
  });
});
