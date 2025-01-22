import { useState} from "react";
import { useRouter } from "next/router";
import LoginRegisterForm from "@/components/LoginRegisterForm";
import NavBar from "@/components/NavBar";
import Head from "next/head";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegisterSubmit = async (event:any) => {
    event.preventDefault();

    setIsLoading(true);

    try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/users",
          {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "new",
                email: email,
                password: password,
                avatar: "https://picsum.photos/800",
            }),
          }
        );
        if (response.ok){

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
          : alert("Fail to register account, please try again later!")

          router.push("/")
          
        } else {
            const data = await response.json();
            throw(data)

        }

        setIsLoading(false);

      } catch (error:any) {
        console.error("Unable to crate account:", error.message);
        alert(`Unable to create account: ${error.message}`)
      }
  }

  return (
    <>
      <Head>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/shopping-bag.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Shop Free Sign Up page. Find your favorite products here." />
          <meta name="keyword" content="Shop Free, Signup, Register" />
          <meta name="author" content="Dhana Nugraha" />
          <title>Shop Free: Sign Up</title>
      </Head>

      <NavBar />
      <LoginRegisterForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleRegisterSubmit}
        formType = "Sign Up"
        isLoading={isLoading}
      />
    </>
  );
};

export default Register;
