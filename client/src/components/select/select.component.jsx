import "./select.styles.scss";
import { useState } from "react";

// import React from 'react'

const Select = ({ passOption, options }) => {
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleOptions = () => {
    setIsOptionVisible((isOptionVisible) => !isOptionVisible);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    toggleOptions();
  };
  passOption(selectedOption);
  const clearFilter = () => {
    setSelectedOption("");
    toggleOptions();
  };
  const hideOptions = isOptionVisible ? { display: "flex" } : {};
  const toogleClearFilterStyles =
    isOptionVisible && selectedOption
      ? { display: "flex" }
      : { display: "none" };
  return (
    <ul className="select">
      <li onClick={toggleOptions} className="filter">
            <img
              src="/icons/filter.png"
              alt="filter-icon"
              className="filter-icon"
            />
            <p>{selectedOption || '<Filter>'}</p>
      </li>
      <li
        className="clear-filter option"
        style={{ ...toogleClearFilterStyles }}
        onClick={clearFilter}
      >
        <p>Clear Filter &times;</p>
      </li>
      {options?.map((option) => {
        if(option === selectedOption){
            return null;
        }
        return <li
        className="option"
        style={{ ...hideOptions }}
        onClick={() => selectOption(option)}
      >
        <p>{option}</p>
      </li>
      })}
    </ul>
  );
};

export default Select;
