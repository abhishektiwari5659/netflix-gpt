import { useDispatch, useSelector } from "react-redux";
import langConstants from "../utils/langConstants";
import { useRef } from "react";
import client from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const selectedLang = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const fetchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();

      if (!json.results || json.results.length === 0) return null;

      // Try to find exact match (case-insensitive)
      const exactMatch = json.results.find(
        (res) => res.title.toLowerCase() === movie.toLowerCase()
      );

      return exactMatch || json.results[0];
    } catch (err) {
      console.error(`TMDB fetch error for "${movie}":`, err);
      return null;
    }
  };

  const getResults = async () => {
    let moviesArray = [];
    let rawTextLocal = ""; // fix: avoid redeclaration

    try {
      const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
      const gptQuery =
        "Act as a Netflix Movie Recommendation system and suggest movies for the query " +
        searchText.current.value +
        ". Only give me names of the popular movies.";

      const result = await model.generateContent(gptQuery);

      rawTextLocal = result.response.candidates[0].content.parts[0].text;

      moviesArray = rawTextLocal
        .split(/\n|,/)              
        .map((m) => m.replace(/^\*+/, "").trim())
        .filter(Boolean);

      console.log("Movie names array:", moviesArray);
    } catch (err) {
      console.error("Gemini Error:", err);
    }

    // Fetch TMDB data for all movies
    const promiseArray = moviesArray.map((movie) => fetchMovieTMDB(movie));
    const tmdbResult = await Promise.all(promiseArray);

    const finalMovies = tmdbResult.filter(Boolean);
    console.log("Final TMDB results:", finalMovies);

    // Dispatch with correct property names
    dispatch(addMovieResult({ movieNames: rawTextLocal, movieResults: finalMovies }));
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-11/12 md:w-1/2 backdrop-blur-md bg-black/50 rounded-xl shadow-lg grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-300 focus:outline-none"
          placeholder={langConstants[selectedLang]?.gptSearchPlaceholder}
        />
        <button
          type="submit"
          className="col-span-3 m-4 py-2 px-4 bg-[#e50914] hover:bg-red-800 text-white font-semibold rounded-lg transition"
          onClick={getResults}
        >
          {langConstants[selectedLang]?.search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
