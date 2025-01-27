import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const Footer = () => {
  return (
    <div className="footerContainer">

        <section className="footerNavigationContainer">
            <h2 className="footerHeadings">Shop Free</h2>

            <Link className="footerLinks" href="/">Home</Link>

            <Link className="footerLinks" href="/shoppingcart">Shopping Cart</Link>
        </section>

        <section className="footerServicesContainer">
            <h2 className="footerHeadings">Guide and Help</h2>

            <Link className="footerLinks" href="/">Shop Free Care</Link>

            <Link className="footerLinks" href="/">Terms and Conditions</Link>

            <Link className="footerLinks" href="/">Privacy</Link>

        </section>

        <section className="footerSocialsContainer">
            <h2 className="footerHeadings">Follow Us</h2>
            <div className="footerSocialsLinksContainer">
                <Link href="https://www.facebook.com/" target="_blank"><img src="\facebook.svg" alt="Facebook" className="w-[2em]"/></Link>

                <Link href="https://www.instagram.com/" target="_blank"><img src="\instagram.svg" alt="Instagram" className="w-[2em]"/></Link>

                <Link href="https://www.x.com/" target="_blank"><img src="\x.svg" alt="Twitter" className="w-[2em]"/></Link>
            </div>
        </section>

        <Link className="footerLogoContainer" href="/">
            <img src="\shopping-bag.svg" alt="Shopping Bag" className="w-[6em]"/> 
            <h2 className="text-orange-600">© Copyright 2025, Shop Free</h2>
        </Link>
    </div>
  )
}

export default Footer