import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { toast } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import facebook from "../../assets/facebook.png";
import github from "../../assets/github.png";
import google from "../../assets/google.png";
import twitter from "../../assets/twitter.png";
import { AuthContext } from "../../providers/AuthProviders";

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const auth = getAuth(app);
  const [err, setErr] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const emailRef = useRef();

  // Login with email password
  const submitLoginHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Validation with Regex
    if (password.length < 6) {
      setErr("Your password should be at least 6 character long.");
      return;
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setErr("Your password should be at least one special character.");
      return;
    } else if (!/(?=.*[A-Z])(?=.*[a-z])/.test(password)) {
      setErr(
        "Your password should be at least one upper and lower case letter."
      );
      return;
    } else if (!/(?=.*\d)/.test(password)) {
      setErr("Your password should be at least one digit.");
      return;
    }

    signIn(email, password)
      .then((userCredential) => {
        // Signed in
        setErr("");
        toast.success("Login Successfully!");
        event.target.reset();
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errForMsg = errorMessage.split(":");
        setErr(errForMsg[1]);
        console.log(`Error Message: ${errorMessage}`);
      });
  };

  // Forget password
  const forgetPassHandler = () => {
    const email = emailRef.current.value.trim();
    if (!email) {
      setErr("Please provide your email address.");
      return;
    }

    // Send email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setErr("");
        toast.success("Password reset link sent to your email address.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const errForToast = errorMessage.split(":");
        setErr(errForToast[1]);
        console.log(`Error Message: ${errorMessage}`);
        console.log(`Error Code: ${errorCode}`);
      });
  };

  // Login with google
  const handleGoogleLogin = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setErr("");
        toast.success("Login Successfully!");
        const user = result.user;
        console.log(user);

        // Send verification email
        sendEmailVerification(user).then(() => {
          toast.success("Verification email has been sent.");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const errForToast = errorMessage.split(":");
        setErr(errForToast[1]);
        console.log(`Error Message: ${errorMessage}`);
        console.log(`Error Code: ${errorCode}`);
      });
  };

  // Login with github
  const handleGithubLogin = () => {
    const githubProvider = new GithubAuthProvider();
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        setErr("");
        toast.success("Login Successfully!");
        const user = result.user;
        console.log(user);

        // Send verification email
        sendEmailVerification(user).then(() => {
          toast.success("Verification email has been sent.");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const errForToast = errorMessage.split(":");
        setErr(errForToast[1]);
        console.log(`Error Message: ${errorMessage}`);
        console.log(`Error Code: ${errorCode}`);
      });
  };

  // Login with twitter
  const handleTwitterLogin = () => {
    const twitterProvider = new TwitterAuthProvider();
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        setErr("");
        toast.success("Login Successfully!");
        const user = result.user;
        console.log(user);

        // Send verification email
        sendEmailVerification(user).then(() => {
          toast.success("Verification email has been sent.");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const errForToast = errorMessage.split(":");
        setErr(errForToast[1]);
        console.log(`Error Message: ${errorMessage}`);
        console.log(`Error Code: ${errorCode}`);
      });
  };

  // Login with facebook
  const handleFacebookLogin = () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        setErr("");
        toast.success("Login Successfully!");
        const user = result.user;
        console.log(user);

        // Send verification email
        sendEmailVerification(user).then(() => {
          toast.success("Verification email has been sent.");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const errForToast = errorMessage.split(":");
        setErr(errForToast[1]);
        console.log(`Error Message: ${errorMessage}`);
        console.log(`Error Code: ${errorCode}`);
      });
  };

  return (
    <section className="mt-12">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          {/* Error message */}
          {err ? (
            <div className="bg-white alert alert-error">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-500">{err}</span>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* Login form */}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form
              onSubmit={submitLoginHandler}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="bg-gray-50 flex border border-gray-300 rounded-lg">
                  <input
                    type={isVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                  <button
                    type="button"
                    className="px-2"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  onClick={forgetPassHandler}
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>

              {/* Alternative login */}
              <div className="flex flex-col">
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-b border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-gray-500">
                      Or login with
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <button onClick={handleGoogleLogin} type="button">
                    <img className="h-6 w-6" src={google} alt="" />
                  </button>
                  <button onClick={handleTwitterLogin} type="button">
                    <img className="h-6 w-6" src={twitter} alt="" />
                  </button>
                  <button onClick={handleGithubLogin} type="button">
                    <img className="h-6 w-6" src={github} alt="" />
                  </button>
                  <button onClick={handleFacebookLogin} type="button">
                    <img className="h-6 w-6" src={facebook} alt="" />
                  </button>
                </div>
              </div>

              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
