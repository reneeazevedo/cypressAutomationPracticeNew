/// <reference types = "cypress" />
import { Util } from '../utils/util'
const util = new Util()
export class PageMain {
    DigitarItemPesquisa(name){
        cy.get('#search_query_top').type(name);
    }
    ClicarPesquisar() {
        cy.get('#searchbox > button').click();
    }
    ResultadoNaoEncotrado(){
        cy.get('#center_column > h1 > span').then(function (msg) {
            const a = msg.text();
            expect(util.RemoveAllLinesAndTabs(a))
              .to.equal('0 results have been found.')
          })   
    }

    VerificaUrl(){
        cy.url().should('include', '/index.php?controller=search&orderby=position&orderway=desc&search_query=teste&submit_search=')
    }
    


}

