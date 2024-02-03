import React from "react";
import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-xl mx-auto ">
      <h1 className="text-3xl font-bold text-center my-7 ">PROFILE</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="Profile-Pic"
          className="rounded-full h-40 w-40 object-cover cursor-pointer self-center mt-6"
        />
        <input
          type="text"
          placeholder="User Name"
          id="username"
          className="border p-3 rounded-xl"
        />
        <input
          type="email"
          placeholder="Email Address"
          id="email"
          className="border p-3 rounded-xl"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-xl"
        />

        <button className=" bg-black text-white p-3 rounded-xl uppercase hover:opacity-90 disabled:opacity-40">
          Update
        </button>
      </form>

      <div className="flex justify-between mt-3">
        <span className="text-red-700 cursor-pointer font-semibold">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer font-semibold">
          Sign Out
        </span>
      </div>
    </div>
  );
}
