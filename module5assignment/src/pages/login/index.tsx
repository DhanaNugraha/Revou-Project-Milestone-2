import { useState } from "react";
import { useRouter } from "next/router";
import LoginRegisterForm from "@/components/LoginRegisterForm";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLoginSubmit = async (event: any) => {
        event.preventDefault();

        setIsLoading(true);

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
        : toast.error("Invalid Email or Password!",   
            {style: {
            background: '#666666',
            color: '#FFFFFF',
        }});

        setIsLoading(false);

        } catch (error) {
            console.error("Error fetching user:", error);

        } finally {
            if (localStorage.getItem("access_token")) {    
                toast.success(`You have successfully logged in! Redirecting...`,   
                    {style: {
                    background: '#666666',
                    color: '#FFFFFF',
                }});
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

            <Toaster />
            <NavBar />
            <LoginRegisterForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onSubmit={handleLoginSubmit}
                formType = "Login"
                isLoading={isLoading}
            />
        </>
    );
};

export default Login;
