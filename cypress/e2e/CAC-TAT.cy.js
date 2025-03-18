describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('../src/index.html')
  })
  
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })


  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.contains('label', 'Nome').type('Henrique')
    cy.get('#lastName').type('Coan')
    cy.get('#email').type('Henrique@email.com')
    cy.get('#open-text-area').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', {delay:0})
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#phone').type('aaaaa').should('be.empty')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Henrique')
    cy.get('#lastName').type('Coan')
    cy.get('#email').type('Henrique@email.com')
    cy.get('#open-text-area').type('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', {delay:0})
    cy.get('#phone-checkbox').click() 
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
    })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      cy.get('#firstName').type('Henrique')
      cy.get('#lastName').type('Coan')
      cy.get('#email').type('Henrique@email.com')
      cy.get('#phone').type('123123123')
      //limpar campos
      cy.get('#firstName').clear().should('be.empty')
      cy.get('#lastName').clear().should('be.empty')
      cy.get('#email').clear().should('be.empty')
      cy.get('#phone').clear().should('be.empty')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
      const data = {
        firstName: 'rico',
        lastName: 'nes',
        email: 'rico@rico.com',
        text: 'teste'
      }
      
      cy.fillMandatoryFieldsAndSubmit(data)
      cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
      cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('[type="radio"]').check('feedback').should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
      cy.get('[type="radio"]')
        .each(typeOfService => {
          cy.wrap(typeOfService)
            .check()
            .should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked');
    })

    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json')
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json')
        .as('alias')
      cy.get('input[type="file"]')
        .selectFile('@alias')
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
    })


    
    // it('gato', () => {
    //   cy.contains('span', '#cat').should('be.visible')
    // })
})