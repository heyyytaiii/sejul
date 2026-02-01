import { View, Text, Pressable } from "react-native";
import { useAuth } from "@/lib/auth";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();

  return (
    <View className="flex-1 bg-white items-center justify-center px-8">
      <Text className="text-[64px] mb-4">📚</Text>
      <Text className="text-[32px] font-bold text-gray-900 mb-2"></Text>
      <Text className="text-[16px] text-gray-400 text-center mb-12">
        3줄로 정리하는 나만의 독후감
      </Text>

      <Pressable
        className="flex-row items-center bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 active:bg-gray-50"
        onPress={signInWithGoogle}
      >
        <Ionicons name="logo-google" size={24} color="#4285F4" />
        <Text className="text-[17px] font-semibold text-gray-700 ml-3">
          Google로 계속하기
        </Text>
      </Pressable>
    </View>
  );
}
