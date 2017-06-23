"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getOffset;
function getOffset(element, container) {
  var rect = element.getBoundingClientRect();
  if (rect.width || rect.height) {
    var elementContainer = container || element.parentElement;
    return {
      top: rect.top - elementContainer.clientTop,
      left: rect.left - elementContainer.clientLeft
    };
  }
  return rect;
}
module.exports = exports['default'];