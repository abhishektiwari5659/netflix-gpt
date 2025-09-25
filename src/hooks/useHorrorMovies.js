import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addHorrorMovies } from '../utils/movieSlice';

const HORROR_GENRE_ID = 27; // TMDB genre ID for Horror

const useHorrorMovies = () => {
  const dispatch = useDispatch();

  const getHorrorMovies = async () => {
    try {
      const data = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${HORROR_GENRE_ID}`, API_OPTIONS);
      const json = await data.json();
      dispatch(addHorrorMovies(json.results));
    } catch (err) {
      console.error("Error fetching horror movies:", err);
    }
  };

  useEffect(() => {
    getHorrorMovies();
  }, []);
};

export default useHorrorMovies;
