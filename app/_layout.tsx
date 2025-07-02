import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "../styles/globals.css";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Vazir: require("../assets/fonts/Vazirmatn-Regular.ttf"),
    "Vazir-Light": require("../assets/fonts/Vazirmatn-Light.ttf"),
    "Vazir-Bold": require("../assets/fonts/Vazirmatn-Bold.ttf"),
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar hidden={true} animated={true} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="movies/[id]" />
      </Stack>
    </QueryClientProvider>
  );
}
