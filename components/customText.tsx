import React, { ReactNode } from "react";
import {
  Platform,
  Text as RNText,
  StyleProp,
  TextProps,
  TextStyle,
} from "react-native";

interface CustomTextProps extends Omit<TextProps, "style"> {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({
  style,
  children,
  ...props
}) => {
  const defaultStyle: TextStyle = {
    fontFamily:
      Platform.select({
        ios: "Vazir",
        android: "Vazir",
        default: "Vazir",
      }) || "System",
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
