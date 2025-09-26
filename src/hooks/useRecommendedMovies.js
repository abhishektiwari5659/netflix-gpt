import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRecommendedMovies } from '../utils/movieSlice';

const useRecommendedMovies = () => {
  const dispatch = useDispatch();
  const recommendedMovies = useSelector(store => store.movies.recommendedMovies)

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
    !recommendedMovies && getRecommendedMovies();
  }, []);
};

export default useRecommendedMovies;
