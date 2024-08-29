/* eslint-disable no-undef */
import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";

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
  test("shows main page title", async () => {
    const pageTitle = "Modules list";
    render(<App>{pageTitle}</App>);
    await waitFor(() => {
      expect(screen.getByText(pageTitle)).toBeInTheDocument();
    });
  });
});
