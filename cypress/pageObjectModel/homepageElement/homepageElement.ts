import { getElements } from "../demoMethod";

const rootElement = ('#app')
const homepageObjects = {
    getHeaderLogo: () => getElements(`${rootElement} img[src*=Toolsqa]`)
}

export default homepageObjects