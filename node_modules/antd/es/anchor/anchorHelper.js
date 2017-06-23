import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
export { _scrollTo as scrollTo };
import getScroll from '../_util/getScroll';
import getRequestAnimationFrame from '../_util/getRequestAnimationFrame';
export var reqAnimFrame = getRequestAnimationFrame();
export var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
    var cc = c - b;
    t /= d / 2;
    if (t < 1) {
        return cc / 2 * t * t * t + b;
    }
    return cc / 2 * ((t -= 2) * t * t + 2) + b;
};
export function getDefaultTarget() {
    return typeof window !== 'undefined' ? window : null;
}
export function getOffsetTop(element) {
    if (!element) {
        return 0;
    }
    if (!element.getClientRects().length) {
        return 0;
    }
    var rect = element.getBoundingClientRect();
    if (rect.width || rect.height) {
        var doc = element.ownerDocument;
        var docElem = doc.documentElement;
        return rect.top - docElem.clientTop;
    }
    return rect.top;
}
function _scrollTo(href) {
    var offsetTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getDefaultTarget;
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var scrollTop = getScroll(target(), true);
    var targetElement = document.getElementById(href.substring(1));
    if (!targetElement) {
        return;
    }
    var eleOffsetTop = getOffsetTop(targetElement);
    var targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
    var startTime = Date.now();
    var frameFunc = function frameFunc() {
        var timestamp = Date.now();
        var time = timestamp - startTime;
        window.scrollTo(window.pageXOffset, easeInOutCubic(time, scrollTop, targetScrollTop, 450));
        if (time < 450) {
            reqAnimFrame(frameFunc);
        } else {
            callback();
        }
    };
    reqAnimFrame(frameFunc);
    history.pushState(null, '', href);
}

var AnchorHelper = function () {
    function AnchorHelper() {
        _classCallCheck(this, AnchorHelper);

        this.links = [];
        this.currentAnchor = null;
        this._activeAnchor = '';
    }

    _createClass(AnchorHelper, [{
        key: 'addLink',
        value: function addLink(link) {
            if (this.links.indexOf(link) === -1) {
                this.links.push(link);
            }
        }
    }, {
        key: 'getCurrentActiveAnchor',
        value: function getCurrentActiveAnchor() {
            return this.currentAnchor;
        }
    }, {
        key: 'setActiveAnchor',
        value: function setActiveAnchor(component) {
            this.currentAnchor = component;
        }
    }, {
        key: 'getCurrentAnchor',
        value: function getCurrentAnchor() {
            var offsetTop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var bounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

            var activeAnchor = '';
            if (typeof document === 'undefined') {
                return activeAnchor;
            }
            var linksPositions = this.links.map(function (section) {
                var target = document.getElementById(section.substring(1));
                if (target && getOffsetTop(target) < offsetTop + bounds) {
                    var top = getOffsetTop(target);
                    if (top <= offsetTop + bounds) {
                        return {
                            section: section,
                            top: top,
                            bottom: top + target.clientHeight
                        };
                    }
                }
                return null;
            }).filter(function (section) {
                return section !== null;
            });
            if (linksPositions.length) {
                var maxSection = linksPositions.reduce(function (prev, curr) {
                    return curr.top > prev.top ? curr : prev;
                });
                return maxSection.section;
            }
            return '';
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo(href, offsetTop) {
            var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getDefaultTarget;
            var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

            _scrollTo(href, offsetTop, target, callback);
        }
    }]);

    return AnchorHelper;
}();

export default AnchorHelper;