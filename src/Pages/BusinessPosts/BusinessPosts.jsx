import React, { useState } from "react";
import Modal from "../../Components/CreateBusinessPost/Modal";
import PostCard from "../../Components/CreateBusinessPost/PostCard";
import SkillFilter from "../../Components/CreateBusinessPost/SkillFilter";
import "./Modal.css"; // Assuming you still need this
import "./BusinessPosts.css"; // Assuming you still need this
import { CiCirclePlus } from "react-icons/ci";

const skills = [
  "JavaScript",
  "React",
  "CSS",
  "HTML",
  "Node.js",
  "Python",
  "Java",
  "Ruby",
];

const samplePosts = [
  {
    title: "Frontend Developer",
    description:
      "We are looking for a skilled frontend developer to join our team.",
    salary: "$60,000 - $80,000",
    skills: ["React", "CSS", "JavaScript"],
    location: "Johannesburg",
  },
  {
    title: "Backend Developer",
    description: "Join our backend team to work on scalable applications.",
    salary: "$70,000 - $90,000",
    skills: ["Node.js", "Express", "MongoDB"],
    location: "Cape Town",
  },
  {
    title: "Full Stack Developer",
    description:
      "Seeking a full stack developer with a passion for building web applications.",
    salary: "Commission Based",
    skills: ["React", "Node.js", "SQL"],
    location: "Durban",
  },
];

function BusinessPosts() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(samplePosts);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillChange = (newSkills) => {
    setSelectedSkills(newSkills);
    filterPosts(newSkills);
  };

  const filterPosts = (skills) => {
    if (skills.length === 0) {
      setFilteredPosts(samplePosts);
      return;
    }

    const filtered = samplePosts.filter((post) =>
      skills.every((skill) => post.skills.includes(skill))
    );
    setFilteredPosts(filtered);
  };

  const handleDeletePost = (indexToDelete) => {
    setFilteredPosts((prevPosts) =>
      prevPosts.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="sidebar p-4 w-1/4 bg-gray-100">
        <SkillFilter skills={skills} onSkillChange={handleSkillChange} />
      </div>
      <div className="content p-4 w-3/4 flex-1 flex flex-col bg-gray-100">
        <div className="flex justify-center items-center mb-4">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded"
          >
            <CiCirclePlus className="mr-2" />
            Add Post
          </button>
        </div>

        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
            }}
          />
        )}

        <div className="flex flex-col w-full gap-4 overflow-y-auto bg-gray-100 flex-1">
          {filteredPosts.map((post, index) => (
            <PostCard
              key={index}
              title={post.title}
              description={post.description}
              salary={post.salary}
              skills={post.skills}
              location={post.location}
              onDelete={() => handleDeletePost(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusinessPosts;
