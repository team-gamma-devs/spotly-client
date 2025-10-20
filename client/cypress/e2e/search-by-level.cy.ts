describe('flow e2e to search by english level', () => {
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

    it('Select English Level and verify that the options are visible', () => {
        
        cy.get('[aria-controls="sidebar-dropdown"]')
            .click({force: true})

        // You get the span to choose a filter and you make an alias
        // to the parent to be able to capture it
        cy.get('span:contains("English Level")')
            .parent()
            .as("enlaceEnglishLevel")

        // the link is clicked
        cy.get('@enlaceEnglishLevel')
            .click({force: true})
        
        // It is verified that the English level filters are visible
        cy.get('div select')
            .should('be.visible')
    });

    it('Navigate to options, select advanced option and search', () => {

        cy.get('[aria-controls="sidebar-dropdown"]')
            .click({force: true})
        cy.get('span:contains("English Level")')
            .parent()
            .as("enlaceEnglishLevel")

        cy.get('@enlaceEnglishLevel')
            .click({force: true})
        
        cy.get('div select')
            .select('advanced')

        // Finally, click the button to search.
        cy.get('button:contains("Search")').click({force: true})
    });

    it('Navigate to options, select intermediate option and search', () => {

        cy.get('[aria-controls="sidebar-dropdown"]')
            .click({force: true})
        cy.get('span:contains("English Level")')
            .parent()
            .as("enlaceEnglishLevel")

        cy.get('@enlaceEnglishLevel')
            .click({force: true})
        
        cy.get('div select')
            .select('intermediate')

        cy.get('button:contains("Search")').click({force: true})
    });

    it('Navigate to options, select basic option and search', () => {

        cy.get('[aria-controls="sidebar-dropdown"]')
            .click({force: true})
        cy.get('span:contains("English Level")')
            .parent()
            .as("enlaceEnglishLevel")

        cy.get('@enlaceEnglishLevel')
            .click({force: true})
        
        cy.get('div select')
            .select('basic')

        cy.get('button:contains("Search")').click({force: true})
    });
});