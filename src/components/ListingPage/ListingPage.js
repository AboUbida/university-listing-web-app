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
  // State variables to manage error, delete success, items, filtered items, search term, and sort by criteria
  const [error, setError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  // State variable to manage the item to delete
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        // Fetch data from API
        const data = await fetchData();
        // Add unique IDs to items
        const dataWithUniqueIds = data.map((item, index) => ({
          ...item,
          id: index + 1, // Generate unique ID starting from 1
        }));
        // Set items and filtered items state
        setItems(dataWithUniqueIds);
        setFilteredItems(dataWithUniqueIds);
        // Save items to local storage
        saveToLocalStorage("items", dataWithUniqueIds);
      } catch (error) {
        // Handle API fetch error
        setError("Failed to fetch data. Please try again.");
        // Retrieve cached data from local storage
        const cachedData = getFromLocalStorage("items");
        if (cachedData) {
          // Set items and filtered items state from cached data
          setItems(cachedData);
          setFilteredItems(cachedData);
        }
      }
    };
    fetchDataAndUpdateState();
  }, []);

  // Filter items based on search term whenever search term changes
  useEffect(() => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [items, searchTerm]);

  // Handle sorting change
  const handleSortChange = (sortBy) => {
    setSortBy(sortBy);

    // Clone items array for sorting
    let sortedList = [...items];
    if (sortBy === "alphabetical") {
      // Sort items alphabetically by name
      sortedList.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Set filtered items state with sorted list
    setFilteredItems(sortedList);
  };

  // Handle delete item click
  const handleDeleteItemClick = (itemId) => {
    // Set the item to delete based on item ID
    const itemToDelete = items.find((item) => item.id === itemId);
    setItemToDelete(itemToDelete);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    // Filter out the item to delete from items array
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

  // Handle delete cancel
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
      {/* Search bar and sort dropdown */}
      <div className="search-sort-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SortDropdown sortBy={sortBy} handleSortChange={handleSortChange} />
      </div>
      {/* Display items or no data message */}
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
