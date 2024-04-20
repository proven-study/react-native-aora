import { FlatList, Text, View, TouchableOpacity, Image } from "react-native";
import {router } from "expo-router";

import { EmptyState, VideoCard } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";
import { icons } from "../../constants";

const Profile = () => {
  const {
    user,
    setUser,
    setIsLoggedIn,
  } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user?.userId));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <View className="h-full bg-primary">
      <FlatList
        data={posts || []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="items-center justify-center w-full px-4 mt-6 mb-12">
            <TouchableOpacity className="items-end w-full" onPress={logout}>
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View className="items-center justify-center border-2 rounded-lg w-14 h-14 border-secondary">
              <Image
                source={{ uri: user?.avatarUrl }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>

            <Text className="mt-3 text-lg leading-tight text-white font-psemibold">
              {user?.username}
            </Text>

            <View className="h-11 justify-center items-center gap-[30px] flex-row mt-6">
              {[
                { label: "Posts", value: posts.length },
                { label: "Views", value: "1.2k" },
              ]?.map(({ label, value }) => (
                <View key={label} className="flex-col items-center">
                  <Text className="text-xl leading-normal text-white font-psemibold">
                    {value}
                  </Text>
                  <Text className="text-sm text-gray-100 font-pregular">
                    {label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found matching the search query"
          />
        )}
      />
    </View>
  );
};

export default Profile;
