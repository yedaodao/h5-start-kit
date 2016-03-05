var lib = require('../../../lib');

var $ = lib.$;

function keyMirror(obj) {
    var ret = {},
        key = null;
    if ($.isPlainObject(obj)) {
        for (key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            ret[key] = key;
        }
    }
    return ret;
}

module.exports = keyMirror;
