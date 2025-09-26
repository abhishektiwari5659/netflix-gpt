import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  // Return nothing if we don't have movies or names
  if (!movieNames || movieNames.length === 0 || !movieResults) return null;

  // Clean names (remove leading * and extra spaces)
  const cleanNames = movieNames.map((name) => name.replace(/^\*+/, "").trim());

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cleanNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={Array.isArray(movieResults[index]) ? movieResults[index] : [movieResults[index]]}
          />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestion;
