import React, { useState } from "react";
import "./Modal.css"; // Keep if there are specific styles you need
import TagsInput from "../CreateProfile/TagsInput";

const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      title: "",
      description: "",
      salary: "",
      location: "",
      skills: ["Java", "JavaScript", "React"],
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    const { title, description, salary, location, skills } = formState;
    if (title && description && salary && location && skills.length > 0) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
        <form>
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
              htmlFor="salary"
              className="block text-gray-700 font-semibold mb-2"
            >
              Salary
            </label>
            <input
              type="text"
              name="salary"
              onChange={handleChange}
              value={formState.salary}
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
              tags={formState.skills}
              onChange={handleSkillsChange}
              placeholder="Add skills"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {errors && (
            <div className="error text-red-500 mb-4">{`Please include: ${errors}`}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
