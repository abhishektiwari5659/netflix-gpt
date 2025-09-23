import { useState, useRef } from "react"
import Header from "./Header"
import { checkValid } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [errMsg, setErrMsg] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const name = useRef()
    const email = useRef(null);
    const password = useRef(null);

    const handleBtn = () => {
        const message = checkValid(email.current.value, password.current.value);
        setErrMsg(message);
        if (message) return

        if (!isSignIn) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                    }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
                        navigate("/browse")
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });

                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrMsg(errorCode + "-" + errorMessage)
                    // ..
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    navigate("/browse")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrMsg(errorCode + "-" + errorMessage)
                });
        }


    }
    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    }
    return (
        <div>
            <Header />
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://assets.nflxext.com/ffe/siteui/vlv3/54d96d4e-f4b3-4855-b6a8-c5971400072e/web/IN-en-20250915-TRIFECTA-perspective_83ce0f4c-a907-44f0-9d99-07f5109b0a61_small.jpg')",
                }}
            ></div>

            <form onSubmit={(e) => { e.preventDefault() }} className="w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-90">
                <h1 className="font-bold text-3xl py-4">{isSignIn ? "Sign In" : "Sign Up"}</h1>
                {!isSignIn && <input ref={name} type="text" placeholder="Enter Name" className="p-4 my-4 w-full bg-gray-800" />}
                <input ref={email} type="email" placeholder="Enter Email" className="p-4 my-4 w-full bg-gray-800" />
                <input ref={password} type="password" placeholder="Enter password" className="p-4 my-4 w-full bg-gray-800" />
                <p className="font-bold text-lg text-[#e50914]">{errMsg}</p>
                <button className="p-4 my-6 rounded-lg text-white bg-[#e50914] w-full" onClick={handleBtn}>{isSignIn ? "Sign In" : "Sign Up"}</button>
                <p>
                    {isSignIn ? (
                        <>
                            New to Netflix-GPT?{" "}
                            <b className="cursor-pointer" onClick={toggleForm}>
                                Sign Up
                            </b>{" "}
                            Now
                        </>
                    ) : (
                        <>
                            Already a user?{" "}
                            <b className="cursor-pointer" onClick={toggleForm}>
                                Sign In
                            </b>
                        </>
                    )}
                </p>

            </form>
        </div>
    )
}

export default Login;