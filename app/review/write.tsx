import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSaveReview } from "@/lib/hooks/useBooks";

const MAX_LENGTH = 100;

export default function WriteReviewScreen() {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const router = useRouter();
  const saveReviewMutation = useSaveReview(bookId || "");

  const [oneSentence, setOneSentence] = useState("");
  const [mostImpressive, setMostImpressive] = useState("");
  const [applyToLife, setApplyToLife] = useState("");

  const isValid =
    oneSentence.trim().length > 0 &&
    mostImpressive.trim().length > 0 &&
    applyToLife.trim().length > 0;

  const handleSave = async () => {
    if (!isValid || !bookId) return;

    try {
      await saveReviewMutation.mutateAsync({
        one_sentence: oneSentence.trim(),
        most_impressive: mostImpressive.trim(),
        apply_to_life: applyToLife.trim(),
      });
      router.back();
    } catch (error) {
      console.error("Failed to save review:", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="px-5 pt-6 pb-6">
            <Text className="text-[28px] font-bold text-gray-900 tracking-tight">
              3줄로 정리하는{"\n"}나만의 독후감
            </Text>
            <Text className="text-[15px] text-gray-400 mt-2">
              각 칸에 100자 이내로 작성해주세요
            </Text>
          </View>

          {/* Form */}
          <View className="px-5 gap-8">
            {/* Line 1: One Sentence */}
            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mr-2">
                  <Text className="text-white text-[12px] font-bold">1</Text>
                </View>
                <Text className="text-[15px] font-semibold text-gray-700">
                  이 책을 한 문장으로 표현한다면?
                </Text>
              </View>
              <View className="bg-primary/5 rounded-2xl overflow-hidden">
                <TextInput
                  className="px-5 py-4 text-[17px] text-gray-900"
                  style={{ minHeight: 80 }}
                  placeholder="이 책의 핵심 메시지는?"
                  placeholderTextColor="#9ca3af"
                  value={oneSentence}
                  onChangeText={(t) => setOneSentence(t.slice(0, MAX_LENGTH))}
                  multiline
                  textAlignVertical="top"
                />
              </View>
              <Text className="text-[12px] text-gray-400 mt-1 text-right">
                {oneSentence.length}/{MAX_LENGTH}
              </Text>
            </View>

            {/* Line 2: Most Impressive */}
            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-6 h-6 rounded-full bg-amber-500 items-center justify-center mr-2">
                  <Text className="text-white text-[12px] font-bold">2</Text>
                </View>
                <Text className="text-[15px] font-semibold text-gray-700">
                  꼭 기억하고 싶은 한 가지는?
                </Text>
              </View>
              <View className="bg-amber-50 rounded-2xl overflow-hidden">
                <TextInput
                  className="px-5 py-4 text-[17px] text-gray-900"
                  style={{ minHeight: 100 }}
                  placeholder="이 책에서 가장 기억에 남는 것"
                  placeholderTextColor="#9ca3af"
                  value={mostImpressive}
                  onChangeText={(t) => setMostImpressive(t.slice(0, MAX_LENGTH))}
                  multiline
                  textAlignVertical="top"
                />
              </View>
              <Text className="text-[12px] text-gray-400 mt-1 text-right">
                {mostImpressive.length}/{MAX_LENGTH}
              </Text>
            </View>

            {/* Line 3: Apply to Life */}
            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-6 h-6 rounded-full bg-emerald-500 items-center justify-center mr-2">
                  <Text className="text-white text-[12px] font-bold">3</Text>
                </View>
                <Text className="text-[15px] font-semibold text-gray-700">
                  바꾸거나 멈추기로 한 행동은?
                </Text>
              </View>
              <View className="bg-emerald-50 rounded-2xl overflow-hidden">
                <TextInput
                  className="px-5 py-4 text-[17px] text-gray-900"
                  style={{ minHeight: 100 }}
                  placeholder="앞으로 하지 않기로 / 바꾸기로 한 것"
                  placeholderTextColor="#9ca3af"
                  value={applyToLife}
                  onChangeText={(t) => setApplyToLife(t.slice(0, MAX_LENGTH))}
                  multiline
                  textAlignVertical="top"
                />
              </View>
              <Text className="text-[12px] text-gray-400 mt-1 text-right">
                {applyToLife.length}/{MAX_LENGTH}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom CTA */}
        <View className="absolute bottom-0 left-0 right-0 px-5 pb-10 pt-4 bg-white border-t border-gray-100">
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
