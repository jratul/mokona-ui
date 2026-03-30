import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { BottomSheet } from "./BottomSheet";
import { Button } from "../Button";

describe("BottomSheet", () => {
  it("open일 때 title을 렌더링한다", () => {
    render(<BottomSheet open title="송금하기">내용</BottomSheet>);
    expect(screen.getByText("송금하기")).toBeInTheDocument();
  });

  it("open=false일 때 렌더링되지 않는다", () => {
    render(<BottomSheet open={false} title="송금하기">내용</BottomSheet>);
    expect(screen.queryByText("송금하기")).not.toBeInTheDocument();
  });

  it("trigger로 열 수 있다", async () => {
    const user = userEvent.setup();
    render(
      <BottomSheet trigger={<Button>열기</Button>} title="제목">
        내용
      </BottomSheet>
    );
    await user.click(screen.getByRole("button", { name: "열기" }));
    expect(screen.getByText("제목")).toBeInTheDocument();
  });
});
