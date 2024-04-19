import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { router, usePathname } from "expo-router";

import { icons } from "../constants";

const SearchInput = ({ initialQuery = "" }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = () => {
    if (!query) {
      return Alert.alert(
        "Missing query",
        "Please input something to search results across database"
      );
    } else if (query.length < 3) {
      return Alert.alert(
        "Query too short",
        "Please input at least 3 characters"
      );
    } else if (pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View className="flex-row items-center w-full h-16 px-4 py-2 mt-8 mb-6 space-x-4 border rounded-lg border-black-200 bg-black-100 focus:border-2 focus:border-secondary">
      <TextInput
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        value={query}
        onChangeText={(value) => setQuery(value)}
        onSubmitEditing={handleSearch}
        className="w-full h-full flex-1 text-white font-psemibold font-semibold text-base rounded-lg pr-4 tracking-[0.2px]"
      />

      <TouchableOpacity onPress={handleSearch}>
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
