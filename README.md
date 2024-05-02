# University Listing Web App

## Introduction

The University Listing Web App is a ReactJS-based web application that allows users to browse and interact with a list of universities. It provides features such as listing universities, displaying details, searching, sorting, and deleting items.

## Features

- List universities from the United Arab Emirates.
- Display university details.
- Search universities by name or domain.
- Sort universities alphabetically.
- Delete universities from the list.

## Technologies Used

- ReactJS
- localStorage
- Axios
- CSS for styling

## Project Structure

The project follows the MVC (Model-View-Controller) architecture, where:

- `src/components` contains React components.
- `src/services` contains the ApiService for fetching data from the API.
- `src/utils` contains utility functions.
- `src/tests` contains unit tests.

## Installation Guide

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd university-listing-web-app`
3. Install dependencies: `yarn install`
4. Run the development server: `yarn start`

## Usage Guide

1. Upon landing on the Listing page, the user sees a list of universities fetched from the API.
2. The user can click on a university to view its details.
3. The user can search for a university by name or domain using the search bar.
4. The user can sort the list alphabetically using the dropdown.
5. The user can delete a university by clicking on the delete button.

## Testing

Unit tests are implemented for critical parts of the application, including network request handling, data retrieval, and external dependencies. Run tests using `yarn test`.

## Error Handling

- If the API fails, the app retrieves data from the local storage if available.
- Error messages are displayed for API fetch errors and other errors.

## Offline Support

The web app seamlessly handles API failures by utilizing cached data in the local storage.
