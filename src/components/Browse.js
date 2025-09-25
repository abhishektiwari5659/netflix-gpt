import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import SearchGPT from "./SearchGPT"

import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useRecommendedMovies from '../hooks/useRecommendedMovies';
import useComedyMovies from '../hooks/useComedyMovies';
import useHorrorMovies from '../hooks/useHorrorMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useIndianMovies from "../hooks/useIndianMovies"
import { useSelector } from 'react-redux';

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGpt)
  useNowPlayingMovies();
  useTrendingMovies();
  useRecommendedMovies();
  useComedyMovies();
  useHorrorMovies();
  useUpcomingMovies();
  useIndianMovies();

  return (
    <div className="text-white min-h-screen">
      <Header />
      {
        showGptSearch ? <SearchGPT /> : 
        <>
        <MainContainer />
      <SecondaryContainer />
        </>
      }
    </div>
  );
};

export default Browse;
