import React from "react";
import { useParams, Link } from "react-router-dom";
import { getItemById } from "../../utils/localStorage";

const DetailsPage = () => {
  const { id } = useParams();

  // Fetch item details based on the id from API or local storage
  const item = getItemById("items", Number(id));

  const {
    domains: [domain],
    web_pages: [webPage],
  } = item;

  return (
    <div className="detail-container">
      <h2>{item.name}</h2>
      <p>Domain: {domain}</p>
      <p>Country: {item.country}</p>
      <p>
        Website:{" "}
        <a href={webPage} target="_blank" rel="noopener noreferrer">
          {webPage}
        </a>
      </p>

      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

export default DetailsPage;
