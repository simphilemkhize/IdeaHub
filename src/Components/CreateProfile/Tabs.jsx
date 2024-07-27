import React from "react";

function Tabs({ currentTab, setCurrentTab }) {
  return (
    <div className="flex justify-center mb-4">
      <button
        className={`px-4 py-2 ${
          currentTab === 0
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700"
        }`}
        onClick={() => setCurrentTab(0)}
      >
        Account Info
      </button>
      <button
        className={`px-4 py-2 ml-2 ${
          currentTab === 1
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700"
        }`}
        onClick={() => setCurrentTab(1)}
      >
        Skills
      </button>
      <button
        className={`px-4 py-2 ml-2 ${
          currentTab === 2
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700"
        }`}
        onClick={() => setCurrentTab(2)}
      >
        Details
      </button>
    </div>
  );
}

export default Tabs;
