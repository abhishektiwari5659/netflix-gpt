import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = ({ onMovieSelect }) => {
  const movies = useSelector((store) => store.movies);

  if (!movies) return null;

  const movieRows = [
    { title: "Now Playing", list: movies.nowPlayingMovies },
    { title: "Indian Movies", list: movies.indianMovies },
    { title: "Trending", list: movies.trendingMovies },
    { title: "For You", list: movies.recommendedMovies },
    { title: "Comedy", list: movies.comedyMovies },
    { title: "Horror", list: movies.horrorMovies },
    { title: "Upcoming Movies", list: movies.upcomingMovies },
  ];

  return (
    <div className="bg-black w-full">
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-6 sm:py-8 md:py-10 lg:py-8 xl:py-6 space-y-6">
        {movieRows.map((row) => (
          <MovieList
            key={row.title}
            title={row.title}
            movies={row.list}
            onMovieSelect={onMovieSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default SecondaryContainer;
