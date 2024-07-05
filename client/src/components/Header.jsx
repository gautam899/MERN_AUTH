/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeBtn from "./ThemeBtn";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 dark:bg-slate-700">
      <nav className="flex justify-between max-w-6xl items-center px-10 mx-auto py-5 ">
        <Link to="/">
          <h1 className="font-bold text-2xl text-black dark:text-white">
            Auth App
          </h1>
        </Link>
        <ThemeBtn />
        <ul className="flex gap-4">
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
              <li className="font-semibold p-4 hover:text-slate-400 dark:text-white">SignIn</li>
            )}
          </Link>
        </ul>
      </nav>
    </header>
  );
}


