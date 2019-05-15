"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("core-js/modules/es6.object.assign");

var _addDomEventListener = _interopRequireDefault(require("add-dom-event-listener"));

var _whatenvis = _interopRequireDefault(require("whatenvis"));

var _utils = require("./utils");

var _options = _interopRequireDefault(require("./options"));

function Gesture(el, options) {
  this.wrapper = typeof el === "string" ? document.querySelector(el) : el;

  if (!this.wrapper) {
    console.warn("Can not resolve the wrapper DOM.");
  }

  this._init(options);
}

Gesture.prototype._init = function (options) {
  this.mouseDownEvent = null;
  this.mouseMoveEvent = null;
  this.mouseUpEvent = null;
  this.touchCancel = null;
  this.touchEnd = null;
  this.touchMove = null;
  this.touchStart = null; // 宫格状态

  this.state = "normal"; // dpr

  this.devicePixelRatio = window.devicePixelRatio || 1;
  this.hitPointId = null; // 所有点信息
  // 每个点中记录一下当前状态信息和动画目标状态信息,动画进程,开始/停止状态
  // ease函数,周期记录到公共集合

  this.totalPoints = []; // 选中的点

  this.hitPoints = []; // 触摸点

  this.touchPoint = null; // options

  this.options = Object.assign({}, _options.default, options); // 初始化按键大小

  if (this.options.circleRadius === 0) {
    // 按键整列大小
    var _this$options = this.options,
        arraySize = _this$options.arraySize,
        sideLength = _this$options.sideLength; // 13等分 三个圆圈3等分加上4个间距 n * 3 + 4
    // 其实间距的个数等于圆圈个数加1  n + 1, 再加上圆圈就等于 n * 3 + n + 1

    var circleRadius = sideLength * this.devicePixelRatio / (1 + 4 * arraySize);
    this.options.circleRadius = circleRadius;
    this.options.pointRadius = circleRadius / 3;
  }

  this._initCanvas();

  this._initKey();

  this._draw();

  this._initMouseEvent();
};

Gesture.prototype._initCanvas = function () {
  var canvas = document.createElement("canvas");
  var sideLength = this.options.sideLength;
  canvas.width = this.devicePixelRatio * sideLength;
  canvas.height = this.devicePixelRatio * sideLength;
  canvas.style.width = sideLength + "px";
  canvas.style.height = sideLength + "px";
  canvas.style.backgroundColor = "transparent"; // canvas

  this.canvas = canvas; // canvas 上下文

  this.context = canvas.getContext("2d");
  this.wrapper.appendChild(canvas);
};

Gesture.prototype._initKey = function () {
  var count = 0;
  var n = this.options.arraySize;
  var r = this.options.circleRadius;

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      count++;
      var obj = {
        x: j * 4 * r + 2.5 * r,
        y: i * 4 * r + 2.5 * r,
        index: count,
        row: i + 1,
        col: j + 1
      };
      this.totalPoints.push(obj);
    }
  }
};

Gesture.prototype._draw = function () {
  var _this = this;

  this._clearCanvas();

  var stateColors = this.options.stateColors;
  var context = this.context,
      state = this.state,
      totalPoints = this.totalPoints,
      touchPoint = this.touchPoint,
      hitPoints = this.hitPoints;

  this._drawLine(context, touchPoint ? [].concat((0, _toConsumableArray2.default)(hitPoints), [touchPoint]) : hitPoints, stateColors[state]);

  totalPoints.forEach(function (point) {
    var isHited = hitPoints.includes(point);

    _this._drawKey(context, point.x, point.y, isHited, isHited ? stateColors[state] : stateColors.normal);
  });
};

