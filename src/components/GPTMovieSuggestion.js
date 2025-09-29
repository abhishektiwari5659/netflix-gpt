import React, { useState } from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";

const GPTMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  // 🔹 Local state to handle selected movie
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedType, setSelectedType] = useState("movie");

  if (!movieNames || movieNames.length === 0 || !movieResults) return null;

  const cleanNames = movieNames.map((name) => name.replace(/^\*+/, "").trim());

  // 🔹 If a movie is selected, show MovieDetail instead of suggestions
  if (selectedMovie) {
    return (
      <MovieDetail
        movieId={selectedMovie}
        type={selectedType}
        onBack={() => setSelectedMovie(null)} // go back to GPT suggestions
        onSelectMovie={(id, type) => {
          setSelectedMovie(id);
          setSelectedType(type || "movie"); // fallback to "movie"
        }}
      />
    );
  }

  // 🔹 Otherwise, show GPT suggestions
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cleanNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={
              Array.isArray(movieResults[index])
                ? movieResults[index]
                : [movieResults[index]]
            }
            onMovieSelect={(id) => {
              setSelectedMovie(id);
              setSelectedType("movie"); // ✅ force type movie
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestion;
