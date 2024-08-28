/* eslint-disable no-undef */
import "@testing-library/jest-dom";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import { render, screen } from "@testing-library/react";

import App from "./App";
import { mockModules } from "../__mocks__/mockModules";


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
