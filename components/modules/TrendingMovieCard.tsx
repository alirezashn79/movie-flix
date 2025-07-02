import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { TrendingMovie } from "@/interfaces/interfaces";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CustomText from "./customText";

interface IProps {
  movie: TrendingMovie;
  index: number;
}

export default function TrendingMovieCard({ movie, index }: IProps) {
  return (
    <Link href={`/movies/${movie.movie_id}`} asChild>
      <TouchableOpacity className="relative w-[124px]  ">
        <Image
          source={{ uri: movie.poster_url }}
          defaultSource={images.placehold}
          resizeMode="cover"
          className="mb-3 h-52 w-full rounded-lg"
          style={{ backgroundColor: "#333" }}
        />

        <CustomText className="mt-2 text-light-200" variant="bold">
          {movie.title}
        </CustomText>

        <View className=" absolute -left-11 bottom-6 px-1">
          <MaskedView
            maskElement={
              <CustomText variant="bold" className="text-6xl text-white">
                {index + 1}
              </CustomText>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <View className="absolute end-2.5 top-2.5 flex-row items-center justify-center rounded-lg border border-white/30 bg-white/30 p-1 backdrop-blur-sm">
          <Image source={icons.star} className="size-4" />
          <Text
            style={{
              textShadowColor: "rgba(0, 0, 0, 0.6)",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
            className="text-xs font-bold text-white"
          >
            2.5
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
