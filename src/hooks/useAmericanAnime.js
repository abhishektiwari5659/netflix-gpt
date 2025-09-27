import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addAmericanAnime } from "../utils/movieSlice";

const AMERICAN_ANIME_URL =
  "https://api.themoviedb.org/3/discover/tv?with_genres=16&with_origin_country=US";

const useAmericanAnime = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(AMERICAN_ANIME_URL, API_OPTIONS);
      const data = await res.json();
      dispatch(addAmericanAnime(data.results));
    };
    fetchData();
  }, [dispatch]);
};

export default useAmericanAnime;
