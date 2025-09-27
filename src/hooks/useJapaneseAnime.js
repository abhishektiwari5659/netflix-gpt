import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addJapaneseAnime } from "../utils/movieSlice";

const JAPANESE_ANIME_URL = 
  "https://api.themoviedb.org/3/discover/tv?with_genres=16&with_original_language=ja";

const useJapaneseAnime = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(JAPANESE_ANIME_URL, API_OPTIONS);
      const data = await res.json();
      dispatch(addJapaneseAnime(data.results));
    };
    fetchData();
  }, [dispatch]);
};

export default useJapaneseAnime;
