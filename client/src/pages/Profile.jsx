/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form action="" className="flex flex-col gap-4">
        <img src={currentUser.profilePicture} alt="profile"
        className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
         />
        <input defaultValue={currentUser.email} type="text" id="username" placeholder="username" className="bg-slate-100 rounded-lg p-3"/>
        <input defaultValue={currentUser.username} type="email" id="email" placeholder="username" className="bg-slate-100 rounded-lg p-3"/>
        <input type="password" id="password" placeholder="username" className="bg-slate-100 rounded-lg p-3"/>
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700">Delete Account</span>
        <span className="text-red-700">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
