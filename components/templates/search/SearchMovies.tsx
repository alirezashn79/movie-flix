import CustomText from "@/components/modules/customText";
import MovieCard from "@/components/modules/MovieCard";
import SearchBar from "@/components/modules/SearchBar";
import { icons } from "@/constants/icons";
import useGetMovies from "@/hooks/queries/useGetMovies";
import { useScrollToTopOnTabPress } from "@/hooks/useScrollToTopOnTabPress";
import useUpdateSearchCount from "@/hooks/useUpdateSearchCount";
import { Movie } from "@/interfaces/interfaces";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";

export default function SearchMovies() {
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchQuery = useDebounce(searchQuery, 500);
  const flatListRef = useScrollToTopOnTabPress<Movie>();
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
      query: encodeURIComponent(debounceSearchQuery),
    },
    isSearch: true,
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  useUpdateSearchCount({
    searchQuery: debounceSearchQuery.trim(),
    movies,
  });

  const renderFooter = useMemo(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View className="h-36 flex-row items-start justify-center gap-2 pt-4">
        <CustomText className="text-sm  text-white" variant="bold">
          در حال بارگذاری
        </CustomText>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [isFetchingNextPage]);

  const renderHeader = useMemo(() => {
    return (
      <>
        <Image source={icons.logo} className="mx-auto  mt-20 h-10 w-12" />

        <View className="mt-6">
          <SearchBar
            autoFocus
            text={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            placeholder="جستجو در بیش از ۳۰۰ فیلم آنلاین"
          />

          {isPending ? (
            <ActivityIndicator className="mx-auto mt-10" size="large" />
          ) : isError ? (
            <Text className="mt-10 text-center text-lg font-bold text-red-500">
              خطا در بارگذاری فیلم ها
            </Text>
          ) : !!movies?.length ? (
            <CustomText className="mb-4 mt-5 text-lg text-white" variant="bold">
              نتایج جستجو برای{"  "}
              <CustomText className="text-xl text-accent" variant="bold">
                {searchQuery}
              </CustomText>
            </CustomText>
          ) : null}
        </View>
      </>
    );
  }, [isPending, isError, searchQuery, movies.length]);

  const renderEmpty = useMemo(() => {
    if (!isPending && !isError)
      return (
        <CustomText
          variant="bold"
          className="mx-auto mt-10 text-lg text-gray-500"
        >
          رکوردی یافت نشد
        </CustomText>
      );
    return null;
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
      ListEmptyComponent={renderEmpty}
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
