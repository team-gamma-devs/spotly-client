describe('some other tests', () => {
    beforeEach(() => {
    cy.visit('/');
  });

  it('verification the correct change of theme', () => {

    // image (moon) shown on button
    cy.get('[aria-label="Dark mode"]')
        .find('span')
        .find('[aria-label="Dark mode"]')
        .as('imgDark')

    // image (sun) shown on button
    cy.get('[aria-label="Dark mode"]')
        .find('span')
        .find('[aria-label="Light mode"]')
        .as('imgLight')

    cy.wait(1500)
    cy.get('[aria-label="Dark mode"]')
        .first()
        .click()

    cy.wait(1500)
    cy.get('@imgLight')
        .should('be.visible')

    cy.wait(1500)
    cy.get('[aria-label="Dark mode"]')
        .first()
        .click()
    
    cy.wait(1500)
    cy.get('@imgDark')
        .should('be.visible')

    
  });

  it('checking the links on the footer', () => {

      cy.get('footer')
        .find('div:contains("Resources")')
        .find('a:contains("Flowbite")') 
        .should('have.attr', 'href', 'https://flowbite-svelte.com/')
        .should('have.attr', 'target', '_blank');

      cy.get('footer')
        .find('div:contains("Resources")')
        .find('a:contains("Tailwind CSS")') 
        .should('have.attr', 'href', 'https://tailwindcss.com/')
        .should('have.attr', 'target', '_blank');

      cy.get('footer')
        .find('div:contains("Follow us")')
        .find('a:contains("GitHub")') 
        .should('have.attr', 'href', 'https://github.com/team-gamma-devs')
        .should('have.attr', 'target', '_blank');

      cy.get('footer')
        .find('div:contains("Follow us")')
        .find('li a:contains("Discord")') 
        .should('have.attr', 'href', 'https://discord.gg/HU3s6k2hrf')
        .should('have.attr', 'target', '_blank');

      cy.get('footer')
        .find('div:contains("Legal")')
        .find('li a:contains("Privacy Policy")') 
        .click({force: true})

      cy.url('http://localhost:5173/legal')

      cy.get('footer')
        .find('div:contains("Legal")')
        .find('a:contains("Terms & Conditions")') 
        .click({force: true})

      cy.url('http://localhost:5173/tac')
  })
});