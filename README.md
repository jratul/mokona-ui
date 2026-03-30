# mokona-ui

토스 스타일의 React UI 컴포넌트 라이브러리.

풍부한 애니메이션 반응, CSS variable 기반 다크모드, React 17~19 지원을 목표로 설계했습니다.

---

## 설치

```bash
npm install mokona-ui
# or
pnpm add mokona-ui
```

소비자 프로젝트에서 스타일시트를 한 번 import합니다.

```ts
import "mokona-ui/styles.css";
```

---

## 사용법

### 전체 import

```tsx
import { Button, Toast, BottomSheet } from "mokona-ui";
```

### Subpath import (트리쉐이킹 최적화)

필요한 컴포넌트만 가져오면 불필요한 코드가 번들에 포함되지 않습니다.

```tsx
import { Button } from "mokona-ui/button";
import { TextField } from "mokona-ui/textfield";
import { toast, Toaster } from "mokona-ui/toast";
```

---

## 컴포넌트

### Foundation

| 컴포넌트 | 설명 |
|---|---|
| `Button` | 탄성 tap 애니메이션, 5가지 variant, loading 상태 |
| `Text` | 타이포그래피 토큰 래퍼, `as` prop으로 시맨틱 태그 지정 |
| `Divider` | 수평/수직, spacing 조절 |

```tsx
<Button variant="primary" size="md" loading>계속하기</Button>
<Button variant="danger" fullWidth>삭제</Button>

<Text variant="title1">잔액 조회</Text>
<Text variant="body2" color="muted">오늘 사용 금액</Text>
```

### Input

| 컴포넌트 | 설명 |
|---|---|
| `TextField` | label, helperText, errorMessage, 접근성 aria 자동 처리 |
| `Checkbox` | 체크 시 path draw 애니메이션, Radix 접근성 |
| `Toggle` | label + description 레이아웃 내장, Radix Switch 기반 |

```tsx
<TextField
  label="이메일"
  placeholder="example@email.com"
  isError
  errorMessage="올바른 이메일 형식이 아닙니다"
/>

<Checkbox label="전체 동의" onCheckedChange={setChecked} />

<Toggle label="푸시 알림" description="혜택 및 이벤트 소식을 받습니다" />
```

### Feedback

| 컴포넌트 | 설명 |
|---|---|
| `Toast` / `Toaster` / `toast()` | 함수 호출 방식, 4가지 variant |
| `BottomSheet` | spring 슬라이드 + 드래그로 닫기 |
| `Badge` | 6가지 variant, 3가지 size |
| `Chip` | 선택/해제 상태, 제거 버튼 내장 |

```tsx
// 앱 최상단에 Toaster 한 번 추가
<Toaster />

// 어디서든 함수로 호출
toast("송금이 완료되었습니다");
toast.positive("계좌가 연결되었습니다");
toast.negative("오류가 발생했습니다", { description: "잠시 후 다시 시도해주세요" });

// BottomSheet
const [open, setOpen] = useState(false);
<BottomSheet open={open} onOpenChange={setOpen} title="송금하기">
  <Button fullWidth>토스뱅크 110-123-456789</Button>
</BottomSheet>
```

### Layout

| 컴포넌트 | 설명 |
|---|---|
| `Card` | 3가지 variant, `onClick` 시 tap 애니메이션 자동 활성화 |
| `Spinner` | 4가지 size, 3가지 color |
| `Skeleton` | text / circular / rectangular variant, multi-line 지원 |

```tsx
<Card variant="elevated" onClick={() => navigate("/detail")}>
  <Text variant="body2" color="muted">토스뱅크 통장</Text>
  <Text variant="title2">1,234,567원</Text>
</Card>

<Skeleton variant="text" lines={3} />
<Skeleton variant="circular" width={48} height={48} />
```

---

## 다크모드

CSS variable 기반으로 구현되어 있습니다. `data-theme="dark"` 속성 하나로 전체 테마가 전환됩니다.

