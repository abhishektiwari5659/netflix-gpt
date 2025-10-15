import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { USER_LOGO } from "../utils/constants";
import { updatePreferences } from "../utils/userSlice";
import { getAuth, sendPasswordResetEmail, updateEmail, sendEmailVerification } from "firebase/auth";

const Settings = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const auth = getAuth();

  // Preferences state
  const [theme, setTheme] = useState(user?.preferences?.theme || "dark");
  const [language, setLanguage] = useState(user?.preferences?.language || "English");
  const [notifications, setNotifications] = useState(user?.preferences?.notifications ?? true);

  // Security state
  const [newEmail, setNewEmail] = useState("");

  if (!user) return <div className="text-white p-6 text-center">You need to be logged in.</div>;

  // Preferences handlers
  const savePreferences = () => {
    dispatch(updatePreferences({ theme, language, notifications }));
    alert("Preferences saved!");
  };

  // Security handlers
  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert("Password reset email sent!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEmailChange = async () => {
    if (!newEmail) return alert("Enter a valid email");
    try {
      await updateEmail(auth.currentUser, newEmail);
      alert("Email updated successfully!");
      setNewEmail("");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSendVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      alert("Verification email sent!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white p-6 sm:p-12 flex justify-center">
      <div className="w-full max-w-4xl space-y-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-red-600 drop-shadow-lg">
          Profile & Settings
        </h1>

        {/* Profile Card */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-8 hover:scale-[1.01] transition-transform duration-300">
          <img
            src={user.photoURL || USER_LOGO}
            alt="Profile"
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-red-600 shadow-lg"
          />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-1">{user.displayName || "User"}</h2>
            <p className="text-gray-300 text-lg">{user.email}</p>
            <p className="text-gray-400 mt-1 text-sm">User ID: {user.uid}</p>
            {!user.emailVerified && (
              <button
                onClick={handleSendVerification}
                className="mt-3 py-2 px-5 bg-yellow-600 hover:bg-yellow-700 rounded-full text-sm font-semibold shadow-lg transition"
              >
                Verify Email
              </button>
            )}
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-3xl shadow-2xl space-y-6 hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-3xl font-semibold text-red-600 mb-4 drop-shadow-md">Preferences</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-6 h-6 accent-red-600"
              />
              <label className="font-medium">Enable Notifications</label>
            </div>
          </div>

          <button
            onClick={savePreferences}
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl"
          >
            Save Preferences
          </button>
        </div>

        {/* Security Card */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-3xl shadow-2xl space-y-6 hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-3xl font-semibold text-red-600 mb-4 drop-shadow-md">Security</h2>

          <button
            onClick={handlePasswordReset}
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl"
          >
            Reset Password
          </button>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center">
            <input
              type="email"
              placeholder="New email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="flex-1 p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              onClick={handleEmailChange}
              className="py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl"
            >
              Update Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
