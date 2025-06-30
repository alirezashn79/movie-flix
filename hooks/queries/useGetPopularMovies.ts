import { endpoints } from "@/constants/endpoints";
import { MovieResponse } from "@/interfaces/interfaces";
import { TMDBApi } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

async function queryFn(): Promise<MovieResponse> {
  return TMDBApi.get<MovieResponse>(endpoints.tmdb.discover, {
    searchParams: {
      sort_by: "popularity.desc",
    },
  }).json();
}

export default function useGetPopularMovies() {
  return useQuery({
    queryKey: ["popular_movies"],
    queryFn,
  });
}
