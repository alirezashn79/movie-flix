import CustomText from "@/components/modules/customText";
import EmptyList from "@/components/modules/EmptyList";
import IsError from "@/components/modules/IsError";
import IsPending from "@/components/modules/IsPending";
import MovieCard from "@/components/modules/MovieCard";
import SearchBar from "@/components/modules/SearchBar";
import { icons } from "@/constants/icons";
import useGetMovies from "@/hooks/queries/useGetMovies";
import { useRefresh } from "@/hooks/useRefresh";
import { useScrollToTopOnTabPress } from "@/hooks/useScrollToTopOnTabPress";
import { Movie } from "@/interfaces/interfaces";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  View,
} from "react-native";
import TrendingMovies from "./TrendingMovies";

export default function PopularMovies() {
  const flatListRef = useScrollToTopOnTabPress<Movie>();
  const router = useRouter();
  const refreshTrendingMovies = useRefresh(["trending_movies"]);
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
    refreshTrendingMovies();
  }, [refetch, refreshTrendingMovies]);

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

  const renderHeader = useMemo(() => {
    return (
      <>
        <Image source={icons.logo} className="mx-auto  mt-20 h-10 w-12" />
        {isPending ? (
          <IsPending />
        ) : isError ? (
          <IsError />
        ) : (
          <View className="mt-6">
            <SearchBar
              placeholder="جستجو در بیش از ۳۰۰ فیلم آنلاین"
              onPress={navigateToSearchPage}
            />

            <TrendingMovies />

            <CustomText className="mb-4 mt-5 text-lg text-white" variant="bold">
              آخرین فیلم ها
            </CustomText>
          </View>
        )}
      </>
    );
  }, [isPending, isError]);

  return (
    <FlatList
      ref={flatListRef}
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
      className="pb-32"
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={() => (
        <EmptyList isPending={isPending} isError={isError} />
      )}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={onRefresh}
          tintColor="#fff"
          title="در حال بارگذاری..."
        />
      }
    />
  );
}
