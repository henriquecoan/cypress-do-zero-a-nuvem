// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
  firstName: 'henrique', 
  lastName: 'coan',
  email:'henrique@coan.com',
  text: 'testesss'
}) => {
    cy.get('input[name="firstName"]').type(data.firstName)  // Preenche o campo 'name'
    cy.get('input[name="lastName"]').type(data.lastName)  // Preenche o campo 'name'
    cy.get('input[type="email"]').type(data.email)  // Preenche o campo 'email'
    cy.get('textarea[name="open-text-area"]').type(data.text)  // Preenche o campo 'name'
    cy.get('button[type="submit"]').click()  // Clica no botão de submit]
  })