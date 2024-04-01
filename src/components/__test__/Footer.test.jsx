import { render, screen } from '@testing-library/react'
import Footer from '../Footer';

test('Footer component renders correctly', () => {
  render(
    <Footer />
  )

  const text = screen.getByText(/Copyright/)
  expect(text).toBeDefined()
});