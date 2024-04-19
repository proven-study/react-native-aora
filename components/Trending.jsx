import { View, Text, FlatList } from "react-native";
import PropTypes from "prop-types";

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <View className="flex-row items-center space-x-4">
          <View className="w-16 h-16 rounded-lg bg-black-200" />
          <View className="flex-1">
            <Text className="text-base text-white font-psemibold">
              {item.title}
            </Text>
            <Text className="text-sm text-gray-100 font-pregular">
              {item.description}
            </Text>
          </View>
        </View>
      )}
    />
  );
};

Trending.defaultProps = {
  posts: [],
};

Trending.propTypes = {
  posts: PropTypes.array,
};

export default Trending;
