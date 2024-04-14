import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { icons } from "../constants";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const value = useMemo(
    () => ({ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }),
    [isLoggedIn, setIsLoggedIn, user, setUser, isLoading]
  );

  useEffect(() => {
    setIsLoading(true);

    getCurrentUser()
      .then((result) => {
        if (result.status === "success") {
          setIsLoggedIn(true);
          setUser(result.data);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log("GlobalProvider -> error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView
        // className="bg-primary h-full" // This is not working on nativewind v4
        style={{ backgroundColor: "#161622", height: "100%" }}
      >
        <View className="h-full justify-center items-center">
          <Image source={icons.appLoading} />
        </View>

        {/* clock, wifi, battery section bg and text color */}
        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    );
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
