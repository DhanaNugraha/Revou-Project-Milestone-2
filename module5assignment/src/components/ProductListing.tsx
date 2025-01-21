import { useState, useEffect } from "react";
import useCart from "@/hooks/useCart";
import Product from "./Product";

const ProductListing = ({ categoryId }: any) => {
  const [productFetched, setProductFetched] = useState<any>([]);
  const {dispatch, REDUCER_ACTIONS} = useCart()


  useEffect(() => {
    fetchProduct();
  }, [categoryId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
      );
      const data = await response.json();
      setProductFetched(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  // initial value is loading, when items arrive, it will be changed
  let pageContent = <p>This category might be empty <br/> Loading... </p>
  
  if (productFetched?.length) {
    pageContent = productFetched.map((product: any) => {
        return (
            <Product 
                key={product.id} 
                product = {product} 
                dispatch = {dispatch}
                REDUCER_ACTIONS = {REDUCER_ACTIONS}
            />
        )
    })
}

  const content = (
    <div className = "productListingContainer">
      {pageContent}
    </div>
  )

  return content
}
export default ProductListing;


