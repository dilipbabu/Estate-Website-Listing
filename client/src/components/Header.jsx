import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  // Function to check if the current location is the Profile page
  const isProfilePage = location.pathname === "/profile";

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-zinc-300 shadow-red-700">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold sm:text-xl flex flex-wrap transform hover:scale-90 transition-transform duration-700">
            <span className="text-red-600">Dilip's</span>
            <span className="text-yellow-800">‎ Estate Listings</span>
          </h1>
        </Link>

        {/* Conditionally render the search bar if the current page is not the Profile page */}
        {!isProfilePage && (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 p-3 rounded-lg flex items-center transform hover:scale-90 transition-transform duration-700"
          >
            <input
              type="text"
              placeholder="Search Here"
              className="bg-transparent focus:outline-none w-24 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="bg-slate-100" />
            </button>
          </form>
        )}

        <ul className="flex gap-7">
          <Link to="/">
            <li className="text-slate-950 hover:underline transform hover:scale-90 transition-transform duration-500">
              HOME
            </li>
          </Link>

          <Link to="/about">
            <li className="text-slate-950 hover:underline transform hover:scale-90 transition-transform duration-500">
              ABOUT
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-9 w-10 object-cover hover:transform hover:scale-90 transition-transform duration-500"
                src={currentUser.avatar}
                alt="Profile"
              />
            ) : (
              <li className="text-slate-950 hover:underline transform hover:scale-90 transition-transform duration-500">
                SIGN IN
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
