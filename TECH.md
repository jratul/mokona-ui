# TECH.md — mokona-ui 기술 상세

각 파일·패턴에 어떤 기술이 어떻게 쓰이는지 기록한다.  
→ 관련 문서: [README.md](./README.md) · [CLAUDE.md](./CLAUDE.md) · [PROJECT.md](./PROJECT.md)

---

## 유틸리티

### `src/utils/cn.ts` — Tailwind 클래스 병합

`clsx`로 조건부 클래스를 병합하고, `extendTailwindMerge`로 커스텀 font-size 그룹을 등록해 충돌을 올바르게 해소한다.  
기본 `twMerge`는 `text-display1` 같은 커스텀 유틸을 인식하지 못해 `text-body1 text-display1`을 병합하지 않고 두 클래스를 모두 남겨두는 문제가 있다.

```ts
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-display1", "text-title1", "text-title2", "text-title3",
                    "text-body1", "text-body2", "text-caption1"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `src/utils/motion.ts` — Framer Motion 진입점 통합

모든 컴포넌트에서 Framer Motion을 `../../utils/motion`에서 import하게 해두어, 라이브러리 교체 시 한 곳만 수정한다.

```ts
export { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
```

---

## 컴포넌트 패턴

### 패턴 A — CVA 기반 (Button, Badge, Text, TextField 등)

variant가 많고 정적으로 나열 가능할 때 사용. `cva`로 variant 객체를 정의하고 `<name>Variants`도 export해 consumer가 스타일만 가져다 쓸 수 있게 한다.

```tsx
const buttonVariants = cva(
  ["inline-flex items-center justify-center font-semibold rounded-xl", "select-none cursor-pointer"],
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
        danger:  "bg-[var(--color-negative)] text-white hover:opacity-90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-body1",
        lg: "h-14 px-6 text-body1",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export { Button, buttonVariants };
```

`<input>`을 감싸는 컴포넌트(`TextField`)는 네이티브 `size` 속성(number)과 충돌하므로 반드시 Omit 처리한다.

```tsx
export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof textFieldVariants> { ... }
```

### 패턴 B — sizeMap 객체 (Checkbox, Toggle, Radio, NumericSpinner)

size에 따라 여러 하위 요소(SVG 속성, translate 값, label 폰트 등)가 함께 변해야 할 때 사용. CVA로는 variant마다 독립된 CSS 클래스만 줄 수 있어 숫자 속성(SVG width/height)을 다루기 어렵다.

```tsx
const sizeMap = {
  sm: { box: "h-4 w-4", check: { width: 9, height: 6 }, label: "text-[14px]" },
  md: { box: "h-5 w-5", check: { width: 11, height: 8 }, label: "text-[16px]" },
  lg: { box: "h-6 w-6", check: { width: 13, height: 10 }, label: "text-[18px]" },
};

// 사용
const { box, check, label: labelSize } = sizeMap[size];
<svg width={check.width} height={check.height} ... />
```

### 패턴 C — Radix UI 프리미티브 래핑 (Progress, Tabs, Select 등)

Radix 프리미티브 위에 디자인 토큰과 Tailwind 클래스를 씌우는 패턴. 접근성(ARIA, 키보드 내비게이션)은 Radix가 담당하고, 시각적 스타일만 덮어쓴다.

```tsx
// Progress: Radix Root + 커스텀 인디케이터
<ProgressPrimitive.Root
  value={indeterminate ? undefined : value}   // undefined → data-state="indeterminate"
  className={cn("relative w-full overflow-hidden rounded-full bg-[var(--color-muted)]", sizeMap[size])}
>
  {indeterminate ? (
    <div
      className={cn("absolute inset-0 rounded-full", colorMap[color])}
      style={{
        backgroundImage: "repeating-linear-gradient(-45deg, rgba(255,255,255,0) 0px, ...)",
        backgroundSize: "28px 28px",
        animation: "progress-stripe 0.5s linear infinite",
      }}
    />
  ) : (
    <ProgressPrimitive.Indicator style={{ width: `${value}%` }} />
  )}
</ProgressPrimitive.Root>
```

`indeterminate` 시 `ProgressPrimitive.Indicator`를 쓰지 않는 이유: Indicator는 별도 inline style을 주입하지 않지만, 구조적으로 plain `div`로 교체해야 `animation` 속성과 `absolute inset-0` 레이아웃을 자유롭게 제어할 수 있다.

### 패턴 D — Framer Motion 탭 애니메이션 래퍼 (Button, IconButton)

`whileTap` 스케일 애니메이션을 위해 실제 버튼을 `m.div`로 감싸는 구조. **flex 부모에서 래퍼가 늘어나는 버그**를 방지하기 위해 `alignSelf: "flex-start"`를 기본으로 적용한다.

```tsx
<LazyMotion features={domAnimation}>
  <m.div
    whileTap={{ scale: disabled || loading ? 1 : 0.96 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    style={{
      display: "inline-flex",
      width: fullWidth ? "100%" : undefined,
      alignSelf: fullWidth ? undefined : "flex-start",  // flex-start 없으면 stretch 부모에서 밀림
    }}
  >
    <Comp ref={ref} className={buttonVariants({ variant, size, fullWidth })} {...props} />
  </m.div>
</LazyMotion>
```

`LazyMotion + domAnimation + m.*`을 쓰는 이유: `motion.*` 대신 `m.*`을 쓰면 3D, layout animation 등 고급 기능을 제외한 기본 기능만 번들에 포함된다 (~30% 절감).

---

## Toast 상태 관리

### `src/components/Toast/useToast.ts` — 모듈 수준 외부 스토어

외부 모듈 변수(`toasts` 배열)를 `useSyncExternalStore`로 React에 연결한다. `toast()` 함수를 컴포넌트 밖에서 호출해도 구독 중인 `Toaster`가 즉시 리렌더링된다.

```ts
let toasts: ToastState[] = [];
const subscribers = new Set<() => void>();

function subscribe(cb: () => void) {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

export function useToast() {
  const state = React.useSyncExternalStore(subscribe, () => toasts);
  return { toasts: state, dismiss, remove };
}

// toast() 함수는 컴포넌트 외부에서 호출 가능
toast.positive = (children, opts) => toast({ ...opts, children, variant: "positive" });
```

---

## 스타일 시스템

### `src/styles/globals.css` — CSS 변수 디자인 토큰

모든 컬러, 그림자, 간격, 모션 값을 CSS 변수로 정의한다. `[data-theme="dark"]`로 다크모드를 전환한다.

```css
:root {
  --color-primary: #3182f6;
  --color-positive: #00b493;
  --color-negative: #f04452;
  --color-background: #ffffff;
  --color-muted: #f2f4f6;
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
}

[data-theme="dark"] {
  --color-primary: #4593fc;
  --color-background: #191f28;
  --color-muted: #2d3540;
}

/* Progress indeterminate 스트라이프 애니메이션 */
@keyframes progress-stripe {
  to { background-position: 28px 0; }
}
```

### `tailwind.config.ts` — 커스텀 토큰 등록

CSS 변수를 Tailwind 유틸리티로 연결하고, 커스텀 keyframe/animation, 타이포그래피 스케일을 추가한다.

```ts
theme: {
  extend: {
    colors: { primary: { DEFAULT: "var(--color-primary)" }, ... },
    fontSize: {
      display1: ["28px", { lineHeight: "1.3", fontWeight: "700" }],
      title1:   ["22px", { lineHeight: "1.4", fontWeight: "700" }],
      body1:    ["16px", { lineHeight: "1.5", fontWeight: "400" }],
    },
    keyframes: {
      "toast-in":  { from: { opacity: "0", transform: "translateY(8px) scale(0.96)" }, to: { opacity: "1", transform: "translateY(0) scale(1)" } },
      "toast-out": { from: { opacity: "1", transform: "translateY(0) scale(1)" }, to: { opacity: "0", transform: "translateY(8px) scale(0.96)" } },
    },
  },
}
```

---

## 빌드

### `tsup.config.ts` — 듀얼 번들 + 서브패스

컴포넌트별 `entry`를 각각 선언해 CJS + ESM 두 포맷으로 빌드한다. `splitting: true`로 공통 코드를 청크로 분리해 중복을 줄인다.

```ts
export default defineConfig({
  entry: {
    index:   "src/index.ts",
    button:  "src/components/Button/index.ts",
    toast:   "src/components/Toast/index.ts",
    // ... 40+ 엔트리
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  clean: true,
  external: ["react", "react-dom"],
  treeshake: true,
});
```

`styles.css`는 tsup이 처리하지 않고 Tailwind CLI로 별도 빌드한다.

```json
"build": "tsup && tailwindcss -i ./src/styles/globals.css -o ./dist/styles.css --minify"
```

### `tsconfig.json` — 경로 alias

`@/*` → `./src/*` alias. `baseUrl`은 TS 7.0에서 deprecated 예정이므로 제거하고, paths만 `./src/*` 상대 경로 형식으로 작성한다.

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

### `.github/workflows/publish.yml` — npm 자동 배포

`main` 브랜치에 push될 때마다 실행된다. npm에 이미 배포된 버전이면 스킵하므로, showcase만 변경된 push에서는 publish가 일어나지 않는다.

```yaml
- name: Check if version is already published
  id: version-check
  run: |
    VERSION=$(node -p "require('./package.json').version")
    if npm show mokona-ui@$VERSION version 2>/dev/null | grep -q "$VERSION"; then
      echo "skip=true" >> $GITHUB_OUTPUT
    else
      echo "skip=false" >> $GITHUB_OUTPUT
    fi

- name: Build
  if: steps.version-check.outputs.skip == 'false'
  run: pnpm build

- name: Publish
  if: steps.version-check.outputs.skip == 'false'
  run: pnpm publish --no-git-checks --access public
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

`NPM_TOKEN`은 GitHub repository secret으로 등록된 npm Granular Access Token(2FA bypass)이다.  
`pnpm/action-setup@v4`는 `package.json`의 `packageManager` 필드에서 pnpm 버전을 자동으로 읽는다.

---

## Storybook

### `.storybook/main.ts`

`staticDirs: ["../public"]`으로 `public/favicon.svg`를 정적으로 서빙한다.

```ts
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  staticDirs: ["../public"],
  framework: { name: "@storybook/react-vite", options: {} },
};
```

### `.storybook/manager-head.html`

Storybook 관리자 UI(왼쪽 사이드바 영역)에 favicon을 주입한다.

```html
<link rel="icon" type="image/svg+xml" href="favicon.svg" />
```

### `.storybook/preview.ts`

`globals.css`를 import해 토큰과 애니메이션 keyframe을 스토리 환경에서도 적용한다. `theme` globalType과 decorator로 `data-theme` 속성을 토글한다.

```ts
import "../src/styles/globals.css";

decorators: [
  (Story, context) => {
    document.documentElement.setAttribute("data-theme", context.globals.theme === "dark" ? "dark" : "light");
    return Story();
  },
],
```
