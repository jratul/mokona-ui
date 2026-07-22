import { Nav } from "@/components/Nav";
import { ComponentsShowcase } from "./ComponentsShowcase";
import { ComponentsToc } from "./ComponentsToc";

export default function ComponentsPage() {
  return (
    <>
      <Nav />
      <div className="mx-auto flex w-full max-w-7xl gap-10 px-4 py-12">
        <main className="min-w-0 w-full max-w-5xl flex-1">
          <div className="mb-10">
            <h1 className="text-[28px] font-bold" style={{ color: "var(--color-foreground)" }}>
              컴포넌트 갤러리
            </h1>
            <p className="mt-2 text-[15px]" style={{ color: "var(--color-muted-foreground)" }}>
              Text, Button, Badge, Chip, Icon, Amount, Progress, Spinner, Skeleton, Empty 컴포넌트 모음
            </p>
          </div>
          <ComponentsShowcase />
        </main>
        <aside className="hidden w-44 shrink-0 xl:block">
          <div className="sticky top-20">
            <ComponentsToc />
          </div>
        </aside>
      </div>
    </>
  );
}
