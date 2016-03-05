var keyMirror = require('../utility/keyMirror');

var SpecKey = keyMirror({
    mixins: null
});

var SpecPolicy = keyMirror({
    DEFINE_OVERRIDE: null,
    DEFINE_ONLY: null
});

var PageInterface = {
    init: SpecPolicy.DEFINE_ONLY,
    render: SpecPolicy.DEFINE_OVERRIDE,
    inactive: SpecPolicy.DEFINE_OVERRIDE,
    destroy: SpecPolicy.DEFINE_ONLY
};


function createPageClass(spec) {
    var Constructor = function (el) {
        if (!el) {
            throw new Error('The first arg must be a html or $(html)');
        }
        this.container = el;
    };
    Constructor.prototype.constructor = Constructor;
    mergeSpecIntoPage(Constructor, spec);
    for (var methodName in PageInterface) {
        if (!Constructor.prototype.hasOwnProperty(methodName)) {
            Constructor.prototype[methodName] = function () {
            };
        }
    }
    return Constructor;
}

function mergeSpecIntoPage(Constructor, spec) {
    if (!spec) {
        return false;
    }
    var proto = Constructor.prototype,
        key = null;

    if (spec.hasOwnProperty(SpecKey.mixins)) {
        mixins(Constructor, spec[SpecKey.mixins]);
    }

    for (key in spec) {
        if (!spec.hasOwnProperty(key) || key == SpecKey.mixins) {
            continue;
        }
        var isAlreadyDefined = proto.hasOwnProperty(key);
        validateMethodOverride(isAlreadyDefined, key);
        var isPageMethod = PageInterface.hasOwnProperty(key),
            specKey = PageInterface[key];

        if (isAlreadyDefined && isPageMethod && specKey != SpecPolicy.DEFINE_OVERRIDE) {
            throw new Error("You can't override this method");
        }
        proto[key] = spec[key];
    }
}

function mixins(Constructor, mixins) {
    if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
            mergeSpecIntoPage(Constructor, mixins[i]);
        }
    }
}

function validateMethodOverride(isAlreadyDefined, methodName) {
    var specPolicy = PageInterface.hasOwnProperty(methodName) ? PageInterface[methodName] : null;
    if (isAlreadyDefined && specPolicy != SpecPolicy.DEFINE_OVERRIDE) {
        throw new Error("You can't override this method!");
    }
}


module.exports = createPageClass;
