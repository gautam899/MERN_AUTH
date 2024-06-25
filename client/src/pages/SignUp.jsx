/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="bg-slate-200 p-3 rounded-lg border-none outline-none"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-slate-200 p-3 rounded-lg border-none outline-none"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-200 p-3 rounded-lg border-none outline-none"
          id="password"
        />
        <button className="font-bold bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          SignUp
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account? </p>
        <Link to="/sign-in">
          <span className="text-blue-500">SignIn</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
