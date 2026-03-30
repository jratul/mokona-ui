import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { OTPInput } from "./OTPInput";

describe("OTPInput", () => {
  it("length 만큼 input을 렌더링한다", () => {
    render(<OTPInput length={6} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
  });

  it("숫자를 입력하면 다음 셀로 포커스가 이동한다", async () => {
    const user = userEvent.setup();
    render(<OTPInput length={4} />);
    const inputs = screen.getAllByRole("textbox");
    await user.click(inputs[0]);
    await user.keyboard("1");
    expect(inputs[1]).toHaveFocus();
  });

  it("Backspace로 이전 셀로 이동한다", async () => {
    const user = userEvent.setup();
    render(<OTPInput length={4} defaultValue="12" />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    await user.click(inputs[1]);
    await user.keyboard("{Backspace}");
    expect(inputs[0]).toHaveFocus();
  });

  it("onComplete가 length만큼 입력되면 호출된다", async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();
    render(<OTPInput length={4} onComplete={onComplete} />);
    const inputs = screen.getAllByRole("textbox");
    await user.click(inputs[0]);
    await user.keyboard("1234");
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("disabled일 때 입력이 불가하다", () => {
    render(<OTPInput length={4} disabled />);
    screen.getAllByRole("textbox").forEach((input) => {
      expect(input).toBeDisabled();
    });
  });
});
