/// <reference types = "cypress" />
import { Util } from '../utils/util'
const util = new Util()


export class PageContact {
    clicarContatcUs() {
        cy.get('#contact-link > a').click()
    }
    //selecionar assunto do título
    selecionarAssunto() {
        cy.get('#id_contact').select('2')
    }
    //selecionar referência do pedido
    selecionarPedido() {
        cy.get(':nth-child(6) > div > select').select('137012')
    }
    //selecionar produto do pedido
    selecionarProduto() {
        cy.get('#\\31 37012_order_products').select('7')
    }

    //selecionar arquivo anexo
    anexarArquivo() {
        cy.fixture('EAWeekly.png', 'base64').then(fileContent => {
            cy.get('#fileUpload').upload({
                fileContent,
                fileName: 'EAWeekly.png',
                mimeType: 'image/png'
            },
                {
                    uploadType: 'input'
                }
            )
        }).get('#fileUpload').trigger('change');
    }

    //digitar mensagem #message
    digitarMensagem() {
        cy.fixture('message').as('msg');
        cy.get('@msg').then((msg) => {
            cy.get('#message').type(msg.TextMessage)

        })
    }
    //verificar se botão Send > está habilitado
    veficarBtnEnviarHabilitado(){
        cy.get('#submitMessage').should('be.enabled')     
    }
    //enviar mensagem
    enviarMensagem() {
        cy.get('#submitMessage > span').click()
    }
    //verificar se opção selecionada é customer service
    verificaOpcaoSelecionada(){
        cy.get('#id_contact > option:nth-child(2)').should('have.text','Customer service')
    }
    //verificar email
    verificarEmail(){
        cy.get('#email').should('have.value','renee.moura@hotmail.com')
    }
    //verificar número pedido
    verificarNumPedido(){
        cy.get(':nth-child(6) > div > span').should('have.text','VRGYAOMFJ - 09/30/2019')
    }
    //verificar produto selecionado
    verificarProdutoSelecionado(){
        cy.get('#\\31 37012_order_products > option:nth-child(2)').should('have.text','Printed Chiffon Dress - Color : Yellow, Size : S')
    }
    //verificar nome arquivo
    verificarNomeArquivo(){
        cy.get('#uniform-fileUpload > span.filename').should('have.text','EAWeekly.png')
    }
    //verificar envio mensagem com sucesso
    verificarEnvioMessage(){
        cy.get('#center_column > p').should('have.text','Your message has been successfully sent to our team.')
    }




}


