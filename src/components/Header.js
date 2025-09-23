import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate()
  const user = useSelector(store => store.user);
  const doSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
  navigate("/error")
});
  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
        alt="Netflix Logo"  
        className="w-40"
      />
      {user && <div className="flex">
        <img className="w-12 h-12 mx-4" src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp" alt="user-logo" />
        <button onClick={doSignOut} className="text-white font-bold"> Sign Out</button>
      </div>}
    </div>
  )
}

export default Header;
