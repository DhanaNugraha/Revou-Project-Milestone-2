import { useState} from "react";
import { useRouter } from "next/router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submitButtonStyling = "border text-[1em] font-medium bg-[#1a1a1a] cursor-pointer transition-[border-color] duration-[0.25s] px-[1.2em] py-[0.6em] rounded-lg border-solid border-transparent hover:border-[#646cff]"

  const handleRegisterSubmit = async (event:any) => {
    event.preventDefault();
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
          console.log("here")

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

          // console.log("data", data)

          data.access_token
          ?  localStorage.setItem("access_token", data.access_token)
          : alert("Fail to register account, please try again later!")

          router.push("/")
          
        } else {
            const data = await response.json();
            throw(data)
        }
        
      } catch (error:any) {
        console.error("Unable to crate account:", error.message);
        alert(`Unable to crate account: ${error.message}`)
      }
  }

  return (
    <form onSubmit={handleRegisterSubmit} className={"flex flex-col place-items-center p-[10%]"}>
        <fieldset className="formFill email">
            <label htmlFor="email">Email </label>
            <input type="email" name="email" id="email" value={email} onChange={(event) => {setEmail(event.target.value)}} />
        </fieldset>

        <fieldset className="formFill password">
            <label htmlFor="password">Password </label>
            <input type="password" name="password" id="password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
        </fieldset>

        <fieldset className={submitButtonStyling}>
        <button type="submit">Register</button>
        </fieldset>
    </form>
  );
};

export default Register;
