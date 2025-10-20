describe('LoginBox E2E Tests', () => {
	beforeEach(() => {
		cy.visit('/login');
	});

	it('renders all essential elements', () => {
		// Check logo and branding
		cy.get('[alt="Spotly Logo"]').should('be.visible');
		cy.contains('Login').should('be.visible');

		// Check descriptive text
		cy.contains("You'll receive an access link").should('be.visible');

		// Check form elements
		cy.get('form').should('exist');
		cy.get('[type="email"]').should('be.visible');
		cy.get('[type="submit"]').should('be.visible');
	});

	it('validates email input', () => {
		// Try submitting empty form
		cy.get('[type="submit"]').click();

		// Should show HTML5 validation
		cy.get('[type="email"]:invalid').should('exist');
	});

	it('handles email submission', () => {
		// Fill valid email
		cy.get('[type="email"]').type('test@holbertonschool.com');
		cy.get('[type="submit"]').click();

		// Should redirect or show loading state
		// Adjust based on your actual behavior
	});

	it('displays responsive design correctly', () => {
		// Test mobile view
		cy.viewport(375, 812);
		cy.get('[alt="Spotly Logo"]').should('be.visible');

		// Test desktop view
		cy.viewport(1280, 720);
		cy.get('[alt="Spotly Logo"]').should('be.visible');
	});
});
