import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addSeriesCategory } from "../utils/movieSlice";

const useSeriesCategory = (category, url) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await fetch(url, API_OPTIONS);
        const data = await res.json();
        dispatch(addSeriesCategory({ category, series: data.results }));
      } catch (err) {
        console.error("Error fetching series category:", category, err);
      }
    };

    fetchSeries();
  }, [dispatch, category, url]);
};

export default useSeriesCategory;
