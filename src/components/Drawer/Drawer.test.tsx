import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { useState } from "react";
import { Drawer } from "./Drawer";
import { Button } from "../Button";

describe("Drawer", () => {
  it("open일 때 title을 렌더링한다", () => {
    render(<Drawer open title="메뉴">내용</Drawer>);
    expect(screen.getByText("메뉴")).toBeInTheDocument();
  });

  it("open=false일 때 렌더링되지 않는다", () => {
    render(<Drawer open={false} title="메뉴">내용</Drawer>);
    expect(screen.queryByText("메뉴")).not.toBeInTheDocument();
  });

  it("trigger로 열 수 있다", async () => {
    const user = userEvent.setup();
    render(
      <Drawer trigger={<Button>열기</Button>} title="제목">
        내용
      </Drawer>
    );
    await user.click(screen.getByRole("button", { name: "열기" }));
    expect(screen.getByText("제목")).toBeInTheDocument();
  });

  it("닫기 버튼으로 닫을 수 있다", async () => {
    const user = userEvent.setup();
    function Wrapper() {
      const [open, setOpen] = useState(true);
      return <Drawer open={open} onOpenChange={setOpen} title="메뉴">내용</Drawer>;
    }
    render(<Wrapper />);
    await user.click(screen.getByRole("button", { name: "닫기" }));
    expect(screen.queryByText("메뉴")).not.toBeInTheDocument();
  });

  it("description을 렌더링한다", () => {
    render(
      <Drawer open title="메뉴" description="원하는 항목을 선택하세요">
        내용
      </Drawer>
    );
    expect(screen.getByText("원하는 항목을 선택하세요")).toBeInTheDocument();
  });
});
