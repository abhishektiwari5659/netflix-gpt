import { useState } from "react"
import Header from "./Header"

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    }
    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/54d96d4e-f4b3-4855-b6a8-c5971400072e/web/IN-en-20250915-TRIFECTA-perspective_83ce0f4c-a907-44f0-9d99-07f5109b0a61_small.jpg" alt="bg-img">
                </img>
            </div>
            <form className="w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-90">
                <h1 className="font-bold text-3xl py-4">{isSignIn ? "Sign In" : "Sign Up"}</h1>
                {!isSignIn && <input type="text" placeholder="Enter Name" className="p-4 my-4 w-full bg-gray-800" />}
                <input type="email" placeholder="Enter Email" className="p-4 my-4 w-full bg-gray-800" />
                <input type="password" placeholder="Enter password" className="p-4 my-4 w-full bg-gray-800" />
                <button className="p-4 my-6 rounded-lg text-white bg-[#e50914] w-full">{isSignIn ? "Sign In" : "Sign Up"}</button>
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