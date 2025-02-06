import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import {setupServer} from 'msw/node'
import { rest } from "msw";
import ProductDetail from "@/pages/productdetail/[productId]";
import { useRouter } from "next/router";

// mock router
jest.mock('next/router', () => ({
    useRouter() {
      return ({
        pathname: "/productdetail/[productId]",
        route: "/productdetail/[productId]",
        query: {
            productId: "2"
            },
        asPath: "/productdetail/2",
      });
    },
}));

const mockProduct = {
"id" : 2, 
"title" : "Classic Red Pullover Hoodie",
"price" : 10,
"description" : "Product description",
"qty"  : 1,
"images": ["1", "2", "3"]
}

const server = setupServer(
    rest.get(`https://api.escuelajs.co/api/v1/products/2`, (req, res, ctx) =>
      res(ctx.json(mockProduct))
    )
  );
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());


describe("Product Detail Page", () => {

    describe("Basic rendering", () => {
        
        test ("renders Product Detail component before fetch", () => {
            render(<ProductDetail productFetched={mockProduct} similarProductsFetched={mockProduct}/>);

            expect(screen.getByRole("img", { name: mockProduct.title })).toBeInTheDocument();

            expect(screen.getAllByRole("button", { name: "←" })).toHaveLength(2);

            expect(screen.getAllByRole("button", { name: "→" })).toHaveLength(2);
            
            expect(screen.getByText(mockProduct.title)).toBeInTheDocument();

            expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

            expect(screen.getByText("Price: $" + mockProduct.price)).toBeInTheDocument();

            expect(screen.getByRole("button", { name: "Add to Cart" })).toBeInTheDocument();

            expect(screen.getByText("Similar Products")).toBeInTheDocument();

            expect(screen.getByText("No other similar products")).toBeInTheDocument();

        })
    })

})

// npm test ProductDetail.test.tsx