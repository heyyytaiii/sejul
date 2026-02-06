# 독후감 앱 MVP 스펙 문서

> 이 문서는 컨텍스트 초기화 후에도 프로젝트 방향을 유지하기 위한 마스터 스펙입니다.

## 프로젝트 개요

**목표**: 책을 읽고 나서 내용이 휘발되지 않도록, 에너지를 적게 들이면서 간편하게 독후감을 기록하는 앱

**비전**: 독서계의 왓챠 - 친구들과 팔로우하며 독서 기록을 공유하는 소셜 플랫폼 (추후)

---

## 1. 핵심 기능 (MVP)

### 1.1 인상 깊은 구절 저장

- 책에서 기억하고 싶은 문장/구절 저장
- 페이지 번호 기록 (선택)
- 여러 구절 저장 가능

### 1.2 3줄 독후감 (핵심 차별점)

구조화된 템플릿으로 누구나 임팩트 있는 독후감을 쉽게 작성:

```
1. 한 문장 요약: "이 책은 ______에 관한 책이다"
2. 가장 인상적인 점: "______"
3. 내 삶에 적용할 것: "______"
```

**왜 이 구조인가?**

- 본질 파악 (무엇에 관한 책?)
- 감정/지적 임팩트 포착 (뭐가 인상적?)
- 행동 유도 (어떻게 적용?)

**UX 원칙:**

- 각 필드는 빈칸 채우기 형식으로 부담 최소화
- placeholder로 예시 제공
- 글자수 제한으로 간결함 강제 (각 100자 이내 권장)

### 1.3 책 관리

- 읽은 책 목록 관리
- 책 제목, 저자, 표지 이미지
- 검색해서 추가

---

## 2. 기술 스택

| 영역       | 기술                      | 이유                                                   |
| ---------- | ------------------------- | ------------------------------------------------------ |
| Framework  | **Expo** (React Native)   | 빠른 개발, 간편한 빌드                                 |
| Language   | **TypeScript**            | 타입 안정성                                            |
| Backend    | **Supabase**              | PostgreSQL 기반, 인증/실시간 지원, 추후 소셜 기능 대비 |
| Navigation | **React Navigation**      | RN 표준 네비게이션                                     |
| State      | **Zustand**               | 간단하고 가벼운 상태관리                               |
| Styling    | **NativeWind** (Tailwind) | 빠른 스타일링                                          |

---

## 3. 화면 구성

```
[Tab Navigator]
├── Home (책 목록)
├── AddBook (책 추가)
└── Profile (내 정보) - 추후

[Stack Navigator]
├── BookDetail (책 상세 - 구절/리뷰 보기)
├── AddQuote (구절 추가)
└── WriteReview (리뷰 작성)
```

### 3.1 Home 화면

- 읽은 책 카드 목록
- 각 카드: 표지, 제목, 저자, 별점
- 탭하면 BookDetail로 이동

### 3.2 AddBook 화면

- 책 검색 (Google Books API 또는 수동 입력)
- 제목, 저자, 표지 URL 입력
- 저장 버튼

### 3.3 BookDetail 화면

- 책 정보 헤더
- 인상 깊은 구절 목록
- 내 리뷰 (있으면 표시, 없으면 작성 유도)
- 구절 추가 / 리뷰 작성 버튼

### 3.4 AddQuote 화면

- 구절 텍스트 입력 (멀티라인)
- 페이지 번호 (선택)
- 저장 버튼

### 3.5 WriteReview 화면 (3줄 독후감)

**구조화된 입력 폼:**

1. **한 문장 요약**
   - placeholder: "이 책은 **\_\_**에 관한 책이다"
   - 힌트: "책의 핵심 주제를 한 문장으로"

2. **가장 인상적인 점**
   - placeholder: "가장 기억에 남는 것은..."
   - 힌트: "마음에 와닿은 내용, 새롭게 알게 된 것"

3. **내 삶에 적용할 것**
   - placeholder: "앞으로 나는..."
   - 힌트: "실천할 것, 바꿀 생각, 기억할 교훈"

