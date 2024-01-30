// Beer.test.js

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Beer from "./index";

const beer = {
  id: "5128df48-79fc-4f0f-8b52-d06be54d0cec",
  name: "(405) Brewing Co",
  brewery_type: "micro",
  address_1: "1716 Topeka St",
  address_2: null,
  address_3: null,
  city: "Norman",
  state_province: "Oklahoma",
  postal_code: "73069-8224",
  country: "United States",
  longitude: "-97.46818222",
  latitude: "35.25738891",
  phone: "4058160490",
  website_url: "http://www.405brewing.com",
  state: "Oklahoma",
  street: "1716 Topeka St",
};

jest.mock("./utils", () => ({
    fetchData: (setData: (data: typeof beer) => void) => {
      setData(beer);
    },
  }));

describe("Beer", () => {
  beforeEach(() => {
    // Mock route param
    const mockBear = {
      ...beer
    };

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({
        id: mockBear.id,
      }),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("displays beer details", async () => {
    render(
      <BrowserRouter>
        <Beer />
      </BrowserRouter>
    );

    // Check name
    expect(
      await screen.findByRole("heading", { name: beer.name })
    ).toBeInTheDocument();

    // Check type
    expect(screen.getByText(`Type: ${beer.brewery_type}`)).toBeInTheDocument();

    // Check website
    expect(
      screen.getByRole("link", { name: beer.website_url })
    ).toBeInTheDocument();

    // Check phone
    expect(screen.getByText(beer.phone)).toBeInTheDocument();

    // Check coordinates
    expect(
      screen.getByText(`Coordinate: ${beer.latitude}, ${beer.longitude}`)
    ).toBeInTheDocument();
  });
});