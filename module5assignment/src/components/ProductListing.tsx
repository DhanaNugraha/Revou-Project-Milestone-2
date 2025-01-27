import { useState, useEffect } from "react";
import Product from "./Product";

const ProductListing = ({ categoryId, searchProduct = false }: any) => {
  const [productFetched, setProductFetched] = useState<any>([]);

  useEffect(() => {
    fetchProduct();
  }, [categoryId]);

  const fetchProduct = async () => {
    try {
      let productLink = ""

      if (categoryId === "All") {
        productLink = "https://api.escuelajs.co/api/v1/products"
      }
      else {
        productLink = `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
      }

      const response = await fetch( productLink );
      const data = await response.json();
      setProductFetched(data);

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // initial value is loading, when items arrive, it will be changed
  let pageContent = (
    <p data-testid="loading-state">
      This category might be empty <br /> Loading...
    </p>
  );

  // console.log("this is length of prod fetch", productFetched?.length > 0);

  // console.log(productFetched);

    if (productFetched?.length > 0) {
      pageContent = productFetched.map((product: any) => {
        // add ternary here
          if (searchProduct && !product.title.toLowerCase().includes(searchProduct.toLowerCase())) {
            return 
          }
          else {
            return (
              <Product
                  key={product.id}
                  product = {product}
              />
            )
          }
      })
    }

  const content = <div className="productListingContainer">{pageContent}</div>;

  return content;
};
export default ProductListing;
