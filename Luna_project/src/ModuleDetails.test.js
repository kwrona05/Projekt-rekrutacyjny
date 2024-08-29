/* eslint-disable no-undef */
import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ModuleDetails from "./ModuleDetails";
import { mockModules } from "../__mocks__/mockModules";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockModules[0]),
  })
);

const mockModuleWithTemperature = { ...mockModules[0], temperature: 11 };

beforeEach(() => {
  fetch.mockClear();
});

describe("COMPONENT TESTS", () => {
  test("Is button in document", async () => {
    render(
      <MemoryRouter>
        <ModuleDetails modules={[mockModuleWithTemperature]} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const button = screen.getByTestId("edit-module");
      expect(button).not.toBeUndefined();
      expect(button).toHaveTextContent("Edit module");
    });
  });

  test("testing text in h3 element", async () => {
    render(
      <MemoryRouter>
        <ModuleDetails modules={[mockModuleWithTemperature]} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const h3 = screen.getByTestId("history-module");
      expect(h3).not.toBeUndefined();
      expect(h3).toHaveTextContent("Module Temperature History");
    });
  });

  test("Are two inputs in document", async () => {
    render(
      <MemoryRouter>
        <ModuleDetails modules={[mockModuleWithTemperature]} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const input = screen.getAllByTestId("input-element");
      expect(input).not.toBeUndefined();
      expect(input.length).toBe(2);
    });
  });

  test("Is select defined", async () => {
    render(
      <MemoryRouter>
        <ModuleDetails modules={[mockModuleWithTemperature]} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const select = screen.getByTestId("select-element");
      expect(select).not.toBeUndefined();
    });
  });

  test("Are two opitons with correct text in document", async () => {
    render(
      <MemoryRouter>
        <ModuleDetails modules={[mockModuleWithTemperature]} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const options = screen.getAllByRole("option");
      expect(options).not.toBeUndefined();
      expect(options.length).toBe(2);

      const hourly = screen.getByTestId("hourly");
      expect(hourly).not.toBeUndefined();
      expect(hourly).toHaveTextContent("Hourly");

      const daily = screen.getByTestId("daily");
      expect(daily).not.toBeUndefined();
      expect(daily).toHaveTextContent("Daily");
    });
  });
});
describe("SNAPSHOT TESTS", () => {
  test("It matches saved snapshot", async () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: jest.fn(() => mockModules[0].id),
    }));

    render(
      <MemoryRouter>
        <ModuleDetails modules={[mockModuleWithTemperature]} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const button = screen.getByTestId("edit-module");
      expect(button).toMatchSnapshot();
    });
  });
});
