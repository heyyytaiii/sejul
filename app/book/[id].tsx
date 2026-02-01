import { View, Text, ScrollView, Pressable, Image, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useBooks, useQuotes, useReview, useDeleteQuote, useDeleteReview, useDeleteBook } from "@/lib/hooks/useBooks";
import { QuoteCard } from "@/components/QuoteCard";
import { ReviewCard } from "@/components/ReviewCard";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: books = [] } = useBooks();
  const { data: bookQuotes = [] } = useQuotes(id || "");
  const { data: bookReview = null } = useReview(id || "");
  const deleteQuoteMutation = useDeleteQuote(id || "");
  const deleteReviewMutation = useDeleteReview(id || "");
  const deleteBookMutation = useDeleteBook();

  const book = books.find((b) => b.id === id);

  const handleDeleteBook = () => {
    Alert.alert("책 삭제", "이 책과 모든 기록을 삭제할까요?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          await deleteBookMutation.mutateAsync(id || "");
          router.replace("/");
        },
      },
    ]);
  };

  if (deleteBookMutation.isPending) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#6366f1" />
        <Text className="text-gray-400 mt-4">삭제하는 중...</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-400">책을 찾을 수 없어요</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Book Header */}
        <View className="bg-white px-5 pt-6 pb-8">
          <View className="flex-row">
            {book.cover_url ? (
              <Image
                source={{ uri: book.cover_url }}
                className="w-24 h-36 rounded-2xl bg-gray-100"
                resizeMode="cover"
              />
            ) : (
              <View className="w-24 h-36 rounded-2xl bg-primary/5 items-center justify-center">
                <Ionicons name="book" size={40} color="#6366f1" />
              </View>
            )}
            <View className="flex-1 ml-5">
              <View className="flex-row justify-between items-start">
                <Text className="text-[22px] font-bold text-gray-900 leading-tight flex-1 pr-2">
                  {book.title}
                </Text>
                <Pressable onPress={handleDeleteBook} className="p-1">
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </Pressable>
              </View>
              {book.author && (
                <Text className="text-[15px] text-gray-400 mt-2">
                  {book.author}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* 3줄 독후감 Section */}
        <View className="mt-3 bg-white px-5 py-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-[13px] font-semibold text-gray-400 tracking-wide">
              3줄 독후감
            </Text>
            {!bookReview && (
              <Pressable
                className="flex-row items-center"
                onPress={() => router.push(`/review/write?bookId=${id}`)}
              >
                <Ionicons name="add" size={18} color="#6366f1" />
                <Text className="text-primary text-[14px] font-medium ml-1">
                  작성하기
                </Text>
              </Pressable>
            )}
          </View>

          {bookReview ? (
            <ReviewCard
              review={bookReview}
              onEdit={(field) => router.push(`/review/edit?bookId=${id}&field=${field}`)}
            />
          ) : (
            <View className="bg-gray-50 rounded-2xl p-6 items-center">
              <Ionicons name="create-outline" size={32} color="#d1d5db" />
              <Text className="text-gray-400 text-[15px] mt-3 text-center">
                이 책에 대한 생각을{"\n"}3줄로 정리해보세요
              </Text>
            </View>
          )}
        </View>

        {/* Quotes Section */}
        <View className="mt-3 bg-white px-5 py-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-[13px] font-semibold text-gray-400 tracking-wide">
              인상 깊은 구절
            </Text>
            <Pressable
              className="flex-row items-center"
              onPress={() => router.push(`/quote/add?bookId=${id}`)}
            >
              <Ionicons name="add" size={18} color="#6366f1" />
              <Text className="text-primary text-[14px] font-medium ml-1">
                추가하기
              </Text>
            </Pressable>
          </View>

          {bookQuotes.length > 0 ? (
            <View className="space-y-3">
              {bookQuotes.map((quote) => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  onDelete={() => deleteQuoteMutation.mutate(quote.id)}
                />
              ))}
            </View>
          ) : (
            <View className="bg-gray-50 rounded-2xl p-6 items-center">
              <Ionicons name="bookmark-outline" size={32} color="#d1d5db" />
              <Text className="text-gray-400 text-[15px] mt-3 text-center">
                기억하고 싶은 문장을{"\n"}저장해보세요
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
