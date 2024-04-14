import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = ({
  title,
  handlePress,
  isLoading,
  containerStyles,
  buttonClassNames,
  textClassNames,
}) => {
  return (
    <LinearGradient
      colors={["#FF8C00", "#FFA300"]}
      start={[0, 0]}
      end={[1, 0]}
      style={{
        borderRadius: 8,
        overflow: "hidden",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        ...containerStyles,
      }}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`px-2.5 py-[18px] justify-center items-center ${buttonClassNames} ${
          isLoading ? "opacity-50" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="black" />
        ) : (
          <Text
            className={`text-center text-primary text-base font-semibold font-psemibold leading-snug ${textClassNames}`}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CustomButton;