```ts
// 다크모드 적용
document.documentElement.setAttribute("data-theme", "dark");

// 라이트모드 복귀
document.documentElement.removeAttribute("data-theme");
```

Tailwind `darkMode` 클래스도 함께 지원합니다.

```html
<html class="dark"> ... </html>
```

---

## 디자인 토큰

CSS variable로 정의된 토큰을 직접 사용할 수 있습니다.

```css
/* 컬러 */
var(--color-primary)        /* #3182F6 */
var(--color-positive)       /* #00B493 */
var(--color-negative)       /* #F04452 */
var(--color-warning)        /* #FF8A00 */
var(--color-foreground)
var(--color-muted)
var(--color-border)

/* 그림자 */
var(--shadow-sm)
var(--shadow-md)
var(--shadow-lg)
var(--shadow-overlay)
```

TypeScript 토큰 상수도 export합니다.

```ts
import { colors, typography } from "mokona-ui";

colors.primary.DEFAULT // "#3182f6"
typography.title1      // { fontSize: "22px", lineHeight: "1.4", fontWeight: 700 }
```

---

## Peer Dependencies

```json
{
  "react": "^17 || ^18 || ^19",
  "react-dom": "^17 || ^18 || ^19"
}
```

---

## 성능 설계

### LazyMotion으로 Framer Motion 번들 절감

모든 애니메이션 컴포넌트에 `LazyMotion + domAnimation + m.*` 패턴을 적용했습니다.
`motion.*` 대신 `m.*`을 사용하면 Framer Motion의 고급 기능(3D, layout animation 등)을 제외한 기본 기능만 로드해 번들 크기를 줄입니다.

```tsx
// ❌ 전체 번들 포함
import { motion } from "framer-motion";

// ✅ domAnimation만 로드 (~30% 절감)
import { LazyMotion, domAnimation, m } from "framer-motion";
<LazyMotion features={domAnimation}>
  <m.div whileTap={{ scale: 0.96 }} />
</LazyMotion>
```

### useSyncExternalStore 기반 Toast 상태

`useToast`는 React 18의 `useSyncExternalStore`로 구현했습니다.
여러 컴포넌트가 `useToast()`를 구독해도 상태 변경 시 setState가 한 번만 발생합니다.

```ts
// ❌ 기존: N개 구독자 → N번 setState
listeners.forEach((l) => l(toasts));

// ✅ 개선: React가 배치 처리
useSyncExternalStore(subscribe, getSnapshot);
```

### Subpath exports로 트리쉐이킹

`Button`만 사용해도 `BottomSheet`(Framer Motion drag 포함)가 번들에 들어가는 문제를 방지합니다.

```ts
// BottomSheet 코드가 번들에 포함되지 않음
import { Button } from "mokona-ui/button";
```

### Skeleton GPU 가속

shimmer 애니메이션에 `will-change: transform`을 적용해 GPU 합성 레이어로 분리했습니다.
여러 Skeleton이 동시에 렌더링될 때 CPU 부하가 줄어듭니다.

### Card 리마운트 방지

`interactive` prop 유무에 따라 `motion.div`와 `div`를 분기하면 prop이 바뀔 때 컴포넌트가 리마운트됩니다.
항상 `motion.div`를 사용하고 `whileTap`만 조건부로 적용해 이 문제를 방지했습니다.

---

## 개발

```bash
# 컴포넌트 개발 서버
pnpm storybook

# 빌드
pnpm build

# 테스트
pnpm test

# 릴리즈
pnpm changeset        # 변경 사항 기록
pnpm changeset version # 버전 bump
pnpm release           # 빌드 + npm publish
```

---

## 스택

- **Radix UI** — 접근성 primitives
- **Tailwind CSS v3** — CSS variable 기반 토큰 시스템
- **CVA (class-variance-authority)** — variant 관리
- **Framer Motion v10** — 애니메이션
- **tsup** — ESM + CJS 듀얼 번들
- **Storybook 8** — 컴포넌트 문서 및 테스트
- **Vitest** — 단위 테스트
- **Changesets** — 버전 관리 및 npm 배포
