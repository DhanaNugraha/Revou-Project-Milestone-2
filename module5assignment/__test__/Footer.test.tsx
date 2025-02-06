import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import {setupServer} from 'msw/node'
import { rest } from "msw";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe("Footer Component", () => {

    describe("Basic rendering", () => {
        test ("renders Footer with all elements", () => {
            render(<Footer />);

            expect(screen.getAllByRole("heading", { level: 2})).toHaveLength(4);

            expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Shopping Cart" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "About Us" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Shop Free Care" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Terms and Conditions" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Privacy" })).toBeInTheDocument();

            expect(screen.getByRole("img", { name: "Facebook" })).toBeInTheDocument();

            expect(screen.getByRole("img", { name: "Twitter" })).toBeInTheDocument();

            expect(screen.getByRole("img", { name: "Instagram" })).toBeInTheDocument();

            expect(screen.getByRole("img", { name: "Shopping Bag" })).toBeInTheDocument();

        })     
    })

})

// npm test Footer.test.tsx