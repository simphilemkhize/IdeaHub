import React, { useState } from "react";
import "./Modal.css"; // Keep if there are specific styles you need
import TagsInput from "../CreateProfile/TagsInput";

const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      title: "",
      description: "",
      salaryMin: "",
      salaryMax: "",
      location: "",
      skills: [],
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    const { title, description, salaryMin, salaryMax, location, skills } = formState;
    if (
      title &&
      description &&
      salaryMin &&
      salaryMax &&
      location &&
      skills.length > 0
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (newSkills) => {
    setFormState({ ...formState, skills: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const postData = {
      title: formState.title,
      description: formState.description,
      salary: {
        min: formState.salaryMin,
        max: formState.salaryMax,
      },
      location: formState.location,
      skills: formState.skills,
    };

    try {
      const response = await fetch(
        "https://ideahubfunctionapp.azurewebsites.net/api/addBusinessPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      const result = await response.json();
      console.log("Business post created successfully:", result);
    } catch (error) {
      console.error("Error creating business post:", error);
    }

    onSubmit(formState);

    closeModal();
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-container")) {
      closeModal();
    }
  };

  return (
    <div
      className="modal-container fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="modal bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title
            </label>
            <textarea
              name="title"
              onChange={handleChange}
              value={formState.title}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="salaryMin"
              className="block text-gray-700 font-semibold mb-2"
            >
              Salary Min
            </label>
            <input
              type="number"
              name="salaryMin"
              onChange={handleChange}
              value={formState.salaryMin}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="salaryMax"
              className="block text-gray-700 font-semibold mb-2"
            >
              Salary Max
            </label>
            <input
              type="number"
              name="salaryMax"
              onChange={handleChange}
              value={formState.salaryMax}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-semibold mb-2"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              value={formState.location}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="skills"
              className="block text-gray-700 font-semibold mb-2"
            >
              Skills
            </label>
            <TagsInput
              selectedSkills={formState.skills}
              setSelectedSkills={handleSkillsChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {errors && (
            <div className="error text-red-500 mb-4">{`Please include: ${errors}`}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;