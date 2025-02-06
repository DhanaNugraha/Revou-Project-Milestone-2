import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import { rest } from "msw";
import { setupServer } from "msw/node";
import CategoryPage from "@/pages/category/[categoryId]";
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

// const mockProducts = [
//     {"id":2,"title":"Classic Red Pullover Hoodie","price":10,"description":"Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.","images":["[\"https://i.imgur.com/1twoaDy.jpeg\"","\"https://i.imgur.com/FDwQgLy.jpeg\"","\"https://i.imgur.com/kg1ZhhH.jpeg\"]"],"creationAt":"2025-01-24T08:29:50.000Z","updatedAt":"2025-01-24T08:36:29.000Z","category":{"id":1,"name":"Tools","image":"tools.png","creationAt":"2025-01-24T08:29:50.000Z","updatedAt":"2025-01-24T09:42:00.000Z"}},

//     {"id":3,"title":"Classic Heather Gray Hoodie","price":69,"description":"Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.","images":["[\"https://i.imgur.com/cHddUCu.jpeg\"","\"https://i.imgur.com/CFOjAgK.jpeg\"","\"https://i.imgur.com/wbIMMme.jpeg\"]"],"creationAt":"2025-01-24T08:29:50.000Z","updatedAt":"2025-01-24T10:03:22.000Z","category":{"id":1,"name":"Tools","image":"tools.png","creationAt":"2025-01-24T08:29:50.000Z","updatedAt":"2025-01-24T09:42:00.000Z"}}
// ];


// Setup MSW (Mock Service Worker)
// This creates a mock server to intercept API calls during testing
const server = setupServer(

    // Define how the server should respond to GET requests
    rest.get("https://api.escuelajs.co/api/v1/categories/", (req, res, ctx) => {
      return res(ctx.json(mockCategories));
    }),

    // Define how the server should respond to GET requests
    // rest.get(`https://api.escuelajs.co/api/v1/categories/1/products`, (req, res, ctx) => {
    //     return res(ctx.json(mockProducts));
    // }),
);


// const unmockedFetch = global.fetch;

// Test lifecycle hooks
beforeAll(() => {
    server.listen();
}); // Start mock server before all tests


afterEach(() => {
  server.resetHandlers(); // Reset mock server handlers after each test
//   jest.clearAllMocks(); // Clear all mocks after each test
});

afterAll(() => {
    server.close();
}); // Close mock server after all tests


describe("Category Page", () => {

    describe("Basic rendering", () => {

        test ("renders Category page Category component with correct information", () => {
            render(<CategoryPage data={mockCategories}/>);

            // Check if all category in mockCategories are rendered
            mockCategories.forEach((category) => {
                expect(screen.getByRole("button", { name: category.name })).toBeInTheDocument();
            })

            expect(screen.getByLabelText("Category:")).toBeInTheDocument();

            expect(screen.getByLabelText("Sort By:")).toBeInTheDocument();

            expect(screen.getByText("Showing 0 products")).toBeInTheDocument();

            // screen.debug()
        })

        test("shows loading state initially", () => {
            render(<CategoryPage data={mockCategories} />);
            expect(screen.getByTestId("loading-state")).toBeInTheDocument();

        });

    })
})

// npm test CategoryPage.test.tsx