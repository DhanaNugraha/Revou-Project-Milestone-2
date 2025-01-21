import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedInCheck = Boolean(localStorage.getItem("access_token"));
    setIsLoggedIn(isLoggedInCheck)
  },[])

  const checkLocation = (path:any) => {
    return pathname === path
    ? "navbarCurrentPageContentStyling"
    : "navbarContentStyling"
  }

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false)
    router.push("/login");
    alert("Successfully logged out")
  }

  return (
    <div className="navbarContainer">
      <div className="shopLogoContainer">
        <img src="\shopping-bag.svg" alt="Shopping Bag" className="w-[3em]"/> 
        <h1 className="text-orange-600">Shop Free</h1>
      </div>
      <Link className={checkLocation("/")} href="/">Home</Link>
      <Link className={checkLocation("/shoppingcart")} href="/shoppingcart"><img src="\cart.svg" alt="Cart"  className="w-[2em]"/></Link>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="navbarContentStyling">Logout</button>
      ) : (
        <div className="navBarLoginButtons">
          <Link className={checkLocation("/login")} href="/login">Login</Link>
          <Link className={checkLocation("/register")} href="/register">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
