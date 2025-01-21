import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const submitButtonStyling = "border text-[1em] font-medium bg-[#1a1a1a] cursor-pointer transition-[border-color] duration-[0.25s] px-[1.2em] py-[0.6em] rounded-lg border-solid border-transparent hover:border-[#646cff]"

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
        <form onSubmit={handleLoginSubmit} className={"flex flex-col place-items-center p-[10%]"}>
            <fieldset className="formFill email">
                <label htmlFor="email">Email </label>
                <input type="email" name="email" id="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />
            </fieldset>

            <fieldset className="formFill password">
                <label htmlFor="password">Password </label>
                <input type="password" name="password" id="password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
            </fieldset>

            <fieldset className={submitButtonStyling}>
            <button type="submit">Login</button>
            </fieldset>
        </form>
    );
};

export default Login;
