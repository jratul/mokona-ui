import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Text } from "./Text";

describe("Text", () => {
  it("텍스트를 렌더링한다", () => {
    render(<Text>안녕하세요</Text>);
    expect(screen.getByText("안녕하세요")).toBeInTheDocument();
  });

  it("display1은 h1 태그로 렌더링된다", () => {
    render(<Text variant="display1">제목</Text>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("as prop으로 태그를 오버라이드할 수 있다", () => {
    render(<Text as="span">텍스트</Text>);
    expect(screen.getByText("텍스트").tagName).toBe("SPAN");
  });
});
