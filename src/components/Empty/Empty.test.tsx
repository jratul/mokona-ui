import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Empty } from "./Empty";

describe("Empty", () => {
  it("기본 title을 렌더링한다", () => {
    render(<Empty />);
    expect(screen.getByText("데이터가 없습니다")).toBeInTheDocument();
  });

  it("description을 렌더링한다", () => {
    render(<Empty title="없음" description="아직 내역이 없어요" />);
    expect(screen.getByText("아직 내역이 없어요")).toBeInTheDocument();
  });
});
