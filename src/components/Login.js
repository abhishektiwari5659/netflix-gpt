import { useState, useRef } from "react";
import Header from "./Header";
import { checkValid } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useRef();
  const email = useRef(null);
  const password = useRef(null);

  const handleBtn = () => {
    const message = checkValid(email.current.value, password.current.value);
    setErrMsg(message);
    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          setErrMsg(error.code + " - " + error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          setErrMsg(error.code + " - " + error.message);
        });
    }
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setErrMsg(null);
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/54d96d4e-f4b3-4855-b6a8-c5971400072e/web/IN-en-20250915-TRIFECTA-perspective_83ce0f4c-a907-44f0-9d99-07f5109b0a61_small.jpg')",
        }}
      ></div>

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md bg-black bg-opacity-90 p-8 sm:p-10 rounded-lg text-white flex flex-col"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">{isSignIn ? "Sign In" : "Sign Up"}</h1>
          {!isSignIn && (
            <input
              ref={name}
              type="text"
              placeholder="Enter Name"
              className="p-4 mb-4 w-full bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-[#e50914]"
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Enter Email"
            className="p-4 mb-4 w-full bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-[#e50914]"
          />
          <input
            ref={password}
            type="password"
            placeholder="Enter Password"
            className="p-4 mb-4 w-full bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-[#e50914]"
          />
          {errMsg && <p className="text-[#e50914] font-semibold mb-4 text-center">{errMsg}</p>}
          <button
            onClick={handleBtn}
            className="w-full py-3 sm:py-4 bg-[#e50914] rounded-lg font-semibold hover:bg-red-700 transition mb-4"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-center text-sm sm:text-base">
            {isSignIn ? (
              <>
                New to Netflix-GPT?{" "}
                <span className="cursor-pointer text-white font-bold hover:underline" onClick={toggleForm}>
                  Sign Up
                </span>{" "}
                now
              </>
            ) : (
              <>
                Already a user?{" "}
                <span className="cursor-pointer text-white font-bold hover:underline" onClick={toggleForm}>
                  Sign In
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
