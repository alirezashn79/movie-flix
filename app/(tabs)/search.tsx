import SearchMovies from "@/components/templates/search/SearchMovies";
import { images } from "@/constants/images";
import { Image, View } from "react-native";

export default function SearchScreen() {
  return (
    <View className="flex-1">
      <Image source={images.bg} className="absolute z-0 min-h-[500px] w-full" />
      <View className="flex-1 p-4 pt-0">
        <SearchMovies />
      </View>
    </View>
  );
}
