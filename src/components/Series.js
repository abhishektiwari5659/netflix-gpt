import { useState, useEffect } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import useSeriesData from "../hooks/useSeriesData";
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import SearchGPT from "./SearchGPT";
import MovieDetail from "./MovieDetail";
import MovieCard from "./MovieCard"; // ✅ reuse your MovieCard

const IMG_CDN = "https://image.tmdb.org/t/p/original";

const Series = () => {
  const series = useSelector((store) => store.movies.series);
  const showGptSearch = useSelector((store) => store.gpt.showGpt);
  useSeriesData(); // fetch series on mount

  const [featuredSeries, setFeaturedSeries] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    if (series && series.length > 0) {
      const random = series[Math.floor(Math.random() * series.length)];
      setFeaturedSeries(random);
    }
  }, [series]);

  return (
    <div className="text-white min-h-screen bg-black">
      <Header />

      {showGptSearch ? (
        <SearchGPT onMovieSelect={setSelectedMovieId} />
      ) : selectedMovieId ? (
        <MovieDetail
          movieId={selectedMovieId}
          onBack={() => setSelectedMovieId(null)}
        />
      ) : (
        <>
          {/* Hero / Banner Section */}
          {featuredSeries && (
            <div
              className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${IMG_CDN}${featuredSeries.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
              <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-4 sm:left-10 max-w-full sm:max-w-xl px-2 sm:px-0">
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

          {/* Series Row */}
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
              Popular Series
            </h2>
            <div className="flex gap-2 sm:gap-4 overflow-x-scroll scrollbar-hide">
              {series?.map((item) => (
                <MovieCard
                  key={item.id}
                  posterPath={item.poster_path} // ✅ Option 1 style
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

export default Series;
