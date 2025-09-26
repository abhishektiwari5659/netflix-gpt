import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addComedyMovies } from '../utils/movieSlice';

const COMEDY_GENRE_ID = 35; // TMDB genre ID for Comedy

const useComedyMovies = () => {
  const comedyMovies = useSelector(store => store.movies.comedyMovies)
  const dispatch = useDispatch();

  const getComedyMovies = async () => {
    try {
      const data = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${COMEDY_GENRE_ID}`, API_OPTIONS);
      const json = await data.json();
      dispatch(addComedyMovies(json.results));
    } catch (err) {
      console.error("Error fetching comedy movies:", err);
    }
  };

  useEffect(() => {
    !comedyMovies && getComedyMovies();
  }, []);
};

export default useComedyMovies;
