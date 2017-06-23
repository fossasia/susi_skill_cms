import React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';
import assign from 'object-assign';
var notificationInstance = {};
var defaultDuration = 4.5;
var defaultTop = 24;
var defaultBottom = 24;
var defaultPlacement = 'topRight';
var defaultGetContainer = void 0;
function getPlacementStyle(placement) {
    var style = void 0;
    switch (placement) {
        case 'topLeft':
            style = {
                left: 0,
                top: defaultTop,
                bottom: 'auto'
            };
            break;
        case 'bottomLeft':
            style = {
                left: 0,
                top: 'auto',
                bottom: defaultBottom
            };
            break;
        case 'bottomRight':
            style = {
                right: 0,
                top: 'auto',
                bottom: defaultBottom
            };
            break;
        default:
            style = {
                right: 0,
                top: defaultTop,
                bottom: 'auto'
            };
    }
    return style;
}
function getNotificationInstance(prefixCls) {
    if (notificationInstance[defaultPlacement]) {
        return notificationInstance[defaultPlacement];
    }
    notificationInstance[defaultPlacement] = Notification.newInstance({
        prefixCls: prefixCls,
        className: prefixCls + '-' + defaultPlacement,
        style: getPlacementStyle(defaultPlacement),
        getContainer: defaultGetContainer
    });
    return notificationInstance[defaultPlacement];
}
function notice(args) {
    var outerPrefixCls = args.prefixCls || 'ant-notification';
    var prefixCls = outerPrefixCls + '-notice';
    if (args.placement !== undefined) {
        defaultPlacement = args.placement;
    }
    var duration = void 0;
    if (args.duration === undefined) {
        duration = defaultDuration;
    } else {
        duration = args.duration;
    }
    var iconType = '';
    switch (args.type) {
        case 'success':
            iconType = 'check-circle-o';
            break;
        case 'info':
            iconType = 'info-circle-o';
            break;
        case 'error':
            iconType = 'cross-circle-o';
            break;
        case 'warning':
            iconType = 'exclamation-circle-o';
            break;
        default:
            iconType = 'info-circle';
    }
    var iconNode = void 0;
    if (args.icon) {
        iconNode = React.createElement(
            'span',
            { className: prefixCls + '-icon' },
            args.icon
        );
    } else if (args.type) {
        iconNode = React.createElement(Icon, { className: prefixCls + '-icon ' + prefixCls + '-icon-' + args.type, type: iconType });
    }
    var autoMarginTag = !args.description && iconNode ? React.createElement('span', { className: prefixCls + '-message-single-line-auto-margin' }) : null;
    var style = args.style,
        className = args.className;

    getNotificationInstance(outerPrefixCls).notice({
        content: React.createElement(
            'div',
            { className: iconNode ? prefixCls + '-with-icon' : '' },
            iconNode,
            React.createElement(
                'div',
                { className: prefixCls + '-message' },
                autoMarginTag,
                args.message
            ),
            React.createElement(
                'div',
                { className: prefixCls + '-description' },
                args.description
            ),
            args.btn ? React.createElement(
                'span',
                { className: prefixCls + '-btn' },
                args.btn
            ) : null
        ),
        duration: duration,
        closable: true,
        onClose: args.onClose,
        key: args.key,
        style: assign({}, style),
        className: className
    });
}
var api = {
    open: function open(args) {
        notice(args);
    },
    close: function close(key) {
        if (notificationInstance[defaultPlacement]) {
            notificationInstance[defaultPlacement].removeNotice(key);
        }
    },
    config: function config(options) {
        var duration = options.duration,
            placement = options.placement,
            bottom = options.bottom,
            top = options.top,
            getContainer = options.getContainer;

        if (placement !== undefined) {
            defaultPlacement = placement;
        }
        if (bottom !== undefined) {
            defaultBottom = bottom;
        }
        if (top !== undefined) {
            defaultTop = top;
        }
        if (getContainer !== undefined) {
            defaultGetContainer = getContainer;
        }
        // delete notificationInstance
        if (placement !== undefined || bottom !== undefined || top !== undefined) {
            var notify = notificationInstance[defaultPlacement];
            if (notify) {
                notify.destroy();
            }
            delete notificationInstance[defaultPlacement];
        }
        if (duration !== undefined) {
            defaultDuration = duration;
        }
    },
    destroy: function destroy() {
        Object.keys(notificationInstance).forEach(function (key) {
            notificationInstance[key].destroy();
            delete notificationInstance[key];
        });
    }
};
['success', 'info', 'warning', 'error'].forEach(function (type) {
    api[type] = function (args) {
        return api.open(assign({}, args, { type: type }));
    };
});
api.warn = api.warning;
export default api;