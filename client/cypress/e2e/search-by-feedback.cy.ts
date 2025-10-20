describe('flow e2e to search by Feedback', () => {
    beforeEach(() => {
    cy.visit('/app/manager');
  });

    it('verify that the filters are displayed', () => {
      
        // Verify that the URL remains
        cy.url().should('include', '/app/manager');

        // click on filters
        cy.get('[aria-controls="sidebar-dropdown"]')
            .click({force: true})

        // verify that the filters are displayed
        cy.get('[class="py-2 space-y-0"]')
            .should('be.visible')
    });

    it('Select Feedback and verify that the options are visible', () => {
        
        cy.get('[aria-controls="sidebar-dropdown"]')
            .click({force: true})

        // You get the span to choose a filter and you make an alias
        // to the parent to be able to capture it
        cy.get('span:contains("Feedback")')
            .parent()
            .as("enlaceFeedBack")

        // the link is clicked
        cy.get('@enlaceFeedBack')
            .click({force: true})
        
        // It is verified that the Feedback options are visible
        cy.get('div [role=listbox]')
            .click({force: true})
        cy.get('div [role=presentation]')
            .should('be.visible')
    });

    it('Navigate to options, select option javi and search', () => {

        cy.get('[aria-controls="sidebar-dropdown"]')
            .click({force: true})
        cy.get('span:contains("Feedback")')
            .parent()
            .as("enlaceFeedBack")

        // the link is clicked
        cy.get('@enlaceFeedBack')
            .click({force: true})

        // click and show options
        cy.get('div [role=listbox]')
            .click({force: true})

        // click and select the option
        cy.get('div [role=presentation')
            .contains("Javier Valenziani")
            .click({force: true})

        // Finally, click the button to search.
        cy.get('button:contains("Search")').click({force: true})
    });

    it('Navigate to options, select cape option and search', () => {

        cy.get('[aria-controls="sidebar-dropdown"]')
            .click({force: true})
        cy.get('span:contains("Feedback")')
            .parent()
            .as("enlaceFeedBack")

        cy.get('@enlaceFeedBack')
            .click({force: true})
        
        cy.get('div [role=listbox]')
            .click({force: true})

        // select new option
        cy.get('div [role=presentation')
            .contains("Ignacio Capezzolo")
            .click({force: true})

        // Finally, click the button to search.
        cy.get('button:contains("Search")').click({force: true})
    });
});