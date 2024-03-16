import { render, screen } from '@testing-library/react'
import Footer from '../Footer'; // Assuming the Footer component is in the same directory

test('Footer component renders correctly', () => {
  // Render the Footer component
    render(
        <Footer />
    )
  // Test assertions for elements within the Footer component
  const text = screen.getByText(/Copyright/)
  expect(text).toBeDefined()
});