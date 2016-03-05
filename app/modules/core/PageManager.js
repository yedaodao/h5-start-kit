var pageMap = require('../config/pageMap');

var CLASS_PAGE_ENTERING = 'page-entering',
    CLASS_PAGE_ACTIVE = 'page-active',
    CLASS_PAGE_LEAVING = 'page-leaving',
    CLASS_PAGE_INACTIVE = 'page-inactive',
    pageCollection = {},
    activeIndex = 0;

function renderPage(id, el) {
    var PageClass = pageMap[id],
        pageInst = null;
    if (!PageClass) {
        return false;
    }
    pageInst = getPage(id);
    if (pageInst) {
        pageInst.render();
        return pageInst;
    }
    pageInst = new PageClass(el);
    pageCollection[id] = pageInst;
    activeIndex++;
    pageInst.init();
    pageInst.render();
    return pageInst;
}

function inactivePage(id) {
    var pageInst = getPage(id);
    if (!pageInst) {
        return false;
    }
    pageInst.inactive();
}

function destroyPage(id) {
    var pageInst = getPage(id);
    if (!pageInst) {
        return false;
    }
    pageInst.destroy();
}

function getPage(id) {
    if (!pageCollection.hasOwnProperty(id)) {
        return null;
    }
    return pageCollection[id];
}


module.exports = {
    renderPage: renderPage,
    getPage: getPage,
    inactivePage: inactivePage,
    destroy: destroyPage
};
