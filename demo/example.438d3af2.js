// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/add-dom-event-listener/lib/EventBaseObject.js":[function(require,module,exports) {
/**
 * @ignore
 * base event object for custom and dom event.
 * @author yiminghe@gmail.com
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function returnFalse() {
  return false;
}

function returnTrue() {
  return true;
}

function EventBaseObject() {
  this.timeStamp = Date.now();
  this.target = undefined;
  this.currentTarget = undefined;
}

EventBaseObject.prototype = {
  isEventObject: 1,

  constructor: EventBaseObject,

  isDefaultPrevented: returnFalse,

  isPropagationStopped: returnFalse,

  isImmediatePropagationStopped: returnFalse,

  preventDefault: function preventDefault() {
    this.isDefaultPrevented = returnTrue;
  },

  stopPropagation: function stopPropagation() {
    this.isPropagationStopped = returnTrue;
  },

  stopImmediatePropagation: function stopImmediatePropagation() {
    this.isImmediatePropagationStopped = returnTrue;
    // fixed 1.2
    // call stopPropagation implicitly
    this.stopPropagation();
  },

  halt: function halt(immediate) {
    if (immediate) {
      this.stopImmediatePropagation();
    } else {
      this.stopPropagation();
    }
    this.preventDefault();
  }
};

exports["default"] = EventBaseObject;
module.exports = exports["default"];
},{}],"../node_modules/object-assign/index.js":[function(require,module,exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};
},{}],"../node_modules/add-dom-event-listener/lib/EventObject.js":[function(require,module,exports) {
/**
 * @ignore
 * event object for dom
 * @author yiminghe@gmail.com
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _EventBaseObject = require('./EventBaseObject');

var _EventBaseObject2 = _interopRequireDefault(_EventBaseObject);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var TRUE = true;
var FALSE = false;
var commonProps = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'eventPhase', 'metaKey', 'shiftKey', 'target', 'timeStamp', 'view', 'type'];

function isNullOrUndefined(w) {
  return w === null || w === undefined;
}

var eventNormalizers = [{
  reg: /^key/,
  props: ['char', 'charCode', 'key', 'keyCode', 'which'],
  fix: function fix(event, nativeEvent) {
    if (isNullOrUndefined(event.which)) {
      event.which = !isNullOrUndefined(nativeEvent.charCode) ? nativeEvent.charCode : nativeEvent.keyCode;
    }

    // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
    if (event.metaKey === undefined) {
      event.metaKey = event.ctrlKey;
    }
  }
}, {
  reg: /^touch/,
  props: ['touches', 'changedTouches', 'targetTouches']
}, {
  reg: /^hashchange$/,
  props: ['newURL', 'oldURL']
}, {
  reg: /^gesturechange$/i,
  props: ['rotation', 'scale']
}, {
  reg: /^(mousewheel|DOMMouseScroll)$/,
  props: [],
  fix: function fix(event, nativeEvent) {
    var deltaX = undefined;
    var deltaY = undefined;
    var delta = undefined;
    var wheelDelta = nativeEvent.wheelDelta;
    var axis = nativeEvent.axis;
    var wheelDeltaY = nativeEvent.wheelDeltaY;
    var wheelDeltaX = nativeEvent.wheelDeltaX;
    var detail = nativeEvent.detail;

    // ie/webkit
    if (wheelDelta) {
      delta = wheelDelta / 120;
    }

    // gecko
    if (detail) {
      // press control e.detail == 1 else e.detail == 3
      delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
    }

    // Gecko
    if (axis !== undefined) {
      if (axis === event.HORIZONTAL_AXIS) {
        deltaY = 0;
        deltaX = 0 - delta;
      } else if (axis === event.VERTICAL_AXIS) {
        deltaX = 0;
        deltaY = delta;
      }
    }

    // Webkit
    if (wheelDeltaY !== undefined) {
      deltaY = wheelDeltaY / 120;
    }
    if (wheelDeltaX !== undefined) {
      deltaX = -1 * wheelDeltaX / 120;
    }

    // 默认 deltaY (ie)
    if (!deltaX && !deltaY) {
      deltaY = delta;
    }

    if (deltaX !== undefined) {
      /**
       * deltaX of mousewheel event
       * @property deltaX
       * @member Event.DomEvent.Object
       */
      event.deltaX = deltaX;
    }

    if (deltaY !== undefined) {
      /**
       * deltaY of mousewheel event
       * @property deltaY
       * @member Event.DomEvent.Object
       */
      event.deltaY = deltaY;
    }

    if (delta !== undefined) {
      /**
       * delta of mousewheel event
       * @property delta
       * @member Event.DomEvent.Object
       */
      event.delta = delta;
    }
  }
}, {
  reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
  props: ['buttons', 'clientX', 'clientY', 'button', 'offsetX', 'relatedTarget', 'which', 'fromElement', 'toElement', 'offsetY', 'pageX', 'pageY', 'screenX', 'screenY'],
  fix: function fix(event, nativeEvent) {
    var eventDoc = undefined;
    var doc = undefined;
    var body = undefined;
    var target = event.target;
    var button = nativeEvent.button;

    // Calculate pageX/Y if missing and clientX/Y available
    if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
      eventDoc = target.ownerDocument || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;
      event.pageX = nativeEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = nativeEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
    }

    // which for click: 1 === left; 2 === middle; 3 === right
    // do not use button
    if (!event.which && button !== undefined) {
      if (button & 1) {
        event.which = 1;
      } else if (button & 2) {
        event.which = 3;
      } else if (button & 4) {
        event.which = 2;
      } else {
        event.which = 0;
      }
    }

    // add relatedTarget, if necessary
    if (!event.relatedTarget && event.fromElement) {
      event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
    }

    return event;
  }
}];

