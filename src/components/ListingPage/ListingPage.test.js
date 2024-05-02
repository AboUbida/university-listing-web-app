import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import ListingPage from "./ListingPage";
import { fetchData } from "../../services/ApiService";

jest.mock("../../services/ApiService");

describe("ListingPage", () => {
  it("renders listing page with items", async () => {
    const mockData = [
      {
        id: 1,
        alpha_two_code: "AE",
        name: "University 1",
        domains: ["university1.com"],
        web_pages: ["https://university1.com"],
      },
    ];
    fetchData.mockResolvedValueOnce(mockData);

    const { getByText } = render(
      <Router>
        <ListingPage />
      </Router>
    );

    // Wait for the data to be fetched
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText("University 1")).toBeInTheDocument();
    });
  });

  // Add more test cases for search, sort, delete functionality, etc.
});
