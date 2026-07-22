import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("progressbar role로 렌더링된다", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("showLabel일 때 퍼센트를 표시한다", () => {
    render(<Progress value={72} showLabel />);
    expect(screen.getByText("72%")).toBeInTheDocument();
  });

  it("animated일 때 값은 유지하면서 줄무늬 애니메이션을 적용한다", () => {
    const { container } = render(<Progress value={45} animated />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("data-value", "45");
    const striped = container.querySelector('[style*="progress-stripe"]');
    expect(striped).toBeInTheDocument();
  });
});
