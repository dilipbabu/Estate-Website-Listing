import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const location = useLocation();
  const pagesWithSearchBar = ["/"];
  const shouldRenderSearchBar = pagesWithSearchBar.includes(location.pathname);

  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-zinc-300 shadow-red-700">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold sm: text-xl flex flex-wrap transform hover:scale-90 transition-transform duration-700">
            <span className="text-red-600">Dilip's</span>
            <span className="text-yellow-800">‎ Estate Lisitings</span>
          </h1>
        </Link>

        {shouldRenderSearchBar && (
          <form className="bg-slate-100 p-3 rounded-lg flex items-center transform hover:scale-90 transition-transform duration-700">
            <input
              type="text"
              placeholder="Search Here"
              className="bg-transparent focus: outline-none w-24 sm:w-64 "
            />
            <FaSearch className="bg-slate-100" />
          </form>
        )}
        <ul className="flex gap-7">
          <Link to="/">
            <li className=" text-slate-950 hover:underline transform hover:scale-90 transition-transform duration-500">
              HOME
            </li>
          </Link>

          <Link to="/about">
            <li className=" text-slate-950 hover:underline transform hover:scale-90 transition-transform duration-500">
              ABOUT
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-9 w-10 object-cover hover: transform hover:scale-90 transition-transform duration-500"
                src={currentUser.avatar}
                alt="Profile"
              />
            ) : (
              <li className=" text-slate-950 hover:underline transform hover:scale-90 transition-transform duration-500">
                {" "}
                SIGN IN
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
