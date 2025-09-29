import { useDispatch, useSelector } from "react-redux";
import langConstants from "../utils/langConstants";
import { useRef, useState } from "react";
import client from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const selectedLang = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);

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

      // find closest match
      const exactMatch = json.results.find(
        (res) => res.title.toLowerCase() === movie.toLowerCase()
      );
      const pickedMovie = exactMatch || json.results[0];

      // ✅ filter out if no poster available
      if (!pickedMovie.poster_path) return null;

      return pickedMovie;
    } catch (err) {
      console.error(`TMDB fetch error for "${movie}":`, err);
      return null;
    }
  };

  const cleanMovieNames = (rawText) => {
    return rawText
      .split(/\n|,/) // split by line or comma
      .map((m) =>
        m
          .replace(/^\d+\.\s*/, "") // remove leading numbering like "1. "
          .replace(/^\*+|\*+$/g, "") // remove asterisks
          .replace(/\*\*/g, "") // remove bold markers
          .trim()
      )
      .filter(
        (m) =>
          m.length > 0 &&
          m.length < 50 && // reasonable title length
          !/^(here|certainly|of course|sure|happy)/i.test(m) // remove junk text
      );
  };

  const getResults = async () => {
    setLoading(true);
    let moviesArray = [];

    try {
      const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });
      const gptQuery =
        "Suggest a list of ONLY popular movie titles for the query: " +
        searchText.current.value +
        ". Just return plain names, no extra text.";

      const result = await model.generateContent(gptQuery);

      const rawTextLocal = result.response.candidates[0].content.parts[0].text;
      console.log("Raw Gemini output:", rawTextLocal);

      moviesArray = cleanMovieNames(rawTextLocal);
      console.log("Clean movie names array:", moviesArray);
    } catch (err) {
      console.error("Gemini Error:", err);
    }

    // fetch TMDB results in parallel
    const promiseArray = moviesArray.map((movie) => fetchMovieTMDB(movie));
    const tmdbResult = await Promise.all(promiseArray);

    // ✅ filter out nulls and no-poster results
    const finalMovies = tmdbResult.filter(Boolean);

    console.log("Final TMDB results:", finalMovies);

    dispatch(
      addMovieResult({ movieNames: moviesArray, movieResults: finalMovies })
    );
    setLoading(false);
  };

  return (
    <div className="pt-[10%] flex flex-col items-center px-4">
      <form
        className="w-full sm:w-10/12 md:w-2/3 lg:w-1/2 backdrop-blur-md bg-black/50 rounded-xl shadow-lg grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-2 col-span-8 sm:col-span-9 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-300 focus:outline-none"
          placeholder={langConstants[selectedLang]?.gptSearchPlaceholder}
        />
        <button
          type="submit"
          className="col-span-4 sm:col-span-3 m-2 py-2 px-4 bg-[#e50914] hover:bg-red-800 text-white font-semibold rounded-lg transition"
          onClick={getResults}
        >
          {langConstants[selectedLang]?.search}
        </button>
      </form>

      {loading && (
        <div className="flex flex-col items-center mt-6 text-white">
          <div className="w-12 h-12 border-4 border-t-red-600 border-gray-300 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold">
            Wait while we are fetching movies for you...
          </p>
        </div>
      )}
    </div>
  );
};

export default GPTSearchBar;
