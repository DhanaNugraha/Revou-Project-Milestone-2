import { useState, useEffect } from "react";
import Product from "./Product";

const ProductListing = ({ categoryId, searchProduct = false, setProductDisplayedCount, sortValue }: any) => {
  const [productFetched, setProductFetched] = useState<any>([]);
  
  let productCount = 0

  useEffect(() => {
    fetchProduct();
  }, [categoryId]);

  useEffect(() => {
    setProductDisplayedCount(productCount);
  }, [searchProduct, productFetched]);

  useEffect(() => {
    switch (sortValue) {
      case "Default":
        break;
      case "Lowest Price":
        // pake spread biar dia bikin copyan
        setProductFetched((productFetched: any) => [...productFetched].sort((a: any, b: any) => a.price - b.price));
        break;
      case "Highest Price":
        setProductFetched((productFetched: any) => [...productFetched].sort((a: any, b: any) => b.price - a.price));
        break;
      case "A - Z":
        setProductFetched((productFetched: any) => [...productFetched].sort((a: any, b: any) => a.title.localeCompare(b.title)));
        break;
      case "Z - A":
        setProductFetched((productFetched: any) => [...productFetched].sort((a: any, b: any) => b.title.localeCompare(a.title)));
        break;
    }
  }, [sortValue]);

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

  // Page content updater
  if (productFetched?.length > 0) {
    productCount = 0
    pageContent = productFetched.map((product: any) => {
      // Skip product if product does not include search parameter
        if (searchProduct && !product.title.toLowerCase().includes(searchProduct.toLowerCase())) {
          return 
        }
        else {
          productCount += 1
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
