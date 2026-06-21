# mokona-ui

React UI 컴포넌트 라이브러리 (npm 패키지 `mokona-ui`). pnpm 모노 패키지 아님 — 단일 패키지.

## 스택

- React 17/18/19 (peer), TypeScript, Tailwind CSS, Radix UI 프리미티브
- 스타일 variant: `class-variance-authority`(cva) + `tailwind-merge`(`src/utils/cn.ts`의 `cn()`)
- 빌드: `tsup` (cjs+esm+dts) + Tailwind CLI로 `dist/styles.css` 별도 생성
- 테스트: Vitest + Testing Library, 스토리: Storybook 8

## 디렉토리 구조

- `src/components/<ComponentName>/` — 컴포넌트마다 폴더 1개
  - `<Name>.tsx`, `<Name>.stories.tsx`, `<Name>.test.tsx`, `index.ts` (재export)
- `src/utils/cn.ts` — Tailwind 클래스 병합 유틸 (커스텀 font-size 그룹 `text-display1` 등 등록돼 있음)
- `src/styles/globals.css` — CSS 변수 기반 디자인 토큰 (`--color-primary`, `--color-muted` 등)
- `src/index.ts` — 패키지 루트에서 export하는 전체 공개 API

## 컴포넌트 작성 패턴

- 사이즈/스타일 variant가 있는 컴포넌트는 `cva`로 정의하고, variants 객체와 함께 `<name>Variants`를 export한다.
  (예: `Button` → `buttonVariants`, `Badge` → `badgeVariants`, `Card` → `cardVariants`)
- 크기 variant 네이밍은 `sm` / `md` / `lg` (기본값 `md`)로 통일. `Button`이 기준 패턴: `sm: h-9`, `md: h-11~12`, `lg: h-14`.
- `<input>`을 감싸는 컴포넌트(`TextField` 등)에 `size` prop을 추가할 때는 네이티브 `size`(number, HTML 속성)와 충돌하므로
  `Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">`로 제외하고 cva variant의 `size`(sm/md/lg)로 덮어써야 한다.
- 컴포넌트는 `React.forwardRef`로 작성, `displayName` 지정.
- 색상은 하드코딩 hex 대신 `var(--color-*)` CSS 변수 사용.

## 새 컴포넌트/export 추가 시 빠뜨리기 쉬운 3곳

새 컴포넌트를 추가하거나 서브패스 export(`mokona-ui/textfield` 같은)를 만들 때 아래 3개를 함께 갱신해야 빌드 산출물에 반영된다:

1. `src/index.ts` — 루트 패키지에서 export
2. `tsup.config.ts`의 `entry` — 서브패스 빌드 진입점 (kebab-case 키)
3. `package.json`의 `exports` 필드 — 해당 서브패스의 types/import/require 경로

## 명령어

- `pnpm build` — tsup + tailwind CSS 빌드 (`dist/` 생성, git에 추적 안 됨)
- `pnpm test` — vitest run (전체), `pnpm test:watch`
- `pnpm lint` — `tsc --noEmit` (이 프로젝트의 lint는 타입체크만 수행, ESLint 설정 없음)
- `pnpm storybook` — 컴포넌트 스토리북 개발 서버

## 작업 시 체크리스트

- 컴포넌트 수정/추가 후: `pnpm lint` (tsc) + `pnpm test` 통과 확인. `dist/`는 git 추적 대상이 아니므로 커밋에 포함시키지 않는다.
- 전역 규칙(`~/.claude/CLAUDE.md`)의 "작업 끝나면 커밋+푸시", "커밋 author는 jratul만" 등을 따른다.
