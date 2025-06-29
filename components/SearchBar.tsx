import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface IProps {
  onPress: () => void;
  placeholder: string;
}

export default function SearchBar({}: IProps) {
  return (
    <View className="h-14 flex-row-reverse items-center rounded-full bg-dark-100 px-4">
      <Image
        source={icons.search}
        tintColor="#AB8BFF"
        className="ml-2 size-5"
      />
      <TextInput
        onPress={() => {}}
        value=""
        onChangeText={() => {}}
        placeholder="جستجو در بیش از ۳۰۰ فیلم آنلاین"
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
