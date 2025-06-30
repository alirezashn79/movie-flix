import { endpoints } from "@/constants/endpoints";
import stableStringify from "@/helpers/stableStringify";
import { MovieResponse } from "@/interfaces/interfaces";
import { TMDBApi } from "@/utils/api";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseGetMoviesParams {
  searchParams?: Record<string, string>;
}

async function queryFn(
  searchParams?: Record<string, string>,
  pageParams: number = 1,
): Promise<MovieResponse> {
  return TMDBApi.get<MovieResponse>(endpoints.tmdb.discover, {
    searchParams: {
      ...searchParams,
      page: pageParams.toString(),
    },
  }).json();
}

export default function useGetMovies({
  searchParams = {},
}: UseGetMoviesParams) {
  return useInfiniteQuery({
    queryKey: ["popular_movies", stableStringify(searchParams)],
    queryFn: ({ pageParam }) => queryFn(searchParams, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
}
