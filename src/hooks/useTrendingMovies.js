import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addTrendingMovies } from '../utils/movieSlice';

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector(store => store.movies.trendingMovies)

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
    !trendingMovies && getTrendingMovies();
  }, []);
};

export default useTrendingMovies;
