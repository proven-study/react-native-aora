import { Image, Text, View } from "react-native";
import PropTypes from "prop-types";

import SearchInput from "./SearchInput";
import Trending from "./Trending";
import { images } from "../constants";

const Header = ({
  title,
  name,
  hideLatestVideos = false,
  initialQuery = "",
}) => {
  return (
    <View className="px-4 my-6 space-y-6">
      <View className="flex-row items-start justify-between mb-6">
        <View>
          <Text className="text-sm text-gray-100 font-pmedium">{title}</Text>
          <Text className="text-2xl text-white font-psemibold">{name}</Text>
        </View>

        <View className="mt-1.5">
          <Image
            source={images.logoSmall}
            className="h-10 w-9"
            resizeMode="contain"
          />
        </View>
      </View>

      <SearchInput initialQuery={initialQuery} />

      {!hideLatestVideos && (
        <View className="flex-1 w-full pt-5 pb-8">
          <Text className="mb-3 text-lg text-gray-100 font-pregular">
            Latest Videos
          </Text>

          <Trending />
        </View>
      )}
    </View>
  );
};

Header.defaultProps = {
  title: "Welcome Back",
  name: "John Doe",
  hideLatestVideos: false,
  initialQuery: "",
};

Header.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  hideLatestVideos: PropTypes.bool,
  initialQuery: PropTypes.string,
};

export default Header;
