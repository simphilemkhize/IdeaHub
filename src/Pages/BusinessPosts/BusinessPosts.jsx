// BusinessPosts.js
import React, { useState } from "react";
import Modal from "../../Components/CreateBusinessPost/Modal";
import PostCard from "../../Components/CreateBusinessPost/PostCard";
import "./Modal.css";
import "./BusinessPosts.css";

function BusinessPosts() {
  const [modalOpen, setModalOpen] = useState(false);

  const samplePosts = [
    {
      title: "Frontend Developer",
      description:
        "We are looking for a skilled frontend developer to join our team.",
      salary: "$60,000 - $80,000",
      skills: ["React", "CSS", "JavaScript"],
    },
    {
      title: "Backend Developer",
      description: "Join our backend team to work on scalable applications.",
      salary: "$70,000 - $90,000",
      skills: ["Node.js", "Express", "MongoDB"],
    },
    {
      title: "Full Stack Developer",
      description:
        "Seeking a full stack developer with a passion for building web applications.",
      salary: "$80,000 - $100,000",
      skills: ["React", "Node.js", "SQL"],
    },
  ];

  return (
    <div className="business-posts">
      <button onClick={() => setModalOpen(true)}>Press me!</button>
      <p>Rockstar</p>

      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
          }}
        />
      )}

      <div className="posts-list">
        {samplePosts.map((post, index) => (
          <PostCard
            key={index}
            title={post.title}
            description={post.description}
            salary={post.salary}
            skills={post.skills}
          />
        ))}
      </div>
    </div>
  );
}

export default BusinessPosts;
