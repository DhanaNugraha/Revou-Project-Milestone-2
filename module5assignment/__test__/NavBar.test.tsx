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

            expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();

            expect(screen.getByRole("img", { name: "Cart" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
        })     
    })

})

// npm test NavBar.test.tsx