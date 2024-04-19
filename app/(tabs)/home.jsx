import { useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";

import { EmptyState, Header, VideoCard } from "../../components";
import { getAllPosts } from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";

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
        data={posts || []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => <Header title="Welcome Back" name={name} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isLoading}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

export default Home;
