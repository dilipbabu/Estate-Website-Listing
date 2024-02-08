import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white  shadow-md hover:shadow-xl transition-shadow overflow-hidden rounded-xl w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="Listing-Cover-Picture"
          className="h-[320px] sm:h-[200] w-full object-cover hover:scale-110 transition-scale duration-700"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-xl font-semibold">{listing.name}</p>
          <div className="flex  items-center gap-1">
            <MdLocationOn className="h-4 w-4" />
            <p className="text-sm truncate w-full">{listing.address}</p>
          </div>
          <p className="text-sm line-clamp-2">{listing.description}</p>
          <p className="font-semibold mt-2">
            ₹
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex gap-4 items-center">
            <div className="font:bold text-sm">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className="font:bold text-sm">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
