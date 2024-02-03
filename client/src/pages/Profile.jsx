import { React, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  return (
    <div className="p-3 max-w-xl mx-auto ">
      <h1 className="text-3xl font-bold text-center my-7 ">PROFILE</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="Profile-Pic"
          className="rounded-full h-40 w-40 object-cover cursor-pointer self-center mt-6 hover:opacity-90 transform hover:scale-90 transition-transform duration-700"
        />
        <p className="text-xl self-center">
          {fileUploadError ? (
            <span className="text-red-600 font-semibold">
              Error Uploading Image! (Size must be less than 50 MB!)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-black font-semibold">{`Uploading Image:  ${filePerc} %`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-600 font-semibold">
              Profile Pic Updated!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="User Name"
          id="username"
          className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
        />
        <input
          type="email"
          placeholder="Email Address"
          id="email"
          className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
        />

        <button className=" bg-black text-white p-3 rounded-xl uppercase hover:opacity-90 disabled:opacity-40 transform hover:scale-90 transition-transform duration-700">
          Update
        </button>
      </form>

      <div className="flex justify-between mt-3">
        <span className="text-red-700 cursor-pointer font-semibold transform hover:scale-90 transition-transform duration-500">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer font-semibold transform hover:scale-90 transition-transform duration-500">
          Sign Out
        </span>
      </div>
    </div>
  );
}
