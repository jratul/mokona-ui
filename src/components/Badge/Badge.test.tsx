import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("텍스트를 렌더링한다", () => {
    render(<Badge>NEW</Badge>);
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  it("variant prop이 적용된다", () => {
    render(<Badge variant="negative">오류</Badge>);
    expect(screen.getByText("오류")).toBeInTheDocument();
  });
});
