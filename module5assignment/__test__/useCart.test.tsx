import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import { addToCart, SubstractFromCart, RemoveFromCart, SubmitCart, TotalCartItems, TotalCartPrice, SortCart } from "@/hooks/useCart";


// prevent error from next/router
jest.mock('next/router', () => jest.requireActual('next-router-mock'))

const mockItem = {
    "id" : 2, 
    "title" : "Classic Red Pullover Hoodie",
    "price" : 10,
    "qty"  : 1,
    "images": ["1", "2", "3"]
    }

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
Object.defineProperty(window, "localStorage", {
    value: {
    getItem: (...args: any) => mockGetItem(...args),
    setItem: (...args: any) => mockSetItem(...args),
    },
});

beforeEach(() => {
    mockGetItem.mockClear();
    mockSetItem.mockClear();
})


describe("Cart hooks test", () => {

    describe ("useCart hooks with empty local storage", () => {
        test ("on Add to Cart", () => {
            addToCart(mockItem);
    
            expect(mockGetItem).toHaveBeenCalledTimes(1);
    
            expect(mockSetItem).toHaveBeenCalledTimes(1);
        })
    
        test ("on Substract from Cart", () => {
            expect(() => {
                SubstractFromCart(mockItem)
            }).toThrow("Item must exist to update quantity");
    
            expect(mockGetItem).toHaveBeenCalledTimes(1);
        })
    
        test ("on Remove from Cart", () => {
            expect(() => {
                RemoveFromCart(mockItem)
            }).toThrow("Item must exist to be removed");
    
            expect(mockGetItem).toHaveBeenCalledTimes(1);
        })
    
        test ("on Submit Cart", () => {
            expect(() => {
                SubmitCart()
            }).toThrow("Item must exist to be removed");
        })
    
        test ("on Total Cart Items", () => {
            expect((TotalCartItems())).toEqual(0);
    
            expect(mockGetItem).toHaveBeenCalledTimes(1);
        })
    
        test ("on Total Cart Price", () => {
            expect(TotalCartPrice()).toEqual(0);
    
            expect(mockGetItem).toHaveBeenCalledTimes(1);
        })
    
        test ("on Sort Cart", () => {
            expect(SortCart()).toStrictEqual([]);
    
            expect(mockGetItem).toHaveBeenCalledTimes(1);
        })
    })

})

// npm test useCart.test.tsx