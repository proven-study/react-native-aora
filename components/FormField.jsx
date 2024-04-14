import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormField = ({
  label,
  value,
  handleChange,
  containerClassName,
  keyboardType,
  secureTextEntry = false,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${containerClassName}`}>
      <Text className="text-gray-100 text-base font-medium font-pmedium pb-2">
        {label}
      </Text>

      <View className="border border-black-200 w-full h-16 bg-black-100 rounded-lg focus:border-2 focus:border-secondary items-center flex-row">
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={handleChange}
          className="w-full h-full flex-1 text-white font-psemibold font-semibold text-base rounded-lg px-4 placeholder:text-gray-800"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !showPassword}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-6 h-6 mr-4"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
