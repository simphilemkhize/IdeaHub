import React, { useState, useRef } from "react";
import { PencilIcon } from "@heroicons/react/solid"; // You need to install @heroicons/react
import TagsInput from "../../Components/CreateProfile/TagsInput";
import logo from "../../assets/logo.png";

function Profile() {
  const [isEditable, setIsEditable] = useState({
    name: false,
    surname: false,
    contactNumber: false,
    location: false,
    education: false,
    experience: false,
  });

  const inputRefs = {
    name: useRef(null),
    surname: useRef(null),
    contactNumber: useRef(null),
    location: useRef(null),
  };

  const [user, setUser] = useState({
    name: "Lusanda",
    surname: "Shongwe",
    role: "Business",
    email: "lshongwe@yahoo.com",
    contactNumber: "+1234567890",
    location: "Johannesburg",
    companyLogo: logo,
    education: [
      {
        degree: "BSC Computer Science",
        institution: "University of the Witwatersrand",
      },
    ],
    experience: [
      { role: "Junior Web Dev", company: "Sample Company", duration: "1 year" },
    ],
    skills: ["JavaScript", "React"], // Initial skills
  });

  const handleEditClick = (field) => {
    setIsEditable({ ...isEditable, [field]: !isEditable[field] });
    if (!isEditable[field]) {
      setTimeout(() => inputRefs[field]?.current?.focus(), 100);
    }
  };

  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleEducationChange = (index, key, value) => {
    const updatedEducation = [...user.education];
    updatedEducation[index][key] = value;
    setUser({ ...user, education: updatedEducation });
  };

  const handleExperienceChange = (index, key, value) => {
    const updatedExperience = [...user.experience];
    updatedExperience[index][key] = value;
    setUser({ ...user, experience: updatedExperience });
  };

  const addEducation = () =>
    setUser({
      ...user,
      education: [...user.education, { degree: "", institution: "" }],
    });

  const removeEducation = (index) =>
    setUser({
      ...user,
      education: user.education.filter((_, i) => i !== index),
    });

  const addExperience = () =>
    setUser({
      ...user,
      experience: [...user.experience, { role: "", company: "", duration: "" }],
    });

  const removeExperience = (index) =>
    setUser({
      ...user,
      experience: user.experience.filter((_, i) => i !== index),
    });

  const handleSkillsChange = (newSkills) => {
    setUser({ ...user, skills: newSkills });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-custom-bg pt-8">
      <div className="flex items-center mb-8 w-full max-w-4xl px-4">
        <div
          className="w-12 h-12 rounded-full mr-4 flex items-center justify-center border border-gray-300 overflow-hidden"
          style={{ width: "12", height: "12" }}
        >
          {user.companyLogo ? (
            <img
              src={logo}
              alt={`${user.name} logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-700 font-bold">Logo</span>
          )}
        </div>
        {/* Placeholder for smaller profile picture */}
        <div>
          <h2 className="text-lg font-bold">
            {user.name} {user.surname}
          </h2>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
      </div>
      <form className="w-full max-w-4xl space-y-6 px-4">
        {[
          { label: "Name", value: user.name, field: "name" },
          { label: "Surname", value: user.surname, field: "surname" },
          { label: "Role", value: user.role, field: "role", readOnly: true },
          { label: "Email", value: user.email, field: "email", readOnly: true },
          {
            label: "Contact Number",
            value: user.contactNumber,
            field: "contactNumber",
          },
          { label: "Location", value: user.location, field: "location" },
        ].map(({ label, value, field, readOnly }) => (
          <div key={field} className="flex items-center">
            <label
              className="block text-gray-700 text-sm font-bold mr-4 w-32"
              htmlFor={field}
            >
              {label}
            </label>
            <div className="relative flex-grow">
              <input
                ref={inputRefs[field]}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  !isEditable[field] && !readOnly ? "cursor-not-allowed" : ""
                }`}
                id={field}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(field, e.target.value)}
                readOnly={!isEditable[field] || readOnly}
              />
              {!readOnly && (
                <PencilIcon
                  className="absolute right-2 top-2 h-5 w-5 text-gray-500 cursor-pointer"
                  onClick={() => handleEditClick(field)}
                />
              )}
            </div>
          </div>
        ))}
        <div className="mt-4">
          <h2 className="text-lg font-medium">Education</h2>
          {user.education.map((edu, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 mt-2 bg-white p-4 rounded-lg"
            >
              <input
                className="flex-1 border-2 border-gray-300 rounded-xl p-2 bg-white focus:border-blue-500 focus:outline-none"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
              />
              <input
                className="flex-1 border-2 border-gray-300 rounded-xl p-2 bg-white focus:border-blue-500 focus:outline-none"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  handleEducationChange(index, "institution", e.target.value)
                }
              />
              <button
                type="button"
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => removeEducation(index)}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-xl"
            onClick={addEducation}
          >
            Add Education
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-medium">Experience</h2>
          {user.experience.map((exp, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 mt-2 bg-white p-4 rounded-lg"
            >
              <input
                className="flex-1 border-2 border-gray-300 rounded-xl p-2 bg-white focus:border-blue-500 focus:outline-none"
                placeholder="Role"
                value={exp.role}
                onChange={(e) =>
                  handleExperienceChange(index, "role", e.target.value)
                }
              />
              <input
                className="flex-1 border-2 border-gray-300 rounded-xl p-2 bg-white focus:border-blue-500 focus:outline-none"
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
              />
              <input
                className="flex-1 border-2 border-gray-300 rounded-xl p-2 bg-white focus:border-blue-500 focus:outline-none"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) =>
                  handleExperienceChange(index, "duration", e.target.value)
                }
              />
              <button
                type="button"
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => removeExperience(index)}
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-xl"
            onClick={addExperience}
          >
            Add Experience
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-medium">Skills</h2>
          <TagsInput
            initialSkills={user.skills}
            onSkillsChange={handleSkillsChange}
          />
        </div>
      </form>
    </div>
  );
}

export default Profile;
