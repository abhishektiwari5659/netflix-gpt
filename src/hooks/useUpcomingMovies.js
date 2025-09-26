import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUpcomingMovies } from '../utils/movieSlice';

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector(store => store.movies.upcomingMovies)
  const getUpcomingMovies = async () => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/movie/upcoming', API_OPTIONS);
      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    } catch (err) {
      console.error("Error fetching upcoming movies:", err);
    }
  };

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
