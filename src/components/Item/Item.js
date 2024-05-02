import React from "react";
import { useNavigate } from "react-router-dom";

const Item = ({ item, onDelete }) => {
  // Initialize navigate function from useNavigate hook
  const navigate = useNavigate();

  // Function to navigate to details page when item is clicked
  const handleViewItem = () => {
    navigate(`/details/${item.id}`);
  };

  // Function to handle delete button click
  const handleDelete = () => {
    // Call onDelete function with item ID as parameter
    onDelete(item?.id);
  };

  // Destructure the domains and web pages arrays to get the first element
  const {
    domains: [domain],
    web_pages: [webPage],
  } = item;

  return (
    <div className="item-card">
      {/* Click event to navigate to details page */}
      <div onClick={handleViewItem}>
        <h3>{item.name}</h3>
        <p>
          {/* Display domain */}
          <span className="domain">{domain}</span>
        </p>
        <p>
          {/* Link to visit website */}
          <a
            href={webPage}
            className="web-page"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </a>
        </p>
      </div>
      {/* Delete button */}
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Item;
