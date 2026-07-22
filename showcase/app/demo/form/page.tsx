import { Nav } from "@/components/Nav";
import { SignupForm } from "./SignupForm";

export default function FormPage() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          <SignupForm />
        </div>
      </main>
    </>
  );
}
