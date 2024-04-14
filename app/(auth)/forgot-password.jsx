import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { images } from "../../constants";
import { CustomGradientButton, FormField } from "../../components";

const ForgotPassword = () => {
  const params = useLocalSearchParams();
  const { email: _email } = params;

  const [form, setForm] = useState({
    email: _email || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <View className="bg-primary w-full h-full justify-start p-6">
      <Image
        source={images.logo}
        resizeMode="contain"
        className="w-[115px] h-[35px]"
      />

      <Text className="text-white text-2xl font-semibold font-psemibold -tracking-[1px] mt-10">
        Forgot password
      </Text>

      <FormField
        label="Email"
        placeholder="Enter your email"
        value={form.email}
        handleChange={(value) => setForm({ ...form, email: value })}
        containerClassName="mt-8 mb-6"
        inputMode="email" // for auto fill
      />

      <CustomGradientButton
        text="Send OTP"
        handlePress={handleSignIn}
        isLoading={isSubmitting}
      />

      <View className="items-center mt-5">
        <Text className="text-gray-100 text-sm font-normal font-pregular leading-tight">
          <Text
            onPress={() => router.push("/sign-in")}
            className="text-secondary-100 font-semibold font-psemibold"
          >
            Login
          </Text>{" "}
          instead?
        </Text>
      </View>
    </View>
  );
};

export default ForgotPassword;
