"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = guid;
var seed = 0;
function guid() {
  return Date.now() + "_" + seed++;
}
module.exports = exports['default'];