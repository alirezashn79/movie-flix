import { endpoints } from "@/constants/endpoints";
import { MovieResponse } from "@/interfaces/interfaces";
import { TMDBApi } from "@/utils/api";
import stableStringify from "@/utils/stableStringify";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseGetMoviesParams {
  searchParams?: Record<string, string>;
  isSearch?: boolean;
}

async function queryFn(
  searchParams?: Record<string, string>,
  pageParams: number = 1,
  isSearch: boolean = false,
): Promise<MovieResponse> {
  const endpoint = isSearch ? endpoints.tmdb.search : endpoints.tmdb.discover;
  return TMDBApi.get<MovieResponse>(endpoint, {
    searchParams: {
      ...searchParams,
      page: pageParams.toString(),
    },
  }).json();
}

export default function useGetMovies({
  searchParams = {},
  isSearch = false,
}: UseGetMoviesParams) {
  return useInfiniteQuery({
    queryKey: ["popular_movies", stableStringify(searchParams)],
    queryFn: ({ pageParam }) => queryFn(searchParams, pageParam, isSearch),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
}
