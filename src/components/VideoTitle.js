import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[30%] sm:pt-[25%] lg:pt-[20%] px-4 sm:px-12 lg:px-24 absolute text-white bg-gradient-to-r from-black">
      
      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
        {title}
      </h1>

      
      <p className="py-4 sm:py-6 text-sm sm:text-base lg:text-lg w-full sm:w-3/4 lg:w-1/2">
        {overview}
      </p>

     
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 mt-2 w-full sm:w-auto">
        
        <button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-black py-2 px-4 sm:py-3 sm:px-8 lg:py-4 lg:px-12 text-base sm:text-lg lg:text-xl font-semibold rounded-md sm:rounded-lg hover:bg-opacity-80 transition">
          <FaPlay className="text-black text-sm sm:text-base lg:text-lg" />
          Play
        </button>

        
        <button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gray-500 text-white py-2 px-4 sm:py-3 sm:px-8 lg:py-4 lg:px-12 text-base sm:text-lg lg:text-xl font-semibold rounded-md sm:rounded-lg hover:bg-opacity-80 transition">
          <BsInfoCircle className="text-white text-sm sm:text-base lg:text-lg" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
