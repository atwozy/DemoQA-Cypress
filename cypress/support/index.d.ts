declare namespace Cypress {
    interface Chainable {
        verifyText(elementSelector: Cypress.Chainable, expectedValue: string): void;
        verifyTextNotes(elementSelector: Cypress.Chainable, expectedValue: string[]): void;
        verifyWebTables(elementSelector: Cypress.Chainable): void;
    }
}