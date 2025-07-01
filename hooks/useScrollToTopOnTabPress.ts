import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { ParamListBase } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useCallback, useRef } from "react";
import { FlatList } from "react-native";

export function useScrollToTopOnTabPress<
  T,
  ParamList extends ParamListBase = ParamListBase,
>() {
  const flatListRef = useRef<FlatList<T>>(null);
  const navigation = useNavigation<BottomTabNavigationProp<ParamList>>();

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("tabPress", (e) => {
        if (navigation.isFocused()) {
          flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }
      });

      return () => unsubscribe();
    }, [navigation]),
  );

  return flatListRef;
}
