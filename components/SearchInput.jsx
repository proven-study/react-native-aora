import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const SearchInput = ({
  value,
  handleChange,
  inputMode,
  placeholder,
  containerClassName,
}) => {
  return (
    <View
      className={`flex-row items-center w-full h-16 px-4 space-x-4 border rounded-lg border-black-200 bg-black-100 focus:border-2 focus:border-secondary ${containerClassName}`}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        value={value}
        onChangeText={handleChange}
        className="w-full h-full flex-1 text-white font-psemibold font-semibold text-base rounded-lg px-4 tracking-[0.2px]"
        inputMode={inputMode}
      />

      <TouchableOpacity>
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
          // tintColor="#7B7B8B" // icon color
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
