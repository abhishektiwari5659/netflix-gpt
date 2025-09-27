import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = ({ onMovieSelect }) => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="mt-[40%] md:-mt-60 pl-6 md:pl-12 z-20 relative space-y-4 md:space-y-6">
        <MovieList
          title="Now Playing"
          movies={movies.nowPlayingMovies}
          onMovieSelect={onMovieSelect}
        />
        <MovieList
          title="Indian Movies"
          movies={movies.indianMovies}
          onMovieSelect={onMovieSelect}
        />
        <MovieList
          title="Trending"
          movies={movies.trendingMovies}
          onMovieSelect={onMovieSelect}
        />
        <MovieList
          title="For You"
          movies={movies.recommendedMovies}
          onMovieSelect={onMovieSelect}
        />
        <MovieList
          title="Comedy"
          movies={movies.comedyMovies}
          onMovieSelect={onMovieSelect}
        />
        <MovieList
          title="Horror"
          movies={movies.horrorMovies}
          onMovieSelect={onMovieSelect}
        />
        <MovieList
          title="Upcoming Movies"
          movies={movies.upcomingMovies}
          onMovieSelect={onMovieSelect}
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;
