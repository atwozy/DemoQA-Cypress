import { get } from "cypress/types/lodash"
import { getElements } from "../demoMethod"
import { getSyntheticLeadingComments } from "typescript"

const elementsRoot = ('[class=category-cards]')
const userForm = ('#userForm')
const rootElement = ('#app')

const elementsPage = {
    getElements: () => getElements(`${elementsRoot}`).children(),
    getElementsCategory: () => getElements('ul[class=menu-list]').children(),

    textBox:
    {
        getTextHeader: () => getElements('h1[class=text-center]'),
        getFullName: () => getElements(`${userForm} #userName`),
        getEmail: () => getElements(`${userForm} #userEmail`),
        getCurrentAdd: () => getElements(`${userForm} #currentAddress`),
        getPermanentAdd: () => getElements(`${userForm} #permanentAddress`),
        getSubmitButton: () => getElements('#submit'),
        getOutput: () => getElements('#output')
    },
    
    textBoxOutput:
    {
        getNameOutput: () => getElements('#name'),
        getEmailOutput: () => getElements('#email'),
        getCurrentAddOutput: () => getElements('[class="mt-4 row"] #currentAddress'),
        getPermanentAddOutput: () => getElements('[class="mt-4 row"] #permanentAddress')
    },

    checkBox:
    {
        getTextHeader: () => getElements('h1[class=text-center]'),
        getExpandCollapseButton: () => getElements('[class=rct-options] button'),
        getCheckBoxLabel: () => getElements('[class=rct-title]'),
        getTextNotes: () => getElements('[class=text-success]')
    },

    radioButton:
    {
        getTextHeader: () => getElements('h1[class=text-center]'),
        getRadioButton: () => getElements('[class*=custom-control]').children(),
        getTextNotes: () => getElements('[class=text-success]')
    },

    webTables:
    {
        getTextHeader: () => getElements('h1[class=text-center]'),
        getRegistrationFormHeader: () => getElements('#registration-form-modal'),
        getAddButton: () => getElements('#addNewRecordButton'),
        getFirstName: () => getElements('#firstName'),
        getLastName: () => getElements('#lastName'),
        getEmail:() => getElements('#userEmail'),
        getAge:() => getElements('#age'),
        getSalary: ()=> getElements('#salary'),
        getDepartment: () => getElements('#department'),
        getSubmitButton: () => getElements('#submit'),
        getTable: () => getElements('[class=rt-table]'),
        getRowData: () => getElements('[class=rt-tr-group]'),
        getSearchBar: () => getElements('#searchBox'),
        getRow: () => getElements('[class=rt-tbody]').children(),
        getEditRegistrationForm: () => getElements('#registration-form-modal')
    },
    

    buttons:{
        getTextHeader: () => getElements('h1[class=text-center]'),
        getDoubleClickButton: () => getElements('#doubleClickBtn'),
        getClickMeButton: ()=> getElements('[class=mt-4] button'),
        getDoubleButtonMessage: ()=> getElements('#doubleClickMessage'),
        getRightButtonMessage: ()=> getElements('#rightClickMessage'),
        getDynamicButtonMessage: ()=> getElements('#dynamicClickMessage')
    },

    links:{
        getTextHeader: () => getElements('h1[class=text-center]'),
        homeLink: () => getElements('#simpleLink'),
        getHomeHeaderLogo: () => getElements(`${rootElement} img[src*=Toolsqa]`),
        homeG8By3cLink: () => getElements('#dynamicLink'),
        getCreated: () => getElements('#created'),
        getNoContent: () => getElements('#no-content'),
        getMoved: () => getElements('#moved'),
        getBadRequest: () => getElements('#bad-request'),
    },

    brokenlinks:{
        getTextHeader: () => getElements('h1[class=text-center]'),
        getImage: () => getElements('[src*=Toolsqa]')
    },

    uploads: {
        getTextHeader: () => getElements('h1[class=text-center]'),
        getDownload: ()=> getElements('#downloadButton'),
        getAttrDownload: ()=> getElements('a[download="sampleFile.jpeg"]'),
        getChooseFile: () => getElements('#uploadFile'),
        uploadFilePath: () => getElements('#uploadedFilePath')

    }



 
}

export default elementsPage