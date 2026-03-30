import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("role=alert로 렌더링된다", () => {
    render(<Alert>안내 메시지</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("title을 렌더링한다", () => {
    render(<Alert title="오류">결제 실패</Alert>);
    expect(screen.getByText("오류")).toBeInTheDocument();
    expect(screen.getByText("결제 실패")).toBeInTheDocument();
  });
});
