import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CastDetail from "./CastDetail";
import MovieDetail from "./MovieDetail";

const CastDetailWrapper = () => {
  const { id } = useParams(); // cast ID from URL
  const navigate = useNavigate();

  const [selectedCast, setSelectedCast] = useState({ id });
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Update selectedCast when URL changes
  useEffect(() => {
    if (id) {
      setSelectedCast({ id });
      setSelectedMovie(null);
    }
  }, [id]);

  // 🎬 If a movie is selected from cast detail
  if (selectedMovie) {
    return (
      <MovieDetail
        movieId={selectedMovie.id}
        type={selectedMovie.type || "movie"}
        onBack={() => setSelectedMovie(null)}
        onSelectMovie={(movieId, movieType) =>
          navigate(`/movie/${movieType}/${movieId}`)
        }
        onSelectCast={(castId) => navigate(`/cast/${castId}`)}
      />
    );
  }

  // 🧑‍🎤 Cast detail page
  return (
    <CastDetail
      personId={selectedCast.id}
      onBack={() => navigate(-1)}
      onSelectMovie={(movieId, movieType) =>
        setSelectedMovie({ id: movieId, type: movieType })
      }
    />
  );
};

export default CastDetailWrapper;
