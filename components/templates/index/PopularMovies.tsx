import CustomText from "@/components/customText";
import MovieCard from "@/components/modules/MovieCard";
import SearchBar from "@/components/SearchBar";
import useGetMovies from "@/hooks/queries/useGetMovies";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

export default function PopularMovies() {
  const router = useRouter();
  const {
    data,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useGetMovies({
    searchParams: {
      sort_by: "popularity.desc",
      include_adult: "false",
    },
  });

  const navigateToSearchPage = () => {
    router.push("/search");
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="h-36 flex-row items-start justify-center gap-2 pt-4">
        <CustomText className="text-sm  text-white" variant="bold">
          در حال بارگذاری
        </CustomText>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  return isPending ? (
    <ActivityIndicator className="mx-auto mt-10" size="large" />
  ) : isError ? (
    <Text className="mt-10 text-center text-lg font-bold text-red-500">
      خطا در بارگذاری فیلم ها
    </Text>
  ) : (
    <View className="mt-8 flex-1">
      <SearchBar
        placeholder="جستجو در بیش از ۳۰۰ فیلم آنلاین"
        onPress={navigateToSearchPage}
      />

      <CustomText className="mb-4 mt-5 text-lg text-white" variant="bold">
        آخرین فیلم ها
      </CustomText>

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard
            id={item.id.toString()}
            poster_path={item.poster_path}
            vote_average={item.vote_average}
            title={item.title}
            release_date={item.release_date}
          />
        )}
        keyExtractor={({ id }) => id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          flexDirection: "row-reverse",
          gap: 10,
          marginBottom: 20,
        }}
        className="mt-2  pb-32"
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            tintColor="#fff"
            title="در حال بارگذاری..."
          />
        }
      />
    </View>
  );
}
