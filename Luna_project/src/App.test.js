/* eslint-disable no-undef */
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import App from "./App";
import { mockModules } from "../__mocks__/mockModules";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockModules),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("COMPONENT TESTS", () => {
  test("shows main page title", () => {
    const pageTitle = "Modules list";
    render(<App>{pageTitle}</App>);
    expect(screen.getByText(pageTitle)).toBeInTheDocument();
  });
});
