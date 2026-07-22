"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "홈" },
  { href: "/demo/transfer", label: "송금" },
  { href: "/demo/dashboard", label: "대시보드" },
  { href: "/demo/form", label: "폼" },
  { href: "/demo/components", label: "컴포넌트" },
  { href: "/demo/feedback", label: "피드백" },
  { href: "/demo/inputs", label: "입력" },
  { href: "/demo/data", label: "데이터" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[16px] font-bold" style={{ color: "var(--color-primary)" }}>
            mokona-ui
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="rounded-lg px-3 py-1.5 text-[14px] font-medium transition-colors"
                  style={{
                    color: active ? "var(--color-primary)" : "var(--color-muted-foreground)",
                    backgroundColor: active ? "color-mix(in srgb, var(--color-primary) 10%, transparent)" : "transparent",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            className="flex h-8 w-8 items-center justify-center rounded-lg md:hidden"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t px-4 py-2 md:hidden" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex flex-col gap-1">
            {links.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-[14px] font-medium transition-colors"
                  style={{
                    color: active ? "var(--color-primary)" : "var(--color-muted-foreground)",
                    backgroundColor: active ? "color-mix(in srgb, var(--color-primary) 10%, transparent)" : "transparent",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
