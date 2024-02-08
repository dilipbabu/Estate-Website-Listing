import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-5">
          <p>
            Contacting <span className="font-bold ">"{landlord.username}"</span>{" "}
            for{" "}
            <span className="font-bold">"{listing.name.toLowerCase()}"</span>
          </p>
          <textarea
            className="w-full h-[150px] border p-3 rounded-xl transform hover:scale-90 transition-transform duration-700"
            name="message"
            id="message"
            rows="10"
            value={message}
            onChange={onChange}
            placeholder="Enter your Message here!"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-black text-white text-center rounded-xl p-2 uppercase transform hover:scale-90 transition-transform duration-700"
          >
            Send Message!
          </Link>
        </div>
      )}
    </>
  );
}
