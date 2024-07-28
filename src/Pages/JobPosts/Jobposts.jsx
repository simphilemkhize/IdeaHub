import React, { useState } from "react";
import JobCard from "../../Components/Jobposts/JobCard";
import SkillFilter from "../../Components/CreateBusinessPost/SkillFilter";
import "./BusinessPosts.css"; // Assuming you still need this
import logo from "../../assets/logo.png";
import bg from "../../assets/bg.jpg";

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

const locations = ["Johannesburg", "Cape Town", "Durban"];
const salaryRanges = [
  "$60,000 - $80,000",
  "$70,000 - $90,000",
  "Commission Based",
];

const initialPosts = [
  {
    title: "Frontend Developer",
    description:
      "We are looking for a skilled frontend developer to join our team.",
    salary: "$60,000 - $80,000",
    skills: ["React", "CSS", "JavaScript"],
    location: "Johannesburg",
    companyName: "Derivco",
  },
  {
    title: "Backend Developer",
    description: "Join our backend team to work on scalable applications.",
    salary: "$70,000 - $90,000",
    skills: ["Node.js", "Express", "MongoDB"],
    location: "Cape Town",
    companyName: "Derivco",
  },
  {
    title: "Full Stack Developer",
    description:
      "Seeking a full stack developer with a passion for building web applications.",
    salary: "Commission Based",
    skills: ["React", "Node.js", "SQL"],
    location: "Durban",
    companyName: "Derivco",
  },
];

function JobPosts() {
  const [posts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSkillChange = (newSkills) => {
    setSelectedSkills(newSkills);
    filterPosts(newSkills, selectedLocation, selectedSalary, searchTerm);
  };

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);
    filterPosts(selectedSkills, newLocation, selectedSalary, searchTerm);
  };

  const handleSalaryChange = (event) => {
    const newSalary = event.target.value;
    setSelectedSalary(newSalary);
    filterPosts(selectedSkills, selectedLocation, newSalary, searchTerm);
  };

  const handleSearchTermChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    filterPosts(
      selectedSkills,
      selectedLocation,
      selectedSalary,
      newSearchTerm
    );
  };

  const filterPosts = (skills, location, salary, searchTerm) => {
    let filtered = posts;

    if (skills.length > 0) {
      filtered = filtered.filter((post) =>
        skills.every((skill) => post.skills.includes(skill))
      );
    }

    if (location) {
      filtered = filtered.filter((post) => post.location === location);
    }

    if (salary) {
      filtered = filtered.filter((post) => post.salary === salary);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  return (
    <div className="flex flex-col h-screen bg-custom-bg bg-cover bg-center">
      <div className="flex justify-between items-center p-4">
        <input
          type="text"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search by title or description"
        />
      </div>

      <div className="filters p-4 flex flex-wrap items-end">
        <div className="filter mr-4 mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Location
          </label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="filter mr-4 mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Salary
          </label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={selectedSalary}
            onChange={handleSalaryChange}
          >
            <option value="">All Salary Ranges</option>
            {salaryRanges.map((salary) => (
              <option key={salary} value={salary}>
                {salary}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-auto mb-4">
          <SkillFilter skills={skills} onSkillChange={handleSkillChange} />
        </div>
      </div>

      <div className="flex flex-col p-4 gap-4 overflow-y-auto flex-1">
        {filteredPosts.map((post, index) => (
          <JobCard
            key={index}
            title={post.title}
            description={post.description}
            salary={post.salary}
            skills={post.skills}
            location={post.location}
            companyLogo={logo}
            companyName={post.companyName}
            datePosted={post.datePosted}
          />
        ))}
      </div>
    </div>
  );
}

export default JobPosts;
