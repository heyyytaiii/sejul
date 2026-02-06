const ALADIN_TTB_KEY = process.env.EXPO_PUBLIC_ALADIN_TTB_KEY;
const ALADIN_API_URL = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx";

export interface AladinBook {
  itemId: number;
  title: string;
  author: string;
  cover: string;
  publisher: string;
  pubDate: string;
  description: string;
  isbn13: string;
}

interface AladinResponse {
  totalResults: number;
  item: AladinBook[];
}

export async function searchBooks(query: string): Promise<AladinBook[]> {
  if (!query.trim()) return [];
  if (!ALADIN_TTB_KEY) {
    console.error("알라딘 API 키가 설정되지 않았습니다.");
    return [];
  }

  const params = new URLSearchParams({
    TTBKey: ALADIN_TTB_KEY,
    Query: query,
    QueryType: "Keyword",
    MaxResults: "20",
    SearchTarget: "Book",
    Output: "JS",
    Version: "20131101",
  });

  try {
    const response = await fetch(`${ALADIN_API_URL}?${params.toString()}`);
    const data: AladinResponse = await response.json();
    return data.item || [];
  } catch (error) {
    console.error("알라딘 API 에러:", error);
    return [];
  }
}
