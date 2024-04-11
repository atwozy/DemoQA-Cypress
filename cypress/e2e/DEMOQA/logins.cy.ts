import { forEach } from "cypress/types/lodash"
import { userData } from "../../fixtures/fixture"
import formsPageObject from "../../pageObjectModel/formsPage/formsPage"
import homepageObjects from "../../pageObjectModel/homepageElement/homepageElement"
import { data } from "cypress/types/jquery"
import elementsPage from "../../pageObjectModel/elementsPage/elementsPage"

describe('Tests All Elements', () => {
    context('Visit Demo QA', () => {
        specify('when demo qa is visited', () => {
            cy.visit('/')
            cy.url().should('include', 'demoqa')
        })
        it('should display qa demo website', () => {
            homepageObjects.getHeaderLogo().should('be.visible')
        })

        context('View elements category', () => {
            specify('when elements category is clicked', () => {
                elementsPage.getElements().contains('Elements').click()
            })
            it('should display the elements page', () => {
                cy.url().should('include', 'elements')
            })

            // Text Box
            context('View Text Box page', () => {
                specify('when text box is cliked', () => {
                    elementsPage.getElementsCategory().contains('Text Box').click()
                })
                it('should display the text-box page', () => {
                    cy.url().should('include', 'text-box')
                    elementsPage.textBox.getTextHeader().should('be.visible').and('have.text', 'Text Box')
                })

                specify('when form is filled out', () => {
                    elementsPage.textBox.getFullName().focus().type(userData.textBox.name)
                    elementsPage.textBox.getEmail().focus().type(userData.textBox.email)
                    elementsPage.textBox.getCurrentAdd().focus().type(userData.textBox.currentAdd)
                    elementsPage.textBox.getPermanentAdd().focus().type(userData.textBox.permanentAdd)
                    elementsPage.textBox.getOutput().should('be.hidden')
                    elementsPage.textBox.getSubmitButton().focus().click()
                })

                it('should display the output', () => {
                    elementsPage.textBox.getOutput().should('be.visible')
                    cy.verifyText(elementsPage.textBoxOutput.getNameOutput(), userData.textBox.name)
                    cy.verifyText(elementsPage.textBoxOutput.getEmailOutput(), userData.textBox.email)
                    cy.verifyText(elementsPage.textBoxOutput.getCurrentAddOutput(), userData.textBox.currentAdd)
                    cy.verifyText(elementsPage.textBoxOutput.getPermanentAddOutput(), userData.textBox.permanentAdd)
                })
            })

            // Check Box
            context('View Check Box page', () => {
                let dataArray: string[] = []

                specify('when check box is clicked', () => {
                    elementsPage.getElementsCategory().contains('Check Box').click()
                })
                it('should display check box page', () => {
                    cy.url().should('include', 'checkbox')
                    elementsPage.checkBox.getTextHeader().should('be.visible').and('have.text', 'Check Box')
                })

                specify('when checkboxes are checked', () => {
                    elementsPage.checkBox.getExpandCollapseButton().eq(0).click()
                    userData.checkBox.multiple.forEach(label => {
                        elementsPage.checkBox.getCheckBoxLabel().contains(label).click()
                        dataArray.push(label)
                    })
                })
                it('should display the selected checkboxes', () => {
                    elementsPage.checkBox.getTextNotes().should('be.visible').and('have.length', dataArray.length)
                    cy.verifyTextNotes(elementsPage.checkBox.getTextNotes(), dataArray)
                })

            })

            // Radio Button
            context('View Radio Button page', () => {
                specify('when radio button is clicked', () => {
                    elementsPage.getElementsCategory().contains('Radio Button').click()
                })
                it('should display the radio button page', () => {
                    cy.url().should('include', 'radio')
                    elementsPage.radioButton.getTextHeader().should('be.visible').and('have.text', 'Radio Button')
                })

                specify('when radio button is selected', () => {
                    elementsPage.radioButton.getRadioButton().contains(userData.radioButton.selectButton).click()
                })
                it('should display the selected options', () => {
                    elementsPage.radioButton.getTextNotes().should('be.visible').and('have.text', userData.radioButton.selectButton)
                })
                
                specify('when radio button is selected', () => {
                    elementsPage.radioButton.getRadioButton().contains(userData.radioButton.selectNo).click({ force: true })
                })
                it('should not display the output', () => {
                    elementsPage.radioButton.getRadioButton().should('be.disabled')
                    elementsPage.radioButton.getTextNotes().should('not.have.text', userData.radioButton.selectNo)
                })


            })

            // Web Tables
            context('View Web tables page', () => {
                specify('when web tables is clicked', () => {
                    elementsPage.getElementsCategory().contains('Web Tables').click()
                })
                it('should display the web tables page', () => {
                    cy.url().should('include', 'webtables')
                    elementsPage.webTables.getTextHeader().should('be.visible').and('have.text', 'Web Tables')
                })

                specify('when add button is clicked', () => {
                    elementsPage.webTables.getAddButton().click()
                })
                it('should display the registration form', () => {
                    elementsPage.webTables.getRegistrationFormHeader().should('be.visible').and('have.text', 'Registration Form')
                })

                specify('when registration form is filled out', () => {
                    elementsPage.webTables.getFirstName().type(userData.webTables.firstName)
                    elementsPage.webTables.getLastName().type(userData.webTables.lastName)
                    elementsPage.webTables.getEmail().type(userData.webTables.email)
                    elementsPage.webTables.getAge().type(userData.webTables.age)
                    elementsPage.webTables.getSalary().type(userData.webTables.salary)
                    elementsPage.webTables.getDepartment().type(userData.webTables.department)
                    elementsPage.webTables.getSubmitButton().click()
                })
                it('should display the user information on the data table', () => {
                    cy.verifyWebTables(elementsPage.webTables.getRowData())
                })

                specify('when I search added data by email', ()=>{
                    elementsPage.webTables.getSearchBar().type(userData.webTables.email)
                })
                it('should display table row/s with searched email', () =>{
                    elementsPage.webTables.getRowData().should('contain.text', userData.webTables.email)
                })

                specify('when I edit the first name data', ()=>{
                    elementsPage.webTables.getRowData().contains(userData.webTables.email).parent().find('[class=action-buttons] [class=mr-2]').click()
                    elementsPage.webTables.getFirstName().clear().type(userData.webTables.editedFirstName)
                    elementsPage.webTables.getSubmitButton().click()
                })
                it('should display the edit registration form', ()=> {
                    elementsPage.webTables.getRowData().contains(userData.webTables.email).parent().find('[class=rt-td]:first-child').should('have.text', userData.webTables.editedFirstName)
                })
            })

            // Buttons
            context('View Buttons page', ()=>{
                specify('when buttons is clicked', ()=>{     
                    elementsPage.getElementsCategory().contains('Buttons').click()
                })
                it('should display the button page', ()=>{
                    elementsPage.buttons.getTextHeader().should('be.visible').and('have.text', 'Buttons')
                })

                specify('when button selection is clicked', ()=>{
                    elementsPage.buttons.getDoubleClickButton().dblclick()
                    elementsPage.buttons.getClickMeButton().eq(0).rightclick()
                    elementsPage.buttons.getClickMeButton().eq(1).click()
                })
                it('should display the action validation message', ()=>{
                    elementsPage.buttons.getDoubleButtonMessage().should('be.visible')
                    elementsPage.buttons.getRightButtonMessage().should('be.visible')
                    elementsPage.buttons.getDynamicButtonMessage().should('be.visible')
                
                })
            }) 
        })
    })
})