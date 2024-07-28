import * as React from "react";

function Tabs({ currentTab, setCurrentTab }) {
  const tabs = ["Account", "Skills", "Details", "Role"];

  return (
    <div className="flex space-x-4">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-t-lg ${
            currentTab === index
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setCurrentTab(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
