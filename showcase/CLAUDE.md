# mokona-ui-showcase — Claude 작업 가이드

## 프로젝트 개요

`mokona-ui`의 공식 쇼케이스 & 문서 사이트.  
mokona-ui React 컴포넌트 라이브러리를 인터랙티브 데모와 함께 소개한다.

- **라이브러리 저장소**: https://github.com/jratul/mokona-ui
- **패키지 매니저**: pnpm (workspace 설정 포함)

---

## 기술 스택

| 영역 | 사용 기술 |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | mokona-ui ^0.0.1 |
| Styling | Tailwind CSS 4, CSS Variables |
| Font | Pretendard (CDN, async 로드) |
| Form | react-hook-form + Zod |
| Icons | lucide-react |
| Language | TypeScript 5 |
| Lint | ESLint 9 (next/core-web-vitals) |

---

## 디렉토리 구조

```
app/
  layout.tsx              # 루트 레이아웃, 메타데이터
  page.tsx                # 랜딩 페이지 (히어로, 기능 소개, 데모 링크)
  globals.css             # Tailwind 임포트, CSS 테마 변수, 폰트
  demo/
    transfer/             # 송금 4단계 위저드 데모
    form/                 # 회원가입 폼 검증 데모
    dashboard/            # 금융 대시보드 데모
components/
  Nav.tsx                 # 상단 네비게이션 (라우트 + 테마 토글)
  ThemeToggle.tsx         # 라이트/다크 전환 (localStorage 유지)
public/                   # 정적 에셋
```

---

## 테마 시스템

`globals.css`에서 CSS 변수로 관리. `data-theme="dark"` 속성으로 다크 모드 전환.

| 변수 | 의미 | 기본값 |
|------|------|--------|
| `--color-primary` | 브랜드 블루 | #3182f6 |
| `--color-positive` | 성공/수익 | #00b493 |
| `--color-negative` | 위험/손실 | #f04452 |
| `--color-warning` | 경고 | #ff8a00 |

Radii: `xs(4px)` / `sm(8px)` / `md(12px)` / `lg(16px)` / `xl(24px)`

---

## 데모 페이지 구성

### Transfer Demo (`/demo/transfer`)
4단계 송금 위저드: 은행 선택 → 계좌 입력 → 금액 입력 → OTP 인증  
테스트 OTP: `123456`  
컴포넌트: `Select`, `TextField`, `OTPInput`, `Stepper`, `Alert`, `Amount`

### Form Demo (`/demo/form`)
react-hook-form + Zod 기반 회원가입 폼  
컴포넌트: `FormRoot`, `FormField`, `FormItem`, `FormLabel`, `FormMessage`

### Dashboard Demo (`/demo/dashboard`)
금융 대시보드 종합 쇼케이스  
컴포넌트: `Card`, `Badge`, `Progress`, `Amount`, `Avatar`, `Alert`, `Tabs`

---

## 개발 명령

```bash
pnpm dev      # 개발 서버 (http://localhost:3000)
pnpm build    # 프로덕션 빌드
pnpm lint     # ESLint 검사
```

---

## 작업 규칙

- **lint error/warning 0** 유지 — 작업 후 반드시 `pnpm lint` 실행
- **Tailwind 임의값 금지** — `h-[300px]` 대신 `h-75` 등 유틸리티 클래스 사용
- **폰트 렌더 블로킹 금지** — Pretendard는 `<head>` 직접 `<link>` 대신 비동기 로드
- **`<img>` 대신 `<Image />`** 사용 (`next/image`)
- **컴포넌트는 렌더링만** — fetch/로직은 hooks 또는 utils로 분리
- **Static Generation 우선** — 불필요한 SSR 사용 금지
