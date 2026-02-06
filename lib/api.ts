import { supabase } from "./supabase";
import { Book, Quote, Review } from "./types";

// Books API
export async function fetchBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addBook(book: Omit<Book, "id">): Promise<Book> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("books")
    .insert({
      title: book.title,
      author: book.author,
      cover_url: book.cover_url,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteBook(id: string): Promise<void> {
  const { error } = await supabase.from("books").delete().eq("id", id);
  if (error) throw error;
}

// Quotes API
export async function fetchQuotes(bookId: string): Promise<Quote[]> {
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("book_id", bookId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addQuote(
  bookId: string,
  quote: Omit<Quote, "id" | "book_id">,
): Promise<Quote> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("quotes")
    .insert({
      book_id: bookId,
      text: quote.text,
      page_number: quote.page_number,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Reviews API
export async function fetchReview(bookId: string): Promise<Review | null> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("book_id", bookId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function saveReview(
  bookId: string,
  review: Omit<Review, "id" | "book_id">,
): Promise<Review> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("reviews")
    .upsert(
      {
        book_id: bookId,
        one_sentence: review.one_sentence,
        most_impressive: review.most_impressive,
        apply_to_life: review.apply_to_life,
        user_id: user.id,
      },
      { onConflict: "book_id" },
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Delete APIs
export async function deleteQuote(quoteId: string): Promise<void> {
  const { error } = await supabase.from("quotes").delete().eq("id", quoteId);
  if (error) throw error;
}

export async function deleteReview(bookId: string): Promise<void> {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("book_id", bookId);
  if (error) throw error;
}
