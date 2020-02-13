import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders app frame', () => {
  const { getByText } = render(<App />)
  const heading = getByText(/Cell Simulator/i)
  expect(heading).toBeInTheDocument()
})
