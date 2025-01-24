import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import Product from "@/components/Product";

// prevent error from next/router
jest.mock('next/router', () => jest.requireActual('next-router-mock'))

const mockProduct = {
    "id" : 2, 
    "title" : "Classic Red Pullover Hoodie",
    "price" : 10,
    "qty"  : 1,
    "images": ["1", "2", "3"]
    }

describe("Shopping Cart Page", () => {

    describe("Basic rendering", () => {
        test ("renders Product when given item", () => {
            render(<Product product={mockProduct} />);

            expect(screen.getByRole("img", { name: mockProduct.title })).toBeInTheDocument();

            expect(screen.getByText(mockProduct.title)).toBeInTheDocument();

            expect(screen.getByText("$" + mockProduct.price)).toBeInTheDocument();

            expect(screen.getByRole("button", { name: "Add to Cart" })).toBeInTheDocument();

            screen.debug()

        })
    })
})

// npm test Product.test.tsx