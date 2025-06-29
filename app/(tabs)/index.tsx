import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, View } from "react-native";

export default function HomePage() {
  return (
    <View className="flex-1">
      <Image source={images.bg} className="absolute z-0 min-h-[500px] w-full" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 16,
        }}
        className="flex-1 px-4"
      >
        <Image source={icons.logo} className="mx-auto  mt-20 h-10 w-12" />

        {/* <View className="mt-8 flex-1">
          <SearchBar />
        </View> */}
      </ScrollView>
    </View>
  );
}
