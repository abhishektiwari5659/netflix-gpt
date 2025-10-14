import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { SUPPORTED_LANG, USER_LOGO, API_OPTIONS, IMG_CDN } from "../utils/constants";
import { toggleGpt } from "../utils/gptSlice";
import { changeLang } from "../utils/congifSlice";
import { Menu, X, LogOut, User, Settings, Search } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGpt = useSelector((store) => store.gpt.showGpt);
  const searchRef = useRef(null);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        if (window.location.pathname === "/") navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch, navigate]);

  const doSignOut = () => signOut(auth).catch(() => navigate("/error"));
  const handleGPT = () => {
    dispatch(toggleGpt());
    const path = window.location.pathname;
    if (path !== "/browse" && path !== "/anime" && path !== "/series") navigate("/browse");
  };
  const langChange = (e) => dispatch(changeLang(e.target.value));

  // TMDB Search
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(searchTerm)}`,
          API_OPTIONS
        );
        const json = await res.json();
        setSearchResults(json.results || []);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchResults([]);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMovie = (id, type) => {
    setSearchTerm("");
    setSearchResults([]);
    setMenuOpen(false); // close mobile menu if open
    navigate(`/movie/${type}/${id}`);
  };

  return (
    <header className="fixed top-0 left-0 w-full px-4 sm:px-6 py-3 bg-gradient-to-b from-black z-50 flex justify-between items-center">
      <h1
        onClick={() => navigate("/browse")}
        className="text-[#e50914] font-extrabold text-2xl sm:text-3xl md:text-4xl cursor-pointer tracking-wide"
        style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: "1px" }}
      >
        MovieMate
      </h1>

      {user && (
        <div className="hidden md:flex items-center space-x-6 relative">
          <button onClick={() => navigate("/series")} className="text-white hover:text-red-500">Series</button>
          <button onClick={() => navigate("/anime")} className="text-white hover:text-red-500">Anime</button>

          {/* Search */}
          <div ref={searchRef} className="relative w-72">
            <div className="flex items-center bg-[#333] rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-2 bg-[#333] text-white focus:outline-none w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="text-white mr-2" size={18} />
            </div>

            {searchResults.length > 0 && (
              <div className="absolute top-10 left-0 w-full bg-black bg-opacity-95 border border-gray-700 rounded-lg shadow-lg z-50 p-2 flex flex-col space-y-1 max-h-96 overflow-y-auto animate-slideDown">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectMovie(item.id, item.media_type)}
                    className="flex items-center gap-3 text-white px-2 py-1 hover:bg-red-600 rounded transition"
                  >
                    {item.poster_path ? (
                      <img
                        src={IMG_CDN + item.poster_path}
                        alt={item.title || item.name}
                        className="w-12 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-16 bg-gray-700 rounded flex items-center justify-center text-xs">No Image</div>
                    )}
                    <div className="text-left">
                      <p className="font-semibold">{item.title || item.name}</p>
                      {item.release_date && <p className="text-xs text-gray-400">{item.release_date}</p>}
                      {item.media_type && <p className="text-xs text-gray-400 capitalize">{item.media_type}</p>}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {showGpt && (
            <select className="p-2 bg-[#e50914] text-white rounded" onChange={langChange}>
              {SUPPORTED_LANG.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              ))}
            </select>
          )}

          <button
            className="bg-[#e50914] rounded-lg py-2 px-4 text-white font-semibold hover:bg-red-600 transition"
            onClick={handleGPT}
          >
            {showGpt ? "Go Back" : "AI Picks for You"}
          </button>

          {/* Profile */}
          <div className="relative">
            <img
              className="w-10 h-10 rounded cursor-pointer border-2 border-transparent hover:border-white transition duration-300"
              src={USER_LOGO}
              alt="user-logo"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            {profileOpen && (
              <div className="absolute right-0 mt-3 bg-black bg-opacity-95 border border-gray-700 rounded-lg shadow-lg w-48 p-2 text-white flex flex-col space-y-2 z-50 animate-fadeIn">
                <button onClick={() => { setProfileOpen(false); navigate("/profile"); }} className="flex items-center gap-2 hover:text-red-500 px-3 py-2">
                  <User size={18} /> Profile
                </button>
                <button onClick={() => { setProfileOpen(false); navigate("/settings"); }} className="flex items-center gap-2 hover:text-red-500 px-3 py-2">
                  <Settings size={18} /> Settings
                </button>
                <hr className="border-gray-700" />
                <button onClick={() => { setProfileOpen(false); doSignOut(); }} className="flex items-center gap-2 text-red-500 font-semibold px-3 py-2 hover:text-white">
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {user && (
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      )}

      {menuOpen && (
        <div className="absolute top-16 right-4 bg-black bg-opacity-90 rounded-lg shadow-lg p-4 flex flex-col space-y-3 w-48 md:hidden">
          <button onClick={() => { navigate("/series"); setMenuOpen(false); }} className="text-white hover:text-red-500">Series</button>
          <button onClick={() => { navigate("/anime"); setMenuOpen(false); }} className="text-white hover:text-red-500">Anime</button>

          {/* Mobile Search */}
          <div ref={searchRef} className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 bg-[#333] text-white rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-10 left-0 w-full bg-black bg-opacity-95 border border-gray-700 rounded-lg shadow-lg p-2 flex flex-col space-y-1 max-h-40 overflow-y-auto z-50">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectMovie(item.id, item.media_type)}
                    className="text-white text-left px-2 py-1 hover:bg-red-600 rounded flex items-center gap-2"
                  >
                    {item.title || item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {showGpt && (
            <select className="p-2 bg-[#e50914] text-white rounded" onChange={langChange}>
              {SUPPORTED_LANG.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              ))}
            </select>
          )}

          <button className="bg-[#e50914] rounded-lg py-2 px-3 text-white font-semibold hover:bg-red-600 transition" onClick={handleGPT}>
            {showGpt ? "Go Back" : "Ai Picks for You"}
          </button>

          <hr className="border-gray-700" />
          <button onClick={() => navigate("/profile")} className="flex items-center gap-2 text-white hover:text-red-500">
            <User size={18} /> Profile
          </button>
          <button onClick={() => navigate("/settings")} className="flex items-center gap-2 text-white hover:text-red-500">
            <Settings size={18} /> Settings
          </button>
          <button onClick={doSignOut} className="flex items-center gap-2 text-red-500 font-semibold hover:text-white">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
