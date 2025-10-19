describe('some other tests', () => {
    beforeEach(() => {
    cy.visit('/app/graduate');
  });

  it('check the login button redirection', () => {
      
        cy.url().should('include', '/app/graduate');

        cy.get('#error-container')
            .should('be.visible')
            .contains('Log In')
            .click({force: true});
        
        cy.url().should('include', '/login');
  });

  it('check the spotly link redirect', () => {
    cy.url().should('include', '/app/graduate');

    cy.get('[aria-label="Go Home"]')
        .click({force: true})
    
    cy.url().should('include', '/');
  });

  //in progreso..

//   it('verifica el correcto cambio de tema', () => {
    // cy.get('[aria-label="Dark mode"]').click({force: true, multiple: true})
    // cy.get('[class="hidden dark:block"]')
    //    .should('be.visible')

    // cy.get('[aria-label="Dark mode"]').click({force: true, multiple: true})
    // cy.get('span[class="block dark:hidden"]')
    //    .should('be.visible')
    // });
});