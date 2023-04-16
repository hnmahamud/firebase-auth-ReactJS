import React, { useContext, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import facebook from "../../assets/facebook.png";
import github from "../../assets/github.png";
import google from "../../assets/google.png";
import twitter from "../../assets/twitter.png";
import { AuthContext } from "../../providers/AuthProviders";

const Login = () => {
  const {
    user,
    signIn,
    passwordReset,
    sendVerificationEmail,
    googleSignIn,
    githubSignIn,
    twitterSignIn,
    facebookSignIn,
  } = useContext(AuthContext);

  const [err, setErr] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const emailRef = useRef();

  // Login with email password
  const submitLoginHandler = (event) => {
    event.preventDefault();
    setIsBtnLoading(true);
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
        setIsBtnLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errForMsg = errorMessage.split(":");
        setErr(errForMsg[1]);
        console.log(`Error Message: ${errorMessage}`);
        setIsBtnLoading(false);
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
    passwordReset(email)
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
    googleSignIn()
      .then((result) => {
        setErr("");
        toast.success("Login Successfully!");
        const user = result.user;
        console.log(user);

        // Send verification email
        sendVerificationEmail(user).then(() => {
          toast.success("Verification email has been sent.");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errForToast = errorMessage.split(":");
        setErr(errForToast[1]);
        console.log(`Error Message: ${errorMessage}`);
      });
  };

  // Login with github
  const handleGithubLogin = () => {
    githubSignIn()
      .then((result) => {
        setErr("");
        toast.success("Login Successfully!");
        const user = result.user;
        console.log(user);

        // Send verification email
        sendVerificationEmail(user).then(() => {
          toast.success("Verification email has been sent.");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errForToast = errorMessage.split(":");
        setErr(errForToast[1]);
        console.log(`Error Message: ${errorMessage}`);
      });
  };

  // Login with twitter
  const handleTwitterLogin = () => {
    twitterSignIn()
      .then((result) => {
        setErr("");
        toast.success("Login Successfully!");
        const user = result.user;
        console.log(user);

        // Send verification email
        sendVerificationEmail(user).then(() => {
          toast.success("Verification email has been sent.");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errForToast = errorMessage.split(":");
        setErr(errForToast[1]);
        console.log(`Error Message: ${errorMessage}`);
      });
  };

  // Login with facebook
  const handleFacebookLogin = () => {
    facebookSignIn()
      .then((result) => {
        setErr("");
        toast.success("Login Successfully!");
        const user = result.user;
        console.log(user);

        // Send verification email
        sendVerificationEmail(user).then(() => {
          toast.success("Verification email has been sent.");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errForToast = errorMessage.split(":");
        setErr(errForToast[1]);
        console.log(`Error Message: ${errorMessage}`);
      });
  };

  if (user) {
    return <Navigate to="/profile" replace={true}></Navigate>;
  }

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

              {isBtnLoading ? (
                <div className="text-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
              )}

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
