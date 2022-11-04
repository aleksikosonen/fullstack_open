import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

test('<NewBlogForm /> updates parent state and calls onSubmit', async () => {
  const mockCeateBlog = jest.fn()
  render(<NewBlogForm createBlog={mockCeateBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const createButton = screen.getByText('create')

  const user = userEvent.setup()
  await user.type(titleInput, 'Uusi blogi')
  await user.type(authorInput, 'Kir Joittaja')
  await user.type(urlInput, 'www.randomsivustorandom.fi')
  await user.click(createButton)

  expect(mockCeateBlog.mock.calls).toHaveLength(1)
  expect(mockCeateBlog.mock.calls[0][0].title).toBe('Uusi blogi')
})
