import React, { useState, useRef } from "react";
import { PencilIcon } from "@heroicons/react/solid"; // You need to install @heroicons/react
import TagsInput from "../../Components/CreateProfile/TagsInput";
import logo from "../../assets/logo.png";

function Profile({ user }) {
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

  const [userState, setUserState] = useState(user);

  const handleEditClick = (field) => {
    setIsEditable({ ...isEditable, [field]: !isEditable[field] });
    if (!isEditable[field]) {
      setTimeout(() => inputRefs[field]?.current?.focus(), 100);
    }
  };

  const handleInputChange = (field, value) => {
    setUserState({ ...userState, [field]: value });
  };

  const handleEducationChange = (index, key, value) => {
    const updatedEducation = [...userState.education];
    updatedEducation[index][key] = value;
    setUserState({ ...userState, education: updatedEducation });
  };

  const handleExperienceChange = (index, key, value) => {
    const updatedExperience = [...userState.experience];
    updatedExperience[index][key] = value;
    setUserState({ ...userState, experience: updatedExperience });
  };

  const addEducation = () =>
    setUserState({
      ...userState,
      education: [...userState.education, { degree: "", institution: "" }],
    });

  const removeEducation = (index) =>
    setUserState({
      ...userState,
      education: userState.education.filter((_, i) => i !== index),
    });

  const addExperience = () =>
    setUserState({
      ...userState,
      experience: [
        ...userState.experience,
        { role: "", company: "", duration: "" },
      ],
    });

  const removeExperience = (index) =>
    setUserState({
      ...userState,
      experience: userState.experience.filter((_, i) => i !== index),
    });

  const handleSkillsChange = (newSkills) => {
    setUserState({ ...userState, skills: newSkills });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://ideahubfunctionapp.azurewebsites.net/api/editUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userState),
        }
      );
      const result = await response.json();
      console.log("User updated successfully:", result);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-custom-bg pt-8">
      <div className="flex items-center mb-8 w-full max-w-4xl px-4">
        <div
          className="w-12 h-12 rounded-full mr-4 flex items-center justify-center border border-gray-300 overflow-hidden"
          style={{ width: "12", height: "12" }}
        >
          {userState.companyLogo ? (
            <img
              src={logo}
              alt={`${userState.name} logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-700 font-bold">Logo</span>
          )}
        </div>
        <div>
          <h2 className="text-lg font-bold">
            {userState.name} {userState.surname}
          </h2>
          <p className="text-sm text-gray-500">{userState.role}</p>
        </div>
      </div>
      <form className="w-full max-w-4xl space-y-6 px-4">
        {[
          { label: "Name", value: userState.name, field: "name" },
          { label: "Surname", value: userState.surname, field: "surname" },
          { label: "Role", value: userState.role, field: "role", readOnly: true },
          { label: "Email", value: userState.email, field: "email", readOnly: true },
          {
            label: "Contact Number",
            value: userState.contactNumber,
            field: "contactNumber",
          },
          { label: "Location", value: userState.location, field: "location" },
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
          {userState.education.map((edu, index) => (
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
          {userState.experience.map((exp, index) => (
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
            initialSkills={userState.skills}
            onSkillsChange={handleSkillsChange}
          />
        </div>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl"
          onClick={handleSave}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Profile;