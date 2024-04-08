import { getElement } from "../commonMethod"
const userForm = '#userForm'
const elementPage = {
    getElementNav: () => getElement('[class=left-pannel]'),
    getMenuListNav: () => getElement('[class=menu-list]').children(),
    
    textBox: {
        getHeaderText: () => getElement('h1[class=text-center]'),
        getNameField: ()=> getElement(`${userForm} #userName`),
        getEmailField: ()=> getElement(`${userForm} #userEmail`),
        getCurrentAddField: ()=> getElement(`${userForm} #currentAddress`),
        getPermanentAddField: ()=> getElement(`${userForm} #permanentAddress`),
        getSubmitButton: ()=> getElement(`${userForm} #submit`),

        getOutput: ()=> getElement('#output')
    }
}

export default elementPage