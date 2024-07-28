import "./TagsInputcss.css";
import { useState, useEffect, useRef } from "react";

function TagsInput({ selectedSkills = [], setSelectedSkills }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timeoutRef = useRef(null);

    useEffect(() => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(timeoutRef.current);
    }, [value, delay]);

    return debouncedValue;
  }

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      fetch(
        `https://ideahubfunctionapp.azurewebsites.net/api/getSkills?q=${debouncedSearchQuery}`
      )
        .then((response) => response.json())
        .then((data) => {
          setFilteredSkills(
            data.filter(
              (skill) => !selectedSkills.some((s) => s._id === skill._id)
            )
          );
        })
        .catch((error) => console.error("Error fetching skills:", error));
    } else {
      setFilteredSkills([]);
    }
  }, [debouncedSearchQuery, selectedSkills]);

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    const skill = filteredSkills.find((s) => s.name === value);
    if (!skill || selectedSkills.some((s) => s._id === skill._id)) return;
    setSelectedSkills([...selectedSkills, skill]);
    setSearchQuery("");
  }

  function removeTag(index) {
    const newTags = selectedSkills.filter((_, i) => i !== index);
    setSelectedSkills(newTags);
  }

  function handleSearchChange(e) {
    const query = e.target.value;
    setSearchQuery(query);
  }

  function handleSuggestionClick(skill) {
    if (!selectedSkills.some((s) => s._id === skill._id)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSearchQuery("");
    }
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
          onKeyDown={handleKeyDown}
        />
        {searchQuery && filteredSkills.length > 0 && (
          <ul className="suggestions-list">
            {filteredSkills.map((skill) => (
              <li
                key={skill._id}
                onClick={() => handleSuggestionClick(skill)}
                className="suggestion-item"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="tags-list">
        {selectedSkills.map((skill, index) => (
          <div className="tag-item" key={skill._id}>
            <span className="text">{skill.name}</span>
            <span className="close" onClick={() => removeTag(index)}>
              &times;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagsInput;