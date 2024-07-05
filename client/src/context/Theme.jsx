/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import { createContext, useContext } from "react";

// Lets create a context that will provide us with some default variables.
//like initially the default mode will be light mode.
// We can pass the variable and methods as well.
export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

// Create provider
export const ThemeProvider = ThemeContext.Provider;

// Now let's create a custome hook that will give allow us some
// convinience as we do not have to create useContext and ThemeContext both all the
// time but rather we can only import the useTheme anc that will provide us the access to the
// variables and the method.
export default function useTheme() {
  return useContext(ThemeContext);
}
