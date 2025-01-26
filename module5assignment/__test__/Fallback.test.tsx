import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import {setupServer} from 'msw/node'
import { rest } from "msw";
import ProductDetail from "@/pages/productdetail/[productId]";
import { useRouter } from "next/router";

const mockProduct = {
    "id" : 2, 
    "title" : "Classic Red Pullover Hoodie",
    "price" : 10,
    "description" : "Product description",
    "qty"  : 1,
    "images": ["1", "2", "3"]
    }


jest.mock('next/router', () => ({
    useRouter() {
      return ({
        pathname: "/productdetail/[productId]",
        route: "/productdetail/[productId]",
        query: {
            productId: "3"
            },
        asPath: "/productdetail/3",
        isFallback: true,
      });
    },
}));

describe("Router Fallback rendering", () => {

    test ("Renders Product Detail Page component on fallback", () => {
        render(<ProductDetail productFetched={mockProduct}/>);
        // screen.debug()

        expect(screen.getByText("Loading..." )).toBeInTheDocument();
    })
})

// npm test Fallback.test.tsx