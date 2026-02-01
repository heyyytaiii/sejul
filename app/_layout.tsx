import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View, ActivityIndicator, Pressable, Text } from "react-native";
import { AuthContext, useAuthProvider } from "@/lib/auth";
import "../global.css";

import { Ionicons } from "@expo/vector-icons";

function BackButton() {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.back()} className="p-1 -ml-2">
      <Ionicons name="chevron-back" size={28} color="#6366f1" />
    </Pressable>
  );
}

function CloseButton() {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.back()} className="px-2">
      <Text className="text-primary text-base">닫기</Text>
    </Pressable>
  );
}

const queryClient = new QueryClient();

function RootLayoutNav() {
  const auth = useAuthProvider();
  const { user, loading } = auth;
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          headerBackTitle: "뒤로",
          headerTintColor: "#6366f1",
          headerTitleStyle: { color: "#111827" },
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="book/[id]"
          options={{
            headerShown: true,
            title: "책 상세",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="quote/add"
          options={{
            headerShown: true,
            title: "구절 추가",
            presentation: "modal",
            headerLeft: () => <CloseButton />,
          }}
        />
        <Stack.Screen
          name="review/write"
          options={{
            headerShown: true,
            title: "3줄 독후감",
            presentation: "modal",
            headerLeft: () => <CloseButton />,
          }}
        />
        <Stack.Screen
          name="review/edit"
          options={{
            headerShown: true,
            title: "수정하기",
            presentation: "modal",
            headerLeft: () => <CloseButton />,
          }}
        />
      </Stack>
    </AuthContext.Provider>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
    </QueryClientProvider>
  );
}
