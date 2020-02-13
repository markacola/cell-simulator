/// <reference types="cypress" />
const cell = (x, y) => `[data-x="${x}"][data-y="${y}"]`

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('stable square should persist generations', () => {
    cy.get(cell(1, 1)).click()
    cy.get(cell(2, 1)).click()
    cy.get(cell(1, 2)).click()
    cy.get(cell(2, 2)).click()

    cy.get(cell(1, 1)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(2, 1)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(1, 2)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(2, 2)).should('have.attr', 'data-alive', 'true')

    cy.contains('Next generation').click()

    cy.get(cell(1, 1)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(2, 1)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(1, 2)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(2, 2)).should('have.attr', 'data-alive', 'true')
  })

  it('skater should move along per generation', () => {
    cy.get(cell(2, 2)).click()
    cy.get(cell(3, 3)).click()
    cy.get(cell(1, 4)).click()
    cy.get(cell(2, 4)).click()
    cy.get(cell(3, 4)).click()

    cy.contains('Next generation').click()
    cy.get(cell(1, 3)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(3, 3)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(2, 4)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(3, 4)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(2, 5)).should('have.attr', 'data-alive', 'true')

    cy.contains('Next generation').click()
    cy.get(cell(3, 3)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(1, 4)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(3, 4)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(2, 5)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(3, 5)).should('have.attr', 'data-alive', 'true')

    cy.contains('Next generation').click()
    cy.get(cell(2, 3)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(3, 4)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(4, 4)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(2, 5)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(3, 5)).should('have.attr', 'data-alive', 'true')

    cy.contains('Next generation').click()
    cy.get(cell(3, 3)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(4, 4)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(2, 5)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(3, 5)).should('have.attr', 'data-alive', 'true')
    cy.get(cell(4, 5)).should('have.attr', 'data-alive', 'true')
  })
})
