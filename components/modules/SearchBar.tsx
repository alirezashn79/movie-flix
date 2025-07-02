import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

interface IProps {
  onPress?: () => void;
  placeholder: string;
  text?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
}

export default function SearchBar({
  onPress,
  placeholder,
  onChangeText,
  text,
  autoFocus = false,
}: IProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <View className="h-14 flex-row-reverse items-center rounded-full bg-dark-100 px-4">
        <Image
          source={icons.search}
          tintColor="#AB8BFF"
          className="ml-2 size-5"
        />
        <TextInput
          autoFocus={autoFocus}
          value={text}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A8B5DB"
          className="flex-1 text-white"
          style={{
            fontFamily: "Vazir",
            writingDirection: "rtl",
            textAlign: "right",
          }}
          editable={onPress ? false : true}
        />
      </View>
    </TouchableOpacity>
  );
}
