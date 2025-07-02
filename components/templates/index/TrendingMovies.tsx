import CustomText from "@/components/modules/customText";
import IsError from "@/components/modules/IsError";
import IsPending from "@/components/modules/IsPending";
import TrendingMovieCard from "@/components/modules/TrendingMovieCard";
import useGetTrendingMovies from "@/hooks/queries/useGetTrendingMovies";
import React from "react";
import { FlatList, View } from "react-native";

export default function TrendingMovies() {
  const { data: trendingMovies, isPending, isError } = useGetTrendingMovies();

  return (
    !!trendingMovies &&
    trendingMovies?.length > 0 && (
      <>
        <View className="mt-10">
          <CustomText className="mb-3 text-lg text-white" variant="bold">
            ترند ها
          </CustomText>
          {isPending ? <IsPending /> : isError ? <IsError /> : null}
        </View>
        <View>
          <FlatList
            data={trendingMovies}
            keyExtractor={({ id }) => id}
            horizontal
            ItemSeparatorComponent={() => <View className="w-3" />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingEnd: 16,
              paddingStart: 6,
            }}
            renderItem={({ item, index }) => (
              <TrendingMovieCard movie={item} index={index} />
            )}
          />
        </View>
      </>
    )
  );
}
