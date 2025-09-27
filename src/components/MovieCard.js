import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        flex-shrink-0
        w-28 sm:w-36 md:w-44 lg:w-48
        pr-2 sm:pr-3 md:pr-4
        transition-transform duration-300 hover:scale-105
      "
    >
      <img
        alt="poster"
        src={IMG_CDN + posterPath}
        className="w-full h-auto rounded-md object-cover"
      />
    </div>
  );
};

export default MovieCard;
