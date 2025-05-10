import React, { useState, useRef, useEffect } from "react";
import { Bookmark, Sun, Moon, Settings } from "lucide-react";

const ProfileDropdown = ({ profileImage = "/api/placeholder/40/40" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Picture Button */}
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border border-gray-200">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm font-medium text-gray-700">Profile Name</div>
            </div>
          </div>

          <ul className="py-1">
            <li>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => {
                  console.log("Bookmarked PG clicked");
                  setIsOpen(false);
                }}
              >
                <Bookmark className="w-4 h-4 mr-3 text-gray-500" />
                Bookmarked PG
              </button>
            </li>
            <li>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => {
                  toggleDarkMode();
                  console.log("Toggle Light/Dark clicked");
                }}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 mr-3 text-gray-500" />
                ) : (
                  <Moon className="w-4 h-4 mr-3 text-gray-500" />
                )}
                Toggle Light/Dark
              </button>
            </li>
            <li>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => {
                  console.log("Settings clicked");
                  setIsOpen(false);
                }}
              >
                <Settings className="w-4 h-4 mr-3 text-gray-500" />
                Settings
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; // Ensure correct export
