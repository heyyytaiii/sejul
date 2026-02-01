# Book Review App - Claude 지시사항

## 프로젝트 정보
- **위치**: ~/Desktop/programming/book-app
- **스펙 문서**: docs/SPEC.md (반드시 먼저 읽을 것)
- **기술 스택**: Expo + TypeScript + Supabase + Zustand + NativeWind

## 새 세션 시작시 필수
1. `docs/SPEC.md` 파일 읽어서 컨텍스트 파악
2. 현재 폴더 구조 확인
3. TODO 상태 확인 후 이어서 작업

---

## 핵심 컨셉: 3줄 독후감

**문제**: 책 내용이 휘발됨 + 독후감 쓰는데 에너지가 너무 많이 듦

**해결책**: 구조화된 3줄 템플릿
```
1. 한 문장 요약: "이 책은 ___에 관한 책이다"
2. 가장 인상적인 점: "___"
3. 내 삶에 적용할 것: "___"
```

**왜 이 구조?**
- 본질 파악 → 감정 포착 → 행동 유도
- 빈칸 채우기 형식으로 부담 최소화
- 100자 제한으로 간결함 강제

---

## MVP 기능
1. **인상 깊은 구절 저장** - 책에서 기억할 문장들
2. **3줄 독후감** - 구조화된 간편 리뷰
3. **책 목록 관리** - 읽은 책 추가/조회

## 화면 구성
- Home: 책 목록 (카드 형태)
- AddBook: 책 추가
- BookDetail: 책 상세 + 구절 + 리뷰
- AddQuote: 구절 추가
- WriteReview: 3줄 독후감 작성

## 데이터 모델
- **books**: id, title, author, cover_url
- **quotes**: id, book_id, text, page_number
- **reviews**: id, book_id, one_sentence, most_impressive, apply_to_life

---

## 구현 원칙
- Expo Router 사용 (app/ 디렉토리)
- TypeScript 필수
- 컴포넌트는 components/
- Supabase 로직은 lib/supabase.ts
- 상태관리는 Zustand (stores/)

## 현재 진행 상태
- [x] Phase 0: 스펙 문서 작성
- [x] Phase 1: 기본 구조 (Expo 초기화, 네비게이션)
- [x] Phase 2: 핵심 기능 (책 CRUD)
- [x] Phase 3: 기록 기능 (구절, 3줄 독후감)
- [ ] Phase 4: 마무리 (UI, 에러처리, Supabase 연동)

---

## 비전 (추후)
독서계의 왓챠 - 친구 팔로우, 독서 기록 공유, 소셜 피드
