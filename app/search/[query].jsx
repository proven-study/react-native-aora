import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();

  return (
    <View>
      <Text>Search: {query}</Text>
    </View>
  );
};

export default Search;
