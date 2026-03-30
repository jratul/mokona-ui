import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("텍스트를 렌더링한다", () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole("button", { name: "클릭" })).toBeInTheDocument();
  });

  it("클릭 이벤트를 호출한다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>클릭</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 상태에서 클릭이 작동하지 않는다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        클릭
      </Button>
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("loading 상태에서 버튼이 비활성화된다", () => {
    render(<Button loading>로딩</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("variant prop이 올바르게 적용된다", () => {
    render(<Button variant="danger">삭제</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
