import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 7000,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);
  const handleImageSubmit = (e) => {
    // Reset previous errors
    setImageUploadError(false);

    const acceptedTypes = ["image/*"];

    // Check if at least one file is selected
    if (files.length === 0) {
      setImageUploadError("At least 1 image is required per listing!");
      return; // Exit early if no files are selected
    }

    // Check file types
    for (let i = 0; i < files.length; i++) {
      if (!acceptedTypes.includes(files[i].type)) {
        setImageUploadError("Only Images Allowed!");
        setUploading(false);
        continue; // Exit early if a non-image file is found
      }
    }

    // Perform image upload
    if (files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
          setImageUploadError(false);
        })
        .catch(() => {
          //setImageUploadError("Image Upload Failed!");
          setUploading(false);
        });
    } else {
      setImageUploadError("Max. 6 images per listing!");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} % done!`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("At least 1 image must be provided!");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Regular Price must be greater than Discounted Price!");

      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.status === false) {
        setError(data.message);
      }
      navigate(`/lisiting/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-5 hover:opacity-90 transform hover:scale-90 transition-transform duration-700">
        Update Listing:
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Property Name"
            className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
            id="name"
            maxLength="100"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Property Description"
            className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Property Address"
            className="border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
            id="address"
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-8 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5 transform hover:scale-90 transition-transform duration-700"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5 transform hover:scale-90 transition-transform duration-700"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 transform hover:scale-90 transition-transform duration-700"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Facility</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 transform hover:scale-90 transition-transform duration-700"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 transform hover:scale-90 transition-transform duration-700"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3  border border-gray-300 rounded-xl transform hover:scale-90 transition-transform duration-700"
                id="bedrooms"
                min="1"
                max="10"
                onChange={handleChange}
                value={formData.bedrooms}
                required
              />
              <p>Bedroom</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3  border border-gray-300 rounded-xl transform hover:scale-90 transition-transform duration-700"
                id="bathrooms"
                min="1"
                max="10"
                onChange={handleChange}
                value={formData.bathrooms}
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3  border border-gray-300 rounded-xl transform hover:scale-90 transition-transform duration-700"
                id="regularPrice"
                min="7000"
                max="1000000000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                {formData.type === "rent" && (
                  <span className="text-xs">(₹ / Month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="p-3  border border-gray-300 rounded-xl transform hover:scale-90 transition-transform duration-700"
                  id="discountPrice"
                  min="0"
                  max="1000000000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">(₹ / Month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-bold">
            Property Images:
            <span className="font-mono font-thin text-gray-700 ml-2 text-sm">
              The First Picture will be used as Cover Image (Max: 6 Images)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 rounded-2xl w-full hover:opacity-90 transform hover:scale-90 transition-transform duration-700"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-600 border border-green-600 rounded-md uppercase hover: shadow-2xl opacity-90 transform hover:scale-90 transition-transform duration-700 disabled:opacity-45"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-600 font-medium font-sans text-sm">
            {!uploading && imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center rounded-lg"
              >
                <img
                  src={url}
                  alt="Listing Image/Images"
                  className="w-72 h-56 object-cover rounded-lg  transform hover:scale-90 transition-transform duration-700"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-600 rounded-lg uppercase transform hover:scale-90 transition-transform duration-700 hover:opacity-70 "
                >
                  Delete
                </button>
              </div>
            ))}

          <button
            disabled={loading || uploading}
            className="bg-black text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 
          transform hover:scale-90 transition-transform duration-700"
          >
            {loading ? "Updating....." : "Update Lisiting"}
          </button>

          {error && (
            <p className="text-red-600 font-medium font-sans text-sm">
              {error}
            </p>
          )}
        </div>
      </form>
    </main>
  );
}
