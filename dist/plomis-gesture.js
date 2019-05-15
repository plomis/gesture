/*!
 * plomis-gesture v1.0.3
 * (c) 2019-2019 Plomis
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global['plomis-gesture'] = factory());
}(this, function () { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var SPECIES = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find = _arrayMethods(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	_export(_export.P + _export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	var _arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = _toObject(this);
	  var length = _toLength(O.length);
	  var aLen = arguments.length;
	  var index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
	  var end = aLen > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : _toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


	_export(_export.P, 'Array', { fill: _arrayFill });

	_addToUnscopables('fill');

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var INCLUDES = 'includes';

	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var EventBaseObject_1 = createCommonjsModule(function (module, exports) {

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
	});

	unwrapExports(EventBaseObject_1);

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
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
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty$1.call(from, key)) {
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

	var EventObject = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



	var _EventBaseObject2 = _interopRequireDefault(EventBaseObject_1);



	var _objectAssign2 = _interopRequireDefault(objectAssign);

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
	});

	unwrapExports(EventObject);

	var lib = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = addEventListener;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



	var _EventObject2 = _interopRequireDefault(EventObject);

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
	});

	var addEventListener = unwrapExports(lib);

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

	function hasOwnProperty$2(object, propertyName) {
	  return Object.prototype.hasOwnProperty.call(object, propertyName);
	}

	// 横屏
	function landscape() {
	  if (screen.orientation && hasOwnProperty$2(window, 'onorientationchange')) {
	    return screen.orientation.type.includes('landscape');
	  }
	  return window.innerHeight < window.innerWidth;
	}

	// 竖屏
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

	var env = (function () {
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
	    ie: match([/* ie < 11 *//msie ([\d.]+)/, /* ie11 *//rv:([\d.]+)\) like gecko/]),
	    edge: match([/edge\/([\d.]+)/]),
	    firefox: match([/firefox\/([\d.]+)/]),
	    opera: match([/(?:opera|opr).([\d.]+)/]),
	    chrome: match([/chrome\/([\d.]+)/, /crios\/([\d.]+)/]),
	    chromeMobile: match([/crios\/([\d.]+)/]),
	    safari: match([/version\/([\d.]+).*safari/]),

	    // 软件环境
	    wechat: match([/micromessenger\/([\d.]+)/]),
	    alipay: match([/alipayclient\/([\d.]+)/])
	  };

	  // 小米浏览器兼容
	  // "Mozilla/5.0 (Linux; U; Android 9; zh-cn; MIX 2S Build/PKQ1.180729.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.128 Mobile Safari/537.36 XiaoMi/MiuiBrowser/10.2.2"
	  var adm = match([/android\s.*;\s([^;]*)\sbuild\/.*/]);
	  var admTablet = adm && adm.match(/\spad\s/);
	  // const xiaomiPhone = xiaomi && !xiaomiTablet;

	  // 由于国产安卓阵营的信息比较乱,需要修正
	  is.androidPhone = is.androidPhone && !admTablet;

	  // chrome
	  is.chrome = !is.edge && is.chrome;

	  // 系统
	  // is.ios = is.ipad || is.iphone; // || is.ipod;
	  is.safari = !!(is.ios || is.macos || is.windows) && is.safari;

	  // pad
	  is.androidTablet = !is.androidPhone && !!is.android;
	  is.windowsTablet = match([/touch/]) && !is.windowsPhone && is.windows;

	  // 平台
	  is.phone = !!(is.iphone || is.androidPhone || is.windowsPhone);
	  is.tablet = !!(is.ipad || is.androidTablet || is.windowsTablet || match([/tablet/]));

	  // 浏览器
	  is.safariMobile = (is.ipad || is.iphone) && is.safari;

	  // 软件环境
	  is.iosWechat = is.ios && is.wechat;
	  is.androidWechat = is.android && is.wechat;
	  is.iosAlipay = is.ios && is.alipay;
	  is.androidAlipay = is.android && is.alipay;

	  // pc
	  is.pc = !is.phone && !is.tablet && !is.kindle;

	  // 移动端
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
	    if (hasOwnProperty$2(window, 'onorientationchange')) {
	      orientationEvent = 'orientationchange';
	    }

	    // Listen for changes in orientation.
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
	})();

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
	function getOffset(node) {
	  var box = node.getBoundingClientRect();
	  var docElem = document.documentElement; // < ie8 不支持 win.pageXOffset, 则使用 docElem.scrollLeft

	  return {
	    left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
	    top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
	  };
	}

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

	  this.options = Object.assign({}, DEFAULT_OPTIONS, options); // 初始化按键大小

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

	  if (env.pc) {
	    this.mouseDownEvent = addEventListener(this.canvas, "mousedown", function (downEvent) {
	      _this2._handleTouchStart(Object.assign(downEvent, {
	        touches: [{
	          clientX: downEvent.pageX,
	          clientY: downEvent.pageY
	        }]
	      }));

	      _this2.mouseMoveEvent = addEventListener(document, "mousemove", function (moveEvent) {
	        _this2._handleTouchMove(Object.assign(moveEvent, {
	          touches: [{
	            clientX: moveEvent.pageX,
	            clientY: moveEvent.pageY
	          }]
	        }));
	      });
	      _this2.mouseUpEvent = addEventListener(document, "mouseup", function (upEvent) {
	        _this2._handleTouchCancel(upEvent);

	        _this2.mouseUpEvent.remove();

	        _this2.mouseMoveEvent.remove();
	      });
	    });
	  } else {
	    this.touchCancel = addEventListener(this.canvas, "touchcanel", function (event) {
	      return _this2._handleTouchCancel(event);
	    });
	    this.touchEnd = addEventListener(this.canvas, "touchend", function (event) {
	      return _this2._handleTouchCancel(event);
	    });
	    this.touchMove = addEventListener(this.canvas, "touchmove", function (event) {
	      return _this2._handleTouchMove(event);
	    });
	    this.touchStart = addEventListener(this.canvas, "touchstart", function (event) {
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

	  requestAnimationFrame(function () {
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
	    this.hitPointId = requestAnimationFrame(function () {
	      _this4.hitPointId = null;
	      var devicePixelRatio = _this4.devicePixelRatio,
	          state = _this4.state;

	      if (state === "selected") {
	        var _getOffset = getOffset(_this4.canvas),
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

	return Gesture;

}));
