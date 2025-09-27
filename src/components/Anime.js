import { useState, useEffect } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import useAnimeData from "../hooks/useAnimeData";
import useJapaneseAnime from "../hooks/useJapaneseAnime";
import useDubbedAnime from "../hooks/useDubbedAnime";
import useAmericanAnime from "../hooks/useAmericanAnime";
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import SearchGPT from "./SearchGPT";
import MovieDetail from "./MovieDetail";
import MovieCard from "./MovieCard";

const IMG_CDN = "https://image.tmdb.org/t/p/original";

const Anime = () => {
  const anime = useSelector((store) => store.movies.anime);
  const japaneseAnime = useSelector((store) => store.movies.japaneseAnime);
  const dubbedAnime = useSelector((store) => store.movies.dubbedAnime);
  const americanAnime = useSelector((store) => store.movies.americanAnime);
  const showGptSearch = useSelector((store) => store.gpt.showGpt);

  useAnimeData();
  useJapaneseAnime();
  useDubbedAnime();
  useAmericanAnime();

  const [featuredAnime, setFeaturedAnime] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    if (anime && anime.length > 0) {
      const random = anime[Math.floor(Math.random() * anime.length)];
      setFeaturedAnime(random);
    }
  }, [anime]);

  return (
    <div className="text-white min-h-screen bg-black">
      <Header />

      {showGptSearch ? (
        <SearchGPT onMovieSelect={setSelectedMovieId} />
      ) : selectedMovieId ? (
        <MovieDetail movieId={selectedMovieId} onBack={() => setSelectedMovieId(null)} />
      ) : (
        <>
          {/* Hero Section */}
          {featuredAnime && (
            <div
              className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${IMG_CDN}${featuredAnime.backdrop_path})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
              <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-4 sm:left-10 max-w-full sm:max-w-xl px-2 sm:px-0">
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 line-clamp-2">
                  {featuredAnime.name || featuredAnime.title}
                </h1>
                <p className="hidden sm:block text-sm sm:text-lg md:text-lg mb-4 line-clamp-3">
                  {featuredAnime.overview}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 w-full sm:w-auto">
                  <button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-black py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-sm sm:text-base md:text-lg font-semibold rounded-md sm:rounded-lg hover:bg-opacity-80 transition">
                    <FaPlay className="text-black text-xs sm:text-sm md:text-base" />
                    Play
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gray-500 text-white py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-sm sm:text-base md:text-lg font-semibold rounded-md sm:rounded-lg hover:bg-opacity-80 transition">
                    <BsInfoCircle className="text-white text-xs sm:text-sm md:text-base" />
                    More Info
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Rows */}
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Popular Anime</h2>
            <div className="flex gap-2 sm:gap-4 overflow-x-scroll scrollbar-hide">
              {anime?.map((item) => (
                <MovieCard
                  key={item.id}
                  posterPath={item.poster_path}
                  onClick={() => setSelectedMovieId(item.id)}
                />

              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Japanese Anime</h2>
            <div className="flex gap-2 sm:gap-4 overflow-x-scroll scrollbar-hide">
              {japaneseAnime?.map((item) => (
                <MovieCard
                  key={item.id}
                  posterPath={item.poster_path}
                  onClick={() => setSelectedMovieId(item.id)}
                />

              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Dubbed Anime</h2>
            <div className="flex gap-2 sm:gap-4 overflow-x-scroll scrollbar-hide">
              {dubbedAnime?.map((item) => (
                <MovieCard
                  key={item.id}
                  posterPath={item.poster_path}
                  onClick={() => setSelectedMovieId(item.id)}
                />

              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">American Anime</h2>
            <div className="flex gap-2 sm:gap-4 overflow-x-scroll scrollbar-hide">
              {americanAnime?.map((item) => (
                <MovieCard
                  key={item.id}
                  posterPath={item.poster_path}
                  onClick={() => setSelectedMovieId(item.id)}
                />

              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Anime;
