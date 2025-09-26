import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="mt-[40%] lg:mt-[5%] md:-mt-60 pl-6 md:pl-12 z-20 relative space-y-4 md:space-y-6">
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Indian Movies" movies={movies.indianMovies} />
        <MovieList title="Trending" movies={movies.trendingMovies} />
        <MovieList title="For You" movies={movies.recommendedMovies} />
        <MovieList title="Comedy" movies={movies.comedyMovies} />
        <MovieList title="Horror" movies={movies.horrorMovies} />
        <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