function retTrue() {
  return TRUE;
}

function retFalse() {
  return FALSE;
}

function DomEventObject(nativeEvent) {
  var type = nativeEvent.type;

  var isNative = typeof nativeEvent.stopPropagation === 'function' || typeof nativeEvent.cancelBubble === 'boolean';

  _EventBaseObject2['default'].call(this);

  this.nativeEvent = nativeEvent;

  // in case dom event has been mark as default prevented by lower dom node
  var isDefaultPrevented = retFalse;
  if ('defaultPrevented' in nativeEvent) {
    isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
  } else if ('getPreventDefault' in nativeEvent) {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
    isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
  } else if ('returnValue' in nativeEvent) {
    isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
  }

  this.isDefaultPrevented = isDefaultPrevented;

  var fixFns = [];
  var fixFn = undefined;
  var l = undefined;
  var prop = undefined;
  var props = commonProps.concat();

  eventNormalizers.forEach(function (normalizer) {
    if (type.match(normalizer.reg)) {
      props = props.concat(normalizer.props);
      if (normalizer.fix) {
        fixFns.push(normalizer.fix);
      }
    }
  });

  l = props.length;

  // clone properties of the original event object
  while (l) {
    prop = props[--l];
    this[prop] = nativeEvent[prop];
  }

  // fix target property, if necessary
  if (!this.target && isNative) {
    this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
  }

  // check if target is a text node (safari)
  if (this.target && this.target.nodeType === 3) {
    this.target = this.target.parentNode;
  }

  l = fixFns.length;

  while (l) {
    fixFn = fixFns[--l];
    fixFn(this, nativeEvent);
  }

  this.timeStamp = nativeEvent.timeStamp || Date.now();
}

var EventBaseObjectProto = _EventBaseObject2['default'].prototype;

(0, _objectAssign2['default'])(DomEventObject.prototype, EventBaseObjectProto, {
  constructor: DomEventObject,

  preventDefault: function preventDefault() {
    var e = this.nativeEvent;

    // if preventDefault exists run it on the original event
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      // otherwise set the returnValue property of the original event to FALSE (IE)
      e.returnValue = FALSE;
    }

    EventBaseObjectProto.preventDefault.call(this);
  },

  stopPropagation: function stopPropagation() {
    var e = this.nativeEvent;

    // if stopPropagation exists run it on the original event
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      // otherwise set the cancelBubble property of the original event to TRUE (IE)
      e.cancelBubble = TRUE;
    }

    EventBaseObjectProto.stopPropagation.call(this);
  }
});

exports['default'] = DomEventObject;
module.exports = exports['default'];
},{"./EventBaseObject":"../node_modules/add-dom-event-listener/lib/EventBaseObject.js","object-assign":"../node_modules/object-assign/index.js"}],"../node_modules/add-dom-event-listener/lib/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = addEventListener;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _EventObject = require('./EventObject');

var _EventObject2 = _interopRequireDefault(_EventObject);

