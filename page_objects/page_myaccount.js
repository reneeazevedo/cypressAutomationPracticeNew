/// <reference types = "cypress" />

export class PageMyAccount {
    ClicarMyPersonalInformation() {
        cy.get('.myaccount-link-list > :nth-child(4) > a > span').click();
    }



}

