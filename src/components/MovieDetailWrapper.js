import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import CastDetail from "./CastDetail";

const MovieDetailWrapper = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();

  const [selectedMovie, setSelectedMovie] = useState({ id, type });
  const [selectedCast, setSelectedCast] = useState(null);

  // Update selectedMovie whenever URL params change
  useEffect(() => {
    if (id && type) {
      setSelectedMovie({ id, type });
      setSelectedCast(null);
    }
  }, [id, type]);

  // 🧩 When cast selected, show CastDetail
  if (selectedCast) {
    return (
      <CastDetail
        personId={selectedCast.id}
        onBack={() => setSelectedCast(null)} // go back to movie detail
        onSelectMovie={(movieId, movieType) => {
          setSelectedCast(null);
          navigate(`/movie/${movieType}/${movieId}`);
        }}
      />
    );
  }

  // ❌ Safety check
  if (!selectedMovie) {
    return (
      <div className="text-white text-center mt-20">
        <h2>No movie selected</h2>
        <button
          className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  // 🎬 Movie detail page
  return (
    <MovieDetail
      movieId={selectedMovie.id}
      type={selectedMovie.type}
      onBack={() => navigate(-1)}
      onSelectMovie={(movieId, movieType) =>
        navigate(`/movie/${movieType}/${movieId}`)
      }
      onSelectCast={(castId) => setSelectedCast({ id: castId })}
    />
  );
};

export default MovieDetailWrapper;
