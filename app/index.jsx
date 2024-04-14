import { Image, ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";

import { images } from "../constants";
import { CustomButton, CustomGradientButton } from "../components";

export default function App() {
  return (
    <SafeAreaView
      // className="bg-primary h-full" // This is not working on nativewind v4
      style={{ backgroundColor: "#161622", height: "100%" }}
    >
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-6">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px] mt-[26px]"
            // resizeMode="contain"
          />

          <View className="relative mt-3">
            <Text className="w-[333px] text-3xl text-white font-semibold font-psemibold text-center -tracking-[1px]">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[65.03px] h-[13.69px] absolute right-8 -bottom-[2px]"
              resizeMode="contain"
            />
          </View>

          <Text className="text-center text-gray-100 text-sm font-normal font-pregular leading-snug mt-5 mb-[30px]">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          {/* <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
          /> */}

          <CustomGradientButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            // containerStyles={{ marginTop: 30 }}
          />
        </View>
      </ScrollView>

      {/* clock, wifi, battery section bg and text color */}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
