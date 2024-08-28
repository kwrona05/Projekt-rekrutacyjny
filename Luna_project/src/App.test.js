/* eslint-disable no-undef */
import "@testing-library/jest-dom";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import { render, screen } from "@testing-library/react";

import App from "./App";

const mockModules = [
  {
      id: "0a0f77eb1-50a0-4d98-8116-064fc5a84693",
      name: "Hydroponic module 1",
      description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nullam non nisi est sit amet.",
      available: true,
      targetTemperature: 10.0,
  },
  {
      id: "4d0aa62c-b1a9-489d-b4a2-fc16b878ba47",
      name: "Hydroponic module 2",
      description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla aliquet enim tortor at auctor.",
      available: false,
      targetTemperature: 15.5,
  },
  {
      id: "d4928094-8ef8-48be-823a-4cddef643249",
      name: "Hydroponic module 3",
      description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam in arcu cursus euismod quis viverra nibh cras.",
      available: true,
      targetTemperature: 20.0,
  },
]

// query* functions will return the element or null if it cannot be found
  // get* functions will return the element or throw an error if it cannot be found
  // expect(screen.queryByText(pageTitle)).not.toBeNull();


  // .toBeInTheDocument() is an assertion that comes from jest-dom
  // otherwise you could use .toBeDefined()


  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockModules),
    })
  );
  
  beforeEach(() => {
    fetch.mockClear();
  });
  
  test("shows main page title", () => {
  const pageTitle = "Modules list";
  render(<App>{pageTitle}</App>);
  expect(screen.getByText(pageTitle)).toBeInTheDocument();
});
