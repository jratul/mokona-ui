import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("label을 렌더링한다", () => {
    render(<Textarea label="메모" />);
    expect(screen.getByText("메모")).toBeInTheDocument();
  });

  it("텍스트를 입력할 수 있다", async () => {
    const user = userEvent.setup();
    render(<Textarea label="메모" />);
    await user.type(screen.getByRole("textbox"), "안녕하세요");
    expect(screen.getByRole("textbox")).toHaveValue("안녕하세요");
  });

  it("showCount일 때 글자 수를 표시한다", () => {
    render(<Textarea showCount maxLength={200} />);
    expect(screen.getByText("0/200")).toBeInTheDocument();
  });

  it("에러 메시지를 표시한다", () => {
    render(<Textarea isError errorMessage="필수 항목입니다" />);
    expect(screen.getByRole("alert")).toHaveTextContent("필수 항목입니다");
  });
});
