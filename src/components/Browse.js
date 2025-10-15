import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import SearchGPT from "./SearchGPT";

import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useRecommendedMovies from "../hooks/useRecommendedMovies";
import useComedyMovies from "../hooks/useComedyMovies";
import useHorrorMovies from "../hooks/useHorrorMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useIndianMovies from "../hooks/useIndianMovies";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGpt);
  const navigate = useNavigate();

  // Fetch hooks
  useNowPlayingMovies();
  useTrendingMovies();
  useRecommendedMovies();
  useComedyMovies();
  useHorrorMovies();
  useUpcomingMovies();
  useIndianMovies();

  const handleMovieSelect = (id, type = "movie") => {
    navigate(`/movie/${type}/${id}`);
  };


  return (
    <div className="text-white min-h-screen bg-black">
      <Header />

      {showGptSearch ? (
        <SearchGPT onMovieSelect={handleMovieSelect} />
      ) : (
        <>
          <MainContainer onMovieSelect={handleMovieSelect} />
          <SecondaryContainer onMovieSelect={handleMovieSelect} />
        </>
      )}
    </div>
  );
};

export default Browse;
