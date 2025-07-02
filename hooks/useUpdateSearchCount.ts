import { endpoints } from "@/constants/endpoints";
import { Movie } from "@/interfaces/interfaces";
import updateSearchCount from "@/services/updateSearchCount";
import { useEffect, useRef, useState } from "react";
import { useRefresh } from "./useRefresh";

interface IProps {
  searchQuery: string;
  movies: Movie[];
}

export default function useUpdateSearchCount({ movies, searchQuery }: IProps) {
  const lastQuery = useRef<string>("");
  const currentQuery = searchQuery.trim();
  const [reload, setReload] = useState(false);
  const refreshTrendingMovies = useRefresh(["trending_movies"]);

  useEffect(() => {
    if (!currentQuery) {
      lastQuery.current = "";
      return;
    }
    if (!movies || movies.length === 0 || !movies?.[0]) return;

    if (lastQuery.current === currentQuery) return;

    lastQuery.current = currentQuery;

    updateSearchCount({
      query: currentQuery,
      movie: {
        movie_id: movies[0].id.toString(),
        poster_url: `${endpoints.tmdb.images}${movies[0].poster_path}`,
        search_term: currentQuery,
        title: movies[0].title,
      },
    }).then(() => setReload(true));
  }, [currentQuery, movies]);

  useEffect(() => {
    if (!reload) return;
    refreshTrendingMovies();
    setReload(false);
  }, [reload, refreshTrendingMovies]);

  return null;
}
