// home.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Home from "./index";

import { fetchData, fetchFavouriteData } from "./utils";

jest.mock("./utils", () => ({
  fetchData: jest.fn(),
  fetchFavouriteData: jest.fn(),
  searchBreweries: jest.fn(),
}));

describe("Home Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders Home component correctly", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Ensure elements are rendered
    expect(screen.getByLabelText("Filter...")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reload list" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Saved items" })
    ).toBeInTheDocument();
  });

  it("fetches data on component mount", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Expect fetchData and fetchFavouriteData to be called
    expect(fetchData).toHaveBeenCalled();
    expect(fetchFavouriteData).toHaveBeenCalled();
  });

  it("displays error alert when trying to remove without selecting items", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Click the "Remove all items" button without selecting items
    fireEvent.click(screen.getByRole("button", { name: "Remove all items" }));

    // Expect error alert to be displayed
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

});