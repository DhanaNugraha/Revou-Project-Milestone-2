import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import mockRouter from 'next-router-mock'
import {setupServer} from 'msw/node'
import { rest } from "msw";
import { useRouter } from "next/router";
import ProductDetail from "@/pages/productdetail/[productId]";
import CategoryPage from "@/pages/category/[categoryId]";
import Home from "@/pages";

jest.mock('next/router', () => ({
    useRouter() {
      return ({
        isFallback: true,
      });
    },
}));

describe("Router Fallback rendering", () => {

    test ("Renders Home Page component on fallback", () => {
        render(<Home data={{}}/>);

        expect(screen.getByText("Loading..." )).toBeInTheDocument();
    })

    test ("Renders Product Detail Page component on fallback", () => {
        render(<ProductDetail productFetched={{}}/>);

        expect(screen.getByText("Loading..." )).toBeInTheDocument();
    })

    test ("Renders Category Page component on fallback", () => {
        render(<CategoryPage data={{}}/>);

        expect(screen.getByText("Loading..." )).toBeInTheDocument();
    })
})

// npm test Fallback.test.tsx