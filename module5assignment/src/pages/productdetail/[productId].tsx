import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { addToCart } from "@/hooks/useCart";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { GetServerSideProps } from "next";
import toast, { Toaster } from 'react-hot-toast';
import Footer from "@/components/Footer";
import Product from "@/components/Product";
import { on } from "events";

const ProductDetail = ({productFetched, similarProductsFetched}:any) => {
  // constants -----------------------------------------------------------------
  // initial fallback value
  const router = useRouter();
  // console.log(router)
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const placeholderImg = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="


  // To prevent undefined for meta description
  let metaKeyword = "Shop Free, Product, Details, Product Details";

  if (router.query.productId) {
    metaKeyword = `${productFetched.title}, ${productFetched.title.split(" ").join(", ")}, Shop Free, Product, Details, Product Details`
  }

  // console.log(similarProductsFetched)
  

  // states --------------------------------------------------------------------
  const [imageFetched, setImageFetched] = useState<any>([placeholderImg]);

  const [displayImageNum, setDisplayImageNum] = useState(0);

  const [similarProductsIndex, setSimilarProductsIndex] = useState(0);

  const [similarProductsLength, setSimilarProductsLength] = useState(0);

  useEffect(() => {
    if (productFetched) {
      setImageFetched(productFetched.images);
      setSimilarProductsLength(similarProductsFetched.length);
    }
  }, [productFetched]);

  // functions -----------------------------------------------------------------
  const onAddToCart = () => {
    addToCart(productFetched);
    toast.success(`${productFetched.title} added to cart`,   {style: {
      background: '#666666',
      color: '#FFFFFF',
    }});
  };

  const onImgButtonClick = (action: any) => {
    const imgListLength = imageFetched.length - 1;

    if (action === "left") {
      setDisplayImageNum(displayImageNum - 1);
      if (displayImageNum <= 0) {
        setDisplayImageNum(imgListLength);
      }
    } else if (action === "right") {
      setDisplayImageNum(displayImageNum + 1);

      if (displayImageNum >= imgListLength) {
        setDisplayImageNum(0);
      }
    }
  };

  // check if image starts with (http:// or https://)
  const imageChecker = (productImage: any) => {
    const cleanProductImageString = productImage.replace(/[['"]+/g, '');
    
    if (cleanProductImageString.startsWith("http://") || cleanProductImageString.startsWith("https://")) {
        return cleanProductImageString
    }
    else {
        return placeholderImg
    }
  }

  const onSimilarButtonClick = (action: any) => {
    if (action === "left") {
      const nextIndex = similarProductsIndex - 1;
      if (nextIndex < 0) {
        setSimilarProductsIndex(similarProductsFetched.length - 1);
      }
      else {
        setSimilarProductsIndex(similarProductsIndex - 1);
      }
    }
    else if (action === "right") {
      const nextIndex = similarProductsIndex + 1;
      if (nextIndex > similarProductsFetched.length - 1) {
        setSimilarProductsIndex(0);
      }
      else {
        setSimilarProductsIndex(similarProductsIndex + 1);
      }
    }
  }

  // similar product content

  let displayedSimilarProduct = (
    <p data-testid="loading-state">
      No other similar Products
    </p>
  )
  
  if (similarProductsLength > 0) {
    console.log(similarProductsFetched.length)
    displayedSimilarProduct = (
      <Product product={similarProductsFetched[similarProductsIndex]} />
    )
  }


  return (
    <>
      <Head>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/shopping-bag.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content={productFetched.description} />
          <meta name="keyword" content={metaKeyword} />
          <meta name="author" content="Dhana Nugraha" />
          <title>{`Shop Free: ${productFetched.title}`}</title>
      </Head>

      <Toaster />

      <NavBar />
      <div className="productDetailContainer">

        <section className="productDetailImgContainer">
          <img
            src={imageChecker(imageFetched[displayImageNum])}
            className="w-[50vw] object-contain min-w-[300px] max-w-[530px]"
            alt={productFetched.title? productFetched.title: "Product"}
          />
          <article className="productDetailImgButtonContainer">
            <button onClick={() => onImgButtonClick("left")}>←</button>
            <button onClick={() => onImgButtonClick("right")}>→</button>
          </article>
        </section>

        <section className="productDetailTextContainer">
          <h1>{productFetched.title}</h1>
          <p>{productFetched.description}</p>
        </section>

        <p>{`Price: $${productFetched.price}`}</p>

        <button
          className="border text-[1em] font-medium bg-[#242424] cursor-pointer transition-[border-color] duration-[0.25s] px-[1.2em] py-[0.6em] rounded-lg border-solid border-transparent hover:border-[#646cff]"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>

      <section className="similarProductsContainer">
        <h2>Similar Products</h2>

        {displayedSimilarProduct}

        <div className="similarProductsButtonContainer">

          <button onClick={() => onSimilarButtonClick("left")}>←</button>

          <button onClick={() => onSimilarButtonClick("right")}>→</button>

        </div>
      </section>

      <Footer />
    </>
  )
};

export default ProductDetail;


export const getServerSideProps: GetServerSideProps = (async (context) => {
  if (!context.params) {
    return { props: {} };
  } else {
    const product = await fetch(`https://api.escuelajs.co/api/v1/products/${context.params.productId}`)
    const productFetched = await product.json()

    const similarProducts = await fetch(`https://api.escuelajs.co/api/v1/categories/${productFetched.category.id}/products`)

    const similarProductsJson = await similarProducts.json()

    const similarProductsFetched = await similarProductsJson.filter((similarProduct: any) => similarProduct.id !== productFetched.id)

    return { props: { productFetched, similarProductsFetched } }
  }
})
