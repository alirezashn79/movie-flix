import { supabase } from "@/utils/supabase";

interface IProps {
  query: string;
  movie: {
    search_term: string;
    poster_url: string;
    movie_id: string;
    title: string;
  };
}

export default async function updateSearchCount({ query, movie }: IProps) {
  try {
    const result = await supabase
      .from("metrics")
      .select()
      .eq("search_term", query);

    if (result.data && result.data.length > 0) {
      await supabase
        .from("metrics")
        .update({
          count: result.data[0].count + 1,
        })
        .eq("search_term", query);
      console.log("updated");
      return;
    }

    await supabase.from("metrics").insert({
      search_term: query,
      movie_id: movie.movie_id,
      poster_url: movie.poster_url,
      title: movie.title,
      count: 1,
    });
    console.log("created");
  } catch (error) {
    console.log("Error updating search count:", error);
  }
}
