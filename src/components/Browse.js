import { useState } from "react";
import { useSelector } from 'react-redux';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import SearchGPT from "./SearchGPT";
import MovieDetail from './MovieDetail';

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
  const [selectedType, setSelectedType] = useState("movie");

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
        <SearchGPT onMovieSelect={(id, type) => {
          setSelectedMovieId(id);
          setSelectedType(type);
        }} />
      ) : selectedMovieId ? (
        <MovieDetail
          movieId={selectedMovieId}
          type={selectedType}
          onBack={() => setSelectedMovieId(null)}
          onSelectMovie={(id, type) => {
            setSelectedMovieId(id);
            setSelectedType(type);
          }}
        />
      ) : (
        <>
          <MainContainer onMovieSelect={(id, type = "movie") => {
            setSelectedMovieId(id);
            setSelectedType(type);
          }} />
          <SecondaryContainer onMovieSelect={(id, type = "movie") => {
            setSelectedMovieId(id);
            setSelectedType(type);
          }} />
        </>
      )}
    </div>
  );
};

export default Browse;
