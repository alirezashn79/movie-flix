import { images } from "@/constants/images";
import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  View,
} from "react-native";
import CustomText from "./customText";

interface IProps {
  focused: boolean;
  title: string;
  icon: ImageSourcePropType;
}

export default function Tab({ focused, icon, title }: IProps) {
  if (focused)
    return (
      <ImageBackground
        className="h-full w-full min-w-[125px] flex-1 flex-row items-center justify-center overflow-hidden  rounded-[60px] bg-cover"
        source={images.highlight}
      >
        <Image className="mr-2 size-5" tintColor="#151312" source={icon} />
        <CustomText variant="bold" className="text-base">
          {title}
        </CustomText>
      </ImageBackground>
    );

  return (
    <View>
      <Image source={icon} className="size-5 " tintColor="#A8B5DB" />
    </View>
  );
}
