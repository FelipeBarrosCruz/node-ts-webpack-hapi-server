'use strict';
/**
 *  @File : AppLoader
 *  @Autor : FelipeBarros<felipe.barros.pt@gmail.com>
 *  @Description : Loader and Repository for set and get packages
 *  @Version : 1.0 [2016-09-17]
 *
*/
let AppLoder = (function() {

    let container = {};

    let Repository = function(splits, create, context) {
        let result = context || container;
        for(let i = 0, s; result && (s = splits[i]); i++) {
            result = (s in result ? result[s] : (create ? result[s] = {} : undefined));
        }
        return result;
    };

    return {
        set: function(name, value, context) {
            let splits = name.split('.'), s = splits.pop(), result = Repository(splits, true, context);
            return result && s ? (result[s] = value) : undefined;
        },
        get: function(name, create, context) {
            if (!name) {
                return false;
            }

            return Repository(name.split('.'), create, context);
        },
        require: function(name) {
            if (this.exists(name)) {
                return this.get(name);
            }

            let response = null;

            try {
                response = this.set(name, require(name));
            } catch(err) {
                console.error('Package  [%s] required doest exist', name);
            }

            return response;
        },
        exists: function(name, context) {
            return this.get(name, false, context) !== undefined;
        }
    };

})();

module.exports = AppLoder;