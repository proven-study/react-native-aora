import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  isLoading,
  buttonClassNames,
  textClassNames,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`px-2.5 py-[18px] w-full rounded-lg bg-secondary justify-center items-center ${buttonClassNames} ${
        isLoading ? "opacity-70" : ""
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
  );
};

export default CustomButton;
