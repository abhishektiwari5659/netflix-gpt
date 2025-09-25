import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addIndianMovies } from '../utils/movieSlice';

const useIndianMovies = () => {
  const dispatch = useDispatch();

  const getIndianMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?region=IN&with_original_language=hi",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addIndianMovies(json.results));
    } catch (err) {
      console.error("Error fetching Indian movies:", err);
    }
  };

  useEffect(() => {
    getIndianMovies();
  }, []);
};

export default useIndianMovies;
