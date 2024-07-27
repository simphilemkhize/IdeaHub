import React, { useState } from "react";
import Modal from "../../Components/CreateBusinessPost/Modal";
import PostCard from "../../Components/CreateBusinessPost/PostCard";
import Sidebar from "../../Components/CreateBusinessPost/Sidebar";
import "./Modal.css"; // Assuming you still need this
import "./BusinessPosts.css"; // Assuming you still need this
import { CiCirclePlus } from "react-icons/ci";

const samplePosts = [
  {
    title: "Frontend Developer",
    description:
      "We are looking for a skilled frontend developer to join our team.",
    salary: "$60,000 - $80,000",
    skills: ["React", "CSS", "JavaScript"],
    location: "Johannesburg",
    datePosted: "2024-07-27",
  },
  {
    title: "Backend Developer",
    description: "Join our backend team to work on scalable applications.",
    salary: "$70,000 - $90,000",
    skills: ["Node.js", "Express", "MongoDB"],
    location: "Cape Town",
    datePosted: "2024-07-26",
  },
  {
    title: "Full Stack Developer",
    description:
      "Seeking a full stack developer with a passion for building web applications.",
    salary: "Commission Based",
    skills: ["React", "Node.js", "SQL"],
    location: "Durban",
    datePosted: "2024-07-25",
  },
];

function BusinessPosts() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(samplePosts);

  const filters = {
    Title: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
    Location: ["Johannesburg", "Cape Town", "Durban"],
    Salary: ["$60,000 - $80,000", "$70,000 - $90,000", "Commission Based"],
  };

  const handleFilterChange = (selectedFilters) => {
    // Apply filter logic here based on selectedFilters
    // This is a basic example and may need to be adjusted based on actual filter criteria
    const newFilteredPosts = samplePosts.filter((post) =>
      Object.keys(selectedFilters).every(
        (field) =>
          selectedFilters[field] === "" ||
          post[field.toLowerCase()] === selectedFilters[field]
      )
    );
    setFilteredPosts(newFilteredPosts);
  };

  return (
    <div className="flex pl-10 bg-gray-100">
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />
      <div className="flex-1 flex flex-col items-center p-5 h-screen box-border bg-gray-100">
        <div className="flex items-center text-gray-600">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <CiCirclePlus className="text-lg mr-2" />
            <span className="text-sm">Add Post</span>
          </button>
        </div>

        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
            }}
          />
        )}

        <div className="flex flex-col w-full gap-4 overflow-y-auto">
          {filteredPosts.map((post, index) => (
            <PostCard
              key={index}
              title={post.title}
              description={post.description}
              salary={post.salary}
              skills={post.skills}
              location={post.location}
              datePosted={post.datePosted}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusinessPosts;
