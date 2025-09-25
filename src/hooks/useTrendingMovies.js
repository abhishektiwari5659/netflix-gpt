import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrendingMovies } from '../utils/movieSlice';

const useTrendingMovies = () => {
  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/trending/movie/week', API_OPTIONS);
      const json = await data.json();
      dispatch(addTrendingMovies(json.results));
    } catch (err) {
      console.error("Error fetching trending movies:", err);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);
};

export default useTrendingMovies;
