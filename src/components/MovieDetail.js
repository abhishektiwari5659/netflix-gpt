import { useEffect, useState } from "react";
import { IMG_CDN, API_OPTIONS } from "../utils/constants";
import MovieCard from "./MovieCard";

const MovieDetail = ({ movieId, type = "movie", onBack, onSelectMovie, onSelectCast }) => {
  const [data, setData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imdbId, setImdbId] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentVideoKey, setCurrentVideoKey] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=credits,external_ids`,
          API_OPTIONS
        );
        const json = await res.json();
        setData(json);
        setImdbId(json.external_ids?.imdb_id || null);
        if (json.credits?.cast) setCast(json.credits.cast);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTrailerAndVideos = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${movieId}/videos`,
          API_OPTIONS
        );
        const json = await res.json();
        if (json.results?.length > 0) {
          const trailer = json.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
          );
          setTrailerKey(trailer ? trailer.key : json.results[0].key);
          setVideos(json.results.filter((vid) => vid.site === "YouTube"));
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${movieId}/recommendations`,
          API_OPTIONS
        );
        const json = await res.json();
        if (json.results) setRecommendations(json.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
    fetchTrailerAndVideos();
    fetchRecommendations();
  }, [movieId, type]);

  if (!data) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* --- Player Modal --- */}
      {(showPlayer || currentVideoKey) && (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-black/70 transition-opacity duration-300">
    {/* Close Button */}
    <button
      onClick={() => {
        setShowPlayer(false);
        setCurrentVideoKey(null);
      }}
      className="absolute top-6 right-6 text-white text-3xl bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
    >
      ✕
    </button>

    {/* Player */}
{showPlayer && imdbId ? (
  <iframe
    title={`${type} - Video Player`} // Dynamic title
    src={`https://vidsrc.to/embed/${type}/${imdbId}`}
    allowFullScreen
    className="w-[90vw] h-[80vh] rounded-xl shadow-2xl transition-transform duration-500 scale-100"
  ></iframe>
) : (
  currentVideoKey && (
    <iframe
      title={`YouTube Video - ${currentVideoKey}`} // Dynamic title
      src={`https://www.youtube.com/embed/${currentVideoKey}?autoplay=1&mute=0&controls=1`}
      allowFullScreen
      className="w-[90vw] h-[80vh] rounded-xl shadow-2xl transition-transform duration-500 scale-100"
    ></iframe>
  )
)}

  </div>
)}


      {/* --- Hero Section --- */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        {trailerKey ? (
          <iframe
            className="w-full h-full object-cover absolute top-0 left-0"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${trailerKey}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        ) : (
          <div
            className="absolute w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${IMG_CDN}${data.backdrop_path})` }}
          ></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

        <div className="absolute bottom-10 left-6 sm:left-12 max-w-xl z-20">
          <h1 className="text-3xl sm:text-5xl font-bold mb-2">
            {data.title || data.name}
          </h1>
          {data.overview && (
            <p className="hidden sm:block text-sm sm:text-base text-gray-200 mb-4 line-clamp-3">
              {data.overview}
            </p>
          )}
          <button
            onClick={() => setShowPlayer(true)}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition"
          >
            ▶ Watch Now
          </button>
        </div>
      </div>

      {/* --- Info Section --- */}
      <div className="relative z-20 p-4 sm:p-6 md:p-12">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Back
        </button>

        <div className="text-sm text-gray-300 space-y-1 mb-6">
          {data.release_date && <p>Release: {data.release_date}</p>}
          {data.runtime && <p>Runtime: {data.runtime} mins</p>}
          {data.vote_average && (
            <p>Rating: ⭐ {data.vote_average.toFixed(1)} / 10</p>
          )}
          {data.genres && (
            <p>Genres: {data.genres.map((g) => g.name).join(", ")}</p>
          )}
        </div>
      </div>

      {/* --- Cast Section --- */}
      {cast.length > 0 && (
        <div className="p-4 sm:p-6 md:p-12">
          <h2 className="text-2xl font-bold mb-4">Cast</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="w-28 sm:w-32 flex-shrink-0 text-center cursor-pointer hover:opacity-80 transition"
                onClick={() => onSelectCast(actor.id)}
              >
                {actor.profile_path ? (
                  <img
                    src={IMG_CDN + actor.profile_path}
                    alt={actor.name}
                    className="w-28 sm:w-32 h-40 sm:h-44 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <div className="w-28 sm:w-32 h-40 sm:h-44 bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                    No Image
                  </div>
                )}
                <p className="text-xs sm:text-sm font-semibold">{actor.name}</p>
                <p className="text-xs text-gray-400">as {actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Related Videos Section --- */}
      {videos.length > 0 && (
        <div className="p-4 sm:p-6 md:p-12">
          <h2 className="text-2xl font-bold mb-4">Related Videos</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="w-60 flex-shrink-0 cursor-pointer group"
                onClick={() => setCurrentVideoKey(vid.key)}
              >
                <div className="relative">
                  <img
                    src={`https://img.youtube.com/vi/${vid.key}/hqdefault.jpg`}
                    alt={vid.name}
                    className="w-full h-36 sm:h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 ml-1"
                      >
                        <path d="M5 3v18l15-9L5 3z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-xs mt-1 text-gray-200 line-clamp-2">
                  {vid.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Recommendations Section --- */}
      {recommendations.length > 0 && (
        <div className="p-4 sm:p-6 md:p-12">
          <h2 className="text-2xl font-bold mb-4">More Like This</h2>
          <div className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide">
            {recommendations.map((rec) => (
              <MovieCard
                key={rec.id}
                posterPath={rec.poster_path}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  const recType = rec.media_type || type;
                  onSelectMovie(rec.id, recType);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
