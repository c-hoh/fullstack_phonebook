describe('Phonebook application', function() {
  before(function() {
    cy.request('http://localhost:3001/api/testing/reset')
  }),

  it('can be opened', function() {
    cy.visit('http://localhost:3001')
    cy.contains('Phonebook')
  }),

  it('can be used to add a new entry', function() {
    cy.visit('http://localhost:3001')
    cy.get('#newName').type('Katze')
    cy.get('#newTel').type('123 323 123')
    cy.get('#submitPerson').click()
    cy.contains('Added Katze')
  }),

  it('entries can be updated', function() {
    cy.visit('http://localhost:3001')
    cy.get('#newName').type('Katze')
    cy.get('#newTel').type('999 888 777')
    cy.get('#submitPerson').click()
    cy.contains('Updated information of Katze')
    cy.should('not.contain', '123 323 123')
    cy.contains('999 888 777')
  })

  it('entries can be filtered', function() {
    cy.visit('http://localhost:3001')
    cy.get('#newName').type('Fluffy Kitten')
    cy.get('#newTel').type('876 675 867')
    cy.get('#submitPerson').click()
    cy.get('#search').type('Kitten')
    cy.should('not.contain', 'Katze')
  })
})
