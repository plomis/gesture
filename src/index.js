import addEventListener from "add-dom-event-listener";
import env from "whatenvis";
import {
  requestAnimationFrame,
  cancelAnimationFrame,
  getOffset
} from "./utils";
import DEFAULT_OPTIONS from "./options";

function Gesture(el, options) {
  this.wrapper = typeof el === "string" ? document.querySelector(el) : el;
  if (!this.wrapper) {
    console.warn("Can not resolve the wrapper DOM.");
  }
  this._init(options);
}

Gesture.prototype._init = function(options) {
  this.mouseDownEvent = null;
  this.mouseMoveEvent = null;
  this.mouseUpEvent = null;

  this.touchCancel = null;
  this.touchEnd = null;
  this.touchMove = null;
  this.touchStart = null;

  // 宫格状态
  this.state = "normal";
  // dpr
  this.devicePixelRatio = window.devicePixelRatio || 1;
  this.hitPointId = null;
  // 所有点信息
  // 每个点中记录一下当前状态信息和动画目标状态信息,动画进程,开始/停止状态
  // ease函数,周期记录到公共集合
  this.totalPoints = [];
  // 选中的点
  this.hitPoints = [];
  // 触摸点
  this.touchPoint = null;
  // options
  this.options = Object.assign({}, DEFAULT_OPTIONS, options);

  // 初始化按键大小
  if (this.options.circleRadius === 0) {
    // 按键整列大小
    const { arraySize, sideLength } = this.options;
    // 13等分 三个圆圈3等分加上4个间距 n * 3 + 4
    // 其实间距的个数等于圆圈个数加1  n + 1, 再加上圆圈就等于 n * 3 + n + 1
    const circleRadius =
      (sideLength * this.devicePixelRatio) / (1 + 4 * arraySize);
    this.options.circleRadius = circleRadius;
    this.options.pointRadius = circleRadius / 3;
  }

  this._initCanvas();
  this._initKey();
  this._draw();
  this._initMouseEvent();
};

Gesture.prototype._initCanvas = function() {
  const canvas = document.createElement("canvas");
  const { sideLength } = this.options;
  canvas.width = this.devicePixelRatio * sideLength;
  canvas.height = this.devicePixelRatio * sideLength;
  canvas.style.width = sideLength + "px";
  canvas.style.height = sideLength + "px";
  canvas.style.backgroundColor = "transparent";
  // canvas
  this.canvas = canvas;
  // canvas 上下文
  this.context = canvas.getContext("2d");
  this.wrapper.appendChild(canvas);
};

Gesture.prototype._initKey = function() {
  let count = 0;
  const n = this.options.arraySize;
  const r = this.options.circleRadius;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      count++;
      const obj = {
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

Gesture.prototype._draw = function() {
  this._clearCanvas();
  const { stateColors } = this.options;
  const { context, state, totalPoints, touchPoint, hitPoints } = this;
  this._drawLine(
    context,
    touchPoint ? [...hitPoints, touchPoint] : hitPoints,
    stateColors[state]
  );
  totalPoints.forEach(point => {
    const isHited = hitPoints.includes(point);
    this._drawKey(
      context,
      point.x,
      point.y,
      isHited,
      isHited ? stateColors[state] : stateColors.normal
    );
  });
};

Gesture.prototype._drawLine = function(ctx, points, color) {
  if (points.length > 1) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => ctx.lineTo(point.x, point.y));
    ctx.stroke();
  }
};

