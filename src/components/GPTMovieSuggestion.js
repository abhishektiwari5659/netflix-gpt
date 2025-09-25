import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from "./MovieList"

const GPTMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector(store => store.gpt);

  if (!movieNames || !movieResults) return null;

  // Split the GPT string into an array and clean it
  const cleanNames = movieNames
    .split("\n")                   // split by newline
    .map(name => name.replace(/^\*+/, "").trim()) // remove leading * and trim
    .filter(Boolean);              // remove empty strings

  return (
    <div className='p-4 m-4 bg-black text-white bg-opacity-90'>
      <div className="flex flex-wrap">
        {cleanNames.map((movieName, index) => {
          return (
            <MovieList 
              key={movieName} 
              title={movieName} 
              movies={movieResults[index] ? [movieResults[index]] : []} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default GPTMovieSuggestion;
