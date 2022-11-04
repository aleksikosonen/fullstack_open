/* eslint-disable no-undef */
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogger', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createNewBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogger')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})
