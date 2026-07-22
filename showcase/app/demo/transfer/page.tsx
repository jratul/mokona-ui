import { Nav } from "@/components/Nav";
import { TransferDemo } from "./TransferDemo";

export default function TransferPage() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          <TransferDemo />
        </div>
      </main>
    </>
  );
}
