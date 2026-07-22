"use client";

import { useEffect, useState } from "react";

const TOC_ITEMS = [
  { id: "loading", label: "Loading" },
  { id: "accordion", label: "Accordion" },
  { id: "searchfield", label: "SearchField" },
  { id: "iconbutton", label: "IconButton" },
  { id: "text", label: "Text" },
  { id: "button", label: "Button" },
  { id: "badge", label: "Badge" },
  { id: "chip", label: "Chip" },
  { id: "icon", label: "Icon" },
  { id: "amount", label: "Amount" },
  { id: "divider", label: "Divider" },
  { id: "progress", label: "Progress" },
  { id: "spinner", label: "Spinner" },
  { id: "skeleton", label: "Skeleton" },
  { id: "empty", label: "Empty" },
];

export function ComponentsToc() {
  const [activeId, setActiveId] = useState(TOC_ITEMS[0].id);

  useEffect(() => {
    function update() {
      const offset = 80;
      let current = TOC_ITEMS[0].id;
      for (const { id } of TOC_ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActiveId(current);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav>
      <p
        className="mb-3 text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: "var(--color-muted-foreground)" }}
      >
        목차
      </p>
      <ul className="flex flex-col">
        {TOC_ITEMS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="block border-l-2 py-1 pl-3 pr-2 text-[13px] transition-colors"
              style={{
                borderColor: activeId === id ? "var(--color-primary)" : "var(--color-border)",
                color: activeId === id ? "var(--color-primary)" : "var(--color-muted-foreground)",
                fontWeight: activeId === id ? 500 : 400,
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
