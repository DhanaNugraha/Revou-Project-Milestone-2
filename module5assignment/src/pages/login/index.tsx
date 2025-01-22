import { useState } from "react";
import { useRouter } from "next/router";
import LoginRegisterForm from "@/components/LoginRegisterForm";
import NavBar from "@/components/NavBar";
import Head from "next/head";

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
            <Head>
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/svg+xml" href="/shopping-bag.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Shop Free Login page. Find your favorite products here." />
                <meta name="keyword" content="Shop Free, Login" />
                <meta name="author" content="Dhana Nugraha" />
                <title>Shop Free: Login</title>
            </Head>

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
