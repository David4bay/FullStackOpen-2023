describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'davidbay',
      username: 'davidbay',
      password: '12345'
    }

  cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('Login')
  })

  describe('Login',function() {
    beforeEach(function() {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      const user = {
        name: 'davidbay',
        username: 'davidbay',
        password: '12345'
      }
  
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) 
    cy.visit('')
    })
  
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'davidbay', password: '12345' })
      cy.get('#username').type('davidbay')
      cy.get('#password').type('12345', { timeout: 100000 })
      cy.get('#login-button').click()
      cy.contains('davidbay is logged in', { timeout: 100000 })
    })
  
    it('fails with wrong credentials', function() {
      cy.login({ username: 'davidbay', password: '12345' })
      cy.get('#username').type('davidbay')
      cy.get('#password').type('fdffd', { timeout: '100000' })
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong credentials') 
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
  
      cy.get('html').should('not.contain', 'davidbay is logged in')
    })

    it('logs in correctly', function() {
      cy.login({ username: 'davidbay', password: '12345' })
      cy.get('#username').type('davidbay')
      cy.get('#password').type('12345', { timeout: 100000 })
      cy.get('#login-button').click()
      cy.contains('davidbay is logged in', { timeout: 100000 })
    })

      describe('can create blogs', function() {
        beforeEach(() => {
            cy.login({ username: 'davidbay', password: '12345' })
            cy.get('#username').type('davidbay', { timeout: 100000 })
            cy.get('#password').type('12345', { timeout: 100000 })
            cy.get('#login-button').click()
        })

        it('can find blogs created', function() {
          cy.createBlog({ title: 'The state of React in 2024', author: 'David Bayode', url: 'https://example.com' }, { timeout: 100000 })
          cy.contains('The state of React in 2024', { timeout: 100000 })
        })

        it('can view and like a blog', function() {
          cy.createBlog({ title: 'The state of React in 2024', author: 'David Bayode', url: 'https://example.com' }, { timeout: 100000 })
          cy.contains('view', { timeout: 100000 }).click()
          cy.contains('like', { timeout: 100000 }).click()
          cy.contains('likes 1', { timeout: 100000 })
        })
      })

      describe('can create blogs', function() {
        beforeEach(() => {
            cy.login({ username: 'davidbay', password: '12345' })
            cy.get('#username').type('davidbay', { timeout: 100000 })
            cy.get('#password').type('12345', { timeout: 100000 })
            cy.get('#login-button').click()
        })

        it('can view the delete button of my blog', function() {
          cy.createBlog({ title: 'The state of React in 2024', author: 'David Bayode', url: 'https://example.com' }, { timeout: 100000 })
          cy.contains('view', { timeout: 100000 }).click()
          cy.contains('delete', { timeout: 100000 })
      })

        it('can delete my own blog', function() {
          cy.createBlog({ title: 'The state of React in 2025', author: 'David Bayode', url: 'https://example.com' }, { timeout: 100000 })
          cy.contains('view', { timeout: 100000 }).click()
          cy.contains('delete', { timeout: 100000 }).click()
          cy.get('html', { timeout: 1000000 }).should('not.contain', 'The state of React in 2025')
      })

        it('have blogs sorted by likes', function() {
          cy.createBlog({ title: 'The state of React in 2024', author: 'David Bayode', url: 'https://example.com' }, { timeout: 100000 })
          cy.createBlog({ title: 'The state of React in 2025', author: 'David Bayode', url: 'https://example.com' }, { timeout: 100000 })
          cy.createBlog({ title: 'The state of React in 2026', author: 'David Bayode', url: 'https://example.com' }, { timeout: 100000 })

          cy.get('.reveal__BlogBtn').click({ multiple: true })

          cy.get('.like__Button', { timeout: 10000 }).click({ multiple: true })

          cy.get('.full__BlogDetail', { timeout: 100000 }).eq(0).should('contain', 'The state of React in 2024')

          cy.get('.like__Button', { timeout: 10000 }).click({ multiple: true })

          cy.get('.full__BlogDetail', { timeout: 100000 }).eq(0).should('contain', 'The state of React in 2024')

          cy.get('.like__Button', { timeout: 10000 }).click({ multiple: true })

          cy.get('.full__BlogDetail', { timeout: 100000 }).eq(0).should('contain', 'The state of React in 2026')
        })
    })
    })
  })
