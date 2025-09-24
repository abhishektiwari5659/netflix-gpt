import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();

      if (!json.results || json.results.length === 0) return;

      const officialTrailer = json.results.find(
        (video) =>
          video.type === "Trailer" &&
          video.name.toLowerCase().includes("official")
      );

      const anyTrailer = json.results.find((video) => video.type === "Trailer");


      const trailer = officialTrailer || anyTrailer || json.results[0];

      dispatch(addTrailerVideo(trailer));
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  useEffect(() => {
    if (movieId) getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;
