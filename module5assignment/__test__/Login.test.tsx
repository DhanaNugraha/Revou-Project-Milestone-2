import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "@/pages/login";
// import LoginRegisterForm from "@/components/LoginRegisterForm";
import mockRouter from 'next-router-mock'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))


// ===== BASIC TESTS ====

describe("Login Page", () => {

    describe("Basic rendering", () => {
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
            const mockSubmit = jest.fn().mockResolvedValue(undefined);

            render(<Login />);
            // screen.debug();

            // await user.type(screen.getByRole('textbox', {name: "emailInput"}), "2bBtD@example.com");
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