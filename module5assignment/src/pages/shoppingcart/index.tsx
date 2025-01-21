import { useEffect, useState } from "react";
import CartItems from "@/components/CartItems";
import NavBar from "@/components/NavBar";
import { TotalCartItems, TotalCartPrice, SubmitCart, addToCart, SubstractFromCart, RemoveFromCart } from "@/hooks/useCart";

const ShoppingCart = () => {
  const [confirm, setConfirm] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart")
    setCart(JSON.parse(cart!))
  },[])

  useEffect(() => {
    setTotalItems(TotalCartItems());
    setTotalPrice(TotalCartPrice());
  }, [cart]);

  
  const onSubmitOrder = () => {
    SubmitCart();
    setConfirm(true);
    const cart = localStorage.getItem("cart")
    setCart(JSON.parse(cart!));
  };

  const onRemoveFromCart = (item:any) => {
    RemoveFromCart(item);
    const cart = localStorage.getItem("cart")
    setCart(JSON.parse(cart!));
  };

  const onAddToCart = (item:any) => {
    addToCart(item);
    const cart = localStorage.getItem("cart")
    setCart(JSON.parse(cart!));
  };

  const onSubstractFromCart = (item:any) => {
    SubstractFromCart(item);
    const cart = localStorage.getItem("cart")
    setCart(JSON.parse(cart!));
  };

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
      <NavBar />

      <main className="main mainCart">{pageContentTernary}</main>
    </>
  );
};

export default ShoppingCart;
