import React, { useState } from "react";
import Modal from "./Modal1";
const PostCard = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (formData) => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="post-card bg-white p-4 rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700">{post.description}</p>
      <p className="text-gray-500">Salary: {post.salary}</p>
      <p className="text-gray-500">Location: {post.location}</p>
      <div className="skills mt-2">
        {post.skills.map((skill, index) => (
          <span
            key={index}
            className="skill-tag bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2"
          >
            {skill}
          </span>
        ))}
      </div>
      <button
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
        onClick={handleOpenModal}
      >
        View Applicants
      </button>
      {isModalOpen && (
        <Modal
          closeModal={handleCloseModal}
          onSubmit={handleSubmit}
          defaultValue={{ ...post, applicants: post.applicants }}
        />
      )}
    </div>
  );
};

export default PostCard;
