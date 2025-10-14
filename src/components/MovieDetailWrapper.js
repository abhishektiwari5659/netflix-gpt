import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import CastDetail from "./CastDetail";

const MovieDetailWrapper = () => {
  const { id, type } = useParams(); 
  const navigate = useNavigate();

  const [selectedMovie, setSelectedMovie] = useState({ id, type });
  const [selectedCast, setSelectedCast] = useState(null);

  // If cast is selected, show CastDetail instead
  if (selectedCast) {
    return (
      <CastDetail
        personId={selectedCast.id}
        onBack={() => setSelectedCast(null)} // go back to movie details
        onSelectMovie={(id, type) => setSelectedMovie({ id, type })} // navigate to another movie
      />
    );
  }

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

  return (
    <MovieDetail
      movieId={selectedMovie.id}
      type={selectedMovie.type}
      onBack={() => navigate(-1)}
      onSelectMovie={(id, type) => setSelectedMovie({ id, type })}
      onSelectCast={(id) => setSelectedCast({ id })}
    />
  );
};

export default MovieDetailWrapper;
