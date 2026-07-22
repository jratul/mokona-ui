# mokona-ui-showcase

[mokona-ui](https://github.com/jratul/mokona-ui)의 공식 쇼케이스 & 문서 사이트.  
mokona-ui React 컴포넌트 라이브러리를 인터랙티브 데모와 함께 소개합니다.

---

## 데모 페이지

| 데모 | 설명 | 주요 컴포넌트 |
|------|------|--------------|
| **송금** `/demo/transfer` | 은행 선택 → 계좌 입력 → 금액 입력 → OTP 인증 4단계 위저드 | Select, TextField, OTPInput, Stepper, Amount |
| **폼** `/demo/form` | react-hook-form + Zod 기반 회원가입 폼 검증 | FormRoot, FormField, FormLabel, FormMessage |
| **대시보드** `/demo/dashboard` | 잔액, 거래 내역, 저축 목표를 표시하는 금융 대시보드 | Card, Badge, Progress, Avatar, Tabs |

---

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **UI Library**: mokona-ui
- **Styling**: Tailwind CSS 4 + CSS Variables (Toss 디자인 토큰)
- **Font**: Pretendard
- **Form**: react-hook-form + Zod
- **Language**: TypeScript 5
- **Package Manager**: pnpm

---

## 시작하기

```bash
pnpm install
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

---

## mokona-ui 설치

```bash
npm install mokona-ui
# or
pnpm add mokona-ui
```

컴포넌트별 서브패스 임포트로 트리셰이킹을 지원합니다.

```tsx
import { Button } from 'mokona-ui/button'
import { TextField } from 'mokona-ui/text-field'
```

---

## 라이선스

MIT © [jratul](https://github.com/jratul)
