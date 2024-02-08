import React from "react";

export default function () {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-4 md:border-r-4 md:min-h-screen">
        <form className="flex flex-col gap-10">
          <div className="flex items-center gap-3 ">
            <label className="whitespace-nowrap font-bold">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search Here..."
              className="bg-white p-3  w-full rounded-xl transform hover:scale-90 transition-transform duration-700"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-bold">Type:</label>
            <div className="flex gap-2 transform hover:scale-90 transition-transform duration-700">
              <input type="checkbox" id="all" className="w-5" />
              <span className="">Rent & Sale</span>
            </div>
            <div className="flex gap-2 transform hover:scale-90 transition-transform duration-700">
              <input type="checkbox" id="rent" className="w-5" />
              <span className="">Rent</span>
            </div>
            <div className="flex gap-2 transform hover:scale-90 transition-transform duration-700">
              <input type="checkbox" id="sale" className="w-5" />
              <span className="">Sale</span>
            </div>
            <div className="flex gap-2 transform hover:scale-90 transition-transform duration-700">
              <input type="checkbox" id="offer" className="w-5" />
              <span className="">Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-bold">Amenities:</label>
            <div className="flex gap-2 transform hover:scale-90 transition-transform duration-700">
              <input type="checkbox" id="parking" className="w-5" />
              <span className="">Parking</span>
            </div>
            <div className="flex gap-2 transform hover:scale-90 transition-transform duration-700">
              <input type="checkbox" id="furnished" className="w-5" />
              <span className="">Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-bold ">Sort:</label>
            <select
              id="sort_order"
              className="borded rounded-xl p-3 transform hover:scale-90 transition-transform duration-700"
            >
              <option value="">Price High to Low</option>
              <option value="">Price Low to High</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>

          <button className="bg-black text-white p-3 rounded-xl uppercase transform hover:scale-90 transition-transform duration-700">
            Search
          </button>
        </form>
      </div>
      <div className="text-4xl font-semibold border-b p-3 mt-5">
        <h1>Listing Results: </h1>
      </div>
    </div>
  );
}
