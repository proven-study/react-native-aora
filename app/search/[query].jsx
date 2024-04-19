import { useEffect } from "react";
import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyState, Header, VideoCard } from "../../components";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView
      // className="h-full bg-primary" // This is not working on nativewind v4
      style={{ backgroundColor: "#161622", height: "100%" }}
    >
      <FlatList
        data={posts || []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <Header
            title="Search Results"
            name={query}
            initialQuery={query}
            hideLatestVideos
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found matching the search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