function addEventListener(target, eventType, callback, option) {
  function wrapCallback(e) {
    var ne = new _EventObject2['default'](e);
    callback.call(target, ne);
  }

  if (target.addEventListener) {
    var _ret = (function () {
      var useCapture = false;
      if (typeof option === 'object') {
        useCapture = option.capture || false;
      } else if (typeof option === 'boolean') {
        useCapture = option;
      }

      target.addEventListener(eventType, wrapCallback, option || false);

      return {
        v: {
          remove: function remove() {
            target.removeEventListener(eventType, wrapCallback, useCapture);
          }
        }
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  } else if (target.attachEvent) {
    target.attachEvent('on' + eventType, wrapCallback);
    return {
      remove: function remove() {
        target.detachEvent('on' + eventType, wrapCallback);
      }
    };
  }
}

module.exports = exports['default'];
},{"./EventObject":"../node_modules/add-dom-event-listener/lib/EventObject.js"}],"../node_modules/whatenvis/es/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function detect(userAgent) {
  return function (regexps) {
    return regexps.reduce(function (version, regexp) {
      if (version === false) {
        var matched = userAgent.match(regexp);
        return matched ? matched[1] || true : version;
      }

      return version;
    }, false);
  };
}

function hasOwnProperty(object, propertyName) {
  return Object.prototype.hasOwnProperty.call(object, propertyName);
} // 横屏


function landscape() {
  if (screen.orientation && hasOwnProperty(window, 'onorientationchange')) {
    return screen.orientation.type.includes('landscape');
  }

  return window.innerHeight < window.innerWidth;
} // 竖屏
// function portrait() {
//   return !landscape();
// }


function walkOnChangeOrientationList(changeOrientationList, newOrientation) {
  for (var i = 0, l = changeOrientationList.length; i < l; i++) {
    changeOrientationList[i](newOrientation);
  }
}

function handleOrientation(changeOrientationList, resetCache) {
  return function () {
    if (landscape()) {
      walkOnChangeOrientationList(changeOrientationList, 'landscape');
    } else {
      walkOnChangeOrientationList(changeOrientationList, 'portrait');
    }

    resetCache();
  };
}
/**
 * 四个层面 系统环境/浏览器环境/移动设备/软件环境
 * 系统：ios/android/macos/windows
 * 设备：phone/tablet/kindle/pc
 * 浏览器：主流浏览器 ie/chrome/firefox/opera/safari
 * 软件：wechat: ios/android
 *      alipay: ios/android
 */


