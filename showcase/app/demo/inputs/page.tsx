import { Nav } from "@/components/Nav";
import { InputsShowcase } from "./InputsShowcase";

export default function InputsPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-[28px] font-bold" style={{ color: "var(--color-foreground)" }}>
            입력 컨트롤
          </h1>
          <p className="mt-2 text-[15px]" style={{ color: "var(--color-muted-foreground)" }}>
            Slider, Toggle, RadioGroup, Textarea, DatePicker, Calendar 컴포넌트 모음
          </p>
        </div>
        <InputsShowcase />
      </main>
    </>
  );
}
