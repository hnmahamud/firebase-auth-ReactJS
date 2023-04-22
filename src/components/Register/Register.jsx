import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../providers/AuthProviders";
// Blank user image
const photo =
  "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1682183923~exp=1682184523~hmac=7b363a7e2f6de1b8296fe22ea6eaceb24356ca04809ff110b92ad504d0c651d3";

const Register = () => {
  // Use context api
  const {
    createUser,
    sendVerificationEmail,
    userUpdate,
    setLoading,
    updateAuthData,
  } = useContext(AuthContext);

  // Use location and navigate for get the pathname where user wanted to go.
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  // State
  const [err, setErr] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isNotChecked, setIsNotChecked] = useState(true);

  // Email Validation with Regex
  // uncontrolled component => controlled component
  const emailValidation = (event) => {
    const email = event.target.value;

    if (email.length > 0) {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        setErr("Please provide a valid email");
        return;
      } else {
        setErr("");
        return;
      }
    } else {
      setErr("");
      return;
    }
  };

  // Password Validation with Regex
  // uncontrolled component => controlled component
  const passwordValidation = (event) => {
    const password = event.target.value;

    if (password.length > 0) {
      if (password.length < 6) {
        setErr("Your password should be at least 6 character long.");
        return;
      } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
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
      } else {
        setErr("");
        return;
      }
    } else {
      setErr("");
      return;
    }
  };

  // Registration with email password
  const submitRegHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;

    createUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // Update user profile
        userUpdate(name, photo)
          .then(() => {
            updateAuthData(email, name, photo);
            // Navigate to our destination
            navigate(from, { replace: true });
            setLoading(false);
            setIsNotChecked(true);
            event.target.reset();
          })
          .catch((error) => {
            // Navigate to our destination
            navigate(from, { replace: true });
            setLoading(false);
            setIsNotChecked(true);
            event.target.reset();
            console.log(error);
          });

        // Send verification email
        sendVerificationEmail(user).then(() => {
          toast.success(
            "Successfully registered! And verification email has been sent."
          );
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errForMsg = errorMessage.split(":");
        setErr(errForMsg[1]);
        console.log(`Error Message: ${errorMessage}`);
        setLoading(false);
      });
  };

  return (
    <section className="my-12">
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
          {/* Registration form */}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create and account
            </h1>
            <form
              onSubmit={submitRegHandler}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your name:
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email:
                </label>
                <input
                  type="email"
                  onChange={emailValidation}
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
                    onChange={passwordValidation}
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
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    onChange={() => setIsNotChecked(!isNotChecked)}
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500">
                    I accept the{" "}
                    <Link className="font-medium text-primary-600 hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>

              <button
                disabled={isNotChecked}
                type="submit"
                className="w-full text-white bg-blue-700 disabled:bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>

              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
