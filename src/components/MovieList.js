import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl py-6">{title}</h1>
      <div className="flex overflow-x-auto no-scrollbar">
        <div className="flex gap-4">
          {movies.map((movie, index) => {
            if (!movie) return null; // <-- skip undefined entries

            return (
              <div key={movie.id || movie.title || index} className="flex flex-col items-center">
                {movie.poster_path ? (
                  <MovieCard posterPath={movie.poster_path} />
                ) : (
                  <div className="w-48 h-72 bg-gray-700 flex items-center justify-center rounded-lg">
                    <span className="text-center p-2">{movie.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
