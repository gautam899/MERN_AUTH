/* eslint-disable no-unused-vars */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./context/Theme";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || "light"
  );
  // Now to add functionality in the method that we have defined in the
  //context what we need to do here is we need to declare function with
  //same name as in the context and the functionality will be automatically added in those functions.
  const lightTheme = () => {
    setThemeMode("light");
    localStorage.setItem("theme", "light"); // Save theme preference
  };
  const darkTheme = () => {
    setThemeMode("dark");
    localStorage.setItem("theme", "dark"); // Save theme preference
  };

  //But how do we change the theme
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <BrowserRouter>
        {/* Header. This way the header will be available in all the pages. */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}
