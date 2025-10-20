import { mount } from 'cypress/svelte';
import LoginBox from '$lib/components/main/LoginBox.svelte';

beforeEach(() => {
	// Mount the component before each test
	mount(LoginBox);
});

it('renders all essential elements', () => {
	// Check logo and branding
	cy.get('[alt="Spotly Logo"]').should('be.visible');
	cy.contains('Spotly').should('be.visible');

	// Check main heading
	cy.contains('Login').should('be.visible');

	// Check back button (should be hidden on mobile, visible on desktop)
	cy.get('[data-testid="btn-go-back"]').should('exist');

	// Check descriptive text
	cy.contains("You'll receive an access link").should('be.visible');
	cy.contains('Check your spam folder').should('be.visible');

	// Check AWS Cognito branding
	cy.contains('Powered By').should('be.visible');
	cy.contains('Amazon Cognito').should('be.visible');
	cy.get('[alt="AWS Cognito"]').should('be.visible');
});

it('displays login form correctly', () => {
	// Check that LoginForm component is rendered
	// (assuming LoginForm has an email input and submit button)
	cy.get('form').should('exist');
	cy.get('[type="email"]').should('be.visible');
	cy.get('[type="submit"]').should('be.visible');
});

it('has proper styling and layout', () => {
	// Check container structure
	cy.get('#login-box, [id*="form-logo-container"]').should('exist');
	cy.get('#form-header').should('be.visible');

	// Check responsive classes are applied
	cy.get('[class*="md:block"]').should('exist');
	cy.get('[class*="md:flex"]').should('exist');
});

it('has accessible external link', () => {
	// Check AWS Cognito link
	cy.get('[href="https://aws.amazon.com/pm/cognito"]')
		.should('have.attr', 'target', '_blank')
		.and('have.attr', 'rel', 'noopener noreferrer')
		.and('have.attr', 'aria-label', 'Amazon Cognito');
});

it('renders with proper component hierarchy', () => {
	// Check that GenericBox components are rendered
	// (these create the visual container structure)
	cy.get('[class*="ring"]').should('exist'); // GenericBoxVisible likely has ring classes

	// Check form header layout
	cy.get('#form-header')
		.should('have.class', 'flex')
		.and('have.class', 'items-center')
		.and('have.class', 'justify-between');
});

it('displays custom styling correctly', () => {
	// Check custom CSS is applied
	cy.get('.p-signup').should('have.css', 'max-width', '200px').and('have.css', 'text-align', 'center');

	// Check Zalando font is applied
	cy.get('.zalando-font').should('exist');
});

// Additional test for different viewport sizes
it('adapts to mobile viewport', () => {
	cy.viewport(375, 812); // iPhone X dimensions
	mount(LoginBox);

	// Back button should be hidden on mobile
	cy.get('[class*="hidden"]').should('not.be.visible');
});
it('displays properly on desktop viewport', () => {
	cy.viewport(1280, 720); // Desktop dimensions
	mount(LoginBox);

	// Back button should be visible on desktop
	cy.get('[class*="md:block"]').should('be.visible');
});

// Test with different states (if LoginForm accepts props)
it('handles form submission flow', () => {
	mount(LoginBox);

	// Fill out the form (assuming email input exists in LoginForm)
	cy.get('[type="email"]').type('test@holbertonschool.com');
	cy.get('[type="submit"]').click();

	// This would test the integration with LoginForm component
	// Adjust based on your actual LoginForm implementation
});
