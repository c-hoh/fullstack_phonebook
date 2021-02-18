describe('Phonebook application', function() {
  before(function() {
    cy.request('localhost:3001/api/testing/reset')
  }),

  it('can be opened', function() {
    cy.visit('localhost:3001')
    cy.contains('Phonebook')
  }),

  it('can be used to add a new entry', function() {
    cy.visit('localhost:3001')
    cy.get('#newName').type('Katze')
    cy.get('#newTel').type('123 323 123')
    cy.get('#submitPerson').click()
    cy.contains('Added Katze')
  })
})
