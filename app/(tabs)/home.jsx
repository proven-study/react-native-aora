import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";

import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
import { images } from "../../constants";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";

const HomeHeader = ({ name }) => {
  const { data: latestPosts, isLoading, refetch } = useAppwrite(getLatestPosts);
  const [searchText, setSearchText] = useState("");

  return (
    <View className="px-4 my-6 space-y-6">
      <View className="flex-row items-start justify-between mb-6">
        <View>
          <Text className="text-sm text-gray-100 font-pmedium">
            Welcome Back
          </Text>
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

      <SearchInput
        placeholder="Search for a video topic"
        value={searchText}
        handleChange={(value) => setSearchText(value)}
        containerClassName="mt-8 mb-6"
      />

      <View className="flex-1 w-full pt-5 pb-8">
        <Text className="mb-3 text-lg text-gray-100 font-pregular">
          Latest Videos
        </Text>

        <Trending posts={latestPosts} />
      </View>
    </View>
  );
};

const Home = () => {
  const name = "John Doe";
  const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => <HomeHeader name={name} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Home;
