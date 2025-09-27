import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addDubbedAnime } from "../utils/movieSlice";

const DUBBED_ANIME_URL =
  "https://api.themoviedb.org/3/discover/tv?with_genres=16&with_original_language=en";

const useDubbedAnime = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(DUBBED_ANIME_URL, API_OPTIONS);
      const data = await res.json();
      dispatch(addDubbedAnime(data.results));
    };
    fetchData();
  }, [dispatch]);
};

export default useDubbedAnime;
