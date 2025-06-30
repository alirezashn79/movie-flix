import ky from "ky";

export const TMDBApi = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  },
  timeout: 10000,
  retry: 2,
});
