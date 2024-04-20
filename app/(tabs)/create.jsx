import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { ResizeMode, Video } from "expo-av";
import { router } from "expo-router";

import { CustomGradientButton, FormField } from "../../components";
import { icons } from "../../constants";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const {
    user: { userId },
  } = useGlobalContext();
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const [uploading, setUploading] = useState(false);

  const openPicker = async (type) => {
    // const result = await DocumentPicker.getDocumentAsync({
    //   // type: type === "image" ? "image/*" : "video/*",
    //   type:
    //     type === "image"
    //       ? ["image/png", "image/jpg", "image/jpeg"]
    //       : ["video/mp4", "video/gif"],
    // });

    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes:
        type === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      // allowsEditing: true,
      allowsEditing: type === "image",
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      } else {
        setForm({ ...form, video: result.assets[0] });
      }
    }
    // else {
    //   setTimeout(() => {
    //     Alert.alert("Document picked", JSON.stringify(result, null, 2));
    //   }, 100);
    // }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      return Alert.alert("All fields are required");
    }

    setUploading(true);

    // Call the API to upload the video
    // Once the video is uploaded, set uploading to false
    // and navigate to the home screen

    try {
      const result = await createVideo({
        ...form,
        userId,
      });

      if (result.status === "error") {
        // throw new Error(result.message);
        return Alert.alert("Error", result.message);
      }

      Alert.alert("Success", "Video uploaded successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <View className="h-full bg-primary">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          label="Video Title"
          placeholder="Give your video a catch title..."
          value={form.title}
          handleChange={(value) => setForm({ ...form, title: value })}
          containerClassName="mt-10"
        />

        {/* upload video */}
        <View className="space-y-2 mt-7">
          <Text className="pb-2 text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
                // useNativeControls
                // isLooping
              />
            ) : (
              <View className="items-center justify-center w-full h-40 px-4 bg-black-100 rounded-2xl">
                <View className="items-center justify-center border border-dashed w-14 h-14 border-secondary-100">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* upload thumbnail */}
        <View className="space-y-2 mt-7">
          <Text className="pb-2 text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="flex-row items-center justify-center w-full h-16 px-4 space-x-2 border-2 bg-black-100 rounded-2xl border-black-200">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          label="AI Prompt"
          placeholder="The prompt you used to create this video"
          value={form.prompt}
          handleChange={(value) => setForm({ ...form, prompt: value })}
          containerClassName="mt-7"
        />

        <CustomGradientButton
          text="Submit & Publish"
          loading={uploading}
          handlePress={handleSubmit}
          buttonClassNames="mt-7"
          isLoading={uploading}
          disabled={uploading}
        />
      </ScrollView>
    </View>
  );
};

export default Create;
