# Book Review App - Claude 지시사항

## 프로젝트 정보

- **스펙 문서**: docs/SPEC.md (새 세션 시작 시 반드시 읽을 것)
- **기술 스택**: Expo + TypeScript + Supabase + Zustand + NativeWind

## 핵심 컨셉: 3줄 독후감

```
1. 한 문장 요약: "이 책은 ___에 관한 책이다"
2. 가장 인상적인 점: "___"
3. 내 삶에 적용할 것: "___"
```

- 각 필드 100자 제한

## 구현 원칙

- Expo Router (app/ 디렉토리)
- 컴포넌트: components/
- Supabase: lib/supabase.ts
- 상태관리: Zustand (stores/)

## 현재 Phase

- [x] Phase 1-3 완료
- [ ] Phase 4: UI 개선, 에러처리, Supabase 연동

---

## 주의사항 (IMPORTANT)

- Push 전 반드시 확인 요청
- NativeWind 클래스는 className 속성 사용
- Supabase 환경변수: .env.local (not .env)
- Expo Router의 Link는 href prop 사용

## 컴팩션 규칙

컴팩션 시 반드시 보존:

- 수정된 파일 목록
- 현재 작업 중인 Phase와 세부 태스크
- 발생한 에러와 해결 방법
