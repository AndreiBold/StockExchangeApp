import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.css";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function Dropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options
    .filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.localeCompare(b));

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchQuery(""); // Reset search query after selecting an option
    if (onSelect) {
      onSelect(option);
    }
  };

  const handleOutsideClick = (event) => {
    // Check if the click target is not inside the dropdown and close it if it's open
    if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Register event listener when the component mounts
    window.addEventListener("click", handleOutsideClick);
  
    // Unregister event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]); // Add 'isOpen' to the dependency array to ensure the effect runs when the state changes

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={handleDropdownToggle}>
        {selectedOption || "Select a company"}
        {isOpen ? (
          <FaArrowUp className="arrow-dd" />
        ) : (
          <FaArrowDown className="arrow-dd" />
        )}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <input
            type="text"
            className="search-input"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredOptions.length === 0 ? (
            <p className="no-data-message">No company found</p>
          ) : (
            <ul className="option-list">
              {filteredOptions.map((option) => (
                <li key={option} onClick={() => handleOptionSelect(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
