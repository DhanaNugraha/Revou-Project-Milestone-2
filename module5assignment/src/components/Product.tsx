import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { addToCart } from "@/hooks/useCart";
import toast, { Toaster } from 'react-hot-toast';

const Product = ({product}: any) => {
    const router = useRouter();
    const token = localStorage.getItem("access_token");

    const placeholderImg = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="

    const onAddToCart = () => {
        if (token) {
            addToCart(product);
            toast.success(`${product.title} added to cart`,   {style: {
                background: '#666666',
                color: '#FFFFFF',
            }});
        } else {
            router.push("/login") 
            toast.error("Please log in to add item to cart",   
                {style: {
                background: '#666666',
                color: '#FFFFFF',
            }});
            // alert("Please log in to add item to cart") 
        }
    }

    
    // check if image starts with (http:// or https://)
    const imageChecker = (productImage: any) => {
        if (productImage.startsWith("http://") || productImage.startsWith("https://")) {
            return productImage
        }
        else {
            return placeholderImg
        }
    }

    // for next/image (Image) component to not load it using default next loader (it changes the link)
    const loaderProp =({ src }:any) => {
        return src;
    }


  return (
    <div key = {product.id} className="productListing">
        <Link className="productListLinkContainer" href={`/productdetail/${product.id}`} key={product.id}> 
            <Image 
                // send non undefined value to function imgChecker
                src={imageChecker(product.images[1]? product.images[1] : placeholderImg)}
                alt={product.title}
                width={200}
                height={200}
                loading="lazy"
                className="productListingImg"
                loader={loaderProp}
            />
            <h4 className={"w-[fit-content]"}>
                {product.title}
            </h4>
            <p className={"text-[1.2em]"}>
                ${product.price}
            </p>
        </Link>
        <button 
        className="border text-[1em] font-medium bg-[#1a1a1a] cursor-pointer transition-[border-color] duration-[0.25s] px-[1.2em] py-[0.6em] rounded-lg border-solid border-transparent hover:border-[#646cff]" 
        onClick={onAddToCart}
        >
            Add to Cart
        </button>
    </div>
  )
}

export default Product