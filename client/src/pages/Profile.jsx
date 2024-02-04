

import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    // Clear error message after 3 seconds
    const errorTimeout = setTimeout(() => {
      setFileUploadError(false);
    }, 3000);

    // Clear success message after 3 seconds
    const successTimeout = setTimeout(() => {
      setUpdateSuccess(false);
    }, 3000);

    // Clean up timeouts to prevent memory leaks
    return () => {
      clearTimeout(errorTimeout);
      clearTimeout(successTimeout);
    };
  }, [fileUploadError, updateSuccess]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

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
        dispatch(updateUserFailure(data.message));
        setFileUploadError(true);
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-5">PROFILE</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700 bg-white"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email Address"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-black text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 
          transform hover:scale-90 transition-transform duration-700"
        >
          {loading ? "Loading..." : "Update"}
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

      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User Details updated successfully!" : ""}
      </p>
    </div>
  );
}




















// import { React, useRef, useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { app } from "../firebase";
// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
// } from "../redux/user/userSlice";
// import { useDispatch } from "react-redux";
// export default function Profile() {
//   const fileRef = useRef(null);
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const [file, setFile] = useState(undefined);
//   const [filePerc, setFilePerc] = useState(0);
//   const [fileUploadError, setFileUploadError] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (file) {
//       handleFileUpload(file);
//     }
//   }, [file]);

//   const handleFileUpload = async (file) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setFilePerc(Math.round(progress));
//       },
//       (error) => {
//         setFileUploadError(true);
//       },

//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
//           setFormData({ ...formData, avatar: downloadURL })
//         );
//       }
//     );
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return;
//       }

//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }
//   };
//   return (
//     <div className="p-3 max-w-xl mx-auto">
//       <h1 className="text-3xl font-bold text-center my-5">PROFILE</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           onChange={(e) => setFile(e.target.files[0])}
//           type="file"
//           ref={fileRef}
//           hidden
//           accept="image/*"
//         />

//         <img
//           onClick={() => fileRef.current.click()}
//           src={formData.avatar || currentUser.avatar}
//           alt="Profile-Pic"
//           className="rounded-full h-40 w-40 object-cover cursor-pointer self-center mt-6 hover:opacity-90 transform hover:scale-90 transition-transform duration-700"
//         />
//         <p className="text-xl self-center">
//           {fileUploadError ? (
//             <span className="text-red-600 font-semibold">
//               Error Uploading Image! (Size must be less than 50 MB!)
//             </span>
//           ) : filePerc > 0 && filePerc < 100 ? (
//             <span className="text-black font-semibold">{`Uploading Image:  ${filePerc} %`}</span>
//           ) : filePerc === 100 ? (
//             <span className="text-green-600 font-semibold">
//               Profile Pic Updated!
//             </span>
//           ) : (
//             ""
//           )}
//         </p>
//         <input
//           type="text"
//           placeholder="User Name"
//           defaultValue={currentUser.username}
//           id="username"
//           className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700 bg-white"
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           placeholder="Email Address"
//           defaultValue={currentUser.email}
//           id="email"
//           className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           id="password"
//           className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
//           onChange={handleChange}
//         />

//         <button
//           disabled={loading}
//           className="bg-black text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80
//           transform hover:scale-90 transition-transform duration-700"
//         >
//           {loading ? "Loading..." : "Update"}
//         </button>
//       </form>

//       <div className="flex justify-between mt-3">
//         <span className="text-red-700 cursor-pointer font-semibold transform hover:scale-90 transition-transform duration-500">
//           Delete Account
//         </span>
//         <span className="text-red-700 cursor-pointer font-semibold transform hover:scale-90 transition-transform duration-500">
//           Sign Out
//         </span>
//       </div>

//       <p className="text-red-700 mt-5">{error ? error : ""}</p>
//       <p className="text-green-700 mt-5">
//         {updateSuccess ? "User Details updated successfully!" : ""}
//       </p>
//     </div>
//   );
// }