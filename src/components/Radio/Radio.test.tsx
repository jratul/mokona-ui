import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RadioGroup } from "./Radio";

const items = [
  { value: "a", label: "옵션 A" },
  { value: "b", label: "옵션 B" },
];

describe("RadioGroup", () => {
  it("아이템을 렌더링한다", () => {
    render(<RadioGroup items={items} />);
    expect(screen.getByText("옵션 A")).toBeInTheDocument();
    expect(screen.getByText("옵션 B")).toBeInTheDocument();
  });

  it("클릭 시 onValueChange를 호출한다", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<RadioGroup items={items} onValueChange={onValueChange} />);
    await user.click(screen.getByText("옵션 B"));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("size variant에 따라 크기 클래스가 달라진다", () => {
    const { rerender } = render(<RadioGroup items={items} size="sm" />);
    expect(screen.getAllByRole("radio")[0]).toHaveClass("h-4", "w-4");

    rerender(<RadioGroup items={items} size="lg" />);
    expect(screen.getAllByRole("radio")[0]).toHaveClass("h-6", "w-6");

    rerender(<RadioGroup items={items} />);
    expect(screen.getAllByRole("radio")[0]).toHaveClass("h-5", "w-5");
  });
});
