import { getElements } from "../demoMethod";

const root = ('[class=category-cards]')
const userForm = ('#userForm')

const formsPageObject = {
    getElements: () => getElements(`${root}`).children(),
    getPracticeForm: () => getElements('ul[class=menu-list]').children(),
    
    practiceForm:
    {
        getTextHeader: () => getElements('h1[class=text-center]')
    }
}

export default formsPageObject