import { create } from "zustand";
import { Book, Quote, Review } from "@/lib/types";

interface BookState {
  books: Book[];
  quotes: Record<string, Quote[]>;
  reviews: Record<string, Review | null>;
  isLoading: boolean;

  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;

  setQuotes: (bookId: string, quotes: Quote[]) => void;
  addQuote: (bookId: string, quote: Quote) => void;

  setReview: (bookId: string, review: Review | null) => void;

  setLoading: (loading: boolean) => void;
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  quotes: {},
  reviews: {},
  isLoading: false,

  setBooks: (books) => set({ books }),

  addBook: (book) =>
    set((state) => ({
      books: [book, ...state.books],
    })),

  removeBook: (id) =>
    set((state) => ({
      books: state.books.filter((b) => b.id !== id),
    })),

  setQuotes: (bookId, quotes) =>
    set((state) => ({
      quotes: { ...state.quotes, [bookId]: quotes },
    })),

  addQuote: (bookId, quote) =>
    set((state) => ({
      quotes: {
        ...state.quotes,
        [bookId]: [quote, ...(state.quotes[bookId] || [])],
      },
    })),

  setReview: (bookId, review) =>
    set((state) => ({
      reviews: { ...state.reviews, [bookId]: review },
    })),

  setLoading: (isLoading) => set({ isLoading }),
}));
