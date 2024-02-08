import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  console.log(saleListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div className="">
      {/* Top */}

      <div className="flex flex-col gap-6 p-28  px-1 max-w-6xl mx-auto">
        <h1 className="text-black font-bold text-7xl lg: 8xl">
          Find your <span className="text-slate-500">Dream</span> <br />
          Palace with Ease
        </h1>
        <div className="text-s sm:text-s">
          Dilip's Estate Listings will help you find your perfect place with
          ease
          <br />
          We have a variety of properties to choose from!
        </div>
        <Link
          to={"/search"}
          className="text-s sm:text-s font-bold text-blue-700"
        >
          Let's start looking!
        </Link>
      </div>
      {/* Swipper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* Listing Results */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-10 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold">Recent Offers: </h2>
              <Link
                className="text-sm text-blue-700 font-semibold hover:underline"
                to={"/search?offer=true"}
              >
                Show More Offers....
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold">
                Recent Places for Rent:{" "}
              </h2>
              <Link
                className="text-sm text-blue-700 font-semibold hover:underline"
                to={"/search?type=rent"}
              >
                Show More Places for Rent....
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold">Recent Places for Sale: </h2>
              <Link
                className="text-sm text-blue-700 font-semibold hover:underline"
                to={"/search?type=sale"}
              >
                Show More Places for Sale....
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
