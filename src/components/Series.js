import { useState, useEffect } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import SearchGPT from "./SearchGPT";
import MovieDetail from "./MovieDetail";
import MovieCard from "./MovieCard";
import useSeriesCategory from "../hooks/useSeriesCategory";
import { API_OPTIONS, IMG_CDN } from "../utils/constants";

const Series = () => {
  const categories = useSelector((store) => store.movies.seriesCategories);
  const showGptSearch = useSelector((store) => store.gpt.showGpt);

  useSeriesCategory(
    "popular",
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
  );
  useSeriesCategory(
    "kdrama",
    "https://api.themoviedb.org/3/discover/tv?with_origin_country=KR"
  );
  useSeriesCategory(
    "indian",
    "https://api.themoviedb.org/3/discover/tv?with_origin_country=IN"
  );
  useSeriesCategory(
    "american",
    "https://api.themoviedb.org/3/discover/tv?with_origin_country=US"
  );

  const [featuredSeries, setFeaturedSeries] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    if (categories.popular && categories.popular.length > 0) {
      const random =
        categories.popular[
          Math.floor(Math.random() * categories.popular.length)
        ];
      setFeaturedSeries(random);

      const fetchTrailer = async () => {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/tv/${random.id}/videos`,
            API_OPTIONS
          );
          const data = await res.json();
          let trailer = data.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
          );
          if (!trailer && data.results.length > 0) {
            trailer = data.results.find((vid) => vid.site === "YouTube");
          }
          if (trailer) setTrailerKey(trailer.key);
        } catch (err) {
          console.error(err);
        }
      };
      fetchTrailer();
    }
  }, [categories]);

  return (
    <div className="text-white min-h-screen bg-black">
      <Header />

      {showGptSearch ? (
        <SearchGPT onMovieSelect={setSelectedMovieId} />
      ) : selectedMovieId ? (
        <MovieDetail
          type="tv"
          movieId={selectedMovieId}
          onBack={() => setSelectedMovieId(null)}
          onSelectMovie={(id) => setSelectedMovieId(id)}
        />
      ) : (
        <>
          {/* Hero Section */}
          {featuredSeries && (
            <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full">
              {trailerKey ? (
                <iframe
                  title="Trailer"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1&loop=1&playlist=${trailerKey}`}
                  className="absolute w-full h-full object-cover aspect-video"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <div
                  className="absolute w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${IMG_CDN}${featuredSeries.backdrop_path})`,
                  }}
                ></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
              <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-4 sm:left-10 max-w-full sm:max-w-xl px-2 sm:px-0 z-20">
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 line-clamp-2">
                  {featuredSeries.name || featuredSeries.title}
                </h1>
                <p className="hidden sm:block text-sm sm:text-lg md:text-lg mb-4 line-clamp-3">
                  {featuredSeries.overview}
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
          {Object.entries(categories).map(([category, series]) => (
            <div key={category} className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                {category === "popular"
                  ? "Popular Series"
                  : category === "kdrama"
                  ? "K-Drama"
                  : category === "indian"
                  ? "Indian Series"
                  : category === "american"
                  ? "American Series"
                  : category}
              </h2>
              <div className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide">
                {series?.map((item) => (
                  <MovieCard
                    key={item.id}
                    posterPath={item.poster_path}
                    onClick={() => setSelectedMovieId(item.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Series;
