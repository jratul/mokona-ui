# PROJECT.md — mokona-ui 설정 & 패키지

→ 관련 문서: [README.md](./README.md) · [CLAUDE.md](./CLAUDE.md) · [TECH.md](./TECH.md)

---

## 설정 파일

### `tsup.config.ts`

라이브러리 번들러. 컴포넌트별 entry를 나열해 subpath import(`mokona-ui/button`)가 동작하도록 각각 개별 번들을 생성한다. `splitting: true`로 공통 코드(`cn`, `motion` 등)를 청크 파일로 분리해 중복 포함을 방지한다.

```ts
defineConfig({
  entry: { index: "src/index.ts", button: "src/components/Button/index.ts", ... },
  format: ["cjs", "esm"],   // 두 포맷 동시 빌드
  dts: true,                // 타입 선언(.d.ts) 자동 생성
  splitting: true,          // 공통 코드 청크 분리
  external: ["react", "react-dom"],  // peer dep은 번들에서 제외
  treeshake: true,
})
```

### `tailwind.config.ts`

CSS 변수를 Tailwind 유틸리티로 연결하고 커스텀 토큰을 추가한다. `darkMode: ["class", '[data-theme="dark"]']`로 클래스와 속성 두 방식을 모두 지원한다. `content`는 `./src/**/*.{ts,tsx}`만 포함해 `showcase/`나 `node_modules`를 스캔하지 않는다.

```ts
{
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors:     { primary: { DEFAULT: "var(--color-primary)" }, ... },
      fontSize:   { display1: ["28px", { lineHeight: "1.3", fontWeight: "700" }], ... },
      boxShadow:  { sm: "var(--shadow-sm)", md: "var(--shadow-md)", lg: "var(--shadow-lg)" },
      keyframes:  { "toast-in": { ... }, "toast-out": { ... }, shimmer: { ... }, ... },
      animation:  { "toast-in": "toast-in 0.2s ...", ... },
    },
  },
}
```

### `tsconfig.json`

라이브러리 빌드용 TypeScript 설정. `baseUrl`은 TS 7.0에서 deprecated이므로 사용하지 않고, `paths`만 상대 경로 형식으로 작성한다. `noEmit`은 설정하지 않는다 — tsup이 빌드를 담당하고, `pnpm lint`는 `tsc --noEmit`을 직접 플래그로 전달한다.

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "react-jsx",
    "strict": true,
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### `vitest.config.ts` (없음 — `vite.config.ts`에 통합)

Storybook이 Vite 기반이므로 `vite.config.ts`의 `test` 옵션으로 Vitest를 구성한다. `environment: "jsdom"`으로 DOM 테스트 환경을 설정한다.

---

## 패키지 목록

### dependencies (배포 산출물에 포함)

