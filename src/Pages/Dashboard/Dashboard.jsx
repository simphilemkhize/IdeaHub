import React from "react";
import JobCard from "../../Components/Jobposts/JobCard";
import { useAuth } from "../../Components/Login/AuthContext";
const initialPosts = [
  {
    title: "Frontend Developer",
    description:
      "We are looking for a skilled frontend developer to join our team.",
    salary: "$60,000 - $80,000",
    skills: ["React", "CSS", "JavaScript"],
    location: "Johannesburg",
    companyName: "Derivco",
    datePosted: "2024-07-27",
    companyLogo: "", // Add the URL to the company logo if available
  },
  {
    title: "Backend Developer",
    description: "Join our backend team to work on scalable applications.",
    salary: "$70,000 - $90,000",
    skills: ["Node.js", "Express", "MongoDB"],
    location: "Cape Town",
    companyName: "Derivco",
    datePosted: "2024-07-26",
    companyLogo: "", // Add the URL to the company logo if available
  },
  {
    title: "Full Stack Developer",
    description:
      "Seeking a full stack developer with a passion for building web applications.",
    salary: "Commission Based",
    skills: ["React", "Node.js", "SQL"],
    location: "Durban",
    companyName: "Derivco",
    datePosted: "2024-07-25",
    companyLogo: "", // Add the URL to the company logo if available
  },
];

function Dashboard() {
  const { isAuthenticated: isAuthenticatedCustom, user } = useAuth(); // If using custom auth context

  if (!isAuthenticatedCustom) {
    return <p>You do not have access to this page.</p>;
  }

  if (user?.user_type === "job_seeker") {
    return (
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 bg-gray-100 p-10 relative overflow-y-auto">
          <p>My dashboard</p>

          <div className="mt-20 space-y-4 group">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 h-full">
              <div className="bg-white rounded-lg shadow-md p-4 flex-1 hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300 overflow-y-auto">
                <h3 className="text-lg font-bold mb-2">Applications</h3>
                <p className="text-sm text-gray-700"></p>
                <div className="space-y-4">
                  {initialPosts.map((post, index) => (
                    <JobCard
                      key={index}
                      companyName={post.companyName}
                      companyLogo={post.companyLogo}
                      title={post.title}
                      description={post.description}
                      salary={post.salary}
                      location={post.location}
                      datePosted={post.datePosted}
                      skills={post.skills}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 flex-1 hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300 overflow-y-auto">
                <h3 className="text-lg font-bold mb-2">Job Matches</h3>
                <div className="space-y-4">
                  {initialPosts.map((post, index) => (
                    <JobCard
                      key={index}
                      companyName={post.companyName}
                      companyLogo={post.companyLogo}
                      title={post.title}
                      description={post.description}
                      salary={post.salary}
                      location={post.location}
                      datePosted={post.datePosted}
                      skills={post.skills}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (user?.user_type === "business_owner") {
    const recentPosts = initialPosts.slice(0, 3); // Assuming initialPosts contains the posts for the business owner
    const totalApplications = initialPosts.length; // Example logic for total applications

    return (
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 bg-gray-100 p-10 relative overflow-y-auto">
          <p>Business Owner Dashboard</p>

          <div className="mt-20 space-y-4 group">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 h-full">
              <div className="bg-white rounded-lg shadow-md p-4 flex-1 hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300 overflow-y-auto">
                <h3 className="text-lg font-bold mb-2">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <JobCard
                      key={index}
                      companyName={post.companyName}
                      companyLogo={post.companyLogo}
                      title={post.title}
                      description={post.description}
                      salary={post.salary}
                      location={post.location}
                      datePosted={post.datePosted}
                      skills={post.skills}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 flex-1 hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300 overflow-y-auto">
                <h3 className="text-lg font-bold mb-2">Total Applications</h3>
                <div className="text-2xl font-bold">{totalApplications}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <p>You do not have access to this page.</p>;
}

export default Dashboard;
