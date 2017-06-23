import Modal from './Modal';
import confirm from './confirm';
import assign from 'object-assign';
Modal.info = function (props) {
    var config = assign({}, {
        type: 'info',
        iconType: 'info-circle',
        okCancel: false
    }, props);
    return confirm(config);
};
Modal.success = function (props) {
    var config = assign({}, {
        type: 'success',
        iconType: 'check-circle',
        okCancel: false
    }, props);
    return confirm(config);
};
Modal.error = function (props) {
    var config = assign({}, {
        type: 'error',
        iconType: 'cross-circle',
        okCancel: false
    }, props);
    return confirm(config);
};
Modal.warning = Modal.warn = function (props) {
    var config = assign({}, {
        type: 'warning',
        iconType: 'exclamation-circle',
        okCancel: false
    }, props);
    return confirm(config);
};
Modal.confirm = function (props) {
    var config = assign({}, {
        type: 'confirm',
        okCancel: true
    }, props);
    return confirm(config);
};
export default Modal;