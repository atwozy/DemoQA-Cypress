// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { includes } from "cypress/types/lodash"
import { userData } from "../fixtures/fixture"
import elementsPage from "../pageObjectModel/elementsPage/elementsPage"
import { should } from "chai"
import { any } from "cypress/types/bluebird"

// To evaluate two strings between the form and output
Cypress.Commands.add('verifyText', (elementSelector: Cypress.Chainable, expectedValue: string) => {
    elementSelector.invoke('text').then((text: string) => {
        const trimText: string = text.split(':')[1].trim()
        expect(trimText).to.equal(expectedValue)
    })
})

// To evaluate two strings between selected check boxes and output
Cypress.Commands.add('verifyTextNotes', (elementSelector: Cypress.Chainable, expectedValue: string[]) => {
    elementSelector.each(($el, index) => {
        cy.wrap($el).invoke('text').then((text: string) => {
            const expectValue = expectedValue[index].replace(/\s+/g, '')
            expect(text.toUpperCase()).to.contains(expectValue.toUpperCase())
        })
    })
})

// Invoke text of web tables
Cypress.Commands.add('verifyWebTables', (elementSelector: Cypress.Chainable) => {
    elementSelector.each(($el) => {
        cy.wrap($el).invoke('text').then((text: string) => {
            if (text.includes(userData.webTables.firstName)) {
                const formArray = [userData.webTables.firstName, userData.webTables.lastName, userData.webTables.age, userData.webTables.email, userData.webTables.salary, userData.webTables.department]
                expect(text).to.includes(`${formArray.join('')}`)
            }
        })
    })
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })