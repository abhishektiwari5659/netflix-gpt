import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_LOGO } from "../utils/constants";

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
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img 
        src={LOGO} 
        alt="Netflix Logo"  
        className="w-40"
      />
      {user && <div className="flex">
        <img className="w-12 h-12 mx-4" src={USER_LOGO} alt="user-logo" />
        <button onClick={doSignOut} className="text-white font-bold"> Sign Out</button>
      </div>}
    </div>
  )
}

export default Header;
