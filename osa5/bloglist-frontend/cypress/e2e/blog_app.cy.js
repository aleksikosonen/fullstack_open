/* eslint-disable no-undef */
describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kaleksi Goistinen1',
      username: 'Goistinen1',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Goistinen1')
      cy.get('#password').type('salainen')
      cy.get('#login').click()
      cy.contains('Kaleksi Goistinen1')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Goistin2en1')
      cy.get('#password').type('salai2nen')
      cy.get('#login').click()
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Goistinen1', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.createNewBlog({
        title: 'maantie',
        author: 'pyöräilijä',
        url: 'ei ole',
      })
      cy.contains('maantie')
    })

    it('A blog can be liked', function () {
      cy.createNewBlog({
        title: 'maantie',
        author: 'pyöräilijä',
        url: 'ei ole',
      })
      cy.get('#viewBlog').click()
      cy.get('#likeButton').click()
      cy.contains('Likes 1')
    })

    it('Posted user can delete their post', function () {
      cy.createNewBlog({
        title: 'maantie',
        author: 'pyöräilijä',
        url: 'ei ole',
      })
      cy.get('#viewBlog').click()
      cy.get('#deleteButton').click()
      cy.contains('Deleted')
    })
  })

  describe('Likes are descending', function () {
    beforeEach(function () {
      cy.login({ username: 'Goistinen1', password: 'salainen' })
      cy.createNewBlog({
        title: 'maantie',
        author: 'pyöräilijä',
        url: 'ei ole',
      })
      cy.createNewBlog({
        title: 'gravel',
        author: 'pyöräilijä',
        url: 'ei ole',
      })
      cy.createNewBlog({
        title: 'maasto',
        author: 'pyöräilijä',
        url: 'ei ole',
      })
    })

    it('Multiple blogs can be added', function () {
      cy.contains('maantie' && 'gravel' && 'maasto')
    })

    it('Likes are descending', function () {
      cy.contains('maantie')
        .parent()
        .find('#viewBlog')
        .click()
        .get('#likeButton')
        .click()

      cy.contains('maantie').get('#viewBlog').click()

      cy.contains('gravel')
        .parent()
        .find('#viewBlog')
        .click()
        .get('#likeButton')
        .click()
        .wait(200)
        .click()
        .wait(200)
        .click()
        .wait(200)

      cy.contains('gravel').get('#viewBlog').click()

      cy.contains('maasto')
        .parent()
        .find('#viewBlog')
        .click()
        .get('#likeButton')
        .click()
        .wait(200)
        .click()

      cy.contains('maasto').get('#viewBlog').click()

      cy.get('.blog').eq(0).should('contain', 'gravel')
      cy.get('.blog').eq(1).should('contain', 'maasto')
      cy.get('.blog').eq(2).should('contain', 'maantie')
    })
  })
})
