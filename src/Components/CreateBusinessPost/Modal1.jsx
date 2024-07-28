import React, { useState } from "react";
import TagsInput from "../CreateProfile/TagsInput";
import Profile from "../../Pages/ProfilePage/Profile";
const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      title: "",
      description: "",
      salary: "",
      location: "",
      skills: ["Java", "JavaScript", "React"],
      applicants: [],
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
      <div className="modal bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-4 overflow-y-auto max-h-screen">
        <form onSubmit={handleSubmit}>
          {errors && (
            <div className="error text-red-500 mb-4">{`Please include: ${errors}`}</div>
          )}
        </form>

        <div className="applicants mt-6">
          <h3 className="text-lg font-semibold mb-4">Applicants</h3>
          {formState.applicants.length > 0 ? (
            formState.applicants.map((applicant, index) => (
              <Profile key={index} user={applicant} />
            ))
          ) : (
            <p>No applicants yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
