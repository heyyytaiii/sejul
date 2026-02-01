import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Review } from "@/lib/types";

interface ReviewCardProps {
  review: Review;
  onEdit?: (field: "one_sentence" | "most_impressive" | "apply_to_life") => void;
}

export function ReviewCard({ review, onEdit }: ReviewCardProps) {
  return (
    <View className="gap-4">
      {/* Line 1: One Sentence */}
      <View className="bg-primary/5 rounded-2xl p-5">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-[12px] font-semibold text-primary">
            이 책을 한 문장으로 표현한다면?
          </Text>
          {onEdit && (
            <Pressable onPress={() => onEdit("one_sentence")} className="p-1">
              <Ionicons name="pencil" size={14} color="#6366f1" />
            </Pressable>
          )}
        </View>
        <Text className="text-[16px] text-gray-800 leading-relaxed">
          {review.one_sentence}
        </Text>
      </View>

      {/* Line 2: Most Impressive */}
      <View className="bg-amber-50 rounded-2xl p-5">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-[12px] font-semibold text-amber-600">
            꼭 기억하고 싶은 한 가지는?
          </Text>
          {onEdit && (
            <Pressable onPress={() => onEdit("most_impressive")} className="p-1">
              <Ionicons name="pencil" size={14} color="#d97706" />
            </Pressable>
          )}
        </View>
        <Text className="text-[16px] text-gray-800 leading-relaxed">
          {review.most_impressive}
        </Text>
      </View>

      {/* Line 3: Apply to Life */}
      <View className="bg-emerald-50 rounded-2xl p-5">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-[12px] font-semibold text-emerald-600">
            바꾸거나 멈추기로 한 행동은?
          </Text>
          {onEdit && (
            <Pressable onPress={() => onEdit("apply_to_life")} className="p-1">
              <Ionicons name="pencil" size={14} color="#059669" />
            </Pressable>
          )}
        </View>
        <Text className="text-[16px] text-gray-800 leading-relaxed">
          {review.apply_to_life}
        </Text>
      </View>
    </View>
  );
}
