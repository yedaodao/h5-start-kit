var createPageClass = require('../core/createPageClass');

module.exports = createPageClass({
    init: function () {
        console.log('init');
    },
    render: function () {
        console.log('render');
    },
    inactive: function () {
        console.log('inactive');
    },
    destroy: function () {
        console.log('destroy');
    }
});
