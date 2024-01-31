import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="border p-3 rounded-lg"
          id="email"
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
        />

        <button className="bg-black text-white p-3 rounded-xl uppercase hover:opacity-65">
          Sign Up
        </button>
      </form>

      <div className="flex gap-2 mt-5 font-semibold">
        <p>Have an account already?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-800">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
