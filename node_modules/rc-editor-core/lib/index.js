'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _EditorCore = require('./EditorCore');

var _EditorCore2 = _interopRequireDefault(_EditorCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EditorCorePublic = {
    EditorCore: _EditorCore2["default"],
    GetText: _EditorCore2["default"].GetText,
    GetHTML: _EditorCore2["default"].GetHTML,
    toEditorState: _EditorCore2["default"].ToEditorState
};
exports["default"] = EditorCorePublic;
module.exports = exports['default'];