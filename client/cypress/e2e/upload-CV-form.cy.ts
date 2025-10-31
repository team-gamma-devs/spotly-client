// remember change the role of the mock to run this test

describe('some flows to check the form of upload cv component', () => {
    beforeEach(() => {
        cy.visit('app/graduate/upload_cv/?/uploadFiles')
    })

    it('check that component is displayed', () => {
        cy.get('form')
            .should('be.visible')

        cy.wait(500)
        // message with size requirement file
        cy.get('p:contains("Required files are marked with *. Max size: 3MB per file.")')
            .should('be.visible')

        cy.wait(500)
        // messages with requirement type file
        cy.get('span:contains("LinkedIn-generated PDF *")')
            .should('be.visible')

        cy.wait(500)
        cy.get('span:contains("Personal CV (PDF or DOCX) *")')
            .should('be.visible')
    })

    it('flow with correct files', () => {
        cy.get('form')
            .as('uploadForm')

        cy.wait(500)
        cy.get('@uploadForm')
            .find('[name="personal_cv"]')
            .click({force: true})
            .selectFile('cypress/fixtures/personalCV.pdf')

        cy.wait(500)
        cy.get('@uploadForm')
            .find('[name="linkedin_pdf"]')
            .click({force: true})
            .selectFile('cypress/fixtures/personalCV.pdf')

        cy.wait(500)
        cy.get('@uploadForm')
            .find('[name="avatar"]')
            .click({force: true})
            .selectFile('cypress/fixtures/pic-person-02.jpg')

        cy.wait(500)
        cy.get('[type="submit"]')
            .click({force: true})
    })

    it('missing linkedin pdf', () => {
        cy.get('form')
            .as('uploadForm')

        cy.wait(500)
        cy.get('@uploadForm')
            .find('[name="personal_cv"]')
            .click({force: true})
            .selectFile('cypress/fixtures/personalCV.pdf')

        cy.wait(500)
        cy.get('@uploadForm')
            .find('[name="avatar"]')
            .click({force: true})
            .selectFile('cypress/fixtures/pic-person-02.jpg')

        cy.wait(500)
        cy.get('[type="submit"]')
            .click({force: true})

        cy.wait(500)
        // check input focused and validation message is not empty
        cy.get('input[type="file"][required]')
            .should('have.focus')
            .invoke('prop', 'validationMessage')
            .should('not.be.empty')
    })

    it('missing personal cv', () => {
        cy.get('form')
            .as('uploadForm')

        cy.wait(500)
        cy.get('@uploadForm')
            .find('[name="linkedin_pdf"]')
            .click({force: true})
            .selectFile('cypress/fixtures/personalCV.pdf')

        cy.wait(500)
        cy.get('@uploadForm')
            .find('[name="avatar"]')
            .click({force: true})
            .selectFile('cypress/fixtures/pic-person-02.jpg')

        cy.wait(500)
        cy.get('[type="submit"]')
            .click({force: true})

        cy.wait(500)
        // check input focused and validation message is not empty
        cy.get('input[type="file"][required]')
            .should('have.focus')
            .last()
            .invoke('prop', 'validationMessage')
            .should('not.be.empty')
    })

    it('missing the two pdf files required', () => {
        cy.get('form')
            .as('uploadForm')

        cy.wait(500)
        cy.get('[type="submit"]')
            .click({force: true})

        cy.wait(500)
        // check input focused and validation message is not empty
        cy.get('input[type="file"][required]')
            .should('have.focus')
            .first()
            .invoke('prop', 'validationMessage')
            .should('not.be.empty')

        // check input focused and validation message is not empty
        cy.wait(500)
        cy.get('input[type="file"][required]')
            .should('have.focus')
            .last()
            .invoke('prop', 'validationMessage')
            .should('not.be.empty')
    })

    it('upload ivalid file', () => {
        cy.get('form')
            .as('uploadForm')

        cy.wait(500)
        cy.get('@uploadForm')
            .find('[name="personal_cv"]')
            .click({force: true})
            .selectFile('cypress/fixtures/example.json')

        cy.wait(500)
        cy.get('@uploadForm')
            .find('[name="linkedin_pdf"]')
            .click({force: true})
            .selectFile('cypress/fixtures/example.json')

        cy.wait(500)
        cy.get('@uploadForm')
            .find('[name="avatar"]')
            .click({force: true})
            .selectFile('cypress/fixtures/example.json')

        cy.wait(500)
        cy.get('[type="submit"]')
            .click({force: true})

        // check that the containers of error message are displayed
        cy.wait(500)
        cy.get('div[role="alert"]')
            .should('be.visible')
            .as('divErrorMessage')

        // verify that message of invalid type be visible
        cy.wait(500)
        cy.get('span:contains("LinkedIn PDF")')
            .should('be.visible')
        cy.get('@divErrorMessage')
            .contains('Invalid file type. Allowed types: PDF, DOCX')
            .should('be.visible')

        // verify that message of invalid type be visible
        cy.wait(500)
        cy.get('span:contains("Personal CV")')
            .should('be.visible')
        cy.get('@divErrorMessage')
            .contains('Invalid file type. Allowed types: PDF')
            .should('be.visible')

        // verify that message of invalid type be visible
        cy.wait(500)
        cy.get('span:contains("Avatar")')
            .should('be.visible')
        cy.get('@divErrorMessage')
            .contains('Invalid file type. Allowed types: JPG, JPEG, PNG')
            .should('be.visible')
    })
})