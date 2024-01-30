import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const pagesWithSearchBar = ["/"];
  const shouldRenderSearchBar = pagesWithSearchBar.includes(location.pathname);

  return (
    <header className="bg-slate-200 shadow-orange-400">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold sm: text-xl flex flex-wrap">
            <span className="text-red-600">Dilip's</span>
            <span className="text-yellow-800">‎ Estate Lisitings</span>
          </h1>
        </Link>

        {shouldRenderSearchBar && (
          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search Here"
              className="bg-transparent focus: outline-none w-24 sm:w-64 "
            />
            <FaSearch className="bg-slate-100" />
          </form>
        )}
        <ul className="flex gap-4">
          <Link to="/">
            <li className=" text-slate-950 hover:underline">HOME</li>
          </Link>

          <Link to="/about">
            <li className=" text-slate-950 hover:underline">ABOUT</li>
          </Link>

          <Link to="/sign-in">
            <li className=" text-slate-950 hover:underline"> SIGN IN</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
