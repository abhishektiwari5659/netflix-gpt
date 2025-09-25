import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="flex">
        <button className="flex items-center gap-2 mx-2 bg-white text-black p-4 px-12 text-xl rounded-lg hover:bg-opacity-80">
          <FaPlay className="text-black" />
          Play
        </button>
        <button className="flex items-center gap-2 mx-2 bg-gray-500 text-white p-4 px-12 text-xl rounded-lg hover:bg-opacity-80">
          <BsInfoCircle className="text-white" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
