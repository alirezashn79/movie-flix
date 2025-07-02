import { endpoints } from "@/constants/endpoints";
import { MovieDetails } from "@/interfaces/interfaces";
import { TMDBApi } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  movieId: string;
}

async function queryFn({
  queryKey,
}: {
  queryKey: string[];
}): Promise<MovieDetails> {
  const id = queryKey[1];
  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
  return TMDBApi.get<MovieDetails>(
    `${endpoints.tmdb.details}/${id}?api_key=${apiKey}`,
  ).json();
}

export default function useGetMovieDetails({ movieId }: IProps) {
  return useQuery({
    queryKey: ["movie_details", movieId],
    queryFn,
  });
}
