/* eslint-disable no-undef */
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import ModuleList from "./ModulesList";
import { MemoryRouter } from "react-router-dom";
import { mockModules } from "../__mocks__/mockModules";

describe("COMPONENT TESTS", () => {
  test("testing link elements", () => {
    render(
      <MemoryRouter>
        <ModuleList modules={mockModules} />
      </MemoryRouter>
    );

    const links = screen.getAllByTestId("modules-list");

    expect(links).not.toBeUndefined();
    expect(links.length).toBe(3);
  });

  test("testing module name", () => {
    render(
      <MemoryRouter>
        <ModuleList modules={mockModules}></ModuleList>
      </MemoryRouter>
    );

    const moduleNames = screen.getAllByTestId("module-name");

    expect(moduleNames).toHaveLength(3);
    expect(moduleNames[0]).toHaveTextContent("Hydroponic module 1");
    expect(moduleNames[1]).toHaveTextContent("Hydroponic module 2");
    expect(moduleNames[2]).toHaveTextContent("Hydroponic module 3");
  });
});
