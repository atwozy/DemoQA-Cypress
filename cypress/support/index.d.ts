declare namespace Cypress {
    interface Chainable {
        attachFile(arg0: { fileContent: any; fileName: string; mimeType: string; }): unknown;
        catch(arg0: (error: any) => void): unknown;
        verifyText(elementSelector: Cypress.Chainable, expectedValue: string): void;
        verifyTextNotes(elementSelector: Cypress.Chainable, expectedValue: string[]): void;
        verifyWebTables(elementSelector: Cypress.Chainable): void;
    }
} 