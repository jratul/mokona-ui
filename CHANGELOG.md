# mokona-ui

## 0.0.5

### Patch Changes

- Fix `SegmentedControl` tabs rendering with no horizontal padding, which made the control hug the label text tightly and look cramped whenever it wasn't `fullWidth`. Tab buttons now get `px-3` (sm) / `px-4` (md), matching `Tabs`.

## 0.0.4

### Patch Changes

- Add `size` variant (`sm` / `md` / `lg`) to `Checkbox`, `Toggle`, and `RadioGroup`, matching the pattern already used by `Button` and `TextField`.

## 0.0.3

### Patch Changes

- Add `size` variant (`sm` / `md` / `lg`) to `TextField`, matching the pattern already used by `Button`.

## 0.0.2

### Patch Changes

- Fix dist/styles.css missing from the published package, and add missing `--color-surface` / `--color-input` design tokens referenced by Calendar, Select, Stepper, and Tabs.
