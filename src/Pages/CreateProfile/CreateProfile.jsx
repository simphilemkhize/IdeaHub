import SignupForm from "../../Components/CreateProfile/SignupForm";

function CreateProfile() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="w-full max-w-4xl px-4 lg:px-0">
        <SignupForm />
      </div>
    </div>
  );
}

export default CreateProfile;
