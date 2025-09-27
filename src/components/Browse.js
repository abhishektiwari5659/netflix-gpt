import { useState } from "react";
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import SearchGPT from "./SearchGPT";
import MovieDetail from './MovieDetail';
import { useSelector } from 'react-redux';

import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useRecommendedMovies from '../hooks/useRecommendedMovies';
import useComedyMovies from '../hooks/useComedyMovies';
import useHorrorMovies from '../hooks/useHorrorMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useIndianMovies from "../hooks/useIndianMovies";

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGpt);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Fetch hooks
  useNowPlayingMovies();
  useTrendingMovies();
  useRecommendedMovies();
  useComedyMovies();
  useHorrorMovies();
  useUpcomingMovies();
  useIndianMovies();

  return (
    <div className="text-white min-h-screen bg-black">
      <Header />

      {showGptSearch ? (
        <SearchGPT onMovieSelect={setSelectedMovieId} />
      ) : selectedMovieId ? (
        <MovieDetail movieId={selectedMovieId} onBack={() => setSelectedMovieId(null)} />
      ) : (
        <>
          <MainContainer onMovieSelect={setSelectedMovieId} />
          <SecondaryContainer onMovieSelect={setSelectedMovieId} />
        </>
      )}
    </div>
  );
};

export default Browse;
