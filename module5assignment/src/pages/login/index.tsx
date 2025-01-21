import { useState } from "react";
import { useRouter } from "next/router";
import LoginRegisterForm from "@/components/LoginRegisterForm";
import NavBar from "@/components/NavBar";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLoginSubmit = async (event: any) => {
        event.preventDefault();

        try {
        const response = await fetch(
            "https://api.escuelajs.co/api/v1/auth/login",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            }
        );

        const data = await response.json();

        data.access_token
        ?  localStorage.setItem("access_token", data.access_token)
        : alert("Invalid Email or Password!")

        } catch (error) {
            console.error("Error fetching user:", error);

        } finally {
            if (localStorage.getItem("access_token")) {
                alert("You have successfully logged in!");
                router.push("/");
            } 
        }
    };

    return (
        <>
            <NavBar />
            <LoginRegisterForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onSubmit={handleLoginSubmit}
                formType = "Login"
            />
        </>
    );
};

export default Login;
