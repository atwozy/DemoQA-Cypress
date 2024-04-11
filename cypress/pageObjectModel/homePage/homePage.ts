import { getElement } from "../commonMethod"


const getRoot = '[id=app]'

const homePageObjects = {
    getHeaderLogo: () => getElement(`${getRoot} img[src*=Toolsqa]`),
    getBanner: () => getElement('[class=banner-image]'),
    getCategoryCards: () => getElement('[class=category-cards]').children()
}

export default homePageObjects 