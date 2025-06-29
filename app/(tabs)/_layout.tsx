import Tab from "@/components/Tab";
import TabBarButton from "@/components/TabBarButton";
import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { PressableProps } from "react-native";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: "#030014",
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 60,
          marginBottom: 34,
          position: "absolute",
          marginHorizontal: 16,
          height: 48,
          padding: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          outlineWidth: 0,
          overflow: "hidden",
        },

        tabBarIconStyle: {
          height: "100%",
          width: "100%",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Tab title="خانه" icon={icons.home} focused={focused} />
          ),
          tabBarButton: (props) => (
            <TabBarButton {...(props as PressableProps)} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <Tab title="جستجو" icon={icons.search} focused={focused} />
          ),
          tabBarButton: (props) => (
            <TabBarButton {...(props as PressableProps)} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          tabBarIcon: ({ focused }) => (
            <Tab title="ذخیره شده" icon={icons.save} focused={focused} />
          ),
          tabBarButton: (props) => (
            <TabBarButton {...(props as PressableProps)} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Tab title="پروفایل" icon={icons.person} focused={focused} />
          ),
          tabBarButton: (props) => (
            <TabBarButton {...(props as PressableProps)} />
          ),
        }}
      />
    </Tabs>
  );
}
