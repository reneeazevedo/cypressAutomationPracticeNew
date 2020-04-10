/// <reference types = "cypress" />
import { Util } from '../utils/util'
const util = new Util()
export function clicarMyAddress() {
  cy.get('.icon-building').click();
}

export function verificarEnderecoRef() {

  cy.get('.page-subheading').should('have.text', 'bar do zé piorra')

}
export function verificarDescEndereco() {

  cy.get('.address_address1').then(function (descaddress) {
    const a = descaddress.text();
    expect(util.RemoveAllLinesAndTabs(a))
      .to.equal('Rua Júlio Nogueira')
  })
}

export function verificarNome() {

  cy.get('.address_name').first().then(function (nome) {
    const a = nome.text();

    expect(util.RemoveAllLinesAndTabs(a))
      .to.equal('Renée')
  })
}
export function verificarUltimoNome() {

  cy.get('.address_name').last().then(function (sobrenome) {
    const a = sobrenome.text();

    expect(util.RemoveAllLinesAndTabs(a))
      .to.equal('Azevedo')
  })
}
export function verificarCidade() {
  cy.get('.last_item > li')
    .eq(4)
    .find(' > span')
    .first().then(function (cidade) {
      const a = cidade.text();

      expect(util.RemoveAllLinesAndTabs(a))
        .to.equal('Divinópolis,')
    })
}
export function verificarEstado() {
  cy.get('.last_item > li')
    .eq(4)
    .find(' > span')
    .eq(1).then(function (estado) {
      const a = estado.text();

      expect(util.RemoveAllLinesAndTabs(a))
        .to.equal('Texas')
    })
}

export function verificarCEP() {
  cy.get('.last_item > li')
    .eq(4)
    .find(' > span')
    .eq(2).then(function (cep) {
      const a = cep.text();

      expect(util.RemoveAllLinesAndTabs(a))
        .to.equal('35501')
    })
}

export function verificarPais() {
  cy.get('.last_item > li')
    .eq(5)
    .find(' > span')
    .then(function (pais) {
      const a = pais.text();

      expect(util.RemoveAllLinesAndTabs(a))
        .to.equal('United States')
    })
}
export function verificarCelular() {
  cy.get('.address_phone_mobile')
    .then(function (celular) {
      const a = celular.text();
      expect(util.RemoveAllLinesAndTabs(a))
        .to.equal('988498989')
    })


}

