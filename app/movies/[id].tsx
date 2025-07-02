import CustomText from "@/components/modules/customText";
import MovieInfo from "@/components/templates/movies/MovieInfo";
import { endpoints } from "@/constants/endpoints";
import { icons } from "@/constants/icons";
import useGetMovieDetails from "@/hooks/queries/useGetMovieDetails";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function MovieDetailsPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data } = useGetMovieDetails({
    movieId: id as string,
  });
  const imageUri = useMemo(() => {
    return `${endpoints.tmdb.images}${data?.poster_path}`;
  }, [data?.poster_path]);

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{ uri: imageUri }}
            resizeMode="stretch"
            className="h-[550px] w-full"
            style={{ backgroundColor: "#333" }}
          />
        </View>

        <View className="mt-6 items-end justify-center px-6">
          <CustomText className="text-xl text-white" variant="bold">
            {data?.title}
          </CustomText>
          <View className="mt-2 flex-row items-center gap-x-1">
            <CustomText className="text-sm text-light-200">
              {data?.release_date.split("-")[0]}
            </CustomText>
            <CustomText className="text-sm text-light-200">
              {data?.runtime}m
            </CustomText>
          </View>

          <View className="mt-2 flex-row-reverse items-center gap-x-1 rounded-md bg-dark-100 px-2 py-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-sm font-bold text-white">
              {Math.round(data?.vote_average ?? 0)}/10
            </Text>
            <CustomText className="text-sm text-light-200">
              ({data?.vote_count} رای)
            </CustomText>
          </View>
          <MovieInfo label="خلاصه" value={data?.overview} />
          <MovieInfo
            label="ژانر ها"
            value={data?.genres.map((item) => item.name).join(" , ") ?? "N/A"}
          />
          <View className="w-1/2 flex-row justify-between">
            <MovieInfo
              label="بودجه"
              value={data?.budget && `$${data?.budget / 1_000_000}M`}
            />
            <MovieInfo
              label="فروش"
              value={
                data?.budget && `$${Math.round(data?.revenue) / 1_000_000}M`
              }
            />
          </View>

          <MovieInfo
            label="کمپانی های سازنده"
            value={
              data?.production_companies.map((item) => item.name).join(" , ") ??
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-6 right-6 z-10 mb-2 flex flex-row items-center justify-center rounded-lg bg-accent py-3.5"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="ml-1 mt-0.5 size-5"
          tintColor="#fff"
        />
        <CustomText className="text-base text-white" variant="bold">
          بازگشت
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}
