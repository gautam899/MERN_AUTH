/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-200">
      <nav className="flex justify-between max-w-6xl items-center px-10 py-5">
        <Link to="/">
          <h1 className="font-bold text-2xl text-black">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="font-semibold p-4 hover:text-slate-400">Home</li>
          </Link>

          <Link to="about">
            {" "}
            <li className="font-semibold p-4 hover:text-slate-400">About</li>
          </Link>
          <Link to="sign-in">
            {" "}
            <li className="font-semibold p-4 hover:text-slate-400">SignIn</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
