/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  signOut,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import { showFailedAlert, showSuccessAlert } from "../utils/toastifyAlert";

export default function Profile() {
  // A peice of state to set the new image
  const [image, setImage] = useState(undefined);
  const dispatch = useDispatch();
  // Since we want the choose image window to appear when we click on the image
  // we will attach a ref to the input of type file
  const fileRef = useRef(null);
  // We also need to get the current user.
  const { currentUser, loading, error } = useSelector((state) => state.user);
  // To display the image percentage below the image to make the website more
  // interative we need a state to store the snapshot of percentage of image uploaded at every moment before it is uploaded 100%.
  const [imagePercent, setImagePercent] = useState(0);
  // Just for convinience we are creating a state to keep store of the error that might occur when we are uploading the
  // image. Let's say if the image size is greater than what is acceptable i.e 2MB we want to keep and error
  const [imageError, setImageError] = useState(false);
  // Also since we are updating the user profile we need a state to keep the formdata and
  // a function to update the new form data.
  const [formData, setFormData] = useState({});
  // console.log(formData);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        showFailedAlert("Size of image must be less than 2mb!!");
        // showFailedAlert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
          showSuccessAlert("Image Uploaded Successfully");
        });
      }
      // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //   setFormData({ ...formData, profilePicture: downloadURL });
      //   showSuccessAlert("Image Uploaded Successfully");
      // })
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      showSuccessAlert("User updated successfully!!");
      setUpdateSuccess(true);
    } catch (error) {
      showFailedAlert(error.message);
      dispatch(updateUserFailure(error));
    }
  };
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      showSuccessAlert("User deleted successfully");
    } catch (error) {
      dispatch(deleteUserFailure(error));
      showFailedAlert("Some error occured!!");
    }
  };
  const handleSignOut = async () => {
    try {
      await fetch("api/auth/signout");
      dispatch(signOut());
      showSuccessAlert("Sign out successfull!!");
    } catch (err) {
      console.log(err);
      showFailedAlert("Something went wrong!!");
    }
  };
  return (
    <div className="w-[100%] h-[100vh] dark:bg-slate-500">
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7 dark:text-white">
          Profile
        </h1>
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="hidden"
            type="file"
            ref={fileRef}
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            onClick={() => fileRef.current.click()}
          />
          <p className="text-sm self-center">
            {imageError ? (
              <></>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700 dark:text-white">{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <></>
            ) : (
              ""
            )}
          </p>
          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="Username"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? "Loading" : "Update"}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteAccount}
            className="text-red-700 dark:font-bold dark:text-lg cursor-pointer hover:scale-[1.1]"
          >
            Delete Account
          </span>
          <span
            onClick={handleSignOut}
            className="text-red-700 dark:font-bold dark:text-lg cursor-pointer hover:scale-[1.1]"
          >
            Sign Out
          </span>
        </div>
      </div>
    </div>
  );
}
