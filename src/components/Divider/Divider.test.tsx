import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("horizontal separator를 렌더링한다", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector("hr")).toBeInTheDocument();
  });

  it("vertical separator를 렌더링한다", () => {
    const { getByRole } = render(<Divider orientation="vertical" />);
    expect(getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });
});
