import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import CartItems from "@/components/CartItems";

// prevent error from next/router
jest.mock('next/router', () => jest.requireActual('next-router-mock'))

const mockItem = {
    "id" : 2, 
    "title" : "Classic Red Pullover Hoodie",
    "price" : 10,
    "qty"  : 1,
    "images": ["1", "2", "3"]
    }

describe("Shopping Cart Page", () => {

    describe("Basic rendering", () => {
        test ("renders Cart Items when given item", () => {
            render(<CartItems item={mockItem} />);

            expect(screen.getByRole("img", { name: mockItem.title })).toBeInTheDocument();

            expect(screen.getByText(mockItem.title)).toBeInTheDocument();

            expect(screen.getByText("Price: $" + mockItem.price)).toBeInTheDocument();

            expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();

            expect(screen.getByText(mockItem.qty)).toBeInTheDocument();

            expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();

            expect(screen.getByText("Total Price: $" + mockItem.price)).toBeInTheDocument();

            expect(screen.getByRole("button", { name: "✖" })).toBeInTheDocument();

            // screen.debug()

        })
    })
})

// npm test CartItems.test.tsx