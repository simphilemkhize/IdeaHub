import React, { useState } from "react";
import SkillFilter from "./SkillFilter";
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

function Sidebar({ filters, onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (field, value) => {
    const newFilters = { ...selectedFilters, [field]: value };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      {Object.keys(filters).map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            {field}
          </label>
          <select
            onChange={(e) => handleFilterChange(field, e.target.value)}
            className="block w-full border border-gray-300 rounded p-2"
          >
            <option value="">All</option>
            {filters[field].map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <SkillFilter skills={skills} onSkillChange={handleSkillChange} />
    </div>
  );
}

export default Sidebar;
