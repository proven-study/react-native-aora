import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "me.devarif.aora",
  projectId: "react-native-aora",
  databaseId: "react-native-aora",
  userCollectionId: "react-native-aora-users",
  videoCollectionId: "react-native-aora-videos",
  storageId: "react-native-aora-files",
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform); // application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register User
export const signUp = async ({ username, email, password }) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount.$id) {
      // throw new Error(newAccount.message);
      return {
        status: "error",
        message: newAccount.message,
      };
    }

    if (newAccount.$error) {
      // throw new Error(newAccount.$error.message);
      return {
        status: "error",
        message: newAccount.$error.message,
      };
    }

    const avatarUrl = avatars.getInitials(username);

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );

    const result = await signIn({ email, password });

    if (result.status === "error") {
      // throw new Error("Something went wrong");
      return {
        status: "error",
        message: result.message,
      };
    }

    // return newUser;
    return {
      status: "success",
      message: "Account created successfully",
      data: result.data,
    };
  } catch (error) {
    // throw new Error(error.message);
    return {
      status: "error",
      message: error.message,
    };
  }
};

// Sign In User
export const signIn = async ({ email, password }) => {
  try {
    const session = await account.createEmailSession(email, password);

    if (!session.$id) {
      // throw new Error(session.message);
      return {
        status: "error",
        message: session.message,
      };
    }

    if (session.$error) {
      // throw new Error(session.$error.message);
      return {
        status: "error",
        message: session.$error.message,
      };
    }

    const user = await account.get();
    const avatarUrl = avatars.getInitials(user.name);

    const userInfo = {
      userId: session.userId,
      username: user.name,
      email: user.email,
      emailVerification: user.emailVerification,
      avatarUrl,
      deviceBrand: session.deviceBrand,
      osName: session.osName,
      countryCode: session.countryCode,
      countryName: session.countryName,
      ip: session.ip,
      tokenCreatedAt: session.$createdAt,
      tokenExpire: session.expire,
    };

    return {
      status: "success",
      message: "Logged in successfully",
      data: userInfo,
    };
  } catch (error) {
    // throw new Error(error.message);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    // console.error(error);
    // throw new Error(error.message);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();

    if (!user?.$id) {
      // throw new Error(user.message);
      // return null;
      return {
        status: "error",
        message: user.message,
      };
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", user.$id)]
    );

    if (currentUser.total === 0) {
      // throw new Error(currentUser.message);
      // return null;
      return {
        status: "error",
        message: currentUser.message,
      };
    }

    const userInfo = {
      userId: user.$id,
      username: user.name,
      email: user.email,
      emailVerification: user.emailVerification,
      avatarUrl: currentUser.documents[0].avatar,
    };

    return {
      status: "success",
      message: "User found",
      data: userInfo,
    };
  } catch (error) {
    // console.error(error);
    // throw new Error(error.message);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    if (posts.total === 0) {
      return {
        status: "error",
        message: posts.message,
      };
    }

    return {
      status: "success",
      message: "Posts found",
      data: posts.documents,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );

    if (posts.total === 0) {
      return {
        status: "error",
        message: posts.message,
      };
    }

    return {
      status: "success",
      message: "Posts found",
      data: posts.documents,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (posts.total === 0) {
      return {
        status: "error",
        message: posts.message,
      };
    }

    return {
      status: "success",
      message: "Posts found",
      data: posts.documents,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const getUserPosts = async (userId) => {
  console.log("userId", userId);
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    console.log("posts", posts);

    if (posts.total === 0) {
      return {
        status: "error",
        message: posts.message,
      };
    }

    return {
      status: "success",
      message: "Posts found",
      data: posts.documents,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      // throw new Error("Invalid file type");
      return {
        status: "error",
        message: "Invalid file type",
      };
    }

    // if (!fileUrl) throw Error;
    if (!fileUrl) {
      return {
        status: "error",
        message: "File not found",
      };
    }

    return fileUrl;
  } catch (error) {
    // throw new Error(error.message);
    return {
      status: "error",
      message: error.message,
    };
  }
};

const uploadFile = async (file, type) => {
  if (!file) return;

  try {
    // const { mimeType, ...rest } = file;
    // const asset = { type: mimeType, ...rest };

    const asset = {
      uri: file.uri,
      name: file.fileName,
      type: file.mimeType,
      size: file.fileSize,
    };

    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error) {
    // throw new Error(error.message);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const createVideo = async ({
  title,
  video,
  thumbnail,
  prompt,
  userId,
}) => {
  try {
    // const videoFile = await databases.createFile(
    //   appwriteConfig.storageId,
    //   video.uri,
    //   video.type
    // );

    // const thumbnailFile = await databases.createFile(
    //   appwriteConfig.storageId,
    //   thumbnail.uri,
    //   thumbnail.type
    // );

    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(thumbnail, "image"),
      uploadFile(video, "video"),
    ]);

    const newVideo = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title,
        //     video: videoFile.$id,
        //     thumbnail: thumbnailFile.$id,
        video: videoUrl,
        thumbnail: thumbnailUrl,
        prompt,
        creator: userId,
      }
    );

    if (!newVideo.$id) {
      return {
        status: "error",
        message: newVideo.message,
      };
    }

    return {
      status: "success",
      message: "Video created successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
