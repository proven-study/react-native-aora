import { View, Text, Image, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        // source={focused ? require('./icon.png') : require('./icon-inactive.png')}
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

const tabs = [
  { name: "home", title: "Home", icon: icons.home },
  { name: "bookmark", title: "Bookmark", icon: icons.bookmark },
  { name: "create", title: "Create", icon: icons.plus },
  { name: "profile", title: "Profile", icon: icons.profile },
];

const TabsLayout = () => {
  return (
    <SafeAreaView
      // className="bg-primary h-full" // This is not working on nativewind v4
      style={{ backgroundColor: "#161622", height: "100%" }}
      edges={["right", "left", "top"]}
    >
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#FFA001",
            tabBarInactiveTintColor: "#CDCDE0",
            tabBarStyle: {
              backgroundColor: "#161622",
              borderTopWidth: 1,
              borderTopColor: "#232533",
              // shadowColor: "transparent",
              height: 84,
            },
          }}
        >
          {tabs.map((tab) => (
            <Tabs.Screen
              key={tab.name}
              name={tab.name}
              options={{
                title: tab.title,
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={tab.icon}
                    color={color}
                    name={tab.title}
                    focused={focused}
                  />
                ),
              }}
            />
          ))}
        </Tabs>
      </ScrollView>

      {/* clock, wifi, battery section bg and text color */}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default TabsLayout;
