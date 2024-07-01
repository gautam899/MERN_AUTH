/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200">
      <nav className="flex justify-between max-w-6xl items-center px-10 mx-auto py-5">
        <Link to="/">
          <h1 className="font-bold text-2xl text-black">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="font-semibold p-4 hover:text-slate-400">Home</li>
          </Link>

          <Link to="/about">
            <li className="font-semibold p-4 hover:text-slate-400">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <li className="font-semibold p-4 hover:text-slate-400">SignIn</li>
            )}
          </Link>
        </ul>
      </nav>
    </header>
  );
}


