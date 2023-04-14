import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-base-200">
      <div className="md:w-[80%] md:mx-auto navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="flex flex-col gap-4 text-subTitle dropdown-content mt-3 p-2 shadow bg-base-200 w-52"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500" : ""
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500" : ""
                  }
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
          <Link to="/">
            <h3 className="text-gray-600 text-3xl font-extrabold">Auth</h3>
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="text-subTitle flex gap-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
              >
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
