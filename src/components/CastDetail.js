import { useEffect, useState } from "react";
import { IMG_CDN, API_OPTIONS } from "../utils/constants";
import MovieCard from "./MovieCard";

const CastDetail = ({ personId, onBack, onSelectMovie }) => {
  const [person, setPerson] = useState(null);
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTvCredits] = useState([]);
  const [knownFor, setKnownFor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!personId) return;

    const fetchPersonDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${personId}?append_to_response=movie_credits,tv_credits,images`,
          API_OPTIONS
        );
        const json = await res.json();
        setPerson(json);

        if (json.movie_credits?.cast) setMovieCredits(json.movie_credits.cast);
        if (json.tv_credits?.cast) setTvCredits(json.tv_credits.cast);

        // Combine known_for from movie + tv credits and sort by popularity
        const combined = [
          ...(json.movie_credits?.cast || []),
          ...(json.tv_credits?.cast || []),
        ];
        const sortedKnownFor = combined
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 10); // Top 10 known works
        setKnownFor(sortedKnownFor);

        if (json.images?.profiles) setImages(json.images.profiles);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPersonDetails();
  }, [personId]);

  if (!person) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-12">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
      >
        ⬅ Back
      </button>

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={
            person.profile_path
              ? IMG_CDN + person.profile_path
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={person.name}
          className="w-48 h-72 object-cover rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{person.name}</h1>
          {person.known_for_department && (
            <p className="text-gray-400 mb-1">
              Department: {person.known_for_department}
            </p>
          )}
          {person.birthday && <p>🎂 Born: {person.birthday}</p>}
          {person.place_of_birth && <p>📍 From: {person.place_of_birth}</p>}
          {person.popularity && (
            <p>🔥 Popularity: {person.popularity.toFixed(1)}</p>
          )}
          {person.biography && (
            <p className="mt-4 text-gray-300 max-w-2xl leading-relaxed">
              {person.biography}
            </p>
          )}
        </div>
      </div>

      {/* Known For Section */}
      {knownFor.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">🎞️ Known For</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {knownFor.map((item) => (
              <MovieCard
                key={item.id}
                posterPath={item.poster_path}
                title={item.title || item.name}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  onSelectMovie(item.id, item.media_type || "movie");
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Movie Credits */}
      {movieCredits.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">🎬 Movies</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {movieCredits.map((movie) => (
              <MovieCard
                key={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  onSelectMovie(movie.id, "movie");
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* TV Credits */}
      {tvCredits.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">📺 TV Shows</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {tvCredits.map((tv) => (
              <MovieCard
                key={tv.id}
                posterPath={tv.poster_path}
                title={tv.name}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  onSelectMovie(tv.id, "tv");
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gallery / Related Images */}
      {images.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">🖼️ Gallery</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {images.slice(0, 12).map((img, index) => (
              <img
                key={index}
                src={
                  img.file_path
                    ? IMG_CDN + img.file_path
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={`Gallery ${index + 1}`}
                className="w-48 h-72 object-cover rounded-lg hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CastDetail;
