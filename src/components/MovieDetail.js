import { useEffect, useState } from "react";
import { IMG_CDN, API_OPTIONS } from "../utils/constants";

const MovieDetail = ({ movieId, onBack }) => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    // Fetch movie details
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          API_OPTIONS
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch movie videos to get the trailer
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          API_OPTIONS
        );
        const data = await res.json();

        // Try to find official YouTube trailer
        let trailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        // If no trailer, fall back to first available YouTube video
        if (!trailer && data.results.length > 0) {
          trailer = data.results.find((vid) => vid.site === "YouTube");
        }

        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();
    fetchTrailer();
  }, [movieId]);

  if (!movie) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Movie Info on Top */}
      <div className="relative z-20 p-6 md:p-12 flex flex-col md:flex-row gap-6 items-start">
        {movie.poster_path && (
          <img
            src={IMG_CDN + movie.poster_path}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg object-cover shadow-lg"
          />
        )}

        <div className="flex-1 text-white">
          <button
            onClick={onBack}
            className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Back
          </button>

          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          {movie.release_date && <p className="mb-2">Release: {movie.release_date}</p>}
          {movie.overview && <p className="mb-4">{movie.overview}</p>}

          {/* Watch Now Button */}
          <button className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition duration-300">
            Watch Now
          </button>
        </div>
      </div>

      {/* Trailer Below Info */}
      {trailerKey && (
        <div className="relative w-full mt-8 aspect-video">
          <iframe
            title="Trailer"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&loop=1&playlist=${trailerKey}`}
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
