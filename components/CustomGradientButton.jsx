import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CustomGradientButton = ({
  text,
  handlePress,
  isLoading,
  disabled,
  containerStyles,
  buttonClassNames,
  textClassNames,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`w-full h-[58px] justify-center items-center ${buttonClassNames} ${
        isLoading ? "opacity-70" : ""
      }`}
      disabled={disabled || isLoading}
    >
      <LinearGradient
        colors={["#FF8C00", "#FFA300"]}
        start={[0, 0]}
        end={[1, 0]}
        style={{
          borderRadius: 8,
          overflow: "hidden",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 18,
          ...containerStyles,
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="black" />
        ) : (
          <Text
            className={`text-center text-primary text-base font-semibold font-psemibold leading-snug ${textClassNames}`}
          >
            {text}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomGradientButton;
