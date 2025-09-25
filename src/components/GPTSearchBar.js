
const GPTSearchBar = () => {
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-11/12 md:w-1/2 backdrop-blur-md bg-black/50 rounded-xl shadow-lg grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 col-span-9 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-300 focus:outline-none"
          placeholder="What's your type..."
        />
        <button
          type="submit"
          className="col-span-3 m-4 py-2 px-4 bg-[#e50914] hover:bg-red-800 text-white font-semibold rounded-lg transition"
        >
          Give me
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
