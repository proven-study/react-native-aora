import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
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
    await account.deleteSession("current");

    return true;
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
