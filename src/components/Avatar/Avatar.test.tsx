import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("alt 텍스트로 fallback 이니셜을 생성한다", () => {
    render(<Avatar alt="홍길동" />);
    expect(screen.getByText("홍")).toBeInTheDocument();
  });

  it("fallback prop이 alt보다 우선한다", () => {
    render(<Avatar alt="홍길동" fallback="HG" />);
    expect(screen.getByText("HG")).toBeInTheDocument();
  });
});
