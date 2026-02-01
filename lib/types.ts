export interface Book {
  id: string;
  user_id?: string;
  title: string;
  author: string | null;
  cover_url: string | null;
  created_at: string;
}

export interface Quote {
  id: string;
  book_id: string;
  text: string;
  page_number: number | null;
  created_at: string;
}

export interface Review {
  id: string;
  book_id: string;
  one_sentence: string;
  most_impressive: string;
  apply_to_life: string;
  created_at: string;
}

export type BookWithDetails = Book & {
  quotes: Quote[];
  review: Review | null;
};
