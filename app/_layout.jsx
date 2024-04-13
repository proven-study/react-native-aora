import { Text } from "react-native";
import { Slot, Stack } from "expo-router";
import "../global.css";

const RootLayout = () => {
  return (
    <>
      <Text>Header</Text>
      <Slot />
      <Text>Footer</Text>
    </>
  );

  // return (
  //   <Stack>
  //     <Stack.Screen name="index" options={{ headerShown: false }} />
  //   </Stack>
  // );
};

export default RootLayout;
