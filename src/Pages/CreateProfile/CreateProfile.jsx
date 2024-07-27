import SignupForm from "../../Components/CreateProfile/SignupForm";

function CreateProfile() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gray-100 p-10 relative">
        <SignupForm />
      </div>
    </div>
  );
}

export default CreateProfile;
