import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
  return (
    <SafeAreaView
      // className="bg-primary h-full" // This is not working on nativewind v4
      style={{ backgroundColor: "#161622", height: "100%" }}
    >
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Stack>
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />
          <Stack.Screen
            name="forgot-password"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="otp" options={{ headerShown: false }} />
        </Stack>
      </ScrollView>

      {/* clock, wifi, battery section bg and text color */}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default AuthLayout;
