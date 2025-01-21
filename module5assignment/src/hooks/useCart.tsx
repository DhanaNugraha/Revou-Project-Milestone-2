import { useContext } from "react";
import CartContext from "@/context/cartContext";

const useCart : any = () => {
    return useContext(CartContext)
}

export default useCart



// use-------------
export const addToCart = (product:any) => {
    const cartExist = localStorage.getItem("cart")? true : false;
    
    if (cartExist) {
        // fetch and parse cart from local storage   
        const cart = localStorage.getItem("cart");
        const cartParse = JSON.parse(cart!);

        // destructure the incoming product
        const {id, title, price, images} = product;

        // Store the cart array without the current item payload that is being checked
        const filteredCart = cartParse.filter(
            (item: any) => item.id !== id
        )

        // find the item checked in cartState
        const itemExistInCart = cartParse.find(
            (item: any) => item.id === id
        )

        // If item exist in cartState -> add qty. if no, set as 1
        const qty: number = itemExistInCart? itemExistInCart.qty + 1 : 1
        
        localStorage.setItem("cart", JSON.stringify([...filteredCart, {id, title, price, qty, images}]))
    }
    else {
        // destructure the incoming product
        const {id, title, price, images} = product;
        const qty = 1

        localStorage.setItem("cart", JSON.stringify([{id, title, price, qty, images}]))
    }
}


export const SubstractFromCart = (product:any) => {
    const cartExist = localStorage.getItem("cart")? true : false;
    
    if (cartExist) {
        // fetch and parse cart from local storage   
        const cart = localStorage.getItem("cart");
        const cartParse = JSON.parse(cart!);

        // destructure the incoming product
        const {id, title, price, images} = product;

        // Store the cart array without the current item payload that is being checked
        const filteredCart = cartParse.filter(
            (item: any) => item.id !== id
        )

        // find the item checked in cartState
        const itemExistInCart = cartParse.find(
            (item: any) => item.id === id
        )

        // substract 1 from qty
        const qty: number = itemExistInCart.qty - 1 

        if (qty ===0 ) {
            localStorage.setItem("cart", JSON.stringify([...filteredCart]))
        } else {
            localStorage.setItem("cart", JSON.stringify([...filteredCart, {id, title, price, qty, images}]))
        }

    }
    else {
        throw new Error("Item must exist to update quantity")
    }
}


export const RemoveFromCart = (product:any) => {
    const cartExist = localStorage.getItem("cart")? true : false;
    
    if (cartExist) {
        // fetch and parse cart from local storage   
        const cart = localStorage.getItem("cart");
        const cartParse = JSON.parse(cart!);

        // destructure the incoming product
        const {id} = product;

        // Store the cart array without the current item payload that is being checked
        const filteredCart = cartParse.filter(
            (item: any) => item.id !== id
        )

        localStorage.setItem("cart", JSON.stringify([...filteredCart]))

    }
    else {
        throw new Error("Item must exist to be removed")
    }
}


export const SubmitCart = () => {
    const cartExist = localStorage.getItem("cart")? true : false;
    
    if (cartExist) {
        localStorage.setItem("cart", JSON.stringify([]))
    }
    else {
        throw new Error("Item must exist to be removed")
    }
}

export const TotalCartItems = () => {
    const cartExist = localStorage.getItem("cart")? true : false;
    
    if (cartExist) {
        // fetch and parse cart from local storage   
        const cart = localStorage.getItem("cart");
        const cartParse = JSON.parse(cart!);

        const totalItems = cartParse.reduce((previousValue: any, cartItem: any) => {
            return previousValue + cartItem.qty
        }, 0)
        return totalItems
    }
    else {
        return 0
    }
}

export const TotalCartPrice = () => {
    const cartExist = localStorage.getItem("cart")? true : false;
    
    if (cartExist) {
        // fetch and parse cart from local storage   
        const cart = localStorage.getItem("cart");
        const cartParse = JSON.parse(cart!);

        const totalPrice = cartParse.reduce((previousValue: any, cartItem: any) => {
            return previousValue + (cartItem.qty * cartItem.price)
        }, 0)
        return totalPrice
    }
    else {
        return 0
    }
}

