import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { addToCart } from "@/hooks/useCart";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { GetServerSideProps } from "next";
import toast, { Toaster } from 'react-hot-toast';

const ProductDetail = ({productFetched}:any) => {
  // constants -----------------------------------------------------------------
  // initial fallback value
  const router = useRouter();
  console.log(router)
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const placeholderImg = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="


  // To prevent undefined for meta description
  let metaKeyword = "Shop Free, Product, Details, Product Details";

  if (router.query.productId) {
    metaKeyword = `${productFetched.title}, ${productFetched.title.split(" ").join(", ")}, Shop Free, Product, Details, Product Details`
  }
  

  // states --------------------------------------------------------------------
  const [imageFetched, setImageFetched] = useState<any>([placeholderImg]);
  const [displayImageNum, setDisplayImageNum] = useState(0);

  useEffect(() => {
    if (productFetched) {
      setImageFetched(productFetched.images);
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
    if (productImage.startsWith("http://") || productImage.startsWith("https://")) {
        return productImage
    }
    else {
        return placeholderImg
    }
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
    </>
  )
};

export default ProductDetail;


export const getServerSideProps: GetServerSideProps = (async (context) => {
  if (!context.params) {
    return { props: {} };
  } else {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${context.params.productId}`)
    const productFetched = await res.json()
    return { props: { productFetched } }
  }
})
