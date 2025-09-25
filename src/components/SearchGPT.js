
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestion from "./GPTMovieSuggestion";

const SearchGPT = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://assets.nflxext.com/ffe/siteui/vlv3/54d96d4e-f4b3-4855-b6a8-c5971400072e/web/IN-en-20250915-TRIFECTA-perspective_83ce0f4c-a907-44f0-9d99-07f5109b0a61_small.jpg)`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative z-10">
        <GPTSearchBar />
        <GPTMovieSuggestion />
      </div>
    </div>
  );
};

export default SearchGPT;
