import React, { ReactNode } from "react";
import {
  Platform,
  Text as RNText,
  StyleProp,
  TextProps,
  TextStyle,
} from "react-native";

type FontVariant = "regular" | "bold" | "light";

interface CustomTextProps extends Omit<TextProps, "style"> {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
  variant?: FontVariant;
}

const CustomText: React.FC<CustomTextProps> = ({
  style,
  children,
  variant = "regular",
  ...props
}) => {
  const fontFamily =
    Platform.select({
      ios:
        variant === "bold"
          ? "Vazir-Bold"
          : variant === "light"
            ? "Vazir-Light"
            : "Vazir",
      android:
        variant === "bold"
          ? "Vazir-Bold"
          : variant === "light"
            ? "Vazir-Light"
            : "Vazir",
      default: "Vazir",
    }) || "System";

  const defaultStyle: TextStyle = {
    fontFamily,
    textAlign: "right",
    writingDirection: "rtl",
  };

  return (
    <RNText style={[defaultStyle, style]} {...props}>
      {children}
    </RNText>
  );
};

export default CustomText;
