import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUpcomingMovies } from '../utils/movieSlice';

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

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
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