var _default = function () {
  var previousWhatenvis = window.whatenvis;
  var match = detect(navigator.userAgent.toLowerCase());
  var is = {
    // 系统检测
    android: match([/android\s([\d.]+)/]),
    macos: match([/\(macintosh;\sintel\smac\sos\sx\s([\d_]+)/]),
    windows: match([/windows\snt\s([\d.]+)/]),
    ios: match([/\(i[^;]+;( U;)? CPU.+Mac OS X/]),
    // 设备检测
    // phone
    ipad: match([/\(ipad.*os\s([\d_]+)/]),
    // ipod: match([/\(ipod.*os\s([\d_]+)/]),
    iphone: match([/iphone\sos\s([\d_]+)/]),
    windowsPhone: match([/windows\sphone\s([\d.]+)/]),
    // mobile 两边有空格
    // 推测安卓平板一般有 mobile 的代表可以插 sim 卡,所以这样判断不准确
    androidPhone: match([/android\s([\d.]+).*\smobile\s.*/]),
    // pad
    kindle: match([/kindle\/([\d.]+)/]),
    // 浏览器检测及版本
    ie: match([
    /* ie < 11 */
    /msie ([\d.]+)/,
    /* ie11 */
    /rv:([\d.]+)\) like gecko/]),
    edge: match([/edge\/([\d.]+)/]),
    firefox: match([/firefox\/([\d.]+)/]),
    opera: match([/(?:opera|opr).([\d.]+)/]),
    chrome: match([/chrome\/([\d.]+)/, /crios\/([\d.]+)/]),
    chromeMobile: match([/crios\/([\d.]+)/]),
    safari: match([/version\/([\d.]+).*safari/]),
    // 软件环境
    wechat: match([/micromessenger\/([\d.]+)/]),
    alipay: match([/alipayclient\/([\d.]+)/])
  }; // 小米浏览器兼容
  // "Mozilla/5.0 (Linux; U; Android 9; zh-cn; MIX 2S Build/PKQ1.180729.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.128 Mobile Safari/537.36 XiaoMi/MiuiBrowser/10.2.2"

  var adm = match([/android\s.*;\s([^;]*)\sbuild\/.*/]);
  var admTablet = adm && adm.match(/\spad\s/); // const xiaomiPhone = xiaomi && !xiaomiTablet;
  // 由于国产安卓阵营的信息比较乱,需要修正

  is.androidPhone = is.androidPhone && !admTablet; // chrome

  is.chrome = !is.edge && is.chrome; // 系统
  // is.ios = is.ipad || is.iphone; // || is.ipod;

  is.safari = !!(is.ios || is.macos || is.windows) && is.safari; // pad

  is.androidTablet = !is.androidPhone && !!is.android;
  is.windowsTablet = match([/touch/]) && !is.windowsPhone && is.windows; // 平台

  is.phone = !!(is.iphone || is.androidPhone || is.windowsPhone);
  is.tablet = !!(is.ipad || is.androidTablet || is.windowsTablet || match([/tablet/])); // 浏览器

  is.safariMobile = (is.ipad || is.iphone) && is.safari; // 软件环境

  is.iosWechat = is.ios && is.wechat;
  is.androidWechat = is.android && is.wechat;
  is.iosAlipay = is.ios && is.alipay;
  is.androidAlipay = is.android && is.alipay; // pc

  is.pc = !is.phone && !is.tablet && !is.kindle; // 移动端

  if (is.tablet || is.phone) {
    is.landscape = landscape();
    is.portrait = !is.landscape;
    var changeOrientationList = [];

    is.onChangeOrientation = function (cb) {
      if (typeof cb === 'function') {
        changeOrientationList.push(cb);
      }
    };

    var orientationEvent = 'resize';

    if (hasOwnProperty(window, 'onorientationchange')) {
      orientationEvent = 'orientationchange';
    } // Listen for changes in orientation.


    if (window.addEventListener) {
      window.addEventListener(orientationEvent, handleOrientation(changeOrientationList, function () {
        is.landscape = landscape();
        is.portrait = !is.landscape;
      }), false);
    }
  }

  is.noConflict = function () {
    window.whatenvis = previousWhatenvis;
    return is;
  };

  window.whatenvis = is;
  return is;
}();

exports.default = _default;
},{}],"../src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffset = getOffset;
exports.cancelAnimationFrame = exports.requestAnimationFrame = void 0;
var lastTime = 0;
var vendors = ["ms", "moz", "webkit", "o"];
var raf = window.requestAnimationFrame;
var caf = window.cancelAnimationFrame;

for (var x = 0; x < vendors.length && !raf; ++x) {
  raf = window[vendors[x] + "RequestAnimationFrame"];
  caf = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
}

if (!raf) {
  raf = function raf(callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!caf) {
  caf = function caf(id) {
    clearTimeout(id);
  };
}

var requestAnimationFrame = raf;
exports.requestAnimationFrame = requestAnimationFrame;
var cancelAnimationFrame = caf;
exports.cancelAnimationFrame = cancelAnimationFrame;

function getOffset(node) {
  var box = node.getBoundingClientRect();
  var docElem = document.documentElement; // < ie8 不支持 win.pageXOffset, 则使用 docElem.scrollLeft

  return {
    left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
    top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
  };
}
},{}],"../src/options.js":[function(require,module,exports) {
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
},{}],"../src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addDomEventListener = _interopRequireDefault(require("add-dom-event-listener"));

var _whatenvis = _interopRequireDefault(require("whatenvis"));

var _utils = require("./utils");

var _options = _interopRequireDefault(require("./options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

  this._drawLine(context, touchPoint ? [].concat(_toConsumableArray(hitPoints), [touchPoint]) : hitPoints, stateColors[state]);

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
},{"add-dom-event-listener":"../node_modules/add-dom-event-listener/lib/index.js","whatenvis":"../node_modules/whatenvis/es/index.js","./utils":"../src/utils.js","./options":"../src/options.js"}],"example.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("../src/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var g = new _index.default(document.getElementById("app"), {
  onStateChange: function onStateChange(v) {
    console.log("onStateChange", v);
  },
  onChange: function onChange(v) {
    console.log("onChange", v);
  },
  onEnd: function onEnd(v) {
    setTimeout(function () {
      return g.changeState('success');
    }, 1000);
    setTimeout(function () {
      return g.reset();
    }, 2000);
  }
});
},{"../src/index":"../src/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65183" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","example.js"], null)
//# sourceMappingURL=/example.438d3af2.js.map