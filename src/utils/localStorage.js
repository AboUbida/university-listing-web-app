// Function to save data to local storage
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to local storage: ${error.message}`);
  }
};

// Function to get data from local storage
export const getFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error fetching from local storage: ${error.message}`);
    return null;
  }
};

// Function to get an item by ID from local storage
export const getItemById = (key, id) => {
  try {
    const data = getFromLocalStorage(key);
    if (data) {
      return data.find((item) => item.id === id);
    }
    return null;
  } catch (error) {
    console.error(
      `Error fetching item by ID from local storage: ${error.message}`
    );
    return null;
  }
};
