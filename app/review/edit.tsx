import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useReview, useSaveReview } from "@/lib/hooks/useBooks";

const MAX_LENGTH = 100;

const FIELD_LABELS = {
  one_sentence: "이 책을 한 문장으로 표현한다면?",
  most_impressive: "꼭 기억하고 싶은 한 가지는?",
  apply_to_life: "바꾸거나 멈추기로 한 행동은?",
};

const FIELD_PLACEHOLDERS = {
  one_sentence: "이 책의 핵심 메시지는?",
  most_impressive: "이 책에서 가장 기억에 남는 것",
  apply_to_life: "앞으로 하지 않기로 / 바꾸기로 한 것",
};

type FieldType = "one_sentence" | "most_impressive" | "apply_to_life";

export default function EditReviewScreen() {
  const { bookId, field } = useLocalSearchParams<{ bookId: string; field: FieldType }>();
  const router = useRouter();
  const { data: review } = useReview(bookId || "");
  const saveReviewMutation = useSaveReview(bookId || "");

  const [value, setValue] = useState("");

  useEffect(() => {
    if (review && field) {
      setValue(review[field] || "");
    }
  }, [review, field]);

  const isValid = value.trim().length > 0;

  const handleSave = async () => {
    if (!isValid || !bookId || !review || !field) return;

    try {
      await saveReviewMutation.mutateAsync({
        one_sentence: field === "one_sentence" ? value.trim() : review.one_sentence,
        most_impressive: field === "most_impressive" ? value.trim() : review.most_impressive,
        apply_to_life: field === "apply_to_life" ? value.trim() : review.apply_to_life,
      });
      router.back();
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  if (!field || !FIELD_LABELS[field]) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-400">잘못된 접근입니다</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-5 pt-6">
          <Text className="text-[13px] font-semibold text-gray-400 mb-2">
            {FIELD_LABELS[field]}
          </Text>
          <View className="bg-gray-50 rounded-2xl p-4">
            <TextInput
              className="text-[16px] text-gray-900 min-h-[100px]"
              placeholder={FIELD_PLACEHOLDERS[field]}
              placeholderTextColor="#9ca3af"
              value={value}
              onChangeText={setValue}
              multiline
              maxLength={MAX_LENGTH}
              textAlignVertical="top"
              autoFocus
            />
            <Text className="text-[12px] text-gray-400 text-right mt-2">
              {value.length}/{MAX_LENGTH}
            </Text>
          </View>
        </View>

        <View className="px-5 pb-8">
          <Pressable
            className={`rounded-2xl py-4 ${isValid ? "bg-primary" : "bg-gray-200"}`}
            onPress={handleSave}
            disabled={!isValid || saveReviewMutation.isPending}
          >
            <Text
              className={`text-center text-[17px] font-semibold ${
                isValid ? "text-white" : "text-gray-400"
              }`}
            >
              {saveReviewMutation.isPending ? "저장 중..." : "저장하기"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
