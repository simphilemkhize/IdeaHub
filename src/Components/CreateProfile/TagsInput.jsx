import React, { useState, useEffect } from "react";
import "./TagsInputcss.css";

function TagsInput({ initialSkills = [], onSkillsChange }) {
  const [tags, setTags] = useState(initialSkills);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions] = useState([
    "JavaScript",
    "React",
    "CSS",
    "HTML",
    "Node.js",
    "Ndumiso",
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);

  useEffect(() => {
    setFilteredSuggestions(suggestions.filter((tag) => !tags.includes(tag)));
  }, [tags, suggestions]);

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    setSearchQuery("");
    setFilteredSuggestions(suggestions.filter((tag) => !tags.includes(tag)));
    e.target.value = "";
    onSkillsChange([...tags, value]);
  }

  function removeTag(index) {
    const newTags = tags.filter((el, i) => i !== index);
    setTags(newTags);
    setFilteredSuggestions(suggestions.filter((tag) => !newTags.includes(tag)));
    onSkillsChange(newTags);
  }

  function handleSearchChange(e) {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase()) &&
        !tags.includes(suggestion)
    );
    setFilteredSuggestions(filtered);
  }

  function handleSuggestionClick(suggestion) {
    const newTags = [...tags, suggestion];
    setTags(newTags);
    setSearchQuery("");
    setFilteredSuggestions(suggestions.filter((tag) => !newTags.includes(tag)));
    onSkillsChange(newTags);
  }

  return (
    <div className="tags-input-container">
      <div className="search-bar-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
          placeholder="Search tags"
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
        {tags.map((tag, index) => (
          <div className="tag-item" key={index}>
            <span className="text">{tag}</span>
            <span className="close" onClick={() => removeTag(index)}>
              &times;
            </span>
          </div>
        ))}
      </div>
      <input
        onKeyDown={handleKeyDown}
        type="text"
        className="tags-input"
        placeholder="Type something"
      />
    </div>
  );
}

export default TagsInput;
