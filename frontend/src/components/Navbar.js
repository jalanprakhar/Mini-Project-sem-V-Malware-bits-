/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../img/logo.png";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import maleUser from "../img/profuser.svg";

export default function Navbar({ user}) {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const ref = useRef();

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    removeCookie("AuthToken");
    removeCookie("UserId");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="fixed w-full top-0 z-20" ref={ref}>
      <nav
        className="relative flex flex-wrap items-center justify-between px-2 py-1 shadow-lg md:shadow-md mb-3 bg-white"
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-2xl leading-relaxed mr-4 py-2 whitespace-nowrap text-[#fd2f6e] flex flex-row"
              to="/"
            >
              <img src={logo} className="h-10 mt-2 mr-1" alt="logo" />
              <span className="text-[#028ABE] mt-2">MalwareBits</span>
            </Link>
          </div>
          <div
            className="lg:flex flex-grow items-center"
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto justify-center lg:items-center">
              {!user && (
                <li className="nav-item">
                  <Link
                    className={
                      splitLocation[1] === "signup"
                        ? "px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#024481] hover:opacity-75 lg:border-b-2 border-[#024481]"
                        : "px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#024481] hover:opacity-75"
                    }
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              )}
              {!user && (
                <li className="nav-item">
                  <Link
                    className={
                      splitLocation[1] === "login"
                        ? "px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#024481] hover:opacity-75 lg:border-b-2 border-[#024481]"
                        : "px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#024481] hover:opacity-75"
                    }
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-lg font-semibold leading-snug hover:opacity-75"
                    to="/profile"
                    
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    <img
                      src={user.img_url ? user.img_url : maleUser}
                      className="w-11 h-11 rounded-full"
                    />
                  </Link>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-lg font-semibold leading-snug text-[#024481] hover:opacity-75"
                    to="/"
                    onClick={handleLogout}
                  >
                    <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
