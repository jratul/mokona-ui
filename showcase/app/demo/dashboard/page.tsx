import { Nav } from "@/components/Nav";
import { Dashboard } from "./Dashboard";

export default function DashboardPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        <Dashboard />
      </main>
    </>
  );
}
