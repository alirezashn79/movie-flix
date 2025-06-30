import PopularMovies from "@/components/templates/index/PopularMovies";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, View } from "react-native";

export default function HomePage() {
  return (
    <View className="flex-1">
      <Image source={images.bg} className="absolute z-0 min-h-[500px] w-full" />
      <View className="flex-1 p-4">
        <Image source={icons.logo} className="mx-auto  mt-20 h-10 w-12" />
        <PopularMovies />
      </View>
    </View>
  );
}
