import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import ProductDetail from "@/pages/productdetail/[productId]";

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe("Product Detail Page", () => {

    describe("Basic rendering", () => {
        test ("renders NavBar with all elements", () => {
            render(<ProductDetail />);

            expect(screen.getByRole("img", { name: "Shopping Bag" })).toBeInTheDocument();

            expect(screen.getByRole("heading", { name: "Shop Free" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();

            expect(screen.getByRole("img", { name: "Cart" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
        })

        test ("renders Product Detail component before fetch", () => {
            render(<ProductDetail />);

            expect(screen.getByText("Loading...")).toBeInTheDocument();

            expect(screen.getByRole("img", { name: "Product" })).toBeInTheDocument();

            expect(screen.getByRole("button", { name: "Add to Cart" })).toBeInTheDocument();
        })
    })
})