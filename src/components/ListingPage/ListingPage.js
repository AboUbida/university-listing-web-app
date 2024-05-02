import React, { useState, useEffect } from "react";
import Item from "../Item/Item";
import SearchBar from "../SearchBar";
import SortDropdown from "../SortDropdown";
import { fetchData } from "../../services/ApiService";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";
import NoData from "../Nodata";

const ListingPage = () => {
  const [error, setError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const data = await fetchData();
        const dataWithUniqueIds = data.map((item, index) => ({
          ...item,
          id: index + 1, // Generate unique ID starting from 1
        }));
        setItems(dataWithUniqueIds);
        setFilteredItems(dataWithUniqueIds);
        saveToLocalStorage("items", dataWithUniqueIds);
      } catch (error) {
        setError("Failed to fetch data. Please try again."); // Set error message
        const cachedData = getFromLocalStorage("items");
        if (cachedData) {
          setItems(cachedData);
          setFilteredItems(cachedData);
        }
      }
    };
    fetchDataAndUpdateState();
  }, []);

  useEffect(() => {
    // Filter items based on search term
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [items, searchTerm]);

  const handleSortChange = (sortBy) => {
    // Implement sorting logic based on sortBy value
    setSortBy(sortBy);

    let sortedList = [...items];
    if (sortBy === "alphabetical") {
      sortedList.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredItems(sortedList);
  };

  const handleDeleteItemClick = (itemId) => {
    // Set the item to delete
    const itemToDelete = items.find((item) => item.id === itemId);
    setItemToDelete(itemToDelete);
  };

  const handleDeleteConfirm = () => {
    // Filter out the item to delete
    const updatedItems = items.filter((item) => item.id !== itemToDelete.id);
    setItems(updatedItems);

    // Remove the item from local storage
    const cachedData = JSON.parse(localStorage.getItem("items"));
    const updatedCachedData = cachedData.filter(
      (item) => item.id !== itemToDelete.id
    );
    localStorage.setItem("items", JSON.stringify(updatedCachedData));

    // Reset itemToDelete state
    setItemToDelete(null);

    // Show delete success message
    setDeleteSuccess(true);

    // Hide delete success message after 3 seconds
    setTimeout(() => {
      setDeleteSuccess(false);
    }, 3000);
  };

  const handleDeleteCancel = () => {
    // Reset itemToDelete state
    setItemToDelete(null);
  };

  return (
    <div>
      {/* Display error message if error exists */}
      {error && <p className="error-message">Error: {error}</p>}{" "}
      {/* Display delete success message with CSS class */}
      {deleteSuccess && (
        <p className="success-message">Item deleted successfully!</p>
      )}{" "}
      <div className="search-sort-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SortDropdown sortBy={sortBy} handleSortChange={handleSortChange} />
      </div>
      {filteredItems.length ? (
        <div className="item-grid">
          {filteredItems.map((item) => (
            <div key={item.id}>
              <Item item={item} onDelete={handleDeleteItemClick} />
            </div>
          ))}
        </div>
      ) : (
        <NoData />
      )}
      {/* Confirmation modal */}
      {itemToDelete && (
        <div className="modal" onClick={handleDeleteCancel}>
          <div className="modal-content">
            <p>Are you sure you want to delete {itemToDelete.name}?</p>
            <button onClick={handleDeleteConfirm}>Yes</button>
            <button onClick={handleDeleteCancel}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingPage;
