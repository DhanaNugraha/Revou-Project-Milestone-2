import { useState} from "react";
import { useRouter } from "next/router";
import LoginRegisterForm from "@/components/LoginRegisterForm";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import toast, { Toaster } from 'react-hot-toast';
import Footer from "@/components/Footer";

const AboutUs = () => {

  return (
    <>
      <Head>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/shopping-bag.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Shop Free About Us page. Discover what Shop Free is all about.." />
          <meta name="keyword" content="Shop Free, About, About Us, Mission, Background" />
          <meta name="author" content="Dhana Nugraha" />
          <title>Shop Free: Sign Up</title>
      </Head>

      <Toaster />
      <div className="aboutUsContentContainer">
        <NavBar />
        
        <section className="aboutUsContent">
            <img src="\aboutUs.png" alt="aboutUs" />

            <article className="aboutUsContentDescription">
                <h1>About Us</h1>
                
                <p>Welcome to Shop Free – Your ultimate online shopping destination! At Shop Free, we believe shopping should be a seamless, enjoyable experience where you can find the latest trends, unique products, and everyday essentials – all at your fingertips.</p>

                <p>We’re a passionate team committed to providing high-quality products at competitive prices. Whether you're searching for fashion, electronics, home goods, beauty products, or something special, we've got something for everyone.</p>

                <p>Our mission is simple: To offer a vast selection of products, exceptional customer service, and fast, reliable shipping, making your shopping experience effortless from start to finish. With easy navigation, secure payment options, and friendly support, we're here to make sure you enjoy every moment of your shopping journey.</p>

                <p>Join our community of satisfied customers today and discover why Shop Free is the go-to place for all your shopping needs!</p>
            </article>
        </section>

        <Footer />
      </div>

    </>
  );
};

export default AboutUs;
