/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { showFailedAlert, showSuccessAlert } from "../utils/toastifyAlert";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user); //We named the state as user in userSlice.
  // console.log(loading,error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      dispatch(signInStart());
      // We do not need the below two lines anymore.
      // setLoading(true); //loading is true
      // setError(false);
      const res = await fetch("/api/auth/signin", {
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
      // setLoading(false);
      if (data.success === false) {
        dispatch(signInFailure(data));
        showFailedAlert(error.message || "Something went wrong...");
        return;
      }
      showSuccessAlert("SignIn Successful!!");
      dispatch(signInSuccess(data));

      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));   
      showFailedAlert(error.message || "Something went wrong...");
    } 
  }; 

  return (
    <div className="w-full h-[100vh] dark:bg-slate-500">
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7 dark:text-white">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have a account? </p>
          <Link to="/sign-up">
            <span className="text-blue-500 dark:text-red-700 dark:font-bold">
              Sign Up
            </span>
          </Link>
        </div>
        {/* {error
          ? showFailedAlert(error.message || "Something went wrong...")
          : ""} */}
      </div>
    </div>
  );
}
{
  /* <p className="text-red-700 mt-5 text-bold p-5">
          {error ? error.message || "Something went wrong..." : ""}
        </p> */
}
