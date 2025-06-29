import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../styles/globals.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Vazir: require("../assets/fonts/Vazirmatn-Regular.ttf"),
    "Vazir-Light": require("../assets/fonts/Vazirmatn-Light.ttf"),
    "Vazir-Bold": require("../assets/fonts/Vazirmatn-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return <Stack />;
}