Gesture.prototype._drawKey = function(ctx, x, y, havePoint, color) {
  const { circleRadius, pointRadius, lineWidth } = this.options;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  // 画外圈
  ctx.beginPath();
  ctx.arc(x, y, circleRadius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();
  // 画原点
  if (havePoint) {
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(x, y, pointRadius, 0, Math.PI * 2, true);
    ctx.fill();
  }
};

Gesture.prototype._clearCanvas = function() {
  this.context.clearRect(
    0,
    0,
    this.context.canvas.width,
    this.context.canvas.height
  );
};

Gesture.prototype._initMouseEvent = function() {
  if (env.pc) {
    this.mouseDownEvent = addEventListener(
      this.canvas,
      "mousedown",
      downEvent => {
        this._handleTouchStart(
          Object.assign(downEvent, {
            touches: [{ clientX: downEvent.pageX, clientY: downEvent.pageY }]
          })
        );
        this.mouseMoveEvent = addEventListener(
          document,
          "mousemove",
          moveEvent => {
            this._handleTouchMove(
              Object.assign(moveEvent, {
                touches: [
                  { clientX: moveEvent.pageX, clientY: moveEvent.pageY }
                ]
              })
            );
          }
        );
        this.mouseUpEvent = addEventListener(document, "mouseup", upEvent => {
          this._handleTouchCancel(upEvent);
          this.mouseUpEvent.remove();
          this.mouseMoveEvent.remove();
        });
      }
    );
  } else {
    this.touchCancel = addEventListener(
      this.canvas,
      "touchcanel",
      (event) => this._handleTouchCancel(event)
    );
    this.touchEnd = addEventListener(
      this.canvas,
      "touchend",
      (event) => this._handleTouchCancel(event)
    );
    this.touchMove = addEventListener(
      this.canvas,
      "touchmove",
      (event) => this._handleTouchMove(event)
    );
    this.touchStart = addEventListener(
      this.canvas,
      "touchstart",
      (event) => this._handleTouchStart(event)
    );
  }
};

Gesture.prototype._handleTouchStart = function(event) {
  event.stopPropagation();
  event.preventDefault();
  // normal => selected, ( success | error ) !=> selected
  if (this.state === "normal") {
    this.state = "selected";
  }
  if (this.state === "normal") {
    this.options.onStateChange("selected");
  }
  this._handleHitPoint(event);
};

Gesture.prototype._handleTouchMove = function(event) {
  event.stopPropagation();
  event.preventDefault();
  this._handleHitPoint(event);
};

Gesture.prototype._handleTouchCancel = function(event) {
  event.stopPropagation();
  event.preventDefault();
  // 只是一个推荐值, 外部可以设置为 success error normal 之一
  if (this.state === "selected") {
    if (!this.state) {
      this.state = "normal";
    }
    this.options.onStateChange("normal");
    this._handleHitOver();
  }
};

Gesture.prototype._handleHitOver = function() {
  requestAnimationFrame(() => {
    const { hitPoints } = this;
    this.options.onEnd(hitPoints.map(({ index }) => index));
    this.touchPoint = null;
    this._draw();
  });
};

Gesture.prototype._handleHitPoint = function(event) {
  const { touches } = event;
  if (this.hitPointId === null) {
    this.hitPointId = requestAnimationFrame(() => {
      this.hitPointId = null;
      const { devicePixelRatio, state } = this;
      if (state === "selected") {
        const { left, top } = getOffset(this.canvas);
        if (touches.length > 0) {
          const touch = touches[0];
          this.touchPoint = {
            x: (touch.clientX - left) * devicePixelRatio,
            y: (touch.clientY - top) * devicePixelRatio
          };
          this._updateKeyboard();
        }
      }
    });
  }
};

Gesture.prototype._updateKeyboard = function() {
  this._updateKey();
  this._updateLine();
};

Gesture.prototype._updateKey = function() {
  const { hitPoints, touchPoint, circleRadius } = this;
  const hitPoint = this._findHitPoint(touchPoint);
  if (hitPoint && !hitPoints.includes(hitPoint)) {
    if (hitPoints.length > 0) {
      const lastPoint = hitPoints[hitPoints.length - 1];
      const nearPoints = this._findNearPoints(lastPoint);
      const crossoverPoints = this._findCrossover(
        touchPoint,
        lastPoint,
        nearPoints,
        circleRadius
      );
      if (crossoverPoints && !hitPoints.includes(crossoverPoints)) {
        crossoverPoints.forEach(this._addHitPoint);
      }
    }
    this._addHitPoint(hitPoint);
    this._draw();
  }
};

Gesture.prototype._updateLine = function() {
  this._draw();
};

Gesture.prototype._addHitPoint = function(point) {
  const { hitPoints } = this;
  hitPoints.push(point);
  this.options.onChange(hitPoints.map(({ index }) => index));
};

Gesture.prototype._findHitPoint = function(touchPoint) {
  const { circleRadius } = this.options;
  return this.totalPoints.find(point => {
    return (
      (point.x - touchPoint.x) ** 2 + (point.y - touchPoint.y) ** 2 <=
      circleRadius ** 2
    );
  });
};

Gesture.prototype._findNearPoints = function(lastPoint) {
  const { totalPoints, hitPoints } = this;
  return totalPoints.filter(point => {
    return (
      !hitPoints.includes(point) &&
      Math.abs(point.row - lastPoint.row) <= 1 &&
      Math.abs(point.col - lastPoint.col) <= 1
    );
  });
};

// 找出与线相交的最近的点
Gesture.prototype._findCrossover = function(
  touchPoint,
  lastPoint,
  nearCenters,
  radius
) {
  if (nearCenters.length > 0) {
    // 找出与手指最近的相邻点
    const nearestCenter = nearCenters.reduce((nearestCenter, circleCenter) => {
      const centerLast =
        (touchPoint.x - circleCenter.x) ** 2 +
        (touchPoint.y - circleCenter.y) ** 2;
      if (nearestCenter) {
        return centerLast < nearestCenter.distance
          ? {
              circleCenter,
              distance: centerLast
            }
          : nearestCenter;
      }
      return {
        circleCenter,
        distance: centerLast
      };
    }, null);

    const { circleCenter } = nearestCenter;
    const s1 =
      (lastPoint.x - circleCenter.x) ** 2 + (lastPoint.y - circleCenter.y) ** 2;
    const s2 =
      (lastPoint.x - touchPoint.x) ** 2 + (lastPoint.y - touchPoint.y) ** 2;
    const s3 =
      (circleCenter.x - touchPoint.x) ** 2 +
      (circleCenter.y - touchPoint.y) ** 2;

    // 计算切线的长度平方
    const tangent = s1 - radius ** 2;
    // 长度超过切线并且方向在圆心那边
    if (s2 > tangent && s2 > s3) {
      // 计算线点相交
      // 余弦定理求出余弦转换成正弦然后求得圆心点到线的距离的平方和半径平方对比大小
      // 大则是没有相交,小则是已经相交
      const h2 =
        (1 - ((s1 + s3 - s2) / (2 * Math.sqrt(s1) * Math.sqrt(s3))) ** 2) * s1;
      return h2 <= radius ** 2 ? [circleCenter] : [];
    }
  }
  return [];
};

Gesture.prototype.changeState = function(v) {
  this.state = v;
  this._draw();
};

Gesture.prototype.reset = function() {
  this.hitPoints = [];
  this._draw();
};

Gesture.version = "1.0.0";
export default Gesture;
