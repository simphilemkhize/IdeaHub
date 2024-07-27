import React from "react";
import "./TagsInputcss.css";

function TagsInput({ tags }) {
  return (
    <div className="tags-input-container">
      <div className="tags-list">
        {tags.map((tag, index) => (
          <div className="tag-item" key={index}>
            <span className="text">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagsInput;
