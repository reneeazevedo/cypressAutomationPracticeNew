/// <reference types = "cypress" />

export class PageCreditSlip {
    ClicarMyCreditSlips() {
        cy.get('#footer  div > ul > li:nth-child(2) > a').click();
    }
    VerificarMensagemReciboCredito(){
    cy.get('.alert-warning').should('have.text', 'You have not received any credit slips.');
    }
}

