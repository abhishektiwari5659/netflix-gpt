// src/hooks/useSeriesData.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addSeries } from "../utils/movieSlice";

const useSeriesData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
          API_OPTIONS
        );
        const data = await res.json();
        dispatch(addSeries(data.results));
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };

    fetchSeries();
  }, [dispatch]);
};

export default useSeriesData;
