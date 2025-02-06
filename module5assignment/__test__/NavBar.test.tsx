import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import {setupServer} from 'msw/node'
import { rest } from "msw";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe("Navbar Component", () => {

    describe("Basic rendering", () => {
        test ("renders NavBar with all elements", () => {
            render(<NavBar/>);

            expect(screen.getByRole("img", { name: "Shopping Bag" })).toBeInTheDocument();

            expect(screen.getByRole("heading", { name: "Shop Free" })).toBeInTheDocument();

            expect(screen.getAllByRole("link", { name: "Home" })).toHaveLength(2);

            expect(screen.getAllByRole("img", { name: "Cart" })).toHaveLength(2);

            expect(screen.getAllByRole("link", { name: "Login" })).toHaveLength(2);

            expect(screen.getAllByRole("link", { name: "Sign Up" })).toHaveLength(2);

            expect(screen.getByRole("img", { name: "hamburger Open" })).toBeInTheDocument();

            expect(screen.getByRole("img", { name: "hamburger Close" })).toBeInTheDocument();

        })     
    })

})

// npm test NavBar.test.tsx