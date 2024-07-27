import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TagsInput from "./TagsInput";
import Tabs from "./Tabs";

function SignupForm() {
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSignupComplete, setIsSignupComplete] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(0);

  // State for details tab
  const [location, setLocation] = React.useState("");
  const [education, setEducation] = React.useState([
    { degree: "", institution: "" },
  ]);
  const [experience, setExperience] = React.useState([
    { role: "", company: "", duration: "" },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Trying to submit data");
      // Assuming the sign-up process is successful
      const result = true; // Replace with actual sign-up logic
      if (result) {
        setError(""); // Clear error if sign-up is successful
        setIsSignupComplete(true); // Set signup complete to true
        setCurrentTab(1); // Move to the next tab
      } else {
        setError(result.message || "Sign-up failed"); // Set error if sign-up fails
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError("An error occurred during sign-up");
    }
  };

  // Handle adding and removing education and experience entries
  const addEducation = () =>
    setEducation([...education, { degree: "", institution: "" }]);
  const removeEducation = (index) =>
    setEducation(education.filter((_, i) => i !== index));
  const updateEducation = (index, key, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][key] = value;
    setEducation(updatedEducation);
  };

  const addExperience = () =>
    setExperience([...experience, { role: "", company: "", duration: "" }]);
  const removeExperience = (index) =>
    setExperience(experience.filter((_, i) => i !== index));
  const updateExperience = (index, key, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][key] = value;
    setExperience(updatedExperience);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 max-w-lg mx-auto min-h-[400px] flex flex-col overflow-hidden">
      <div className="sticky top-0 bg-white border-b-2 border-gray-200">
        <h1 className="text-5xl font-semibold text-center mb-4 py-4">
          Sign Up!
        </h1>
        <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      <div className="flex-1 overflow-auto p-6">
        {currentTab === 0 && (
          <>
            <p className="font-medium text-lg text-gray-500 mb-4">
              Please enter your details to create an account.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-lg font-medium">Username</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-lg font-medium">Password</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-red-500 font-medium">{error}</div>}
              <div className="flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-blue-500 text-white text-lg font-bold"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => loginWithRedirect()}
                  className="flex rounded-xl py-3 border-2 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                      fill="#34A853"
                    />
                    <path
                      d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                      fill="#4A90E2"
                    />
                    <path
                      d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                      fill="#FBBC05"
                    />
                  </svg>
                  Sign up with Google
                </button>
              </div>
            </form>
          </>
        )}

        {currentTab === 1 && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">
              Please enter your skills
            </h1>
            <TagsInput />
            <button
              onClick={() => setCurrentTab(0)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded-xl"
            >
              Back
            </button>
          </div>
        )}

        {currentTab === 2 && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Details</h1>
            <div>
              <label className="text-lg font-medium">Location</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-blue-500 focus:outline-none"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-medium mb-2">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4 border-b border-gray-300 pb-4">
                  <div>
                    <label className="text-lg font-medium">Degree</label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-blue-500 focus:outline-none"
                      placeholder="Enter degree"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(index, "degree", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-lg font-medium">Institution</label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-blue-500 focus:outline-none"
                      placeholder="Enter institution"
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(index, "institution", e.target.value)
                      }
                    />
                  </div>
                  <button
                    onClick={() => removeEducation(index)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-xl"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addEducation}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl"
              >
                Add Education
              </button>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-medium mb-2">Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4 border-b border-gray-300 pb-4">
                  <div>
                    <label className="text-lg font-medium">Role</label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-blue-500 focus:outline-none"
                      placeholder="Enter role"
                      value={exp.role}
                      onChange={(e) =>
                        updateExperience(index, "role", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-lg font-medium">Company</label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-blue-500 focus:outline-none"
                      placeholder="Enter company"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(index, "company", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-lg font-medium">Duration</label>
                    <input
                      className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:border-blue-500 focus:outline-none"
                      placeholder="Enter duration"
                      value={exp.duration}
                      onChange={(e) =>
                        updateExperience(index, "duration", e.target.value)
                      }
                    />
                  </div>
                  <button
                    onClick={() => removeExperience(index)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-xl"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl"
              >
                Add Experience
              </button>
            </div>
            <button
              onClick={() => setCurrentTab(1)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded-xl"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupForm;
