import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useAddBook, useBooks } from "@/lib/hooks/useBooks";
import { searchBooks, AladinBook } from "@/lib/aladin";
import { useDebounce } from "@/lib/hooks/useDebounce";

export default function AddBookScreen() {
  const router = useRouter();
  const addBookMutation = useAddBook();
  const { data: myBooks = [] } = useBooks();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["books", debouncedQuery],
    queryFn: () => searchBooks(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });

  const handleSelectBook = async (book: AladinBook) => {
    const title = book.title.replace(/<[^>]*>/g, "");

    // 중복 체크
    const isDuplicate = myBooks.some((b) => b.title === title);
    if (isDuplicate) {
      Alert.alert("중복된 책", "이미 추가된 책입니다.");
      return;
    }

    try {
      await addBookMutation.mutateAsync({
        title,
        author: book.author || null,
        cover_url: book.cover || null,
        created_at: new Date().toISOString(),
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  const hasSearched = debouncedQuery.trim().length > 0;

  if (addBookMutation.isPending) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#6366f1" />
        <Text className="text-gray-400 mt-4">책을 추가하는 중...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-4">
          <Text className="text-[28px] font-bold text-gray-900 tracking-tight">
            책 검색
          </Text>
          <Text className="text-[15px] text-gray-400 mt-2">
            읽은 책을 검색해보세요
          </Text>
        </View>

        {/* Search Input */}
        <View className="px-5 pb-4">
          <View className="flex-row items-center bg-gray-50 rounded-2xl overflow-hidden">
            <TextInput
              className="flex-1 px-5 text-[17px] text-gray-900"
              style={{ height: 52 }}
              placeholder="책 제목"
              placeholderTextColor="#9ca3af"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <Pressable className="px-4 py-4" onPress={() => setQuery("")}>
                <Text className="text-gray-400">✕</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Results */}
        <View className="flex-1">
          <ScrollView
            className="flex-1 px-5"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >
            {isLoading ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#6366f1" />
                <Text className="text-gray-400 mt-4">검색 중...</Text>
              </View>
            ) : results.length > 0 ? (
              <View className="space-y-3">
                {results.map((book) => (
                  <Pressable
                    key={book.itemId}
                    className="flex-row bg-gray-50 rounded-2xl p-4 active:bg-gray-100"
                    onPress={() => handleSelectBook(book)}
                  >
                    {book.cover ? (
                      <Image
                        source={{ uri: book.cover }}
                        className="w-16 h-24 rounded-lg bg-gray-200"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="w-16 h-24 rounded-lg bg-gray-200 items-center justify-center">
                        <Text className="text-gray-400 text-xs">No Image</Text>
                      </View>
                    )}
                    <View className="flex-1 ml-4 justify-center">
                      <Text
                        className="text-[16px] font-semibold text-gray-900"
                        numberOfLines={2}
                      >
                        {book.title.replace(/<[^>]*>/g, "")}
                      </Text>
                      <Text
                        className="text-[14px] text-gray-500 mt-1"
                        numberOfLines={1}
                      >
                        {book.author}
                      </Text>
                      <Text className="text-[13px] text-gray-400 mt-1">
                        {book.publisher}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            ) : hasSearched ? (
              <View className="flex-1 items-center justify-center">
                <Text className="text-gray-400">검색 결과가 없습니다</Text>
              </View>
            ) : (
              <View className="flex-1 items-center justify-center">
                <Text className="text-gray-300 text-[48px] mb-4">📚</Text>
                <Text className="text-gray-400">읽은 책을 검색해보세요</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
