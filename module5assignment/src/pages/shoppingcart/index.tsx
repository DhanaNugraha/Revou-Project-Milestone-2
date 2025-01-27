import { useEffect, useState } from "react";
import CartItems from "@/components/CartItems";
import NavBar from "@/components/NavBar";
import { TotalCartItems, TotalCartPrice, SubmitCart, addToCart, SubstractFromCart, RemoveFromCart, SortCart } from "@/hooks/useCart";
import Head from "next/head";
import toast, { Toaster } from 'react-hot-toast';


const ShoppingCart = () => {
  // variables ----------------------------------------------------------------
  const [confirm, setConfirm] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);

  // functions ----------------------------------------------------------------
  useEffect(() => {
    localStorage.getItem("cart")
    ? setCart(JSON.parse(localStorage.getItem("cart")!))
    : setCart([]);
  },[])

  useEffect(() => {
    setTotalItems(TotalCartItems());
    setTotalPrice(TotalCartPrice());
  }, [cart]);

  
  const onSubmitOrder = () => {
    SubmitCart();
    setConfirm(true);
    setCart(SortCart());
  };

  const onRemoveFromCart = (item:any) => {
    RemoveFromCart(item);
    setCart(SortCart());
  };

  const onAddToCart = (item:any) => {
    addToCart(item);
    setCart(SortCart());
  };

  const onSubstractFromCart = (item:any) => {
    SubstractFromCart(item);
    setCart(SortCart());
  };


  // Page Content ------------------------------------------------------------
  const pageContentTernary = confirm ? (
    <h2>Thank for your order</h2>
  ) : (
    <>
      <ul className="cart">
        {cart.map((item: any) => {
          return <CartItems 
          key={item.id} 
          item={item} 
          onRemoveFromCart={onRemoveFromCart} 
          onAddToCart={onAddToCart} 
          onSubstractFromCart={onSubstractFromCart}
          />;
        })}
      </ul>

      <div className="cartTotals">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrice}</p>
        {/* cant click button if theres no item in the cart */}
        <button
          className="cartSubmit"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place Order
        </button>
      </div>
    </>
  );

  return (
    <>
      <Head>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/shopping-bag.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Shop Free Cart page. You can view your cart here." />
          <meta name="keyword" content="Shop Free, Cart" />
          <meta name="author" content="Dhana Nugraha" />
          <title>Shop Free: Cart</title>
      </Head>

      <Toaster />

      <NavBar />

      <main className="main mainCart">{pageContentTernary}</main>
    </>
  );
};

export default ShoppingCart;
