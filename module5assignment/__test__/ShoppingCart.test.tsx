import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import ShoppingCart from "@/pages/shoppingcart";

// prevent error from next/router
jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe("Shopping Cart Page", () => {

    describe("Basic rendering", () => {

        test ("renders Shopping Cart component before fetch", () => {
            render(<ShoppingCart />);

            expect(screen.getByText("Total Items: 0")).toBeInTheDocument();

            expect(screen.getByText("Total Price: $0")).toBeInTheDocument();

            expect(screen.getByRole("button", { name: "Place Order" })).toBeInTheDocument();
        })
    })

    describe("Disabled States", () => {
        test("Disables Place Order when cart is empty", () => {
            render(<ShoppingCart />);

            expect(screen.getByRole("button", { name: "Place Order" })).toBeDisabled();
        })
    })

})

// npm test ShoppingCart.test.tsx