import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe } from 'node:test'
import ProductCategory from '@/pages'

describe('Home Page Components', () => {
    test('renders Navbar categories with all elements', () => {
        render(<ProductCategory data={[]} />)

        // const heading = screen.getByRole('heading', { name: 'Home' })

        expect(screen.getByText("Shop Free")).toBeInTheDocument()
    })
    // test('renders categories with all elements', async () => {
    //     render(<ProductCategory data={[]} />)

    //     // const heading = screen.getByRole('heading', { name: 'Home' })

    //     expect(screen.).toBeInTheDocument()
    // })
})