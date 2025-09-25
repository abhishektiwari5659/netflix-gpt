import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addRecommendedMovies } from '../utils/movieSlice';

const useRecommendedMovies = () => {
  const dispatch = useDispatch();

  const getRecommendedMovies = async () => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
      const json = await data.json();
      dispatch(addRecommendedMovies(json.results));
    } catch (err) {
      console.error("Error fetching recommended movies:", err);
    }
  };

  useEffect(() => {
    getRecommendedMovies();
  }, []);
};

export default useRecommendedMovies;
