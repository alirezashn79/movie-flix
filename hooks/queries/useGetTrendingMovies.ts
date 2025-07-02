import { TrendingMovie } from "@/interfaces/interfaces";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

async function queryFn() {
  const { data, error } = await supabase
    .from("metrics")
    .select()
    .order("count", { ascending: false });

  const uniqueMovies = [];
  const seenMovieIds = new Set();

  for (const item of data ?? []) {
    if (!seenMovieIds.has(item.movie_id)) {
      uniqueMovies.push(item);
      seenMovieIds.add(item.movie_id);
    }
    if (uniqueMovies.length === 5) break;
  }
  if (error) {
    throw new Error(error.message);
  }
  const movies = uniqueMovies as unknown as TrendingMovie[];
  return movies;
}

export default function useGetTrendingMovies() {
  return useQuery({
    queryKey: ["trending_movies"],
    queryFn,
  });
}
