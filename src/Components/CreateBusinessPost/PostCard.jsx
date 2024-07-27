// PostCard.js
import React from "react";
//import "./PostCard.css";

function PostCard({ title, description, salary, skills }) {
  return (
    <div className="post-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>
        <strong>Salary Range:</strong> {salary}
      </p>
      <p>
        <strong>Skills Required:</strong> {skills.join(", ")}
      </p>
    </div>
  );
}

export default PostCard;
