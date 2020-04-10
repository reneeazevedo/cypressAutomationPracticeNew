/// <reference types = "cypress" />
import { Util } from '../utils/util'
const util = new Util()

export class PageIdentify {

    VerificaGeneroSenhorSelecionado() {
        cy.get('#center_column .std .radio-inline .checked #id_gender1').should('be.checked')
    }
    VerificaPrimeiroNome() {
        cy.get('#firstname').should('have.value', 'Renée')
    }
    VerificarUltimoNome() {
        cy.get('#lastname').should('have.value', 'Azevedo')
    }
    VerificarDiaNascimento() {
        cy.get('#uniform-days > span').then(function (days) {
            const a = days.text();
            expect(util.RemoveAllLinesAndTabs(a))
                .to.equal('18')
        })
    }
    VerificarMesNascimento() {
        cy.get('#uniform-months > span').then(function (month) {
            const a = month.text();
            expect(util.RemoveAllLinesAndTabs(a))
                .to.equal('February')
        })
    }
    VerificarAnoNascimento() {
        cy.get('#uniform-years > span').then(function (year) {
            const a = year.text();
            expect(util.RemoveAllLinesAndTabs(a))
                .to.equal('1988')
        })
    }
}