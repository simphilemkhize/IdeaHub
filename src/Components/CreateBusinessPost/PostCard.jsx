import React from "react";
import { FaDollarSign, FaMapMarkerAlt, FaCalendarDay } from "react-icons/fa";
import TagsInput from "./TagsInput"; // Import your simplified TagsInput component

function PostCard({
  companyName,
  companyLogo,
  title,
  description,
  salary,
  location,
  datePosted,
  skills,
  onDelete,
}) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 mx-auto w-full max-w-3xl">
      <div className="flex items-center mb-4">
        <div
          className="w-12 h-12 rounded-full mr-4 flex items-center justify-center border border-gray-300"
          style={{ width: "48px", height: "48px" }}
        >
          <span className="text-gray-700 font-bold">
            {companyLogo ? "" : "Logo"}
          </span>
        </div>
        <div>
          <p className="text-gray-800 font-semibold text-lg">{companyName}</p>
          <p className="text-gray-700 font-bold text-xl mt-1">{title}</p>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center justify-between">
        <div className="flex items-center text-gray-600">
          <FaDollarSign className="mr-2" />
          <p className="text-sm">{salary}</p>
        </div>
        <div className="flex items-center text-gray-600">
          <FaCalendarDay className="mr-2" />
          <p className="text-sm">{datePosted}</p>
        </div>
        <div className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-2" />
          <p className="text-sm">{location}</p>
        </div>
      </div>
      <div className="mb-4 flex justify-center">
        <TagsInput tags={skills} />
      </div>
      <p className="text-gray-700 text-center">{description}</p>
      <div className="flex justify-end">
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PostCard;
