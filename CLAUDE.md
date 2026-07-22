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

## 알려진 버그 패턴 & 수정 이력

### Button/IconButton — flex 부모에서 클릭 시 밀리는 버그 (0.0.6에서 수정)

`Button`/`IconButton`은 `whileTap` 스케일 애니메이션을 위해 실제 버튼을 `m.div` 래퍼로 감싸는 구조다.
`flex-column`이나 `align-items: stretch` 부모(Electron 앱에서 자주 발생) 안에 두면 래퍼가 부모 전체 너비로 늘어나고,
`scale(0.96)` 애니메이션이 **래퍼(큰 것)** 중심 기준으로 걸려 실제 버튼이 클릭마다 오른쪽으로 밀리는 것처럼 보인다.

**수정 방법**: 래퍼에 `alignSelf: "flex-start"` 추가 → 래퍼가 항상 콘텐츠 크기로만 존재.
`fullWidth` 시에는 `alignSelf: undefined`(상속)으로 두어 기존 동작 유지.

`Card`/`Chip`은 래퍼 없이 보이는 요소 자체에 직접 transform이 걸려 있어 이 버그 패턴과 무관.
새로 애니메이션 래퍼를 씌우는 컴포넌트를 만들 때 동일한 패턴 적용 필요.

## showcase (Next.js 데모 앱)

`showcase/` 폴더에 mokona-ui 컴포넌트를 시연하는 Next.js 앱이 포함되어 있다.
예전에는 별도 레포(`mokona-ui-showcase`)였으나, 관리 편의를 위해 이 레포로 통합했다.

- 로컬 개발: `cd showcase && pnpm dev`
- Vercel 배포: mokona-ui 레포 연결 후 **Root Directory = `showcase`** 설정
- showcase의 `package.json`에 `"mokona-ui": "^x.x.x"`로 npm 버전을 명시하므로,
  새 버전 배포 후 `showcase/package.json`의 버전을 올리고 커밋하면 Vercel에 자동 반영된다.
- `update-consumers.ps1` 대상에서 제외됨 — 이 레포 안에서 직접 관리한다.

## consumer 레포 일괄 업데이트

**트리거**: 사용자가 "consumer 업데이트", "사용처 업데이트", "쓰는 레포 업데이트" 등을 언급할 때.

`update-consumers.ps1`을 실행하면 `$repos` 배열에 등록된 모든 레포의 `mokona-ui`를 최신 버전으로 올린다.
스크립트는 package.json/lockfile만 갱신하고 커밋/푸시는 하지 않으므로, 실행 후 변경된 레포만 골라
build/lint 확인 후 커밋/푸시한다.

```powershell
# mokona-ui 프로젝트 루트에서 실행
powershell -File .\update-consumers.ps1
```

새 consumer 앱이 생기면 스크립트 상단 `$repos` 배열에 폴더명만 추가하면 된다.

## 작업 시 체크리스트

- 컴포넌트 수정/추가 후: `pnpm lint` (tsc) + `pnpm test` 통과 확인. `dist/`는 git 추적 대상이 아니므로 커밋에 포함시키지 않는다.
- 전역 규칙(`~/.claude/CLAUDE.md`)의 "작업 끝나면 커밋+푸시", "커밋 author는 jratul만" 등을 따른다.
