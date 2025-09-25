import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="p-6 text-white">
        <h1 className="text-3xl py-6">{title}</h1>
      <div className="flex overflow-x-auto no-scrollbar">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
