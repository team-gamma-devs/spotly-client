describe('flow e2e to search by technologies', () => {
    beforeEach(() => {
        cy.visit('app/manager/status')
        cy.get('body').should('be.visible')
        cy.get('button:contains("Upload CSV")')
            .should('be.visible')
            .wait(500)
            .click({delay: 250, force: true})
            .wait(1000)
        cy.get('dialog', {timeout: 10000})
          .wait(500)
          .find('input')
          .as('button')
    });
    it('first validation, if isn\'t type csv', () => {
        const colorError = 'oklch(0.704 0.191 22.216)';

        cy.get('@button')
          .wait(500)
          .selectFile('cypress/fixtures/personalCV.pdf')
          .wait(500)

        cy.get('p:contains("Selected: personalCV.pdf")')
          .should('be.visible')
          .should('have.css', 'color', colorError);

        cy.get('button:contains("Upload CSV")')
          .last()
          .wait(500)
          .should('be.disabled')

        cy.get('[aria-label="Close"]').first().click({force:true})

        cy.get('@button')
          .wait(500)
          .selectFile('cypress/fixtures/pic-person-02.jpg', {force: true})
          .wait(500)

        cy.get('p:contains("Selected:")')
          .should('be.visible')
          .should('have.css', 'color', colorError);

        cy.get('button:contains("Upload CSV")')
          .last()
          .wait(500)
          .should('be.disabled')
    })
    it('successful csv', () => {
        cy.get('@button')
          .wait(500)
          .selectFile('cypress/fixtures/manager-CSV/successful.csv', {force: true})
          .wait(500)

        cy.get('p:contains("Selected:")')
          .should('be.visible')
          .should('have.css', 'color', 'oklch(0.792 0.209 151.711)');

        cy.wait(500)
        cy.get('button:contains("Upload CSV")')
          .last()
          .click()
          .wait(500)

        cy.get('button:contains("Upload Another File")')
          .click()
          .wait(500)
    })
    it('empty CSV', () => {
        cy.get('@button')
          .wait(500)
          .selectFile('cypress/fixtures/manager-CSV/empty-csv.csv', {force: true})
          .wait(500)

        cy.get('p:contains("Selected:")')
          .should('be.visible')
          .should('have.css', 'color', 'oklch(0.792 0.209 151.711)');

        cy.wait(500)
        cy.get('button:contains("Upload CSV")')
          .last()
          .click()
          .wait(500)

        cy.get('span:contains("Upload failed!")')
          .should('be.visible')

        cy.get('div')
          .contains('CSV file is empty')
          .should('be.visible')
    })
    it('missing colums CSV', () => {
        cy.get('@button')
          .wait(500)
          .selectFile('cypress/fixtures/manager-CSV/missing-colum.csv', {force: true})
          .wait(500)

        cy.get('p:contains("Selected:")')
          .should('be.visible')
          .should('have.css', 'color', 'oklch(0.792 0.209 151.711)');

        cy.wait(500)
        cy.get('button:contains("Upload CSV")')
          .last()
          .click()
          .wait(500)

        cy.get('span:contains("Upload failed!")')
          .should('be.visible')

        cy.get('div')
          .contains('Invalid CSV Headers')
          .should('be.visible')
    })
    it('one more column CSV', () => {
        cy.get('@button')
          .wait(500)
          .selectFile('cypress/fixtures/manager-CSV/one-more-column.csv', {force: true})
          .wait(500)

        cy.get('p:contains("Selected:")')
          .should('be.visible')
          .should('have.css', 'color', 'oklch(0.792 0.209 151.711)');

        cy.wait(500)
        cy.get('button:contains("Upload CSV")')
          .last()
          .click()
          .wait(500)

        cy.get('span:contains("Upload failed!")')
          .should('be.visible')

        cy.get('div')
          .contains('Invalid CSV Headers')
          .should('be.visible')
    })
    it('invalid email on CSV', () => {
        cy.get('@button')
          .wait(500)
          .selectFile('cypress/fixtures/manager-CSV/invalid-email.csv', {force: true})
          .wait(500)

        cy.get('p:contains("Selected:")')
          .should('be.visible')
          .should('have.css', 'color', 'oklch(0.792 0.209 151.711)');

        cy.wait(500)
        cy.get('button:contains("Upload CSV")')
          .last()
          .click()
          .wait(500)

        cy.get('span:contains("Upload failed!")')
          .should('be.visible')

        cy.get('div')
          .contains('Row 1: Invalid email format')
          .should('be.visible')
    })
    it('missing first name on CSV', () => {
        cy.get('@button')
          .wait(500)
          .selectFile('cypress/fixtures/manager-CSV/missing-first-name.csv', {force: true})
          .wait(500)

        cy.get('p:contains("Selected:")')
          .should('be.visible')
          .should('have.css', 'color', 'oklch(0.792 0.209 151.711)');

        cy.wait(500)
        cy.get('button:contains("Upload CSV")')
          .last()
          .click()
          .wait(500)

        cy.get('span:contains("Upload failed!")')
          .should('be.visible')

        cy.get('div')
          .contains('Row 1: First name is required')
          .should('be.visible')
    })
    it('long first name on CSV', () => {
        cy.get('@button')
          .wait(500)
          .selectFile('cypress/fixtures/manager-CSV/long-first-name.csv', {force: true})
          .wait(500)

        cy.get('p:contains("Selected:")')
          .should('be.visible')
          .should('have.css', 'color', 'oklch(0.792 0.209 151.711)');

        cy.wait(500)
        cy.get('button:contains("Upload CSV")')
          .last()
          .click()
          .wait(500)

        cy.get('span:contains("Upload failed!")')
          .should('be.visible')

        cy.get('div')
          .contains('Row 1: First name must be 50 characters or less')
          .should('be.visible')
    })
    it('missing last name on CSV', () => {
        cy.get('@button')
          .wait(500)
          .selectFile('cypress/fixtures/manager-CSV/missing-last-name.csv', {force: true})
          .wait(500)

        cy.get('p:contains("Selected:")')
          .should('be.visible')
          .should('have.css', 'color', 'oklch(0.792 0.209 151.711)');

        cy.wait(500)
        cy.get('button:contains("Upload CSV")')
          .last()
          .click()
          .wait(500)

        cy.get('span:contains("Upload failed!")')
          .should('be.visible')

        cy.get('div')
          .contains('Row 1: Last name is required')
          .should('be.visible')
    })
    it('long last name on CSV', () => {
        cy.get('@button')
          .wait(500)
          .selectFile('cypress/fixtures/manager-CSV/long-last-name.csv', {force: true})
          .wait(500)

        cy.get('p:contains("Selected:")')
          .should('be.visible')
          .should('have.css', 'color', 'oklch(0.792 0.209 151.711)');

        cy.wait(500)
        cy.get('button:contains("Upload CSV")')
          .last()
          .click()
          .wait(500)

        cy.get('span:contains("Upload failed!")')
          .should('be.visible')

        cy.get('div')
          .contains('Row 1: Last name must be 50 characters or less')
          .should('be.visible')
    })
    it('long last name on CSV', () => {
        cy.get('@button')
          .wait(500)
          .selectFile('cypress/fixtures/manager-CSV/negative-cohort.csv', {force: true})
          .wait(500)

        cy.get('p:contains("Selected:")')
          .should('be.visible')
          .should('have.css', 'color', 'oklch(0.792 0.209 151.711)');

        cy.wait(500)
        cy.get('button:contains("Upload CSV")')
          .last()
          .click()
          .wait(500)

        cy.get('span:contains("Upload failed!")')
          .should('be.visible')

        cy.get('div')
          .contains('Row 1: Cohort must be a non-negative integer')
          .should('be.visible')
    })
})
