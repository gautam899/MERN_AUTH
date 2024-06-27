/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
// We will define all the reducer in a seperate file.
export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
