import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { USER_LOGO } from "../utils/constants";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p>User not found. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center pt-24 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-gray-300 hover:text-white flex items-center gap-2"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Profile Card */}
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center flex flex-col items-center gap-4">
        <img
          src={user.photoURL || USER_LOGO}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-red-600 shadow-lg"
        />
        <h1 className="text-3xl font-bold mt-2">{user.displayName || "User"}</h1>
        <p className="text-gray-300">{user.email}</p>
        <p className="text-gray-400 text-sm">User ID: {user.uid}</p>

        <div className="mt-6 border-t border-gray-700 pt-4 w-full">
          <p className="text-gray-400 text-sm">
            Joined MovieMate to explore endless entertainment 🎬
          </p>
        </div>

        <button
          onClick={() => navigate("/settings")}
          className="mt-6 py-2 px-6 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
        >
          Edit Settings
        </button>
      </div>
    </div>
  );
};

export default Profile;
