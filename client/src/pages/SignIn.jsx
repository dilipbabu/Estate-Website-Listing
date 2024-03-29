import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      //setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        // setError(data.message);
        // setLoading(false);
        return;
      }

      dispatch(signInSuccess(data));
      // setLoading(false);
      // setError(null);
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      // setLoading(false);
      // setError(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email Address"
          className="border p-3 rounded-lg transform hover:scale-90 transition-transform duration-700"
          id="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg transform hover:scale-90 transition-transform duration-700"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-black text-white p-3 rounded-xl uppercase hover:opacity-90 transform hover:scale-90 transition-transform duration-700 "
        >
          {loading ? "Signing In!" : "Sign In"}
        </button>

        <OAuth />
      </form>

      <div className="flex gap-2 mt-5 font-semibold">
        <p>Do not have an account yet?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-5">{error}</p>}
    </div>
  );
}
