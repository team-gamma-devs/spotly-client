describe('flow e2e to search by Feedback', () => {
    beforeEach(() => {
    cy.visit('/app/manager');
  });
  it('check that the cards be displayed', () => {
    cy.get('#manager-cards-grid')
      .find('.card-container')
      .first()
      .should('be.visible')

    cy.get('#manager-cards-grid')
      .find('.card-container')
      .last()
      .as('lastCard')

    //cy.wait(1000)
    cy.get('@lastCard')
      .scrollIntoView({duration: 2000, easing: 'linear'})
      .should('be.visible')
    cy.wait(800)
  }); 

  it('check contact modal, open and close', () => {
    // capture the button
    cy.get('#manager-cards-grid')
      .find('.card-container')
      .first()
      .find('[class="flex gap-2 items-start"]')
      .find('[class="flex-1"]')
      .find('[class="flex gap-2 mt-2"]')
      .find('button')
      .as('botonContact')

    cy.get('@botonContact')
      .should('be.visible')
      .wait(1500)
      .click({force: true})

    cy.wait(1000)
    
    // checked that dialog of contact is displayed
    // and I checked that the Close button works
    cy.get('dialog', {timeout: 10000})
      .should('be.visible')
      .find('button:contains("Close")')
      .last()
      .wait(1000)
      .click({force: true})
  })

  it('check annotations modal', () => {
    cy.get('#manager-cards-grid')
      .find('.card-container')
      .first()
      .find('.flex')
      .find('[aria-label="See Annotations"]')
      .as('buttonAnnotation')

    cy.get('@buttonAnnotation')
      .should('be.visible')
      .wait(1500)
      .click({force: true})

    // checked that dialog of contact is displayed
    // and I checked that the Close button works
    cy.get('dialog', {timeout: 10000})
      .should('be.visible')
      .find('button:contains("Close")')
      .last()
      .wait(1000)
      .click({force: true})
  })

  it('check tutors feedback modal', () => {
    cy.get('#manager-cards-grid')
      .find('.card-container')
      .last()
      .scrollIntoView({duration: 2000, easing: 'linear'})
      .find('.flex')
      .find('[aria-label="Tutors Feedback"]')
      .as('tutorsButton')

    cy.get('@tutorsButton')
      .should('be.visible')
      .wait(1500)
      .click({force: true})

    cy.wait(500)
    // checked that dialog of contact is displayed
    // and I checked that the Close button works
    cy.get('dialog', {timeout: 10000})
      .should('be.visible')
      .find('button:contains("Close")')
      .last()
      .wait(1000)
      .click({force: true})
  })
})