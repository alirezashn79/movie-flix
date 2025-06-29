import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function MovieDetailsPage() {
  const { id } = useLocalSearchParams();
  console.log(id);
  return (
    <View>
      <Text>MovieDetailsPage : {id}</Text>
    </View>
  );
}
