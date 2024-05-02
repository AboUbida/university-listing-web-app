import React from "react";

const SortDropdown = ({ sortBy, handleSortChange }) => {
  const handleChange = (e) => {
    handleSortChange(e.target.value);
  };

  return (
    <select className="sort-dropdown" value={sortBy} onChange={handleChange}>
      <option value="">Sort By</option>
      <option value="alphabetical">Alphabetical</option>
      {/* Add more sorting options if needed */}
    </select>
  );
};

export default SortDropdown;
