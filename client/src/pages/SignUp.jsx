/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { showFailedAlert, showSuccessAlert } from "../utils/toastifyAlert";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // So instead of handling the change in the input feild indivisually
  // but rather we can do it all in one handler function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData); //For debugging

  // Declare a handleSubmit function. Now since we are waiting for some data to get
  // submitted we the function will be asyncronous and await.
  const handleSubmit = async (e) => {
    e.preventDefault(); //no refresh of the page
    try {
      setLoading(true); //loading is true
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // After making the fetch reqest we get a response from the server
      // Parse the response body as json. This converts the response data into javascript object that
      // the we can work with in our code
      const data = await res.json();
      // console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        showFailedAlert(data.message);
        return;
      }
      showSuccessAlert("Sign Up Successfull!!");
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="w-full h-[100vh] dark:bg-slate-500">
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="bg-slate-200 p-3 rounded-lg border-none outline-none dark:placeholder-gray-600"
            id="username"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-slate-200 p-3 rounded-lg border-none outline-none dark:placeholder-gray-600"
            id="email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-slate-200 p-3 rounded-lg border-none outline-none dark:placeholder-gray-600"
            id="password"
            required
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="font-bold bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account? </p>
          <Link to="/sign-in">
            <span className="text-blue-500 dark:text-red-700 dark:font-bold">
              Sign In
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
