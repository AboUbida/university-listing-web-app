import React from "react";
import { useNavigate } from "react-router-dom";

const Item = ({ item, onDelete }) => {
  const navigate = useNavigate();

  const handleViewItem = () => {
    navigate(`/details/${item.id}`);
  };

  const handleDelete = () => {
    onDelete(item?.id);
  };

  // Destructure the domains and web pages arrays to get the first element
  const {
    domains: [domain],
    web_pages: [webPage],
  } = item;

  return (
    <div className="item-card">
      <div onClick={handleViewItem}>
        <h3>{item.name}</h3>
        <p>
          <span className="domain">{domain}</span>
        </p>
        <p>
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
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Item;
