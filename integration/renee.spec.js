/// <reference types="Cypress" />
import '@percy/cypress';
import { Util } from '../utils/util'
import { PageIdentify } from '../page_objects/page_identity'
import { PageMyAccount } from '../page_objects/page_myaccount'
import { PageCreditSlip } from '../page_objects/page_creditslips'
import { PageMain } from '../page_objects/page_main'
import { PageContact } from '../page_objects/page_contact'
import {
  clicarMyAddress,
  verificarEnderecoRef,
  verificarDescEndereco,
  verificarNome,
  verificarUltimoNome,
  verificarCidade,
  verificarEstado,
  verificarCEP,
  verificarPais,
  verificarCelular,
} from '../page_objects/page_address'
context('Aliasing', () => {
  const util              = new Util()
  const pageIdentity      = new PageIdentify()
  const pagemyaccount     = new PageMyAccount()
  const pagemycreditslips = new PageCreditSlip()
  const pagemain          = new PageMain()
  const pagecontact       = new PageContact()

  beforeEach("Login to application", () => {
    //Visiting website

    cy.visit("/");
    cy.fixture("eauser").as("user");
    cy.get("@user").then((user) => {
      cy.login(user.UserName, user.Password);

    })

  })

  // it('Login com sucesso', () => {
  //  cy.get('.login').click();
  //  cy.get('#email').type('renee.moura@hotmail.com')
  //  cy.get('#passwd').type('123456')
  //  cy.get('#SubmitLogin').click();
  //  cy.get('.account > span').should('have.text','Renée Azevedo')
  // })

  it('verificar info Personal Information', () => {
    //clica opção My Personal Information 
    pagemyaccount.ClicarMyPersonalInformation()
    //Verificar se valor genero igual a Mr
    pageIdentity.VerificaGeneroSenhorSelecionado()
    //Verifica se Primeiro Nome igual Renée
    pageIdentity.VerificaPrimeiroNome()
    //verifica se ultimo Nome é Azevedo
    pageIdentity.VerificarUltimoNome()
    //Verifica se dia de nascimento igual 18
    pageIdentity.VerificarDiaNascimento()
    //Verifica se Mês de nascimento é February
    pageIdentity.VerificarMesNascimento()
    //Verifica se ano de nascimento é 1988
    pageIdentity.VerificarAnoNascimento()


  })
  it('Credit Slips', () => {
    // clicar botão My Credit Slips
    pagemycreditslips.ClicarMyCreditSlips()
    pagemycreditslips.VerificarMensagemReciboCredito()
  })


  it('My Addresses', () => {
    //clicar opção My Address
    clicarMyAddress()
    //verificar se valor da referência do endereço  igual bar do zé piorra 
    verificarEnderecoRef()
    //verifica se nome é igual a Renée
    verificarNome()
    //verifica se sobrenome é igual Azevedo
    verificarUltimoNome()
    //verifica se contem endereço igual Rua Júlio Nogueira 
    verificarDescEndereco()
    //verificar nome cidade igual Divinópolis
    verificarCidade()
    //verificar estado
    verificarEstado()
    //verificar CEP
    verificarCEP()
    //verifica país
    verificarPais()
    //verifica celular
    verificarCelular()

  })

  it('Insert in mywishlist', () => {
    cy.get('.lnk_wishlist > a > span').click();
    cy.get('#name').type('Printed Chiffon Dress');
    cy.get('#submitWishlist > span').click();

    cy.get('.table-bordered')
      .find('tbody').first()
      .find('tr').last()
      .find('td').first()
      .as('valor')
    cy.get('@valor').then(function (descmmylist) {
      const textdescmmylist = descmmylist.text().trim()
      expect(textdescmmylist).to.equal('Printed Chiffon Dress')
    })
    /* cy.get('@valor').then(function (descmmylist) {
       const textdescmmylist = descmmylist.text()
       expect(util.RemoveAllLinesAndTabs(textdescmmylist)).to.equal('Printed Chiffon Dress')
     })*/

  })


  it('Delete last item in mywishlist', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/index.php?fc=module&module=blockwishlist&controller=mywishlist*',
    }).as('main');


    cy.get('.lnk_wishlist > a > span').click();

    cy.get('.table-bordered')
      .find('tbody')
      .find('tr').first()
      .find('td').last()
      .find('a').click();

    cy.wait('@main').should('have.property', 'status', 200);

    cy.get('@main').then((xhr) => {
      expect(xhr.status).to.eq(200);
      expect(xhr.response.headers).to.have.property("connection", "keep-alive");


    })
  })

  /* it('OrderHistory', () => {
     cy.fixture("orders").as("order");
 
     cy.get('#center_column div:nth-child(1) li:nth-child(1)').click();
 
     cy.get('tr td:nth-child(1) .footable-toggle').each(($el, index, $list) => {
 
       cy.get("@order").then((order) => {
 
         cy.get('tr td:nth-child(1) .footable-toggle').eq(index).click()
         // cy.log(order.Numbers[index])
         // cy.log(index)
         cy.get('tr td:nth-child(1) .color-myaccount').eq(index).should('contain.text', order.Numbers[index])
       })
     })
 
   })*/

  it.only('pesquisa produto não existente', () => {
    //digita um nome de produto não existente
    cy.percySnapshot("antes de digitar pesquisa")
    pagemain.DigitarItemPesquisa('teste')
    //clicar em pesquisar
    cy.percySnapshot("após digitar pesquisa")
    
    
    pagemain.ClicarPesquisar()
    //verificar mensagem exibida quando item não encontrado
    cy.percySnapshot("clicou pesquisa")
    cy.percySnapshot("mensagem de não encontrado")
    pagemain.ResultadoNaoEncotrado()
    //verifica url
    
    
    pagemain.VerificaUrl()
    
  })

  it('pesquisa produto existente', () => {
    cy.wait(3000)
    cy.get('#search_query_top').type("Printed Chiffon Dress");
    cy.get('#searchbox > button').click();

    cy.get('#center_column > h1 > span.heading-counter').then(function (texteelement) {
      const textmsg = texteelement.text().trim()
      expect(textmsg).to.equal('2 results have been found.')

    })

    cy.get('.first-in-line > .product-container > .right-block > .content_price > .price').then(function (priceelement) {
      const textPrice = priceelement.text().trim()
      expect(textPrice).to.equal('$16.40')

    })
  })

  it('add to cart', () => {
    cy.get('#search_query_top').type("Printed Chiffon Dress");
    cy.get('#searchbox > button').click();
    cy.get('.first-in-line > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click();


    cy.get('.layer_cart_product > h2').then(function (msgaddcartelement) {
      const textmsgaddcart = msgaddcartelement.text().trim()
      expect(textmsgaddcart).to.equal('Product successfully added to your shopping cart')

    })
    cy.get('#layer_cart > div.clearfix > div.layer_cart_cart.col-xs-12.col-md-6 > div.button-container > a').click();
    cy.get('.cart_quantity_input').clear();
    cy.get('.cart_quantity_input').type('5');
    cy.get('td.cart_avail > span').should('have.text', 'In stock')
    //cy.get('#product_7_34_0_0 > td.cart_product > a > img').should('have.attr', "src")
    cy.get('.old-price').should('have.text', '$20.50')
    cy.get('.icon-trash').should('have.class', 'icon-trash')
    cy.get('#total_tax').should('have.text', '$0.00')
    cy.get('#total_price').should('have.text', '$84.00')
    cy.get('.cart_navigation > .button > span').click();
    cy.get('.cart_navigation > .button > span').click();

    cy.get('tr > td:nth-child(3)').then(function (mycarrierelement) {
      const textmsgmycarrier = mycarrierelement.text().trim().replace(new RegExp(/['\t']/g), "").replace(new RegExp('\n'), " ")
      cy.log(textmsgmycarrier);

      expect(textmsgmycarrier).to.equal('My carrier Delivery next day!')
    })
    cy.get('#cgv').check();
    cy.get('#form > p > button > span').click();
    cy.get('#HOOK_PAYMENT > div:nth-child(1) > div > p > a').click()
    cy.get('#cart_navigation > button > span').click()
  })

  it('enviar mensagem', () => {
    //clicar em contact us
    pagecontact.clicarContatcUs()
    //selecionar assunto do título
    pagecontact.selecionarAssunto()
    //selecionar referência do pedido
    pagecontact.selecionarPedido()
    //selecionar produto do pedido
    pagecontact.selecionarProduto()
    //anexar arquivo
    pagecontact.anexarArquivo()
    //digitar mensagem #message
    pagecontact.digitarMensagem()
    //verificar se opção selecionada é igual a Customer Service
    pagecontact.verificaOpcaoSelecionada()
    //verificar email igual renee.moura@hotmail.com
    pagecontact.verificarEmail()
    //verifica numero pedido
    pagecontact.verificarNumPedido()
    //verificar produto selecionado igual Printed Chiffon Dress - Color : Yellow, Size : S
    pagecontact.verificarProdutoSelecionado()
    //verificar nome arquivo anexado EAWeekly.png
    pagecontact.verificarNomeArquivo()
    //verificar se buton send> está habilitado
    pagecontact.veficarBtnEnviarHabilitado()
    //enviar mensagem
    pagecontact.enviarMensagem()
    //verificar envio mensagem com sucesso
    pagecontact.verificarEnvioMessage()
    cy.percySnapshot()
  })
})