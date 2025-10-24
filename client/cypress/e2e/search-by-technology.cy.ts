describe('flow e2e to search by technologies', () => {
    beforeEach(() => {
    cy.visit('/app/manager');
  });

    // as already testied that filters be showing, i skip this step
    it('select the filter and verify that the options be displayed (search field)', () => {
      cy.get('[aria-controls="sidebar-dropdown"]', {timeout: 10000})
            .click({force: true})
            .wait(1500)

        // You get the span to choose a filter and you make an alias
        // to the parent to be able to capture it
        cy.get('span:contains("Technologies")')
            .parent()
            .as("enlaceFeedBack")

        // the link is clicked
        cy.get('@enlaceFeedBack')
            .click({force: true})
        cy.wait(1500)

        // checked that input field is displayed
        cy.get('.sidebar-scrollable.s-UNHWs0oFnL4g')
            .should('be.visible')
            .find('#technologies-text-input')
            .should('be.visible')
        
        // checked that tags container is displayed
        cy.get('.sidebar-scrollable.s-UNHWs0oFnL4g')
            .find('#available-tags-wrapper')
            .should('be.visible')
    })

    it('write keyword, select and storage that tag', () => {
      cy.get('[aria-controls="sidebar-dropdown"]', {timeout: 10000})
            .click({force: true})
            .wait(1500)

        cy.get('span:contains("Technologies")')
            .parent()
            .as("enlaceFeedBack")

        cy.get('@enlaceFeedBack')
            .click({force: true})
        cy.wait(1500)

        cy.get('.sidebar-scrollable.s-UNHWs0oFnL4g', {timeout: 10000})
            .find('#technologies-text-input')
            .click({force: true})
            .type('svelte', {delay: 160})
        
        cy.wait(1000)
        cy.get('.sidebar-scrollable.s-UNHWs0oFnL4g')
            .find('#available-tags-wrapper')
            .find('div')
            .click({force: true})

        cy.wait(1000)
        // Finally, click the button to search.
        cy.get('button:contains("Search")').click({force: true})
    })

    it('choosing some tag of the tag container and storage it', () => {
        cy.get('[aria-controls="sidebar-dropdown"]', {timeout: 10000})
            .click({force: true})
            .wait(1500)
            
        cy.get('span:contains("Technologies")')
            .parent()
            .as("enlaceFeedBack")
            
        cy.get('@enlaceFeedBack')
            .click({force: true})
        cy.wait(1500)
            
        cy.get('.sidebar-scrollable.s-UNHWs0oFnL4g')
            .find('#available-tags-wrapper')
            .as('tagContainer')

        cy.get('@tagContainer')
            .find('div:contains("C++")')
            .scrollIntoView({duration: 4000, easing: 'linear'})
            .click({force: true})
        cy.wait(800)
        cy.get('@tagContainer')
            .find('div:contains("Python")')
            .scrollIntoView({duration: 5000, easing: 'linear'})
            .click({force: true})
        cy.wait(800)
        cy.get('@tagContainer')
            .find('div:contains("HTMX")')
            .scrollIntoView({duration: 5000, easing: 'linear'})
            .click({force: true})
        cy.wait(800)
        cy.get('@tagContainer')
            .find('div:contains("Flask")')
            .scrollIntoView({duration: 4000, easing: 'linear'})
            .click({force: true})
        cy.wait(800)
        cy.get('@tagContainer')
            .find('div:contains("MongoDB")')
            .scrollIntoView({duration: 4000, easing: 'linear'})
            .click({force: true})

        // Since there are already some labels on the container, try removing one.
        cy.wait(1000)
        cy.get('#selected-tags-wrapper')
            .find('button')
            .contains('MongoDB')
            .click({force: true})

        cy.wait(1000)
        cy.get('#selected-tags-wrapper')
            .find('button')
            .contains('Flask')
            .click({force: true})

        // Finally, click the button to search.
        cy.get('button:contains("Search")').click({force: true})
    })

    it('uses multiples way to select and storage tags', () => {
        cy.get('[aria-controls="sidebar-dropdown"]', {timeout: 10000})
            .click({force: true})
            .wait(1500)

        cy.get('span:contains("Technologies")')
            .parent()
            .as("enlaceFeedBack")

        cy.get('@enlaceFeedBack')
            .click({force: true})
        cy.wait(1500)

        cy.get('.sidebar-scrollable.s-UNHWs0oFnL4g')
            .find('#available-tags-wrapper')
            .as('tagContainer')

        cy.get('.sidebar-scrollable.s-UNHWs0oFnL4g', {timeout: 10000})
            .find('#technologies-text-input')
            .as('inputTags')

        cy.wait(1000)
        cy.get('@tagContainer')
            .find('div:contains("C++")')
            .scrollIntoView({duration: 5000, easing: 'linear'})
            .click({force: true})

        cy.wait(1000)
        cy.get('@inputTags')
            .click({force: true})
            .type('svelte', {delay: 170})

        cy.wait(1000)
        cy.get('@tagContainer')
            .find('div')
            .click({force: true})

        cy.wait(1000)
        cy.get('@inputTags')
            .click({force: true})
            .clear({delay: 150})
            .type('Angular', {delay: 170})

        cy.wait(1000)
        cy.get('@tagContainer')
            .find('div')
            .click({force: true})

        cy.wait(1000)
        cy.get('@inputTags')
            .clear()

        cy.wait(1000)
        cy.get('@tagContainer')
            .find('div:contains("MySQL")')
            .scrollIntoView({duration: 5000, easing: 'linear'})
            .click({force: true})

        // Finally, click the button to search.
        cy.get('button:contains("Search")').click({force: true})
    })
});