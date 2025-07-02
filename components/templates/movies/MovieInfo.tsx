import CustomText from "@/components/modules/customText";
import React from "react";
import { View } from "react-native";

interface IProps {
  label: string;
  value?: string | number | null;
}

export default function MovieInfo({ label, value }: IProps) {
  return (
    <View className="mt-5 items-end justify-center">
      <CustomText className="text-sm text-light-200">{label}</CustomText>
      <CustomText
        className="mt-2 text-justify text-sm text-light-100"
        variant="bold"
      >
        {value ?? "N/A"}
      </CustomText>
    </View>
  );
}
