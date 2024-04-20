import { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";

import { images } from "../../constants";
import { CustomGradientButton, FormField } from "../../components";
import { signIn } from "../../lib/appwrite";
import { validateEmail } from "../../lib/common";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const params = useLocalSearchParams();
  const { email: _email } = params;
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: _email || "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Error", "Please fill all the fields");
    } else if (!validateEmail(form.email)) {
      return Alert.alert("Error", "Please enter a valid email");
    }

    setIsSubmitting(true);

    try {
      const result = await signIn(form);

      if (result.status === "error") {
        return Alert.alert("Error", result.message);
      }

      setUser(result.data);
      setIsLoggedIn(true);

      Alert.alert("Success", result.message);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
      setForm({ email: "", password: "" });
    }
  };

  return (
    <View className="justify-center w-full h-full p-6 bg-primary">
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
        inputMode="email" // for auto fill
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
        handlePress={handleSignIn}
        isLoading={isSubmitting}
        // disabled={!form.email || !form.password}
      />

      {/* <View className="items-center mt-5">
        <Text className="text-sm font-normal leading-tight text-gray-100 font-pregular">
          Don’t have an account?{" "}
          <Text
            // onPress={() => router.push("/sign-up")}
            onPress={() => router.push({
              pathname: "/sign-up",
              params: { email: form.email },
            })}
            className="font-semibold text-secondary-100 font-psemibold"
          >
            Signup
          </Text>
        </Text>
      </View> */}

      <View className="items-center mt-5">
        <Text className="text-sm font-normal leading-tight text-gray-100 font-pregular">
          Don’t have an account?{" "}
          <Link
            replace
            href={{
              pathname: "/sign-up",
              params: { email: form.email },
            }}
            className="font-semibold text-secondary-100 font-psemibold"
          >
            Signup
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
