import React, { useState } from "react";
import "./TagsInputcss.css";

const SkillFilter = ({ skills, onSkillChange }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState(skills);

  function handleSearchChange(e) {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = skills.filter(
      (skill) =>
        skill.toLowerCase().includes(query.toLowerCase()) &&
        !selectedSkills.includes(skill)
    );
    setFilteredSuggestions(filtered);
  }

  function handleSuggestionClick(skill) {
    const newSkills = [...selectedSkills, skill];
    setSelectedSkills(newSkills);
    setSearchQuery("");
    setFilteredSuggestions(
      skills.filter(
        (s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !newSkills.includes(s)
      )
    );
    onSkillChange(newSkills); // Notify parent component of the skill change
  }

  function removeSkill(index) {
    const newSkills = selectedSkills.filter((_, i) => i !== index);
    setSelectedSkills(newSkills);
    onSkillChange(newSkills); // Notify parent component of the skill change
  }

  return (
    <div className="tags-input-container">
      <div className="search-bar-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
          placeholder="Search skills"
        />
        {searchQuery && filteredSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="tags-list">
        {selectedSkills.map((skill, index) => (
          <div className="tag-item" key={index}>
            <span className="text">{skill}</span>
            <span className="close" onClick={() => removeSkill(index)}>
              &times;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillFilter;
