import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { addToCart } from "@/hooks/useCart";
import NavBar from "@/components/NavBar";
import Head from "next/head";

const ProductDetail = () => {
  // true karna lgsg fetch dari awal
  const [isLoading, setIsLoading] = useState(true);
  const [productFetched, setProductFetched] = useState<any>({});

  const placeholderImg = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="

  const [imageFetched, setImageFetched] = useState<any>([placeholderImg]);

  const [displayImageNum, setDisplayImageNum] = useState(0);

  const router = useRouter();

  // ternary to prevent undefined
  const metaKeyword = productFetched.title
  ? `${productFetched.title}, ${productFetched.title.split(" ").join(", ")}, Shop Free, Product, Details, Product Details`
  : "Shop Free, Product, Details, Product Details";

  // will run twice, first render and when ready
  useEffect(() => {
    fetchProduct();
  }, [router.isReady]);

  const fetchProduct = async () => {
    try {

      // make a placeholder value for initial render
      const productId = router.query.productId? router.query.productId : 10;

      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      );
      const data = await response.json();

      setProductFetched(data);
      setImageFetched(data.images);
      setIsLoading(false);

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const onAddToCart = () => {
    addToCart(productFetched);
    alert("Item added to cart");
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
          <title>Shop Free: {productFetched.title}</title>
      </Head>

      <NavBar />
      <div className="productDetailContainer">
        {isLoading ? <p>Loading...</p> : null}

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

        <p>Price: ${productFetched.price}</p>

        <button
          className="border text-[1em] font-medium bg-[#242424] cursor-pointer transition-[border-color] duration-[0.25s] px-[1.2em] py-[0.6em] rounded-lg border-solid border-transparent hover:border-[#646cff]"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductDetail;
