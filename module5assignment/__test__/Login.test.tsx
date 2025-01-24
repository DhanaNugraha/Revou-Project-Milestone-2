import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "@/pages/login";
// import LoginRegisterForm from "@/components/LoginRegisterForm";
import mockRouter from 'next-router-mock'

// prevent error from next/router
jest.mock('next/router', () => jest.requireActual('next-router-mock'))



describe("Login Page", () => {

    describe("Basic rendering", () => {
        test ("renders NavBar with all elements", () => {
            render(<Login />);

            expect(screen.getByRole("img", { name: "Shopping Bag" })).toBeInTheDocument();

            expect(screen.getByRole("heading", { name: "Shop Free" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();

            expect(screen.getByRole("img", { name: "Cart" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();

            expect(screen.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
        })

        test("renders Login form with all elements", () => {
            render(<Login />);

            expect(screen.getByLabelText("Email")).toBeInTheDocument();

            expect(screen.getByLabelText("Password")).toBeInTheDocument();

            expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();

        })
    })
    
    describe("Disabled States", () => {
        test("Disables submit form during submission", async() => {
            const user = userEvent.setup();

            render(<Login />);
            // screen.debug();

            expect(screen.getByRole("button", { name: "Login" })).toBeEnabled();

            await user.type(screen.getByLabelText("Email"), "2bBtD@example.com");

            await user.type(screen.getByLabelText("Password"), "password123");

            await user.click(screen.getByRole("button", { name: "Login" }));

            expect(screen.getByRole("button", { name: "Loading..." })).toBeInTheDocument();

            expect(screen.getByRole("button", { name: "Loading..." })).toBeDisabled();

            render(<Login />);
            await waitFor(() => {
                expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
            })
        })
    })
})