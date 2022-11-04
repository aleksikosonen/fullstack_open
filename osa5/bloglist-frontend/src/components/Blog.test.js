import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  // mock for testing
  const mockUpdateBlogWithLikes = jest.fn()
  const mockdeleteBlog = jest.fn()
  const blog = {
    title: 'Blog for testing',
    author: 'Me',
    url: 'www.randomblogfortest.com/',
    likes: '5',
    user: {
      username: 'meikä',
      name: 'mondeo',
    },
  }

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        user={blog.user}
        updateBlogWithLikes={mockUpdateBlogWithLikes}
        deleteBlog={mockdeleteBlog}
      ></Blog>
    ).container
  })

  test('title and author are rendered', () => {
    expect(container.querySelector('.title')).toHaveTextContent(blog.title)
  })

  test('url and likes are not rendered', () => {
    expect(container.querySelector('.url')).not.toBeInTheDocument()
    expect(container.querySelector('.likes')).not.toBeInTheDocument()
  })

  test('at start the details are not displayed', () => {
    const div = container.querySelector('.blogDetails')
    expect(div).toEqual(null)
  })

  test('show details after button press', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const shownBlogDetails = container.querySelector('.blogDetails')
    expect(shownBlogDetails).toHaveTextContent(
      blog.likes && blog.author && blog.url
    )
  })

  test('like is pressed twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlogWithLikes.mock.calls).toHaveLength(2)
  })
})
