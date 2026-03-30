import { describe, it, expect, vi, beforeEach } from "vitest";
import { toast } from "./useToast";

describe("toast", () => {
  it("toast를 호출하면 id를 반환한다", () => {
    const result = toast("테스트 메시지");
    expect(result.id).toBeTruthy();
    expect(typeof result.dismiss).toBe("function");
  });

  it("variant helper가 동작한다", () => {
    const result = toast.positive("성공");
    expect(result.id).toBeTruthy();
  });
});