Gesture.prototype._drawLine = function (ctx, points, color) {
  if (points.length > 1) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(function (point) {
      return ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  }
};

Gesture.prototype._drawKey = function (ctx, x, y, havePoint, color) {
  var _this$options2 = this.options,
      circleRadius = _this$options2.circleRadius,
      pointRadius = _this$options2.pointRadius,
      lineWidth = _this$options2.lineWidth;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth; // 画外圈

  ctx.beginPath();
  ctx.arc(x, y, circleRadius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke(); // 画原点

  if (havePoint) {
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(x, y, pointRadius, 0, Math.PI * 2, true);
    ctx.fill();
  }
};

Gesture.prototype._clearCanvas = function () {
  this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
};

Gesture.prototype._initMouseEvent = function () {
  var _this2 = this;

  if (_whatenvis.default.pc) {
    this.mouseDownEvent = (0, _addDomEventListener.default)(this.canvas, "mousedown", function (downEvent) {
      _this2._handleTouchStart(Object.assign(downEvent, {
        touches: [{
          clientX: downEvent.pageX,
          clientY: downEvent.pageY
        }]
      }));

      _this2.mouseMoveEvent = (0, _addDomEventListener.default)(document, "mousemove", function (moveEvent) {
        _this2._handleTouchMove(Object.assign(moveEvent, {
          touches: [{
            clientX: moveEvent.pageX,
            clientY: moveEvent.pageY
          }]
        }));
      });
      _this2.mouseUpEvent = (0, _addDomEventListener.default)(document, "mouseup", function (upEvent) {
        _this2._handleTouchCancel(upEvent);

        _this2.mouseUpEvent.remove();

        _this2.mouseMoveEvent.remove();
      });
    });
  } else {
    this.touchCancel = (0, _addDomEventListener.default)(this.canvas, "touchcanel", function (event) {
      return _this2._handleTouchCancel(event);
    });
    this.touchEnd = (0, _addDomEventListener.default)(this.canvas, "touchend", function (event) {
      return _this2._handleTouchCancel(event);
    });
    this.touchMove = (0, _addDomEventListener.default)(this.canvas, "touchmove", function (event) {
      return _this2._handleTouchMove(event);
    });
    this.touchStart = (0, _addDomEventListener.default)(this.canvas, "touchstart", function (event) {
      return _this2._handleTouchStart(event);
    });
  }
};

Gesture.prototype._handleTouchStart = function (event) {
  event.stopPropagation();
  event.preventDefault(); // normal => selected, ( success | error ) !=> selected

  if (this.state === "normal") {
    this.state = "selected";
  }

  if (this.state === "normal") {
    this.options.onStateChange("selected");
  }

  this._handleHitPoint(event);
};

Gesture.prototype._handleTouchMove = function (event) {
  event.stopPropagation();
  event.preventDefault();

  this._handleHitPoint(event);
};

Gesture.prototype._handleTouchCancel = function (event) {
  event.stopPropagation();
  event.preventDefault(); // 只是一个推荐值, 外部可以设置为 success error normal 之一

  if (this.state === "selected") {
    if (!this.state) {
      this.state = "normal";
    }

    this.options.onStateChange("normal");

    this._handleHitOver();
  }
};

Gesture.prototype._handleHitOver = function () {
  var _this3 = this;

  (0, _utils.requestAnimationFrame)(function () {
    var hitPoints = _this3.hitPoints;

    _this3.options.onEnd(hitPoints.map(function (_ref) {
      var index = _ref.index;
      return index;
    }));

    _this3.touchPoint = null;

    _this3._draw();
  });
};

Gesture.prototype._handleHitPoint = function (event) {
  var _this4 = this;

  var touches = event.touches;

  if (this.hitPointId === null) {
    this.hitPointId = (0, _utils.requestAnimationFrame)(function () {
      _this4.hitPointId = null;
      var devicePixelRatio = _this4.devicePixelRatio,
          state = _this4.state;

      if (state === "selected") {
        var _getOffset = (0, _utils.getOffset)(_this4.canvas),
            left = _getOffset.left,
            top = _getOffset.top;

        if (touches.length > 0) {
          var touch = touches[0];
          _this4.touchPoint = {
            x: (touch.clientX - left) * devicePixelRatio,
            y: (touch.clientY - top) * devicePixelRatio
          };

          _this4._updateKeyboard();
        }
      }
    });
  }
};

Gesture.prototype._updateKeyboard = function () {
  this._updateKey();

  this._updateLine();
};

Gesture.prototype._updateKey = function () {
  var hitPoints = this.hitPoints,
      touchPoint = this.touchPoint,
      circleRadius = this.circleRadius;

  var hitPoint = this._findHitPoint(touchPoint);

  if (hitPoint && !hitPoints.includes(hitPoint)) {
    if (hitPoints.length > 0) {
      var lastPoint = hitPoints[hitPoints.length - 1];

      var nearPoints = this._findNearPoints(lastPoint);

      var crossoverPoints = this._findCrossover(touchPoint, lastPoint, nearPoints, circleRadius);

      if (crossoverPoints && !hitPoints.includes(crossoverPoints)) {
        crossoverPoints.forEach(this._addHitPoint);
      }
    }

    this._addHitPoint(hitPoint);

    this._draw();
  }
};

Gesture.prototype._updateLine = function () {
  this._draw();
};

Gesture.prototype._addHitPoint = function (point) {
  var hitPoints = this.hitPoints;
  hitPoints.push(point);
  this.options.onChange(hitPoints.map(function (_ref2) {
    var index = _ref2.index;
    return index;
  }));
};

Gesture.prototype._findHitPoint = function (touchPoint) {
  var circleRadius = this.options.circleRadius;
  return this.totalPoints.find(function (point) {
    return Math.pow(point.x - touchPoint.x, 2) + Math.pow(point.y - touchPoint.y, 2) <= Math.pow(circleRadius, 2);
  });
};

Gesture.prototype._findNearPoints = function (lastPoint) {
  var totalPoints = this.totalPoints,
      hitPoints = this.hitPoints;
  return totalPoints.filter(function (point) {
    return !hitPoints.includes(point) && Math.abs(point.row - lastPoint.row) <= 1 && Math.abs(point.col - lastPoint.col) <= 1;
  });
}; // 找出与线相交的最近的点


Gesture.prototype._findCrossover = function (touchPoint, lastPoint, nearCenters, radius) {
  if (nearCenters.length > 0) {
    // 找出与手指最近的相邻点
    var nearestCenter = nearCenters.reduce(function (nearestCenter, circleCenter) {
      var centerLast = Math.pow(touchPoint.x - circleCenter.x, 2) + Math.pow(touchPoint.y - circleCenter.y, 2);

      if (nearestCenter) {
        return centerLast < nearestCenter.distance ? {
          circleCenter: circleCenter,
          distance: centerLast
        } : nearestCenter;
      }

      return {
        circleCenter: circleCenter,
        distance: centerLast
      };
    }, null);
    var circleCenter = nearestCenter.circleCenter;
    var s1 = Math.pow(lastPoint.x - circleCenter.x, 2) + Math.pow(lastPoint.y - circleCenter.y, 2);
    var s2 = Math.pow(lastPoint.x - touchPoint.x, 2) + Math.pow(lastPoint.y - touchPoint.y, 2);
    var s3 = Math.pow(circleCenter.x - touchPoint.x, 2) + Math.pow(circleCenter.y - touchPoint.y, 2); // 计算切线的长度平方

    var tangent = s1 - Math.pow(radius, 2); // 长度超过切线并且方向在圆心那边

    if (s2 > tangent && s2 > s3) {
      // 计算线点相交
      // 余弦定理求出余弦转换成正弦然后求得圆心点到线的距离的平方和半径平方对比大小
      // 大则是没有相交,小则是已经相交
      var h2 = (1 - Math.pow((s1 + s3 - s2) / (2 * Math.sqrt(s1) * Math.sqrt(s3)), 2)) * s1;
      return h2 <= Math.pow(radius, 2) ? [circleCenter] : [];
    }
  }

  return [];
};

Gesture.prototype.changeState = function (v) {
  this.state = v;

  this._draw();
};

Gesture.prototype.reset = function () {
  this.hitPoints = [];
  this.state = "normal";

  this._draw();
};

Gesture.version = "1.0.0";
var _default = Gesture;
exports.default = _default;
module.exports = exports.default;