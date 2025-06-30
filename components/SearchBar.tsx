import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface IProps {
  onPress?: () => void;
  placeholder: string;
}

export default function SearchBar({ onPress, placeholder }: IProps) {
  return (
    <View className="h-14 flex-row-reverse items-center rounded-full bg-dark-100 px-4">
      <Image
        source={icons.search}
        tintColor="#AB8BFF"
        className="ml-2 size-5"
      />
      <TextInput
        onPress={onPress}
        value=""
        onChangeText={() => {}}
        placeholder={placeholder}
        placeholderTextColor="#A8B5DB"
        className="flex-1"
        style={{
          fontFamily: "Vazir",
          writingDirection: "rtl",
          textAlign: "right",
        }}
      />
    </View>
  );
}
