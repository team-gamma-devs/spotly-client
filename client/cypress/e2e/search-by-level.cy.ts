describe('flow e2e to search by english level', () => {
    beforeEach(() => {
    cy.visit('/app/manager');
  });

    it('verify that the filters are displayed', () => {
      
        // Verify that the URL remains
        cy.url().should('include', '/app/manager');

        // click on filters
        cy.get('[aria-controls="sidebar-dropdown"]', {timeout: 10000})
            .click({force: true})

        cy.wait(1000)
        // verify that the filters are displayed
        cy.get('[class="py-2 space-y-0"]')
            .should('be.visible')
    });

    it('Select English Level and verify that the options are visible', () => {
        
        cy.get('[aria-controls="sidebar-dropdown"]', {timeout: 10000})
            .click({force: true})

        cy.wait(1000)
        // You get the span to choose a filter and you make an alias
        // to the parent to be able to capture it
        cy.get('span:contains("English Level")')
            .parent()
            .as("enlaceEnglishLevel")

        // the link is clicked
        cy.get('@enlaceEnglishLevel')
            .click({force: true})

        cy.wait(1000)
        // It is verified that the English level filters are visible
        cy.get('div [role="listbox"]')
            .should('be.visible')
    });

    it('Navigate to options, select advanced option and search', () => {

        cy.get('[aria-controls="sidebar-dropdown"]', {timeout: 10000})
            .click({force: true})

        cy.wait(1000)

        cy.get('span:contains("English Level")')
            .parent()
            .as("enlaceEnglishLevel")

        cy.wait(1000)
        cy.get('@enlaceEnglishLevel')
            .click({force: true})

        cy.wait(1000)
        cy.get('div [role="listbox"]')
            .click({force: true})
            //.select('advanced')
        cy.wait(1000)
        cy.get('div [role="presentation"]')
            .should('be.visible')
            .contains('Advanced')
            .click({force: true})

        cy.wait(1000)
        // Finally, click the button to search.
        cy.get('button:contains("Search")').click({force: true})
    });

    it('Navigate to options, select intermediate option and search', () => {

        cy.get('[aria-controls="sidebar-dropdown"]', {timeout: 10000})
            .click({force: true})

        cy.wait(1000)
        cy.get('span:contains("English Level")')
            .parent()
            .as("enlaceEnglishLevel")

        cy.get('@enlaceEnglishLevel')
            .click({force: true})

        cy.wait(1000)
        cy.get('div [role="listbox"]')
            .click({force: true})

        cy.wait(1000)
        cy.get('div [role="presentation"]')
            .should('be.visible')
            .contains('Intermediate')
            .click({force: true})

        cy.wait(1000)
        // Finally, click the button to search.
        cy.get('button:contains("Search")').click({force: true})
    });

    it('Navigate to options, select basic option and search', () => {

        cy.get('[aria-controls="sidebar-dropdown"]', {timeout: 10000})
            .click({force: true})

        cy.wait(1000)
        cy.get('span:contains("English Level")')
            .parent()
            .as("enlaceEnglishLevel")

        cy.wait(1000)
        cy.get('@enlaceEnglishLevel')
            .click({force: true})

        cy.wait(1000)
        cy.get('div [role="listbox"]')
            .click({force: true})

        cy.wait(1000)
        cy.get('div [role="presentation"]')
            .should('be.visible')
            .contains('Basic')
            .click({force: true})

        cy.wait(1000)
        // Finally, click the button to search.
        cy.get('button:contains("Search")').click({force: true})
    });

    it('Navigate to options, select multiples option and search', () => {

        cy.get('[aria-controls="sidebar-dropdown"]', {timeout: 10000})
            .click({force: true})

        cy.wait(1000)
        cy.get('span:contains("English Level")')
            .parent()
            .as("enlaceEnglishLevel")

        cy.wait(1000)
        cy.get('@enlaceEnglishLevel')
            .click({force: true})

        cy.wait(1000)
        cy.get('div [role="listbox"]')
            .click({force: true})

        cy.wait(1000)
        cy.get('div [role="presentation"]')
            .should('be.visible')
            .contains('Basic')
            .click({force: true})

        cy.wait(1000)
        cy.get('div [role="presentation"]')
            .should('be.visible')
            .contains('Intermediate')
            .click({force: true})

        cy.wait(1000)
        cy.get('div [role="presentation"]')
            .should('be.visible')
            .contains('Advanced')
            .click({force: true})

        cy.wait(1000)
        // Finally, click the button to search.
        cy.get('button:contains("Search")').click({force: true})
    });

    it('Navigate to options and remove some selected tag', () => {

        cy.get('[aria-controls="sidebar-dropdown"]', {timeout: 10000})
            .click({force: true})

        cy.wait(1000)
        cy.get('span:contains("English Level")')
            .parent()
            .as("enlaceEnglishLevel")

        cy.wait(1000)
        cy.get('@enlaceEnglishLevel')
            .click({force: true})

        cy.wait(1000)
        cy.get('div [role="listbox"]')
            .click({force: true})

        cy.wait(1000)
        cy.get('div [role="presentation"]')
            .should('be.visible')
            .contains('Intermediate')
            .click({force: true})

        cy.wait(1000)
        cy.get('div [role="presentation"]')
            .should('be.visible')
            .contains('Advanced')
            .click({force: true})

        cy.get('body').click(100, 30)
        cy.wait(1000)
        cy.get('div [role="listbox"]')
            .find('span')
            .find('div')
            .contains('Advanced')
            .find('button')
            .click({force: true})

        cy.wait(1000)
        // Finally, click the button to search.
        cy.get('button:contains("Search")').click({force: true})
    });
});