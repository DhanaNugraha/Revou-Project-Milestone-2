import useCart from "@/hooks/useCart"
import { useState } from "react"
import CartItems from "@/components/CartItems"
import NavBar from "@/components/NavBar"

const ShoppingCart = () => {
  const [confirm, setConfirm] = useState(false)

  const {dispatch, REDUCER_ACTIONS,  totalItems, totalPrice, cart} = useCart()

  const onSubmitOrder = () => {
    dispatch({type: REDUCER_ACTIONS.SUBMIT})
    setConfirm(true)
  }

  const pageContentTernary = confirm
    ? <h2>Thank for your order</h2>
    : <>
        <ul className="cart">
          {cart.map((item: any) => {
            return(
              <CartItems key={item.id} item={item} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} />
            )
          })}
        </ul>

        <div className="cartTotals">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ${totalPrice}</p>
          {/* cant click button if theres no item in the cart */}
          <button className="cartSubmit" disabled={!totalItems} onClick={onSubmitOrder}>
              Place Order
          </button>
        </div>
      </>

  return (
    <>
        <NavBar />
        
        <main className="main mainCart">
        {pageContentTernary}
        </main>
    </>
  )
}

export default ShoppingCart