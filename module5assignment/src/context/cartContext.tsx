import { createContext, ReactElement, useReducer, useMemo } from "react"

// Constants -------------------------------------------------------------------
const initCartState = {cart:[]}

const REDUCER_ACTION_CHOICE= {
    ADD: "ADD",
    SUBSTRACT: "SUBSTRACT",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT",
}

// reducer for useReducer--------------------------------------------------------------------
// state -> what our current cart state is
// action -> {type : "ADD", payload: {id:..., title:...}}
const reducer = (state: any, action: any) => {
    switch (action.type){
        case REDUCER_ACTION_CHOICE.ADD: {
            if (!action.payload) {
                throw new Error("action.payload missing in ADD action")
            }
            // destructure the incoming payload
            const {id, title, price, images} = action.payload

            // Store the cart array without the current item payload that is being checked
            const filteredCart = state.cart.filter(
                (item: any) => item.id !== id
            )

            // find the item checked in cartState
            const itemExistInCart = state.cart.find(
                (item: any) => item.id === id
            )

            // If item exist in cartState -> add qty. if no, set as 1
            const qty: number = itemExistInCart? itemExistInCart.qty + 1 : 1

            return {...state, cart: [...filteredCart, {id, title, price, qty, images}]}
        }
        case REDUCER_ACTION_CHOICE.SUBSTRACT: {
            if (!action.payload) {
                throw new Error("action.payload missing in ADD action")
            }
            // destructure the incoming payload
            const {id, title, price, images} = action.payload

            // Store the cart array without the current item payload that is being checked
            const filteredCart = state.cart.filter(
                (item: any) => item.id !== id
            )

            // find the item checked in cartState
            const itemExistInCart = state.cart.find(
                (item: any) => item.id === id
            )

            // If item exist in cartState -> add qty. if no, set as 1
            const qty: number = itemExistInCart.qty - 1 

            if (qty ===0 ) {
                return {...state, cart:[...filteredCart]}
            } else {
                return {...state, cart: [...filteredCart, {id, title, price, qty, images}]}
            }
        }
        case REDUCER_ACTION_CHOICE.REMOVE: {
            if (!action.payload) {
                throw new Error("action.payload missing in REM OVE action")
            }

            // destructure the incoming payload
            const {id} = action.payload

            // Store the cart array without the current item payload that is being checked
            const filteredCart = state.cart.filter(
                (item: any) => item.id !== id
            )

            return {...state, cart:[...filteredCart]}
        }
        case REDUCER_ACTION_CHOICE.QUANTITY: {
            if (!action.payload) {
                throw new Error("action.payload missing in QUANTITY action")
            }

            // destructure the incoming payload. incoming payload of self input qty
            const {id, qty} = action.payload

            // find the item checked in cartState
            const itemExistInCart = state.cart.find(
                (item: any) => item.id === id
            )

            if (!itemExistInCart) {
                throw new Error("Item must exist to update quantity")
            }

            // update qty to self input qty
            const updatedItem = {...itemExistInCart, qty}

            // Store the cart array without the current item payload that is being checked
            const filteredCart = state.cart.filter(
                (item: any) => item.id !== id
            )

            return {...state, cart: [...filteredCart, updatedItem]}
        }
        case REDUCER_ACTION_CHOICE.SUBMIT: {
            return {...state, cart:[]}
        }
        default:
            throw new Error("Unidentified reducer action type")
    }
}



// Hook to use ---------------------------------------------------------------------------------------------

const useCartContext = (initCartState: any) => {
    const [state, dispatch] = useReducer(reducer, initCartState)

    // HOOKS LIST ------------------------------------------------------------------------------------------
    // this is done to optimize and not re render if the event happend previously
    const REDUCER_ACTIONS = useMemo( () => {
        return REDUCER_ACTION_CHOICE
    }, [])

    // iterate and store qty value of item and add them each iteration
    const totalItems = state.cart.reduce((previousValue: any, cartItem: any) => {
        return previousValue + cartItem.qty
    }, 0)

    // returns a number of total price of cart
    const totalPrice = state.cart.reduce((previousValue: any, cartItem: any) => {
            return previousValue + (cartItem.qty * cartItem.price)
        }, 0)

    // cool sorting item in cart based on id (change later)
    const cart = state.cart.sort((a: any, b: any) => {
        const itemA = Number(a.id)
        const itemB = Number(b.id)
        return itemA - itemB
    })

    return {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart}

}


// initiallize context----------------------------------------------------------------
const initCartContextState = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_CHOICE,
    totalItems: 0,
    totalPrice: "",
    cart: [],
}

export const CartContext : any = createContext(initCartContextState)

export const CartProvider = ( {children} : any ): ReactElement => {
    return (
        <CartContext.Provider value = {useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext