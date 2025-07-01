import PopularMovies from "@/components/templates/index/PopularMovies";
import { images } from "@/constants/images";
import { Image, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <Image source={images.bg} className="absolute z-0 min-h-[500px] w-full" />
      <View className="flex-1 p-4 pt-0">
        <PopularMovies />
      </View>
    </View>
  );
}
