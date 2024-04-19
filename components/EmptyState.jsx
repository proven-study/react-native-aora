import { View, Text, Image } from "react-native";
import { router } from "expo-router";

import CustomGradientButton from "./CustomGradientButton";
import { images } from "../constants";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="items-center justify-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="mt-2 text-xl text-center text-white font-psemibold">
        {title}
      </Text>
      <Text className="text-sm text-gray-100 font-pmedium">{subtitle}</Text>

      <CustomGradientButton
        text="Create Video"
        handlePress={() => router.push("/create")}
        buttonClassNames="my-5"
      />
    </View>
  );
};

export default EmptyState;
