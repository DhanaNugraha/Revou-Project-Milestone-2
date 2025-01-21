import { useState, useEffect } from "react";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/router";

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productFetched, setProductFetched] = useState<any>({});
  const [imageFetched, setImageFetched] = useState<any>([]);
  const {dispatch, REDUCER_ACTIONS} = useCart()
  const [displayImageNum, setDisplayImageNum] = useState(0)
  const router = useRouter();
  const productId = router.query.productId

useEffect(() => {
  fetchProduct();
  }, []);
  
  const fetchProduct = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      );
      const data = await response.json();
      // console.log(data)
      setProductFetched(data);
      setImageFetched(data.images)
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  const onAddToCart = () => {
    dispatch({type: REDUCER_ACTIONS.ADD, payload: {...productFetched, qty:1}})
    alert("Item added to cart")
  }

  const onImgButtonClick = (action:any) => {
    const imgListLength = imageFetched.length - 1

    if (action === "left") {
      setDisplayImageNum(displayImageNum - 1)
      if (displayImageNum <= 0) {
        setDisplayImageNum(imgListLength)
      }
    } else if (action === "right") {
      setDisplayImageNum(displayImageNum + 1)

      if (displayImageNum >= imgListLength) {
        setDisplayImageNum(0)
      }
    }
    
    // console.log(displayImageNum)
  }


  return (
    <div className="productDetailContainer">
      {isLoading ? <p>Loading...</p> : null}

      <section className="productDetailImgContainer">
        <img src={imageFetched[displayImageNum]} className="w-[50vw] object-contain min-w-[300px] max-w-[530px]"/>
        <article className="productDetailImgButtonContainer">
          <button onClick={() => onImgButtonClick("left")}>←</button>
          <button onClick={() => onImgButtonClick("right")}>→</button>
        </article>
      </section>

      <section className="productDetailTextContainer">
        <h1>{productFetched.title}</h1>
        <p>{productFetched.description}</p>
      </section>

      <p>Price: ${productFetched.price}</p>

      <button 
      className="border text-[1em] font-medium bg-[#242424] cursor-pointer transition-[border-color] duration-[0.25s] px-[1.2em] py-[0.6em] rounded-lg border-solid border-transparent hover:border-[#646cff]" 
      onClick={onAddToCart}
      >
          Add to Cart
      </button>

    </div>
  )
}

export default ProductDetail