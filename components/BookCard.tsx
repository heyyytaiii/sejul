import { View, Text, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Book } from "@/lib/types";

interface BookCardProps {
  book: Book;
  onPress: () => void;
}

export function BookCard({ book, onPress }: BookCardProps) {
  return (
    <Pressable
      className="bg-white rounded-3xl mb-4 overflow-hidden active:scale-[0.98]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
      }}
      onPress={onPress}
    >
      <View className="flex-row p-5">
        {/* Book Cover */}
        {book.cover_url ? (
          <Image
            source={{ uri: book.cover_url }}
            className="w-16 h-24 rounded-xl bg-gray-100"
            resizeMode="cover"
          />
        ) : (
          <View className="w-16 h-24 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 items-center justify-center">
            <Ionicons name="book" size={28} color="#6366f1" />
          </View>
        )}

        {/* Book Info */}
        <View className="flex-1 ml-4 justify-center">
          <Text
            className="text-[17px] font-semibold text-gray-900 leading-tight"
            numberOfLines={2}
          >
            {book.title}
          </Text>
          {book.author && (
            <Text className="text-[14px] text-gray-400 mt-1">
              {book.author}
            </Text>
          )}
        </View>

        {/* Arrow */}
        <View className="justify-center">
          <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
        </View>
      </View>
    </Pressable>
  );
}
