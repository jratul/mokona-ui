import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("aria-hidden으로 렌더링된다", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("lines prop으로 여러 줄을 렌더링한다", () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.querySelectorAll("div")).toHaveLength(3);
  });

  it("width/height style이 적용된다", () => {
    const { container } = render(<Skeleton width={200} height={100} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("100px");
  });
});
