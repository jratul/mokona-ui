import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("role=status로 렌더링된다", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("커스텀 label이 적용된다", () => {
    render(<Spinner label="데이터 불러오는 중" />);
    expect(screen.getByLabelText("데이터 불러오는 중")).toBeInTheDocument();
  });
});
