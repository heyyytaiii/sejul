import { View, Text, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Quote } from "@/lib/types";

interface QuoteCardProps {
  quote: Quote;
  onDelete?: () => void;
}

export function QuoteCard({ quote, onDelete }: QuoteCardProps) {
  const handleDelete = () => {
    Alert.alert("구절 삭제", "이 구절을 삭제할까요?", [
      { text: "취소", style: "cancel" },
      { text: "삭제", style: "destructive", onPress: onDelete },
    ]);
  };

  return (
    <View className="bg-gray-50 rounded-2xl p-5">
      <View className="flex-row">
        <View className="w-1 bg-primary/30 rounded-full mr-4" />
        <View className="flex-1">
          <Text className="text-[16px] text-gray-700 leading-relaxed italic">
            "{quote.text}"
          </Text>
          <View className="flex-row justify-between items-center mt-3">
            {quote.page_number ? (
              <Text className="text-[13px] text-gray-400">
                p.{quote.page_number}
              </Text>
            ) : (
              <View />
            )}
            {onDelete && (
              <Pressable onPress={handleDelete} className="p-1">
                <Ionicons name="trash-outline" size={16} color="#9ca3af" />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