- 각 필드 100자 제한 (간결함 유도)
- 저장 버튼
- 미리보기 (3줄이 카드로 어떻게 보일지)

---

## 4. 데이터 모델 (Supabase)

### 4.1 books 테이블

```sql
create table books (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  title text not null,
  author text,
  cover_url text,
  created_at timestamptz default now()
);
```

### 4.2 quotes 테이블

```sql
create table quotes (
  id uuid primary key default gen_random_uuid(),
  book_id uuid references books(id) on delete cascade,
  text text not null,
  page_number int,
  created_at timestamptz default now()
);
```

### 4.3 reviews 테이블 (3줄 독후감)

```sql
create table reviews (
  id uuid primary key default gen_random_uuid(),
  book_id uuid references books(id) on delete cascade,
  one_sentence text not null,      -- "이 책은 ___에 관한 책이다"
  most_impressive text not null,   -- "가장 인상적인 점"
  apply_to_life text not null,     -- "내 삶에 적용할 것"
  created_at timestamptz default now()
);
```

**필드 설명:**

- `one_sentence`: 책의 본질을 한 문장으로 (100자 제한)
- `most_impressive`: 가장 인상 깊었던 점 (100자 제한)
- `apply_to_life`: 삶에 적용할 교훈/행동 (100자 제한)

---

## 5. 폴더 구조

```
book-app/
├── app/                    # Expo Router 앱 디렉토리
│   ├── (tabs)/            # 탭 네비게이션
│   │   ├── index.tsx      # Home
│   │   ├── add-book.tsx   # AddBook
│   │   └── _layout.tsx    # Tab layout
│   ├── book/
│   │   └── [id].tsx       # BookDetail
│   ├── quote/
│   │   └── add.tsx        # AddQuote
│   ├── review/
│   │   └── write.tsx      # WriteReview
│   └── _layout.tsx        # Root layout
├── components/
│   ├── BookCard.tsx
│   ├── QuoteCard.tsx
│   ├── ReviewCard.tsx
│   ├── StarRating.tsx
│   └── ui/                # 공통 UI 컴포넌트
├── lib/
│   ├── supabase.ts        # Supabase 클라이언트
│   └── types.ts           # TypeScript 타입
├── stores/
│   └── bookStore.ts       # Zustand 스토어
├── docs/
│   └── SPEC.md            # 이 문서
└── .claude/
    └── CLAUDE.md          # Claude 지시사항
```

---

## 6. 구현 우선순위

### Phase 1: 기본 구조 (먼저)

1. Expo 프로젝트 초기화
2. 기본 네비게이션 설정
3. Supabase 연결

### Phase 2: 핵심 기능

1. 책 추가 기능
2. 책 목록 표시
3. 책 상세 화면

### Phase 3: 기록 기능

1. 구절 저장
2. 리뷰 작성
3. 별점 기능

### Phase 4: 마무리

1. UI 다듬기
2. 에러 처리
3. 로딩 상태

---

## 7. 디자인 가이드

- **미니멀**: 불필요한 요소 제거
- **빠른 기록**: 최소 탭으로 저장 완료
- **편안한 색상**: 독서와 어울리는 차분한 톤
- **카드 UI**: 책/구절/리뷰 모두 카드 형태

### 색상 (예시)

- Primary: #6366f1 (인디고)
- Background: #fafafa
- Card: #ffffff
- Text: #1f2937

---

## 8. MVP 범위 외 (추후)

- [ ] 소셜 기능 (팔로우, 피드)
- [ ] 책 검색 API 연동
- [ ] 프로필 화면
- [ ] 푸시 알림
- [ ] 다크 모드
- [ ] 책 카테고리/태그

---

## 9. 시작 명령어

```bash
cd ~/Desktop/programming/book-app
npx create-expo-app@latest . --template blank-typescript
npx expo install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
npm install @supabase/supabase-js zustand
npm install nativewind tailwindcss
```

---

_이 문서를 참고하여 구현을 진행하세요. 컨텍스트 초기화 후에도 이 파일을 읽으면 프로젝트 방향을 유지할 수 있습니다._
