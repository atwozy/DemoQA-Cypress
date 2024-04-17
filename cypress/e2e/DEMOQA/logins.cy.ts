
import { forEach } from "cypress/types/lodash"
import { userData } from "../../fixtures/fixture"
import formsPageObject from "../../pageObjectModel/formsPage/formsPage"
import homepageObjects from "../../pageObjectModel/homepageElement/homepageElement"
import { data } from "cypress/types/jquery"
import elementsPage from "../../pageObjectModel/elementsPage/elementsPage"
import homePageObjects from "../../pageObjectModel/homePage/homePage"

describe('Tests All Elements', () => {
    let fetchRequest: string
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
            context.skip('View Text Box page', () => {
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
            context.skip('View Check Box page', () => {
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
            context.skip('View Radio Button page', () => {
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
            context.skip('View Web tables page', () => {
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

                specify('when I search added data by email', () => {
                    elementsPage.webTables.getSearchBar().type(userData.webTables.email)
                })
                it('should display table row/s with searched email', () => {
                    elementsPage.webTables.getRowData().should('contain.text', userData.webTables.email)
                })

                specify('when I edit the first name data', () => {
                    elementsPage.webTables.getRowData().contains(userData.webTables.email).parent().find('[class=action-buttons] [class=mr-2]').click()
                    elementsPage.webTables.getFirstName().clear().type(userData.webTables.editedFirstName)
                    elementsPage.webTables.getSubmitButton().click()
                })
                it('should display the edit registration form', () => {
                    elementsPage.webTables.getRowData().contains(userData.webTables.email).parent().find('[class=rt-td]:first-child').should('have.text', userData.webTables.editedFirstName)
                })
            })

            // Buttons
            context.skip('View Buttons page', () => {
                specify('when buttons is clicked', () => {
                    elementsPage.getElementsCategory().contains('Buttons').click()
                })
                it('should display the button page', () => {
                    cy.url().should('include', 'buttons')
                    elementsPage.buttons.getTextHeader().should('be.visible').and('have.text', 'Buttons')
                })

                specify('when button selection is clicked', () => {
                    elementsPage.buttons.getDoubleClickButton().dblclick()
                    elementsPage.buttons.getClickMeButton().eq(0).rightclick()
                    elementsPage.buttons.getClickMeButton().eq(1).click()
                })
                it('should display the action validation message', () => {
                    elementsPage.buttons.getDoubleButtonMessage().should('be.visible')
                    elementsPage.buttons.getRightButtonMessage().should('be.visible')
                    elementsPage.buttons.getDynamicButtonMessage().should('be.visible')
                })
            })

            // Links
            context('View Links page', () => {
                specify.skip('when links category is clicked', () => {
                    elementsPage.getElementsCategory().contains('Links').click()
                })
                it.skip('should display links page', () => {
                    cy.url().should('include', 'links')
                    elementsPage.links.getTextHeader().should('be.visible').and('have.text', 'Links')
                })

                specify.skip('when home hyperlink is clicked', () => {
                    elementsPage.links.homeLink().invoke('removeAttr', 'target')
                    elementsPage.links.homeLink().click()
                })
                it.skip('should display the home page', () => {
                    cy.url().should('include', 'demoqa')
                    elementsPage.links.getHomeHeaderLogo().should('be.visible')
                })

                specify.skip('when homeg8By3 hyperlink is clicked', () => {
                    elementsPage.getElements().contains('Elements').click()
                    elementsPage.getElementsCategory().contains('Links').click()
                    elementsPage.links.homeG8By3cLink().invoke('removeAttr', 'target')
                    elementsPage.links.homeG8By3cLink().click()
                })
                it.skip('should display the home page', () => {
                    cy.url().should('include', 'demoqa')
                    elementsPage.links.getHomeHeaderLogo().should('be.visible')
                })


                specify('when api links are clicked', () => {
                    elementsPage.getElementsCategory().contains('Links').click()
                    elementsPage.links.getCreated().click()
                    elementsPage.links.getNoContent().click()
                    elementsPage.links.getMoved().click()
                    elementsPage.links.getBadRequest().click()
                })
                it('should send an api call', () => {
                    cy.get('a').each(page => {
                        const pages = page.text()
                        if (pages == 'Created') {
                            cy.request('GET', '/created').then(response => {
                                expect(response.status).to.equal(201)
                            })
                        }
                        else if (pages == 'No Content') {
                            cy.request({method: 'GET', url: 'no-content'}).then(response => {
                                expect(response.status).to.equal(204)
                            })
                        }

                        else if (pages == 'Moved') {
                            cy.request({method: 'GET', url: '/moved'}).then(response => {
                                expect(response.status).to.equal(301)
                            })
                        }

                        else if (pages == 'Bad Request') {
                            cy.request({method: 'GET', url: '/bad-request', failOnStatusCode: false}).then(response => {
                                expect(response.status).to.equal(400)
                            })
                        }

                    })
                })
            })

            // Broken Links - Images
            context.skip('View Broken Links - Images', () => {
                specify('when broken links page is clicked', () => {
                    // elementsPage.getElements().contains('Elements').click()
                    elementsPage.getElementsCategory().contains('Broken Links - Images').click()
                })
                it('should display broken links - images page', () => {
                    cy.url().should('include', 'broken')
                    elementsPage.brokenlinks.getTextHeader().should('be.visible').and('have.text', 'Broken Links - Images')
                })
                it('and should load the images', () => {
                    elementsPage.brokenlinks.getImage().each($img => {
                        cy.wrap($img).then(img => {
                            if ($img.prop('naturalWidth') !== 0) {
                                cy.wrap(img).should('have.prop', 'naturalWidth').and('be.gte', 1)
                            }
                            else {
                                cy.wrap($img).should('have.prop', 'naturalWidth').and('eq', 0)
                                cy.log('Broken Image')
                            }
                        })
                    })
                })
            })

            // Upload and Download
            context.skip('View Upload and Download', () => {
                specify('when upload and dowload is clicked', () => {
                    elementsPage.getElementsCategory().contains('Upload and Download').click()
                })
                it('should display the upload and dowload page', () => {
                    cy.url().should('include', 'upload')
                    elementsPage.uploads.getTextHeader().should('be.visible')
                })

                specify('when dowload button is clicked', () => {
                    elementsPage.uploads.getDownload().click()
                })
                it('should download the file', () => {
                    const downloadPath = 'C:/Users/ITA-40136/Downloads'
                    elementsPage.uploads.getDownload().invoke('attr', 'download').then((el) => {
                        cy.readFile(`${downloadPath}/${el}`).then(() => {
                            expect(true).to.be.true
                        })
                    })
                })

                specify('when user choose a file to upload', () => {
                    elementsPage.uploads.getChooseFile().click()
                })
                it('should upload the selected file', () => {
                    elementsPage.uploads.getChooseFile().then(($input) => {
                        // .should('be.visible').and('be.enabled')
                        cy.fixture('sampleFile.jpeg').then((fileContent) => {
                            const input = $input[0] as HTMLInputElement
                            const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg');
                            const file = new File([blob], userData.upload.imageName, { type: 'image/jpeg' });
                            const dataTransfer = new DataTransfer();
                            dataTransfer.items.add(file);
                            input.files = dataTransfer.files
                            cy.wrap($input).trigger('change', { force: true });
                        })
                    })

                    elementsPage.uploads.uploadFilePath().then(($el) => {
                        const text = $el.text()
                        expect(text).to.contains(userData.upload.imageName)
                    })
                })
            })

            // 

        })
    })
})

function prop(arg0: string): string {
    throw new Error("Function not implemented.")
}

