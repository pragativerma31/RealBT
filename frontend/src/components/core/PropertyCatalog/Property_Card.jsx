import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Heart, Flag, BadgeDollarSign, CalendarClock, User2 } from "lucide-react";

function Property_Card({ property, Height }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  // Handle button clicks with navigation
  const handleNavigation = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  // Toggle like button
  const handleLike = (e) => {
    e.preventDefault();
    setLiked((prev) => !prev);
  };

  return (
    <Link to={`/properties/${property._id}`} className="block">
      <div className="bg-richblack-800 rounded-xl shadow-md p-4 mb-4 min-w-[1400px] max-w-5xl mx-auto border-b-2 border-b-richblack-700 ">

        {/* Location Bar */}
        <div className="flex items-center text-sm mb-5">
          <MapPin className="h-8 w-8 mr-1 text-green-400" />
          <span className="text-white">{property?.location}</span>
        </div>

        {/* Three Highlighted Boxes */}
        <div className="grid grid-cols-3 h-20 gap-2 mb-4">
          <div className="bg-yellow-400 text-richblack-900 flex items-center justify-center py-2 rounded-md font-bold border-b-4 border-yellow-600 transition hover:bg-yellow-500">
            Rs. {property?.price}
          </div>
          <div className="bg-richblue-300 text-richblack-900 flex items-center justify-center py-2 rounded-md font-semibold border-b-4 border-richblue-200 transition hover:bg-richblue-400">
            Loan Available on Full Amount
          </div>
          <div className="bg-blue-400 text-richblack-900 flex items-center justify-center py-2 rounded-md font-semibold border-b-4 border-blue-300 transition hover:bg-blue-500">
            Size of the Property
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-4">
          {/* Property Thumbnail */}
          <div className="flex-shrink-0">
            <img
              src={property?.thumbnailImage}
              alt="Property Thumbnail"
              className={`${Height} w-60 h-60 rounded-lg object-cover`}
            />
          </div>

          {/* Property Details */}
          <div className="flex flex-col justify-evenly flex-grow">
            {/* Tags */}
            <div className="flex h-[15%] flex-wrap gap-2">
              {property?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-richblack-700 flex items-center border border-richblack-600 text-yellow-300 px-3 py-1 rounded-md text-sm font-semibold shadow-md transition hover:bg-yellow-300 hover:text-richblack-900 hover:scale-103"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Category Box */}
            <div className="h-[20%] w-full flex items-center justify-start mt-2">
              <p className="bg-gradient-to-r from-blue-500 to-blue-700 text-white w-[30%] h-[90%] flex items-center justify-center rounded-md text-sm font-semibold shadow-md transition hover:scale-103 hover:from-blue-600 hover:to-blue-800">
                {property?.category?.name} Property
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center gap-10 mt-4 h-[20%]">
              <div className="flex gap-6">
                <button
                  onClick={(e) => handleNavigation(e, `/properties/${property._id}/loan-offers`)}
                  className="bg-yellow-400 text-richblack-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition flex items-center gap-2"
                >
                  <BadgeDollarSign className="w-5 h-5" />
                  Loan Offers
                </button>

                <button
                  onClick={(e) => handleNavigation(e, `/properties/${property._id}/slot-book`)}
                  className="bg-green-500 text-richblack-900 px-4 py-2 rounded-md font-semibold hover:bg-green-400 transition flex items-center gap-2"
                >
                  <CalendarClock className="w-5 h-5" />
                  Property Tour | Book Slot
                </button>

                <button
                  onClick={(e) => handleNavigation(e, `/properties/${property._id}/owner-details`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition flex items-center gap-2"
                >
                  <User2 className="w-5 h-5" />
                  Get Owner Details
                </button>
              </div>

              {/* Like & Report Icons */}
              <div className="flex gap-6">
                <Heart
                  onClick={handleLike}
                  className={`w-6 h-6 cursor-pointer transition hover:scale-103 ${
                    liked
                      ? "text-red-500 fill-red-500"
                      : "text-red-500"
                  }`}
                />
                <Flag
                  onClick={(e) => handleNavigation(e, `/properties/${property._id}/report`)}
                  className="text-yellow-300 cursor-pointer hover:scale-103 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Property_Card;
