// src/hooks/useAnimeData.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addAnime } from "../utils/movieSlice";

const ANIME_GENRE_ID = 16; // TMDB animation

const useAnimeData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/tv?with_genres=${ANIME_GENRE_ID}&language=en-US&page=1`,
          API_OPTIONS
        );
        const data = await res.json();
        dispatch(addAnime(data.results));
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    fetchAnime();
  }, [dispatch]);
};

export default useAnimeData;
