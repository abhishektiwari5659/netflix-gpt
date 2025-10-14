import { useSelector, useDispatch } from "react-redux";
import { updatePreferences } from "../utils/userSlice";
import { useState } from "react";
import { USER_LOGO } from "../utils/constants";

const Settings = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(user?.preferences?.theme || "dark");
  const [language, setLanguage] = useState(user?.preferences?.language || "English");
  const [notifications, setNotifications] = useState(user?.preferences?.notifications ?? true);

  const savePreferences = () => {
    dispatch(updatePreferences({ theme, language, notifications }));
    alert("Preferences saved!");
  };

  if (!user) return <div className="text-white p-6">You need to be logged in.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-12 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-red-600">Profile & Settings</h1>

        {/* Profile Card */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl mb-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={user.photoURL || USER_LOGO}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-red-600"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user.displayName || "User"}</h2>
            <p className="text-gray-300 mt-1">{user.email}</p>
            <p className="text-gray-400 mt-2 text-sm">User ID: {user.uid}</p>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-red-600">Preferences</h2>

          {/* Theme */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          {/* Language */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-5 h-5 accent-red-600 mr-3"
            />
            <label className="font-medium">Enable Notifications</label>
          </div>

          <button
            onClick={savePreferences}
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
