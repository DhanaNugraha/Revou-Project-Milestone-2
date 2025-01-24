import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "@/pages";
import { mock } from "node:test";

// prevent error from next/router
jest.mock('next/router', () => jest.requireActual('next-router-mock'))


// Mock data setup
// We create sample user data that matches our User interface
const mockCategories = [
    {"id":1, "name":"Tools"},
    { "id":2, "name":"Electronics"},
    { "id":3, "name":"Furniture"},
  ];

// Setup MSW (Mock Service Worker)
// This creates a mock server to intercept API calls during testing
const server = setupServer(
    // Define how the server should respond to GET requests
    rest.get("https://api.escuelajs.co/api/v1/categories/", (req, res, ctx) => {
      return res(ctx.json(mockCategories));
    }),
);


// const unmockedFetch = global.fetch;

// Test lifecycle hooks
beforeAll(() => {
    server.listen();
}); // Start mock server before all tests


afterEach(() => {
  server.resetHandlers(); // Reset mock server handlers after each test
  jest.clearAllMocks(); // Clear all mocks after each test
});

afterAll(() => {
    server.close();
}); // Close mock server after all tests


describe("Shopping Cart Page", () => {

    describe("Basic rendering", () => {
        test ("renders NavBar with all elements", () => {
            render(<Home data={mockCategories} />);

            expect(screen.getByRole("img", { name: "Shopping Bag" })).toBeInTheDocument();

            expect(screen.getByRole("heading", { name: "Shop Free" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();

            expect(screen.getByRole("img", { name: "Cart" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
        })

        test ("renders Home page Category component with correct information", () => {
            render(<Home data={mockCategories}/>);

            // Check if all category in mockCategories are rendered
            mockCategories.forEach((category) => {
                expect(screen.getByRole("button", { name: category.name })).toBeInTheDocument();
            })

            // screen.debug()
        })

    })
})

