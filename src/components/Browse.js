import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import SearchGPT from "./SearchGPT";
import MovieDetail from "./MovieDetail";
import CastDetail from "./CastDetail";

import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useRecommendedMovies from "../hooks/useRecommendedMovies";
import useComedyMovies from "../hooks/useComedyMovies";
import useHorrorMovies from "../hooks/useHorrorMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useIndianMovies from "../hooks/useIndianMovies";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGpt);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCast, setSelectedCast] = useState(null);

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
        <SearchGPT
          onMovieSelect={(id, type) => setSelectedMovie({ id, type })}
        />
      ) : (
        <>
          {/* No movie or cast selected */}
          {!selectedMovie && !selectedCast && (
            <>
              <MainContainer
                onMovieSelect={(id, type = "movie") =>
                  setSelectedMovie({ id, type })
                }
              />
              <SecondaryContainer
                onMovieSelect={(id, type = "movie") =>
                  setSelectedMovie({ id, type })
                }
              />
            </>
          )}

          {/* Movie selected but no cast */}
          {selectedMovie && !selectedCast && (
            <MovieDetail
              movieId={selectedMovie.id}
              type={selectedMovie.type}
              onBack={() => setSelectedMovie(null)}
              onSelectMovie={(id, type) => setSelectedMovie({ id, type })}
              onSelectCast={(id) => setSelectedCast({ id })}
            />
          )}

          {/* Cast selected */}
          {selectedCast && (
            <CastDetail
              personId={selectedCast.id}
              onBack={() => setSelectedCast(null)}
              onSelectMovie={(id, type) => setSelectedMovie({ id, type })}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Browse;
