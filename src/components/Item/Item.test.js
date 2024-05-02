import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Item from "./Item";

describe("Item", () => {
  const item = {
    id: 1,
    alpha_two_code: "AE",
    name: "University 1",
    domains: ["university1.com"],
    web_pages: ["https://university1.com"],
  };
  const onDelete = jest.fn();

  it("renders item card with delete button", () => {
    const { getByText } = render(<Item item={item} onDelete={onDelete} />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText("University 1")).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText("Delete")).toBeInTheDocument();
  });

  it("calls onDelete function when delete button is clicked", () => {
    const { getByText } = render(<Item item={item} onDelete={onDelete} />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(getByText("Delete"));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
