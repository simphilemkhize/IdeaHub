function Dashboard() {
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gray-100 p-10 relative">
        <p>My dashboard</p>

        <div className="mt-20 space-y-4 group">
          <div className="flex space-x-4">
            <div className="bg-white rounded-lg shadow-md p-4 flex-1 hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
              <h3 className="text-lg font-bold mb-2">My Profile</h3>
              <p className="text-sm text-gray-700"></p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 flex-1 hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
              <h3 className="text-lg font-bold mb-2">Business Posts</h3>
              <div className="space-y-4"></div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 flex-1 hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
              <h3 className="text-lg font-bold mb-2">Add Business Posts</h3>
              <div className="flex flex-col"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
