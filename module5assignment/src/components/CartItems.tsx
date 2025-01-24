const CartItems = ({
  item,
  onRemoveFromCart,
  onAddToCart,
  onSubstractFromCart,
}: any) => {
  // variables ----------------------------------------------------------------
  const ItemTotalPrice: number = item.qty * item.price;

  console.log("this is item", item);

  const placeholderImg = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="

  // functions -----------------------------------------------------------------
  const imageChecker = (itemImage: any) => {
    if (itemImage) {
      return itemImage
      
    } else {
      return placeholderImg
    }
  }


  // page content ----------------------------------------------------------------
  return (
    <li className="cartItem" key={item.id}>
      <img src={imageChecker(item.images[1])} alt={item.title} className="cartItemImg" />

      <p>{item.title}</p>

      <p>Price: ${item.price}</p>

      <button onClick={() => onSubstractFromCart(item)}>-</button>

      <p>{item.qty}</p>

      <button onClick={() => onAddToCart(item)}>+</button>

      <p className="cartItemSubtotal">Total Price: ${ItemTotalPrice}</p>

      <button
        className="removeFromCartButton"
        onClick={() => onRemoveFromCart(item)}
      >
        ✖
      </button>
    </li>
  );
};

export default CartItems;
