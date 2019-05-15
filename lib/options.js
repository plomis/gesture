"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var DEFAULT_OPTIONS = {
  // 3 x 3 宫格
  arraySize: 3,
  // 画布宽高
  sideLength: 300,
  onStateChange: function onStateChange() {},
  onChange: function onChange() {},
  onEnd: function onEnd() {},
  // 外圈半径
  circleRadius: 0,
  // 中心点半径
  pointRadius: 0,
  // 线的粗细
  lineWidth: 3,
  // 状态对应颜色
  stateColors: {
    normal: "#afafaf",
    selected: "#ffffff",
    checking: "#ffffff",
    success: "#2CFF26",
    error: "#de462d"
  }
};
var _default = DEFAULT_OPTIONS;
exports.default = _default;
module.exports = exports.default;