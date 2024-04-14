import { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";

import { images } from "../../constants";
import { CustomGradientButton, FormField } from "../../components";
import { signUp } from "../../lib/appwrite";
import { validateEmail } from "../../lib/common";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const params = useLocalSearchParams();
  const { email: _email } = params;
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: _email || "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async () => {
    if (!form.username || !form.email || !form.password) {
      return Alert.alert("Error", "Please fill all the fields");
    } else if (!validateEmail(form.email)) {
      return Alert.alert("Error", "Please enter a valid email");
    }

    setIsSubmitting(true);

    try {
      const result = await signUp(form);

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
      setForm({ username: "", email: "", password: "" });
    }
  };

  return (
    <View className="bg-primary w-full h-full justify-center p-6">
      <Image
        source={images.logo}
        resizeMode="contain"
        className="w-[115px] h-[35px]"
      />

      <Text className="text-white text-2xl font-semibold font-psemibold -tracking-[1px] mt-10">
        Sign up
      </Text>

      <FormField
        label="Username"
        placeholder="Your unique username"
        value={form.username}
        handleChange={(value) => setForm({ ...form, username: value })}
        containerClassName="mt-8"
      />

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
        containerClassName="mt-[22px] mb-6"
        secureTextEntry // for password field
      />

      <CustomGradientButton
        text="Sign Up"
        handlePress={handleSignUp}
        isLoading={isSubmitting}
        // disabled={!form.username || !form.email || !form.password}
      />

      <View className="items-center mt-5">
        <Text className="text-gray-100 text-sm font-normal font-pregular leading-tight">
          Already have an account?{" "}
          <Link
            replace
            href={{
              pathname: "/sign-in",
              params: { email: form.email },
            }}
            className="text-secondary-100 font-semibold font-psemibold"
          >
            Login
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
