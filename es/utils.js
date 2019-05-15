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

export var requestAnimationFrame = raf;
export var cancelAnimationFrame = caf;
export function getOffset(node) {
  var box = node.getBoundingClientRect();
  var docElem = document.documentElement; // < ie8 不支持 win.pageXOffset, 则使用 docElem.scrollLeft

  return {
    left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
    top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
  };
}