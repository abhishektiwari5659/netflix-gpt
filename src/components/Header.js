import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANG, USER_LOGO } from "../utils/constants";
import { toggleGpt } from "../utils/gptSlice";
import { changeLang } from "../utils/congifSlice";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGpt = useSelector((store) => store.gpt.showGpt);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));

        if (window.location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch, navigate]);

  // Sign out
  const doSignOut = () => {
    signOut(auth).catch(() => navigate("/error"));
  };

  // GPT toggle
  const handleGPT = () => {
    dispatch(toggleGpt());

    // Ensure GPT works on Browse, Anime, Series
    const path = window.location.pathname;
    if (path !== "/browse" && path !== "/anime" && path !== "/series") {
      navigate("/browse");
    }
  };

  // Language change
  const langChange = (e) => {
    dispatch(changeLang(e.target.value));
  };

  return (
    <header className="fixed top-0 left-0 w-full px-4 sm:px-6 py-3 bg-gradient-to-b from-black z-50 flex justify-between items-center">
      {/* Logo */}
      <img
        src={LOGO}
        alt="Netflix Logo"
        className="w-24 sm:w-32 md:w-40 cursor-pointer"
        onClick={() => navigate("/browse")}
      />

      {/* Desktop Nav */}
      {user && (
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={() => navigate("/series")} className="text-white hover:text-red-500">
            Series
          </button>
          <button onClick={() => navigate("/anime")} className="text-white hover:text-red-500">
            Anime
          </button>

          {showGpt && (
            <select
              className="p-2 bg-[#e50914] text-white rounded"
              onChange={langChange}
            >
              {SUPPORTED_LANG.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="bg-[#e50914] rounded-lg py-2 px-4 text-white font-semibold hover:bg-red-600 transition"
            onClick={handleGPT}
          >
            {showGpt ? "Go Back" : "Get what you like"}
          </button>

          <img
            className="w-10 h-10 rounded cursor-pointer border-2 border-transparent hover:border-white transition duration-300"
            src={USER_LOGO}
            alt="user-logo"
          />

          <button
            onClick={doSignOut}
            className="text-white font-bold hover:underline"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Mobile Menu Icon */}
      {user && (
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      )}

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-black bg-opacity-90 rounded-lg shadow-lg p-4 flex flex-col space-y-3 w-48 md:hidden">
          <button
            onClick={() => { navigate("/series"); setMenuOpen(false); }}
            className="text-white hover:text-red-500"
          >
            Series
          </button>
          <button
            onClick={() => { navigate("/anime"); setMenuOpen(false); }}
            className="text-white hover:text-red-500"
          >
            Anime
          </button>

          {showGpt && (
            <select
              className="p-2 bg-[#e50914] text-white rounded"
              onChange={langChange}
            >
              {SUPPORTED_LANG.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="bg-[#e50914] rounded-lg py-2 px-3 text-white font-semibold hover:bg-red-600 transition"
            onClick={handleGPT}
          >
            {showGpt ? "Go Back" : "Get what you like"}
          </button>

          <img
            className="w-10 h-10 rounded self-center border-2 border-transparent hover:border-white transition duration-300"
            src={USER_LOGO}
            alt="user-logo"
          />

          <button
            onClick={doSignOut}
            className="text-white font-bold hover:underline"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
