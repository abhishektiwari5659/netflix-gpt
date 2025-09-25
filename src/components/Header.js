import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_LOGO } from "../utils/constants";
import { toggleGpt } from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(store => store.user);

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
    signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
  navigate("/error")
});
  }

  const handleGPT = () => {
    dispatch(toggleGpt());
  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img 
        src={LOGO} 
        alt="Netflix Logo"  
        className="w-40"
      />
      {user && <div className="flex">
        <button className="bg-[#e50914] rounded-lg py-2 px-2 mx-4" onClick={handleGPT}>Get what you like</button>
        <img className="w-10 h-10 rounded cursor-pointer border-2 border-transparent hover:border-white transition duration-300" src={USER_LOGO} alt="user-logo" />
        <button onClick={doSignOut} className="text-white font-bold"> Sign Out</button>
      </div>}
    </div>
  )
}

export default Header;
