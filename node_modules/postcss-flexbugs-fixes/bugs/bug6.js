var postcss = require('postcss');

module.exports = function(decl) {
    if (decl.prop === 'flex') {
        var values = postcss.list.space(decl.value);
        var flexGrow = values[0];
        var flexShrink = values[1] || '1';
        var flexBasis = values[2] || '0%';
        decl.value = flexGrow + ' ' + flexShrink + ' ' + flexBasis;
    }
};
