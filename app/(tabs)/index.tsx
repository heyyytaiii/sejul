import { View, Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useBooks } from "@/lib/hooks/useBooks";
import { BookCard } from "@/components/BookCard";
import { useAuth } from "@/lib/auth";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();
  const { data: books = [], isLoading } = useBooks();
  const { signOut } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (books.length === 0) {
    return (
      <View className="flex-1 bg-background">
        {/* Header with logout */}
        <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
          <Text className="text-lg font-bold text-text">내 책장</Text>
          <Pressable
            onPress={signOut}
            className="flex-row items-center bg-gray-100 px-3 py-2 rounded-lg active:bg-gray-200"
          >
            <Ionicons name="log-out-outline" size={16} color="#6b7280" />
            <Text className="text-gray-600 text-sm ml-1">로그아웃</Text>
          </Pressable>
        </View>
        <View className="flex-1 items-center justify-center p-6">
        <Text className="text-xl font-semibold text-text mb-2">
          아직 책이 없어요
        </Text>
        <Text className="text-gray-500 text-center mb-6">
          읽은 책을 추가하고{"\n"}3줄 독후감을 기록해보세요
        </Text>
        <Pressable
          className="bg-primary px-6 py-3 rounded-xl"
          onPress={() => router.push("/add-book")}
        >
          <Text className="text-white font-semibold">첫 번째 책 추가하기</Text>
        </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header with logout */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <Text className="text-lg font-bold text-text">내 책장</Text>
        <Pressable onPress={signOut} className="p-2">
          <Ionicons name="log-out-outline" size={24} color="#6b7280" />
        </Pressable>
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => router.push(`/book/${item.id}`)}
          />
        )}
      />
    </View>
  );
}
