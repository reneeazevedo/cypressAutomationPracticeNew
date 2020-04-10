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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-file-upload';
import '@percy/cypress';

Cypress.Commands.add("login", (email, password) => {
    cy.get('.login').click();
    cy.get('#email').type(email)
    cy.get('#passwd').type(password)
    cy.get('#SubmitLogin').click();
    cy.get('.account > span').should('have.text','Renée Azevedo')
})

Cypress.Commands.add("RemoveSpace", (element) =>  {
  
    cy.get(element).then(function (descstreet){
        const textformatedstreet = descstreet.text()
        .trim().replace(new RegExp(/['\t']/g), "")
        .replace(new RegExp('\n'), " ")
        
        return textformatedstreet
        cy.log(textformatedstreet)
      }
      
      )
      
})

Cypress.Commands.add(
  "customCommand",()=>{
  
    return cy.log("TEST LOG");

  }
);


