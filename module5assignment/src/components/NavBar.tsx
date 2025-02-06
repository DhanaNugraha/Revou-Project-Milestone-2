import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';


const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);

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
    toast.success(`You have successfully logged out!`,   
      {style: {
      background: '#666666',
      color: '#FFFFFF',
    },  icon: '👋'});
  }

  const handleHamburgerClicked = () => {
    setHamburgerClicked(!hamburgerClicked)
    console.log(hamburgerClicked)
  }

  return (
    <>
      <div className="navbarContainer">
        <Link className="shopLogoContainer" href="/">
          <img src="\shopping-bag.svg" alt="Shopping Bag" className="w-[3em]"/> 
          <h1 className="text-orange-600">Shop Free</h1>
        </Link>

        <section className="navbarContentRight">
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
        </section>

        <section className="hamburgerContainer">
            <input type="checkbox" className="hamburgerCheckbox" id="hamburgerCheckbox" onChange={handleHamburgerClicked}/>
            <label htmlFor="hamburgerCheckbox">
                <img src="/hamburger.png" alt="hamburger Open" className="hamburgerImg hamburgerOpen"/>
                <img src="/close.png" alt="hamburger Close" className="hamburgerImg hamburgerClose"/>
            </label>

            <ul className="hamburgerDirectoryContainer">
              <Link className={checkLocation("/")} href="/">Home</Link>

              <Link className={checkLocation("/shoppingcart")} href="/shoppingcart"><img src="\cart.svg" alt="Cart"  className="w-[2em]"/></Link>

              {isLoggedIn ? (
                <button onClick={handleLogout} className="navbarContentStyling">Logout</button>
              ) : (
                <>
                  <Link className={checkLocation("/login")} href="/login">Login</Link>

                  <Link className={checkLocation("/register")} href="/register">Sign Up</Link>
                </>
              )}
            </ul>
        </section>
        
      </div>
    </>
  );
};

export default NavBar;
