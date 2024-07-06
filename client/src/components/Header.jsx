/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { hamburger, close } from "../assets/icons";
import ThemeBtn from "./ThemeBtn";
import { useState } from "react";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <header className="bg-slate-200 dark:bg-slate-700">
      <nav className="flex justify-between max-w-6xl items-center px-10 mx-auto py-5 ">
        <Link to="/">
          <h1 className="font-bold text-2xl text-black dark:text-white">
            Auth App
          </h1>
        </Link>
        <ThemeBtn />
        <ul className="flex gap-4 max-lg:hidden">
          <Link to="/">
            <li className="font-semibold p-4 hover:text-slate-400 dark:text-white">
              Home
            </li>
          </Link>

          <Link to="/about">
            <li className="font-semibold p-4 hover:text-slate-400 dark:text-white">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <li className="font-semibold p-4 hover:text-slate-400 dark:text-white">
                SignIn
              </li>
            )}
          </Link>
        </ul>
        <div className="lg:hidden">
          <img
            src={hamburger}
            alt="hamburger"
            height={24}
            width={24}
            className="cursor-pointer"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
          <div>
            {toggleMenu && (
              <div className="flex justify-center items-center flex-col bg-slate-800 w-full h-full fixed top-0 left-0 text-white">
                <ul className="flex-1 flex justify-center flex-col items-center gap-16">
                  <img
                    src={close}
                    alt="close-menu"
                    height={24}
                    width={24}
                    className="absolute top-[30px] right-[30px] cursor-pointer "
                    onClick={() => setToggleMenu(!toggleMenu)}
                  />
                  <Link to="/">
                    <li className="font-semibold p-4 hover:text-slate-400 dark:text-white">
                      Home
                    </li>
                  </Link>

                  <Link to="/about">
                    <li className="font-semibold p-4 hover:text-slate-400 dark:text-white">
                      About
                    </li>
                  </Link>
                  <Link to="/profile">
                    {currentUser ? (
                      <img
                        src={currentUser.profilePicture}
                        alt="profile"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <li className="font-semibold p-4 hover:text-slate-400 dark:text-white">
                        SignIn
                      </li>
                    )}
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
