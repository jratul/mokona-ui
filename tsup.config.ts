import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    button: "src/components/Button/index.ts",
    text: "src/components/Text/index.ts",
    divider: "src/components/Divider/index.ts",
    textfield: "src/components/TextField/index.ts",
    checkbox: "src/components/Checkbox/index.ts",
    toggle: "src/components/Toggle/index.ts",
    toast: "src/components/Toast/index.ts",
    "bottom-sheet": "src/components/BottomSheet/index.ts",
    badge: "src/components/Badge/index.ts",
    chip: "src/components/Chip/index.ts",
    card: "src/components/Card/index.ts",
    spinner: "src/components/Spinner/index.ts",
    skeleton: "src/components/Skeleton/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
});
