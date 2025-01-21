const CartItems = ({item, onRemoveFromCart, onAddToCart, onSubstractFromCart}: any) => {
    const ItemTotalPrice: number = (item.qty * item.price)

  return (
    <li className="cartItem" key={item.id}>
        <img src={item.images[1]} alt={item.title} className="cartItemImg" />

        <p>{item.title}</p>

        <p>Price: ${item.price}</p>

        <button onClick={() => onSubstractFromCart(item)}>-</button>

        <p>{item.qty}</p>

        <button onClick={() => onAddToCart(item)}>+</button>

        <p className="cartItemSubtotal">
            Total Price: ${ItemTotalPrice}
        </p>

        <button className="removeFromCartButton" onClick={() => onRemoveFromCart(item)}>✖</button>
    </li>
  )
}

export default CartItems