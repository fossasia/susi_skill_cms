import assign from 'object-assign';
var defaultLocale = {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了'
};
var runtimeLocale = assign({}, defaultLocale);
export function changeConfirmLocale(newLocale) {
    if (newLocale) {
        runtimeLocale = assign({}, runtimeLocale, newLocale);
    } else {
        runtimeLocale = assign({}, defaultLocale);
    }
}
export function getConfirmLocale() {
    return runtimeLocale;
}