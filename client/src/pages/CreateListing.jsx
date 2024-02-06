import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-5 hover:opacity-90 transform hover:scale-90 transition-transform duration-700">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Property Name"
            className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
            id="name"
            maxLength="100"
            minLength="15"
            required
          />
          <textarea
            type="text"
            placeholder="Property Description"
            className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Property Address"
            className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
            id="address"
          />
          <div className="flex gap-8 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5 transform hover:scale-90 transition-transform duration-700"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5 transform hover:scale-90 transition-transform duration-700"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 transform hover:scale-90 transition-transform duration-700"
              />
              <span>Parking Facility</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 transform hover:scale-90 transition-transform duration-700"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 transform hover:scale-90 transition-transform duration-700"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3  border border-gray-300 rounded-xl transform hover:scale-90 transition-transform duration-700"
                id="bedroom"
                min="1"
                max="10"
                required
              />
              <p>Bedroom</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3  border border-gray-300 rounded-xl transform hover:scale-90 transition-transform duration-700"
                id="baths"
                min="1"
                max="10"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3  border border-gray-300 rounded-xl transform hover:scale-90 transition-transform duration-700"
                id="regularPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs ">(₹ / Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3  border border-gray-300 rounded-xl transform hover:scale-90 transition-transform duration-700"
                id="discountPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">(₹ / Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-bold">
            Property Images:
            <span className="font-mono font-thin text-gray-700 ml-2 text-sm">
              The First Picture will be used as Cover Image (Max: 6 Images)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 rounded-2xl w-full hover:opacity-90 transform hover:scale-90 transition-transform duration-700"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-600 border border-green-600 rounded-2xl uppercase hover: shadow-2xl opacity-90 transform hover:scale-90 transition-transform duration-700 disabled:opacity-45">
              Upload
            </button>
          </div>
          <button
            className="bg-black text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 
          transform hover:scale-90 transition-transform duration-700"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
