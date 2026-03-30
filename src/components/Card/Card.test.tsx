import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("children을 렌더링한다", () => {
    render(<Card>카드 내용</Card>);
    expect(screen.getByText("카드 내용")).toBeInTheDocument();
  });

  it("onClick이 있으면 button role을 가진다", () => {
    render(<Card onClick={vi.fn()}>클릭 가능</Card>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("onClick 핸들러를 호출한다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Card onClick={onClick}>클릭</Card>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
