import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("label과 input을 렌더링한다", () => {
    render(<TextField label="이름" placeholder="입력" />);
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("텍스트를 입력할 수 있다", async () => {
    const user = userEvent.setup();
    render(<TextField label="이름" />);
    await user.type(screen.getByRole("textbox"), "홍길동");
    expect(screen.getByRole("textbox")).toHaveValue("홍길동");
  });

  it("에러 메시지를 표시한다", () => {
    render(<TextField isError errorMessage="필수 항목입니다" />);
    expect(screen.getByRole("alert")).toHaveTextContent("필수 항목입니다");
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("helperText를 표시한다", () => {
    render(<TextField helperText="인증번호가 발송됩니다" />);
    expect(screen.getByText("인증번호가 발송됩니다")).toBeInTheDocument();
  });
});
