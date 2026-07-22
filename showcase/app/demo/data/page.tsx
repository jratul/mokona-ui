import { Nav } from "@/components/Nav";
import { DataShowcase } from "./DataShowcase";

export default function DataPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-[28px] font-bold" style={{ color: "var(--color-foreground)" }}>
            데이터 테이블
          </h1>
          <p className="mt-2 text-[15px]" style={{ color: "var(--color-muted-foreground)" }}>
            Table, Pagination, Skeleton, Empty 컴포넌트 — 필터링 & 페이지네이션 포함
          </p>
        </div>
        <DataShowcase />
      </main>
    </>
  );
}