| 패키지 | 버전 | 쓰임 |
|---|---|---|
| `@radix-ui/react-accordion` | ^1.2 | `Accordion` 컴포넌트 프리미티브 |
| `@radix-ui/react-avatar` | ^1.1 | `Avatar` 컴포넌트 (이미지 + fallback) |
| `@radix-ui/react-checkbox` | ^1.3 | `Checkbox` 컴포넌트 접근성 |
| `@radix-ui/react-dialog` | ^1.1 | `Modal`, `AlertDialog`, `ConfirmDialog` |
| `@radix-ui/react-dropdown-menu` | ^2.1 | `DropdownMenu` 컴포넌트 |
| `@radix-ui/react-label` | ^2.1 | `Checkbox`, `Toggle`, `TextField` 레이블 연결 |
| `@radix-ui/react-popover` | ^1.1 | `Popover`, `DatePicker` 팝업 위치 계산 |
| `@radix-ui/react-progress` | ^1.1 | `Progress` 컴포넌트 (`data-state` 관리) |
| `@radix-ui/react-radio-group` | ^1.3 | `RadioGroup` 컴포넌트 |
| `@radix-ui/react-select` | ^2.2 | `Select` 드롭다운 |
| `@radix-ui/react-slider` | ^1.3 | `Slider` 컴포넌트 |
| `@radix-ui/react-slot` | ^1.2 | `Button`의 `asChild` prop (`Slot`) |
| `@radix-ui/react-switch` | ^1.2 | `Toggle` 컴포넌트 기반 |
| `@radix-ui/react-tabs` | ^1.1 | `Tabs` 컴포넌트 |
| `@radix-ui/react-toast` | ^1.2 | `Toast` 프리미티브 (Provider/Viewport/Root) |
| `@radix-ui/react-tooltip` | ^1.2 | `Tooltip` 컴포넌트 |
| `class-variance-authority` | ^0.7 | `cva()` — variant 스타일 정의 |
| `clsx` | ^2.1 | `cn()` 내부에서 조건부 클래스 병합 |
| `framer-motion` | ^10.18 | `Button`, `IconButton`, `SegmentedControl` 등 탭 애니메이션 |
| `lucide-react` | ^1.7 | `Icon` 컴포넌트, `SearchField` 아이콘 등 |
| `tailwind-merge` | ^3.5 | `cn()` 내부에서 Tailwind 클래스 충돌 해소 |

### devDependencies (개발/빌드 도구)

| 패키지 | 버전 | 쓰임 |
|---|---|---|
| `tsup` | ^8.5 | 라이브러리 번들 빌드 (CJS + ESM + DTS) |
| `tailwindcss` | ^3.4 | `dist/styles.css` 생성 (Tailwind CLI) |
| `typescript` | ^5.8 | 타입 체크 (`pnpm lint = tsc --noEmit`) |
| `vite` | ^6.4 | Storybook 및 Vitest 빌드 엔진 |
| `vitest` | ^4.1 | 단위 테스트 러너 |
| `@vitest/ui` | ^4.1 | Vitest 브라우저 UI (`pnpm test:ui`) |
| `jsdom` | ^29.0 | Vitest DOM 환경 (`environment: "jsdom"`) |
| `@testing-library/react` | ^16.3 | 컴포넌트 렌더링 테스트 유틸 |
| `@testing-library/user-event` | ^14.6 | 클릭/타이핑 등 유저 인터랙션 시뮬레이션 |
| `@testing-library/jest-dom` | ^6.9 | `toBeInTheDocument()` 등 DOM matcher |
| `storybook` | ^8.6 | Storybook 코어 |
| `@storybook/react-vite` | ^8.6 | Storybook Vite 빌드 프레임워크 |
| `@storybook/addon-essentials` | ^8 | Controls, Docs, Actions 등 기본 애드온 |
| `@storybook/addon-interactions` | ^8 | 스토리 인터랙션 테스트 |
| `@storybook/test` | ^8.6 | 스토리 내 `expect`, `userEvent` |
| `@storybook/testing-library` | ^0.2 | Storybook Testing Library 통합 |
| `@vitejs/plugin-react` | ^4.7 | Vite React JSX 변환 |
| `autoprefixer` | ^10.4 | PostCSS vendor prefix 자동 추가 |
| `postcss` | ^8.5 | CSS 후처리 (Tailwind 파이프라인) |
| `@types/react` | ^18.3 | React 타입 선언 |
| `@types/react-dom` | ^18.3 | ReactDOM 타입 선언 |
| `@changesets/cli` | ^2.30 | 버전 관리 및 changelog (`pnpm release`) |
| `react` / `react-dom` | ^18.3 | Storybook/Vitest 실행 환경용 (peer dep의 실체) |
| `react-hook-form` | ^7.72 | Storybook `Form` 컴포넌트 스토리 예제용 |
| `@hookform/resolvers` | ^5.2 | 위와 동일 (zod resolver) |
| `zod` | ^4.3 | 위와 동일 (form validation 예제) |
