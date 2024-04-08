import elementPage from "../../pageObjectModel/elementPage/elementPage"
import homePageObjects from "../../pageObjectModel/homePage/homePage"

// test scenario
describe('Tests All Elements', () => {
    // test case
    //beforeEach(() => cy.disableSameSiteCookieRestrictions())
    context('View DEMO QA website', () => {
        // test step: specify - will organized test case
        specify('when demo qa visited', () => {
            cy.visit('/')
        })
        // expected result
        it('should display demo qa website', () => {
            cy.url().should('include', 'demoqa')
            // assertion
            homePageObjects.getHeaderLogo().should('be.visible')
            homePageObjects.getBanner().should('be.visible')
            homePageObjects.getCategoryCards().should('be.visible').and('have.length.at.least', 6)
        })

        context('View elements', () => {
            specify('when elements category is clicked', () => {
                homePageObjects.getCategoryCards().contains('Elements').click()
            })
            it('should display elements page', () => {
                cy.url().should('include', 'elements')
                elementPage.getElementNav().contains('Elements')
            })

            context('View text box page', () => {
                specify('when text box is clicked', () => {
                    elementPage.getMenuListNav().contains('Text Box').click()
                })
                it('should display text box page ', () => {
                    cy.url().should('include', 'text-box')
                    elementPage.textBox.getHeaderText().should('be.visible').and('have.text', 'Text Box')
                })
                specify('when form is filled out', ()=>{
                    elementPage.textBox.getNameField().focus().type('Names')
                    elementPage.textBox.getEmailField().focus().type('Names@gmail.com')
                    elementPage.textBox.getCurrentAddField().focus().type('South Signal, Taguig')
                    elementPage.textBox.getPermanentAddField().focus().type('New York, New York')
                    elementPage.textBox.getOutput().should('not.be.visible')
                    elementPage.textBox.getSubmitButton().focus().click()
                })
                
                it('should display output',() =>
                {
                    elementPage.textBox.getOutput().should('be.visible')
                })

            })

        })

    })
})




/*
function context(arg0: string, arg1: () => void) {
    throw new Error("Function not implemented.")
}

function specify(arg0: string, arg1: () => void) {
    throw new Error("Function not implemented.")
}

function beforeEach(arg0: () => any) {
    throw new Error("Function not implemented.")
}*/
// npm install typescript -> install typescript
// npx -p typescript tsc --init -> to create ts json 