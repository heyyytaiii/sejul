import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api";
import { Book } from "../types";

export function useBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: api.fetchBooks,
  });
}

export function useAddBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book: Omit<Book, "id">) => api.addBook(book),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["books"] });
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteBook(id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["books"] });
    },
  });
}

export function useQuotes(bookId: string) {
  return useQuery({
    queryKey: ["quotes", bookId],
    queryFn: () => api.fetchQuotes(bookId),
    enabled: !!bookId,
  });
}

export function useAddQuote(bookId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quote: { text: string; page_number: number | null }) =>
      api.addQuote(bookId, quote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes", bookId] });
    },
  });
}

export function useReview(bookId: string) {
  return useQuery({
    queryKey: ["review", bookId],
    queryFn: () => api.fetchReview(bookId),
    enabled: !!bookId,
  });
}

export function useSaveReview(bookId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review: {
      one_sentence: string;
      most_impressive: string;
      apply_to_life: string;
    }) => api.saveReview(bookId, review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review", bookId] });
    },
  });
}

export function useDeleteQuote(bookId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quoteId: string) => api.deleteQuote(quoteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes", bookId] });
    },
  });
}

export function useDeleteReview(bookId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.deleteReview(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review", bookId] });
    },
  });
}
