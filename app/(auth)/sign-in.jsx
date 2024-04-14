import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";

import { images } from "../../constants";
import { CustomGradientButton, FormField } from "../../components";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <View className="bg-primary w-full h-full justify-center p-6">
      <Image
        source={images.logo}
        resizeMode="contain"
        className="w-[115px] h-[35px]"
      />

      <Text className="text-white text-2xl font-semibold font-psemibold -tracking-[1px] mt-10">
        Sign in
      </Text>

      <FormField
        label="Email"
        placeholder="Enter your email"
        value={form.email}
        handleChange={(value) => setForm({ ...form, email: value })}
        containerClassName="mt-8"
        keyboardType="email-address" // for auto fill
      />

      <FormField
        label="Password"
        placeholder="Enter your password"
        value={form.password}
        handleChange={(value) => setForm({ ...form, password: value })}
        containerClassName="mt-[22px]"
        secureTextEntry // for password field
      />

      <Text
        onPress={() => router.push("/forgot-password", { email: form.email })}
        className="text-right mt-[18px] mb-5 text-gray-100 text-sm font-normal font-pregular leading-tight"
      >
        Forgot password
      </Text>

      <CustomGradientButton
        text="Log In"
        onPress={handleSignIn}
        isLoading={isSubmitting}
      />

      {/* <View className="items-center mt-5">
        <Text className="text-gray-100 text-sm font-normal font-pregular leading-tight">
          Don’t have an account?{" "}
          <Text
            // onPress={() => router.push("/sign-up")}
            onPress={() => router.push({
              pathname: "/sign-up",
              params: { email: form.email },
            })}
            className="text-secondary-100 font-semibold font-psemibold"
          >
            Signup
          </Text>
        </Text>
      </View> */}

      <View className="items-center mt-5">
        <Text className="text-gray-100 text-sm font-normal font-pregular leading-tight">
          Don’t have an account?{" "}
          <Link
            replace
            href={{
              pathname: "/sign-up",
              params: { email: form.email },
            }}
            className="text-secondary-100 font-semibold font-psemibold"
          >
            Signup
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
