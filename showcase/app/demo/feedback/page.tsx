import { Nav } from "@/components/Nav";
import { FeedbackClient } from "./FeedbackClient";

export default function FeedbackPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-[28px] font-bold" style={{ color: "var(--color-foreground)" }}>
            피드백 & 오버레이
          </h1>
          <p className="mt-2 text-[15px]" style={{ color: "var(--color-muted-foreground)" }}>
            Toast, Modal, BottomSheet, Tooltip, Popover, DropdownMenu, Alert 컴포넌트 모음
          </p>
        </div>
        <FeedbackClient />
      </main>
    </>
  );
}
