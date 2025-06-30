import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CustomText from "../customText";

interface IProps {
  id: string;
  poster_path: string | null;
  title: string;
  vote_average: number;
  release_date: string;
}

function MovieCard({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: IProps) {
  const imageUri = useMemo(() => {
    return `https://image.tmdb.org/t/p/w500${poster_path}`;
  }, [poster_path]);

  return (
    <Link href={`/movies/${id.toString()}`} asChild>
      <TouchableOpacity className="flex-1 overflow-hidden rounded-lg">
        <Image
          source={{ uri: imageUri }}
          defaultSource={images.placehold}
          resizeMode="cover"
          className="mb-3 h-52 w-full rounded-lg"
          style={{ backgroundColor: "#333" }}
        />
        <CustomText
          numberOfLines={2}
          className="mb-2.5  h-10 text-white"
          variant="bold"
        >
          {title}
        </CustomText>
        <View className="flex-row items-center gap-2 gap-x-1">
          <Image source={icons.star} className="size-3" />
          <Text className="text-white">{vote_average.toFixed()}</Text>
        </View>

        <Text className="text-light-300">{release_date.split("-")[0]}</Text>
      </TouchableOpacity>
    </Link>
  );
}

export default React.memo(MovieCard);
