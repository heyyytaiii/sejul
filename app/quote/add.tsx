import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAddQuote } from "@/lib/hooks/useBooks";

export default function AddQuoteScreen() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const router = useRouter();
  const addQuoteMutation = useAddQuote(bookId || "");

  const [text, setText] = useState("");
  const [pageNumber, setPageNumber] = useState("");

  const isValid = text.trim().length > 0;

  const handleSave = async () => {
    if (!isValid || !bookId) return;

    try {
      await addQuoteMutation.mutateAsync({
        text: text.trim(),
        page_number: pageNumber ? parseInt(pageNumber, 10) : null,
      });
      router.back();
    } catch (error) {
      console.error("Failed to add quote:", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-5 pt-6">
          {/* Header */}
          <Text className="text-[28px] font-bold text-gray-900 tracking-tight">
            어떤 문장이{"\n"}마음에 남았나요?
          </Text>
          <Text className="text-[15px] text-gray-400 mt-2 mb-8">
            나중에 다시 보고 싶은 구절을 기록하세요
          </Text>

          {/* Quote Input */}
          <View className="mb-6">
            <View className="bg-gray-50 rounded-2xl overflow-hidden">
              <TextInput
                className="px-5 py-4 text-[17px] text-gray-900 min-h-[160px]"
                placeholder="인상 깊은 구절을 입력해주세요"
                placeholderTextColor="#9ca3af"
                value={text}
                onChangeText={setText}
                multiline
                textAlignVertical="top"
                autoFocus
              />
            </View>
          </View>

          {/* Page Number Input */}
          <View>
            <Text className="text-[13px] font-medium text-gray-400 mb-2 ml-1">
              페이지 번호 (선택)
            </Text>
            <View className="bg-gray-50 rounded-2xl overflow-hidden w-32">
              <TextInput
                className="px-5 py-4 text-[17px] text-gray-900 text-center"
                placeholder="p."
                placeholderTextColor="#9ca3af"
                value={pageNumber}
                onChangeText={setPageNumber}
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>

        {/* Bottom CTA */}
        <View className="px-5 pb-10 pt-4 bg-white border-t border-gray-100">
          <Pressable
            className={`py-4 rounded-2xl items-center ${
              isValid ? "bg-primary" : "bg-gray-200"
            }`}
            onPress={handleSave}
            disabled={!isValid}
          >
            <Text
              className={`text-[17px] font-semibold ${
                isValid ? "text-white" : "text-gray-400"
              }`}
            >
              저장하기
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
