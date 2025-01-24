import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Register from "@/pages/register";
import mockRouter from 'next-router-mock'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))



describe("Register Page", () => {

    describe("Basic rendering", () => {
        test ("renders NavBar with all elements", () => {
            render(<Register />);

            expect(screen.getByRole("img", { name: "Shopping Bag" })).toBeInTheDocument();

            expect(screen.getByRole("heading", { name: "Shop Free" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();

            expect(screen.getByRole("img", { name: "Cart" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
        })

        test("renders Register form with all elements", () => {
            render(<Register />);

            expect(screen.getByLabelText("Email")).toBeInTheDocument();

            expect(screen.getByLabelText("Password")).toBeInTheDocument();

            expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();

        })
    })
    
    describe("Disabled States", () => {
        test("Disables submit form during submission", async() => {
            const user = userEvent.setup();

            render(<Register />);
            // screen.debug();

            expect(screen.getByRole("button", { name: "Sign Up" })).toBeEnabled();

            await user.type(screen.getByLabelText("Email"), "2bBtD@example.com");

            await user.type(screen.getByLabelText("Password"), "password123");

            // render(<Register/>);

            await user.click(screen.getByRole("button", { name: "Sign Up" }));

            expect(screen.getByRole("button", { name: "Loading..." })).toBeInTheDocument();

            expect(screen.getByRole("button", { name: "Loading..." })).toBeDisabled();

            render(<Register/>);
            await waitFor(() => {
                expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
            })
        })
    })
})