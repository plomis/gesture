parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"M4O7":[function(require,module,exports) {
"use strict";function t(){return!1}function e(){return!0}function o(){this.timeStamp=Date.now(),this.target=void 0,this.currentTarget=void 0}Object.defineProperty(exports,"__esModule",{value:!0}),o.prototype={isEventObject:1,constructor:o,isDefaultPrevented:t,isPropagationStopped:t,isImmediatePropagationStopped:t,preventDefault:function(){this.isDefaultPrevented=e},stopPropagation:function(){this.isPropagationStopped=e},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=e,this.stopPropagation()},halt:function(t){t?this.stopImmediatePropagation():this.stopPropagation(),this.preventDefault()}},exports.default=o,module.exports=exports.default;
},{}],"J4Nk":[function(require,module,exports) {
"use strict";var r=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,e=Object.prototype.propertyIsEnumerable;function n(r){if(null==r)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(r)}function o(){try{if(!Object.assign)return!1;var r=new String("abc");if(r[5]="de","5"===Object.getOwnPropertyNames(r)[0])return!1;for(var t={},e=0;e<10;e++)t["_"+String.fromCharCode(e)]=e;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(r){return t[r]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(r){n[r]=r}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(o){return!1}}module.exports=o()?Object.assign:function(o,c){for(var a,i,s=n(o),f=1;f<arguments.length;f++){for(var u in a=Object(arguments[f]))t.call(a,u)&&(s[u]=a[u]);if(r){i=r(a);for(var b=0;b<i.length;b++)e.call(a,i[b])&&(s[i[b]]=a[i[b]])}}return s};
},{}],"/z8I":[function(require,module,exports) {
"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./EventBaseObject"),o=e(t),r=require("object-assign"),n=e(r),a=!0,i=!1,l=["altKey","bubbles","cancelable","ctrlKey","currentTarget","eventPhase","metaKey","shiftKey","target","timeStamp","view","type"];function c(e){return null==e}var u=[{reg:/^key/,props:["char","charCode","key","keyCode","which"],fix:function(e,t){c(e.which)&&(e.which=c(t.charCode)?t.keyCode:t.charCode),void 0===e.metaKey&&(e.metaKey=e.ctrlKey)}},{reg:/^touch/,props:["touches","changedTouches","targetTouches"]},{reg:/^hashchange$/,props:["newURL","oldURL"]},{reg:/^gesturechange$/i,props:["rotation","scale"]},{reg:/^(mousewheel|DOMMouseScroll)$/,props:[],fix:function(e,t){var o=void 0,r=void 0,n=void 0,a=t.wheelDelta,i=t.axis,l=t.wheelDeltaY,c=t.wheelDeltaX,u=t.detail;a&&(n=a/120),u&&(n=0-(u%3==0?u/3:u)),void 0!==i&&(i===e.HORIZONTAL_AXIS?(r=0,o=0-n):i===e.VERTICAL_AXIS&&(o=0,r=n)),void 0!==l&&(r=l/120),void 0!==c&&(o=-1*c/120),o||r||(r=n),void 0!==o&&(e.deltaX=o),void 0!==r&&(e.deltaY=r),void 0!==n&&(e.delta=n)}},{reg:/^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,props:["buttons","clientX","clientY","button","offsetX","relatedTarget","which","fromElement","toElement","offsetY","pageX","pageY","screenX","screenY"],fix:function(e,t){var o=void 0,r=void 0,n=void 0,a=e.target,i=t.button;return a&&c(e.pageX)&&!c(t.clientX)&&(r=(o=a.ownerDocument||document).documentElement,n=o.body,e.pageX=t.clientX+(r&&r.scrollLeft||n&&n.scrollLeft||0)-(r&&r.clientLeft||n&&n.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||n&&n.scrollTop||0)-(r&&r.clientTop||n&&n.clientTop||0)),e.which||void 0===i||(e.which=1&i?1:2&i?3:4&i?2:0),!e.relatedTarget&&e.fromElement&&(e.relatedTarget=e.fromElement===a?e.toElement:e.fromElement),e}}];function s(){return a}function p(){return i}function h(e){var t=e.type,r="function"==typeof e.stopPropagation||"boolean"==typeof e.cancelBubble;o.default.call(this),this.nativeEvent=e;var n=p;"defaultPrevented"in e?n=e.defaultPrevented?s:p:"getPreventDefault"in e?n=e.getPreventDefault()?s:p:"returnValue"in e&&(n=e.returnValue===i?s:p),this.isDefaultPrevented=n;var a=[],c=void 0,h=void 0,d=l.concat();for(u.forEach(function(e){t.match(e.reg)&&(d=d.concat(e.props),e.fix&&a.push(e.fix))}),c=d.length;c;)this[h=d[--c]]=e[h];for(!this.target&&r&&(this.target=e.srcElement||document),this.target&&3===this.target.nodeType&&(this.target=this.target.parentNode),c=a.length;c;)(0,a[--c])(this,e);this.timeStamp=e.timeStamp||Date.now()}var d=o.default.prototype;(0,n.default)(h.prototype,d,{constructor:h,preventDefault:function(){var e=this.nativeEvent;e.preventDefault?e.preventDefault():e.returnValue=i,d.preventDefault.call(this)},stopPropagation:function(){var e=this.nativeEvent;e.stopPropagation?e.stopPropagation():e.cancelBubble=a,d.stopPropagation.call(this)}}),exports.default=h,module.exports=exports.default;
},{"./EventBaseObject":"M4O7","object-assign":"J4Nk"}],"Q38I":[function(require,module,exports) {
"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=r;var t=require("./EventObject"),n=e(t);function r(e,t,r,o){function a(t){var o=new n.default(t);r.call(e,o)}if(e.addEventListener){var u=(v=!1,"object"==typeof o?v=o.capture||!1:"boolean"==typeof o&&(v=o),e.addEventListener(t,a,o||!1),{v:{remove:function(){e.removeEventListener(t,a,v)}}});if("object"==typeof u)return u.v}else if(e.attachEvent)return e.attachEvent("on"+t,a),{remove:function(){e.detachEvent("on"+t,a)}};var v}module.exports=exports.default;
},{"./EventObject":"/z8I"}],"WDc8":[function(require,module,exports) {
"use strict";function n(n){return function(e){return e.reduce(function(e,o){if(!1===e){var i=n.match(o);return i?i[1]||!0:e}return e},!1)}}function e(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function o(){return screen.orientation&&e(window,"onorientationchange")?screen.orientation.type.includes("landscape"):window.innerHeight<window.innerWidth}function i(n,e){for(var o=0,i=n.length;o<i;o++)n[o](e)}function a(n,e){return function(){o()?i(n,"landscape"):i(n,"portrait"),e()}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var d=function(){var i=window.whatenvis,d=n(navigator.userAgent.toLowerCase()),r={android:d([/android\s([\d.]+)/]),macos:d([/\(macintosh;\sintel\smac\sos\sx\s([\d_]+)/]),windows:d([/windows\snt\s([\d.]+)/]),ios:d([/\(i[^;]+;( U;)? CPU.+Mac OS X/]),ipad:d([/\(ipad.*os\s([\d_]+)/]),iphone:d([/iphone\sos\s([\d_]+)/]),windowsPhone:d([/windows\sphone\s([\d.]+)/]),androidPhone:d([/android\s([\d.]+).*\smobile\s.*/]),kindle:d([/kindle\/([\d.]+)/]),ie:d([/msie ([\d.]+)/,/rv:([\d.]+)\) like gecko/]),edge:d([/edge\/([\d.]+)/]),firefox:d([/firefox\/([\d.]+)/]),opera:d([/(?:opera|opr).([\d.]+)/]),chrome:d([/chrome\/([\d.]+)/,/crios\/([\d.]+)/]),chromeMobile:d([/crios\/([\d.]+)/]),safari:d([/version\/([\d.]+).*safari/]),wechat:d([/micromessenger\/([\d.]+)/]),alipay:d([/alipayclient\/([\d.]+)/])},t=d([/android\s.*;\s([^;]*)\sbuild\/.*/]),s=t&&t.match(/\spad\s/);if(r.androidPhone=r.androidPhone&&!s,r.chrome=!r.edge&&r.chrome,r.safari=!!(r.ios||r.macos||r.windows)&&r.safari,r.androidTablet=!r.androidPhone&&!!r.android,r.windowsTablet=d([/touch/])&&!r.windowsPhone&&r.windows,r.phone=!!(r.iphone||r.androidPhone||r.windowsPhone),r.tablet=!!(r.ipad||r.androidTablet||r.windowsTablet||d([/tablet/])),r.safariMobile=(r.ipad||r.iphone)&&r.safari,r.iosWechat=r.ios&&r.wechat,r.androidWechat=r.android&&r.wechat,r.iosAlipay=r.ios&&r.alipay,r.androidAlipay=r.android&&r.alipay,r.pc=!r.phone&&!r.tablet&&!r.kindle,r.tablet||r.phone){r.landscape=o(),r.portrait=!r.landscape;var c=[];r.onChangeOrientation=function(n){"function"==typeof n&&c.push(n)};var w="resize";e(window,"onorientationchange")&&(w="orientationchange"),window.addEventListener&&window.addEventListener(w,a(c,function(){r.landscape=o(),r.portrait=!r.landscape}),!1)}return r.noConflict=function(){return window.whatenvis=i,r},window.whatenvis=r,r}();exports.default=d;
},{}],"FO+Z":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getOffset=m,exports.cancelAnimationFrame=exports.requestAnimationFrame=void 0;for(var e=0,t=["ms","moz","webkit","o"],n=window.requestAnimationFrame,o=window.cancelAnimationFrame,i=0;i<t.length&&!n;++i)n=window[t[i]+"RequestAnimationFrame"],o=window[t[i]+"CancelAnimationFrame"]||window[t[i]+"CancelRequestAnimationFrame"];n||(n=function(t){var n=(new Date).getTime(),o=Math.max(0,16-(n-e)),i=window.setTimeout(function(){t(n+o)},o);return e=n+o,i}),o||(o=function(e){clearTimeout(e)});var a=n;exports.requestAnimationFrame=a;var r=o;function m(e){var t=e.getBoundingClientRect(),n=document.documentElement;return{left:t.left+(window.pageXOffset||n.scrollLeft)-(n.clientLeft||document.body.clientLeft||0),top:t.top+(window.pageYOffset||n.scrollTop)-(n.clientTop||document.body.clientTop||0)}}exports.cancelAnimationFrame=r;
},{}],"omYY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e={arraySize:3,sideLength:300,onStateChange:function(){},onChange:function(){},onEnd:function(){},circleRadius:0,pointRadius:0,lineWidth:3,stateColors:{normal:"#afafaf",selected:"#ffffff",checking:"#ffffff",success:"#2CFF26",error:"#de462d"}},f=e;exports.default=f;
},{}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=o(require("add-dom-event-listener")),e=o(require("whatenvis")),i=require("./utils"),n=o(require("./options"));function o(t){return t&&t.__esModule?t:{default:t}}function a(t){return h(t)||r(t)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function r(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function h(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}function c(t,e){this.wrapper="string"==typeof t?document.querySelector(t):t,this.wrapper||console.warn("Can not resolve the wrapper DOM."),this._init(e)}c.prototype._init=function(t){if(this.mouseDownEvent=null,this.mouseMoveEvent=null,this.mouseUpEvent=null,this.touchCancel=null,this.touchEnd=null,this.touchMove=null,this.touchStart=null,this.state="normal",this.devicePixelRatio=window.devicePixelRatio||1,this.hitPointId=null,this.totalPoints=[],this.hitPoints=[],this.touchPoint=null,this.options=Object.assign({},n.default,t),0===this.options.circleRadius){var e=this.options,i=e.arraySize,o=e.sideLength*this.devicePixelRatio/(1+4*i);this.options.circleRadius=o,this.options.pointRadius=o/3}this._initCanvas(),this._initKey(),this._draw(),this._initMouseEvent()},c.prototype._initCanvas=function(){var t=document.createElement("canvas"),e=this.options.sideLength;t.width=this.devicePixelRatio*e,t.height=this.devicePixelRatio*e,t.style.width=e+"px",t.style.height=e+"px",t.style.backgroundColor="transparent",this.canvas=t,this.context=t.getContext("2d"),this.wrapper.appendChild(t)},c.prototype._initKey=function(){for(var t=0,e=this.options.arraySize,i=this.options.circleRadius,n=0;n<e;n++)for(var o=0;o<e;o++){var a={x:4*o*i+2.5*i,y:4*n*i+2.5*i,index:++t,row:n+1,col:o+1};this.totalPoints.push(a)}},c.prototype._draw=function(){var t=this;this._clearCanvas();var e=this.options.stateColors,i=this.context,n=this.state,o=this.totalPoints,s=this.touchPoint,r=this.hitPoints;this._drawLine(i,s?[].concat(a(r),[s]):r,e[n]),o.forEach(function(o){var a=r.includes(o);t._drawKey(i,o.x,o.y,a,a?e[n]:e.normal)})},c.prototype._drawLine=function(t,e,i){e.length>1&&(t.strokeStyle=i,t.lineWidth=5,t.beginPath(),t.moveTo(e[0].x,e[0].y),e.forEach(function(e){return t.lineTo(e.x,e.y)}),t.stroke())},c.prototype._drawKey=function(t,e,i,n,o){var a=this.options,s=a.circleRadius,r=a.pointRadius,h=a.lineWidth;t.fillStyle=o,t.strokeStyle=o,t.lineWidth=h,t.beginPath(),t.arc(e,i,s,0,2*Math.PI,!0),t.closePath(),t.stroke(),n&&(t.lineWidth=0,t.beginPath(),t.arc(e,i,r,0,2*Math.PI,!0),t.fill())},c.prototype._clearCanvas=function(){this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height)},c.prototype._initMouseEvent=function(){var i=this;e.default.pc?this.mouseDownEvent=(0,t.default)(this.canvas,"mousedown",function(e){i._handleTouchStart(Object.assign(e,{touches:[{clientX:e.pageX,clientY:e.pageY}]})),i.mouseMoveEvent=(0,t.default)(document,"mousemove",function(t){i._handleTouchMove(Object.assign(t,{touches:[{clientX:t.pageX,clientY:t.pageY}]}))}),i.mouseUpEvent=(0,t.default)(document,"mouseup",function(t){i._handleTouchCancel(t),i.mouseUpEvent.remove(),i.mouseMoveEvent.remove()})}):(this.touchCancel=(0,t.default)(this.canvas,"touchcanel",function(t){return i._handleTouchCancel(t)}),this.touchEnd=(0,t.default)(this.canvas,"touchend",function(t){return i._handleTouchCancel(t)}),this.touchMove=(0,t.default)(this.canvas,"touchmove",function(t){return i._handleTouchMove(t)}),this.touchStart=(0,t.default)(this.canvas,"touchstart",function(t){return i._handleTouchStart(t)}))},c.prototype._handleTouchStart=function(t){t.stopPropagation(),t.preventDefault(),"normal"===this.state&&(this.state="selected"),"normal"===this.state&&this.options.onStateChange("selected"),this._handleHitPoint(t)},c.prototype._handleTouchMove=function(t){t.stopPropagation(),t.preventDefault(),this._handleHitPoint(t)},c.prototype._handleTouchCancel=function(t){t.stopPropagation(),t.preventDefault(),"selected"===this.state&&(this.state||(this.state="normal"),this.options.onStateChange("normal"),this._handleHitOver())},c.prototype._handleHitOver=function(){var t=this;(0,i.requestAnimationFrame)(function(){var e=t.hitPoints;t.options.onEnd(e.map(function(t){return t.index})),t.touchPoint=null,t._draw()})},c.prototype._handleHitPoint=function(t){var e=this,n=t.touches;null===this.hitPointId&&(this.hitPointId=(0,i.requestAnimationFrame)(function(){e.hitPointId=null;var t=e.devicePixelRatio;if("selected"===e.state){var o=(0,i.getOffset)(e.canvas),a=o.left,s=o.top;if(n.length>0){var r=n[0];e.touchPoint={x:(r.clientX-a)*t,y:(r.clientY-s)*t},e._updateKeyboard()}}}))},c.prototype._updateKeyboard=function(){this._updateKey(),this._updateLine()},c.prototype._updateKey=function(){var t=this.hitPoints,e=this.touchPoint,i=this.circleRadius,n=this._findHitPoint(e);if(n&&!t.includes(n)){if(t.length>0){var o=t[t.length-1],a=this._findNearPoints(o),s=this._findCrossover(e,o,a,i);s&&!t.includes(s)&&s.forEach(this._addHitPoint)}this._addHitPoint(n),this._draw()}},c.prototype._updateLine=function(){this._draw()},c.prototype._addHitPoint=function(t){var e=this.hitPoints;e.push(t),this.options.onChange(e.map(function(t){return t.index}))},c.prototype._findHitPoint=function(t){var e=this.options.circleRadius;return this.totalPoints.find(function(i){return Math.pow(i.x-t.x,2)+Math.pow(i.y-t.y,2)<=Math.pow(e,2)})},c.prototype._findNearPoints=function(t){var e=this.totalPoints,i=this.hitPoints;return e.filter(function(e){return!i.includes(e)&&Math.abs(e.row-t.row)<=1&&Math.abs(e.col-t.col)<=1})},c.prototype._findCrossover=function(t,e,i,n){if(i.length>0){var o=i.reduce(function(e,i){var n=Math.pow(t.x-i.x,2)+Math.pow(t.y-i.y,2);return e?n<e.distance?{circleCenter:i,distance:n}:e:{circleCenter:i,distance:n}},null).circleCenter,a=Math.pow(e.x-o.x,2)+Math.pow(e.y-o.y,2),s=Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2),r=Math.pow(o.x-t.x,2)+Math.pow(o.y-t.y,2);if(s>a-Math.pow(n,2)&&s>r)return(1-Math.pow((a+r-s)/(2*Math.sqrt(a)*Math.sqrt(r)),2))*a<=Math.pow(n,2)?[o]:[]}return[]},c.prototype.changeState=function(t){this.state=t,this._draw()},c.prototype.reset=function(){this.hitPoints=[],this.state="normal",this._draw()},c.version="1.0.0";var u=c;exports.default=u;
},{"add-dom-event-listener":"Q38I","whatenvis":"WDc8","./utils":"FO+Z","./options":"omYY"}],"Zdfz":[function(require,module,exports) {
"use strict";var e=n(require("./index"));function n(e){return e&&e.__esModule?e:{default:e}}var t=new e.default(document.getElementById("app"),{onStateChange:function(e){console.log("onStateChange",e)},onChange:function(e){console.log("onChange",e)},onEnd:function(e){setTimeout(function(){return t.changeState("success")},1e3),setTimeout(function(){return t.reset()},2e3)}});
},{"./index":"Focm"}]},{},["Zdfz"], null)
//# sourceMappingURL=/gesture/dist/example.70973f87.js.map