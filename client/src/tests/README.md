# Testing Documentation

![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Testing](https://img.shields.io/badge/Testing-E2E%20%7C%20Unit%20%7C%20Component-brightgreen?style=for-the-badge)


![Status](https://img.shields.io/badge/Test_Setup-Complete-success?style=flat-square)
![Coverage](https://img.shields.io/badge/Coverage-Auth_Flow-blue?style=flat-square)
![Framework](https://img.shields.io/badge/Framework-Cypress_+_Vitest-orange?style=flat-square)


### Cypress Installation

```bash
# Add Cypress to development dependencies
pnpm add --save-dev cypress

# Install Cypress binary
pnpm dlx cypress install

# Start Cypress UI
pnpm dlx cypress open
```

## 📋 Available Scripts

![Scripts](https://img.shields.io/badge/pnpm_scripts-6_commands-informational?style=flat-square)

```bash
# E2E Testing
pnpm run test:e2e         # Run E2E tests headlessly
pnpm run test:e2e:ui      # Open Cypress UI for E2E tests

# Component Testing  
pnpm run test:component   # Run component tests headlessly

# Unit Testing
pnpm run test:unit        # Run Vitest unit tests

# All Tests
pnpm run test:all         # Run complete test suite
```

## Test Structure

```
src/tests/
├── unit/                # Vitest unit tests
├── integration/         # Server action tests
└── README.md

cypress/
├── e2e/                 # End-to-end tests
│   ├── auth-flow.cy.ts
│   └── role-access.cy.ts
├── component/           # Component tests
│   └── AuthBox.cy.ts
├── fixtures/           # Test data
├── support/            # Custom commands
└── downloads/          # Test artifacts (excluded from git)
```

## Testing Strategy

BAH! I don't need tests bro.


## Test Data

Test fixtures are located in `cypress/fixtures/`:
- `test-users.json` - Mock user data
- `sample-cv.pdf` - Test file for uploads
- `sample-linkedin.pdf` - Test LinkedIn document

## Config

Go ahead, make a mess
- **Cypress config:** `cypress.config.ts`
- **Vitest config:** `vitest.config.ts`  
- **TypeScript:** `cypress/tsconfig.json`

## If things blow up

**Cypress binary not found:**
```bash
npx cypress cache clear
npx cypress install
```

**Import errors in tests:**
```bash
# Ensure proper path aliases in cypress.config.ts
```

**Tests failing in CI:**
```bash
# Use headless mode for CI
cypress run --headless
```