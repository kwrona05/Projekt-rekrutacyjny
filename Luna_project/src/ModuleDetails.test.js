/* eslint-disable no-undef */
import "@testing-library/jest-dom"

import { render, screen, getByRole, getAllByRole, waitFor  } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import ModuleDetails from "./ModuleDetails"
import { mockFetch } from "../__mocks__/mock-fetch";
import { mockModules } from "../__mocks__/mockModules";

// query* functions will return the element or null if it cannot be found
  // get* functions will return the element or throw an error if it cannot be found
  // expect(screen.queryByText(pageTitle)).not.toBeNull();


  // .toBeInTheDocument() is an assertion that comes from jest-dom
  // otherwise you could use .toBeDefined()

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockModules[0]),
    })
  );
  
  beforeEach(() => {
    fetch.mockClear();
  });
  

test('Is button in document', async () => {
    render(<MemoryRouter><ModuleDetails /></MemoryRouter>)

    await waitFor(() => {
        const button = screen.getByTestId('edit-module')
        console.log(button)
        expect(button).not.toBeUndefined()
        expect(button).toHaveTextContent('Edit module')
    })
});

test('testing text in h3 element',  async () => {
    render(<MemoryRouter><ModuleDetails /></MemoryRouter>)

    await waitFor(() => {
        const h3 = screen.getByTestId('history-module')
        console.log(h3)
        expect(h3).not.toBeUndefined()
        expect(h3).toHaveTextContent('Module Temperature History')
    })
});

test('Are two inputs in document', async () => {
    render(<MemoryRouter><ModuleDetails /></MemoryRouter>)

    await waitFor(() => {
        const input = screen.getAllByTestId('input-element')
        console.log(input)
        expect(input).not.toBeUndefined()
        expect(input.length).toBe(2)
    })
})

test('Is select defined', async () => {
    render(<MemoryRouter><ModuleDetails /></MemoryRouter>)

    await waitFor(() => {
        const select = screen.getByTestId('select-element')
        console.log(select)
        expect(select).not.toBeUndefined()
    })
})

test('Are two opitons with correct text in document', async () => {
    render(<MemoryRouter><ModuleDetails /></MemoryRouter>)

    await waitFor(() => {
        const options = screen.getAllByRole('option')
        console.log(options)
        expect(options).not.toBeUndefined()
        expect(options.length).toBe(2)
        
        const hourly = screen.getByTestId('hourly')
        console.log(hourly)
        expect(hourly).not.toBeUndefined()
        expect(hourly).toHaveTextContent('Hourly')

        const daily = screen.getByTestId('daily')
        console.log(daily)
        expect(daily).not.toBeUndefined()
        expect(daily).toHaveTextContent('Daily')

    })
})
