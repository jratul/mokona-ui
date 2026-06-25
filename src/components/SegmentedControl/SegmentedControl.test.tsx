import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { SegmentedControl } from "./SegmentedControl";

const items = [
  { value: "all", label: "전체" },
  { value: "income", label: "수입" },
  { value: "expense", label: "지출" },
];

describe("SegmentedControl", () => {
  it("아이템 label들을 렌더링한다", () => {
    render(<SegmentedControl items={items} />);
    expect(screen.getByText("전체")).toBeInTheDocument();
    expect(screen.getByText("수입")).toBeInTheDocument();
    expect(screen.getByText("지출")).toBeInTheDocument();
  });

  it("탭 클릭 시 onChange를 호출한다", async () => {
    const user = userEvent.setup();
    let value = "all";
    const onChange = (v: string) => {
      value = v;
    };
    render(<SegmentedControl items={items} value={value} onChange={onChange} />);
    await user.click(screen.getByText("수입"));
    expect(value).toBe("income");
  });

  it("탭 버튼에 가로 패딩이 있다 (좁아 보이는 문제 방지)", () => {
    const { rerender } = render(<SegmentedControl items={items} size="sm" />);
    expect(screen.getByText("전체")).toHaveClass("px-3");

    rerender(<SegmentedControl items={items} />);
    expect(screen.getByText("전체")).toHaveClass("px-4");
  });
});
