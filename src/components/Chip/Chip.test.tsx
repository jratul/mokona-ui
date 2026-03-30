import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("텍스트를 렌더링한다", () => {
    render(<Chip>전체</Chip>);
    expect(screen.getByText("전체")).toBeInTheDocument();
  });

  it("클릭 이벤트를 호출한다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Chip onClick={onClick}>전체</Chip>);
    await user.click(screen.getByRole("button", { name: "전체" }));
    expect(onClick).toHaveBeenCalled();
  });

  it("selected 상태에서 aria-pressed가 true다", () => {
    render(<Chip selected>선택됨</Chip>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("onRemove 버튼이 렌더링된다", () => {
    render(<Chip onRemove={vi.fn()}>태그</Chip>);
    expect(screen.getByLabelText("제거")).toBeInTheDocument();
  });
});
