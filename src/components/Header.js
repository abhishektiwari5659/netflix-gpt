import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANG, USER_LOGO } from "../utils/constants";
import { toggleGpt } from "../utils/gptSlice";
import { changeLang } from "../utils/congifSlice"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGpt = useSelector(store => store.gpt.showGpt);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch, navigate]);

  const doSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleGPT = () => {
    dispatch(toggleGpt());
  };

  const langChange = (e) => {
    dispatch(changeLang(e.target.value))
  }

  return (
    <div className="absolute top-0 left-0 w-screen px-8 py-2 bg-gradient-to-b from-black z-20 flex justify-between items-center">
      <img src={LOGO} alt="Netflix Logo" className="w-40 cursor-pointer" />
      {user && (
        <div className="flex items-center space-x-4">
          {showGpt && <select className="p-2 bg-[#e50914] text-white rounded" onChange={langChange}>
            {SUPPORTED_LANG.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            className="bg-[#e50914] rounded-lg py-2 px-4 text-white font-semibold hover:bg-red-600 transition"
            onClick={handleGPT}
          >
            {showGpt ? "Go Back to Explore Movies" : "Get what you like"}
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
    </div>
  );
};

export default Header;
