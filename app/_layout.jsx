import "../global.css";
import { useEffect } from "react";
import { Text } from "react-native";
import { Slot, Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

import GlobalProvider from "../context/GlobalProvider";

// import {
//   useFonts as useGoogleFonts,
//   Inter_100Thin,
//   Inter_200ExtraLight,
//   Inter_300Light,
//   Poppins_400Regular,
//   Poppins_500Medium,
//   Poppins_600SemiBold,
//   Poppins_700Bold,
//   Poppins_800ExtraBold,
//   Poppins_900Black,
// } from "@expo-google-fonts/poppins";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"), // 900
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"), // 800
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"), // 700
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"), // 600
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"), // 500
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"), // 400
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"), // 300
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"), // 200
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"), // 100
  });

  // const [googleFontsLoaded, googleFontError] = useGoogleFonts({
  //   Inter_100Thin,
  //   Inter_200ExtraLight,
  //   Inter_300Light,
  //   Poppins_400Regular,
  //   Poppins_500Medium,
  //   Poppins_600SemiBold,
  //   Poppins_700Bold,
  //   Poppins_800ExtraBold,
  //   Poppins_900Black,
  // });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) return null;

  // return (
  //   <>
  //     <Text>Header</Text>
  //     <Slot />
  //     <Text>Footer</Text>
  //   </>
  // );

  // Render the children routes now that all the assets are loaded.
  //  return <Slot />;

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
