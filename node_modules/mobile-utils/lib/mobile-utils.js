(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("mobile-utils", [], factory);
	else if(typeof exports === 'object')
		exports["mobile-utils"] = factory();
	else
		root["mobile-utils"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _objectAssignPolyfill = __webpack_require__(1);
	
	var _objectAssignPolyfill2 = _interopRequireDefault(_objectAssignPolyfill);
	
	var _env = __webpack_require__(2);
	
	var _env2 = _interopRequireDefault(_env);
	
	var _lang = __webpack_require__(3);
	
	var lang = _interopRequireWildcard(_lang);
	
	var _dom = __webpack_require__(4);
	
	var dom = _interopRequireWildcard(_dom);
	
	var _event = __webpack_require__(6);
	
	var event = _interopRequireWildcard(_event);
	
	var _format = __webpack_require__(5);
	
	var format = _interopRequireWildcard(_format);
	
	var _time = __webpack_require__(7);
	
	var time = _interopRequireWildcard(_time);
	
	var _url = __webpack_require__(8);
	
	var url = _interopRequireWildcard(_url);
	
	var _utils = __webpack_require__(9);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * the entry point
	 * @namespace mUtils
	 * @type {Object}
	 */
	// eslint-disable-line no-unused-vars
	var mUtils = {
		env: _env2.default,
		lang: lang,
		dom: dom,
		event: event,
		format: format,
		time: time,
		url: url,
		utils: utils
	};
	exports.default = mUtils;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
	if (typeof Object.assign != 'function') {
	  Object.assign = function (target) {
	    'use strict';
	
	    if (target == null) {
	      throw new TypeError('Cannot convert undefined or null to object');
	    }
	
	    target = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	      var source = arguments[index];
	      if (source != null) {
	        for (var key in source) {
	          if (Object.prototype.hasOwnProperty.call(source, key)) {
	            target[key] = source[key];
	          }
	        }
	      }
	    }
	    return target;
	  };
	}
	var o = Object.assign;
	exports.default = o;
	module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var _default = {
	    ua: '',
	    version: null,
	    ios: false,
	    android: false,
	    windows: false,
	    blackberry: false,
	    weixin: false,
	    wVersion: null,
	    qq: false,
	    qVersion: null,
	    touchSupport: false,
	    hashSupport: false
	},
	    env;
	
	if (typeof window === 'undefined') {
	    env = _default;
	} else {
	    var _ua = navigator.userAgent,
	        _m = null,
	        _formatV = function _formatV(vstr, vdiv) {
	        var f = vstr.split(vdiv);
	        f = f.shift() + '.' + f.join('');
	        return f * 1;
	    },
	        _break = false;
	
	    env = Object.assign({}, _default, {
	        ua: _ua,
	        touchSupport: 'createTouch' in document,
	        hashSupport: !!('onhashchange' in window)
	    });
	
	    _m = _ua.match(/MicroMessenger\/([\.0-9]+)/);
	    if (_m != null) {
	        env.weixin = true;
	        env.wVersion = _formatV(_m[1], '.');
	    }
	
	    _m = _ua.match(/QQ\/([\d\.]+)$/);
	    if (_m != null) {
	        env.qq = true;
	        env.qVersion = _formatV(_m[1], '.');
	    }
	
	    _m = _ua.match(/i(Pod|Pad|Phone)\;?.*\sOS\s([\_0-9]+)/);
	    if (_m != null) {
	        env.ios = true;
	        env.version = _formatV(_m[2], '_');
	        _break = true;
	    }
	
	    if (!_break) {
	        _m = _ua.match(/Windows\sPhone\sOS\s([\.0-9]+)/);
	        if (_m != null) {
	            env.windows = true;
	            env.version = _formatV(_m[1], '.');
	            _break = true;
	        }
	    }
	
	    if (!_break) {
	        var bb = {
	            a: _ua.match(/\(BB1\d+\;\s.*\sVersion\/([\.0-9]+)\s/),
	            b: _ua.match(/\(BlackBerry\;\s.*\sVersion\/([\.0-9]+)\s/),
	            c: _ua.match(/^BlackBerry\d+\/([\.0-9]+)\s/),
	            d: _ua.match(/\(PlayBook\;\s.*\sVersion\/([\.0-9]+)\s/)
	        };
	        for (var k in bb) {
	            if (bb[k] != null) {
	                _m = bb[k];
	                env.blackberry = true;
	                env.version = _formatV(_m[1], '.');
	                _break = true;
	            }
	        }
	    }
	} //end of else
	
	/**
	 * 获取移动设备型号版本等环境信息
	 * @type {Object}
	 * @namespace env
	 * @memberOf mUtils
	 * @default {
	        ua,
	        version,
	        ios,
	        android,
	        windows,
	        blackberry,
	        weixin,
	        wVersion,
	        qq,
	        qVersion,
	        touchSupport,
	        hashSupport
	    }
	 */
	exports.default = env;
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * 获取基于模板的文本值
	 * @param  {String} tmpl - 文本模板，格式为 'hello{0},world{1}'
	 * @param  {...String} args - 用于替换的若干参数
	 * @return {String}
	 * @memberOf mUtils.lang
	 */
	var read_i18n = function read_i18n(tmpl) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}
	
		var rtn = tmpl.substr(0);
		if (args.length) {
			var flagArr = tmpl.match(/\{\d+\}/g); //{1},{0},{2}...
			if (flagArr) {
				//剔除数组重复项用
				var realNeedLeng = flagArr.filter(function (ele, idx) {
					return flagArr.indexOf(ele) == idx;
				}).length;
				if (args.length != realNeedLeng) {
					throw new Error("[i18n] Error: " + tmpl + " need " + realNeedLeng + " parameters, but " + args.length + " received");
				}
				for (var ii = 0; ii < realNeedLeng; ii++) {
					rtn = rtn.replace(new RegExp("\\{" + ii + "\\}", "g"), args[ii]);
				}
			}
		}
		return rtn;
	};
	
	exports.read_i18n = read_i18n;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.transformXY = exports.tag_range_from_HTML = exports.prepend_HTML = exports.append_HTML = exports.real_style = exports.remove_class = exports.add_class = exports.has_class = undefined;
	
	var _format = __webpack_require__(5);
	
	/**
	 * 判断元素是否有指定className
	 * @param  {Element} ele
	 * @param  {String} clsName
	 * @return {Boolean}
	 * @memberOf mUtils.dom
	 */
	var has_class = function has_class(ele, clsName) {
	    return new RegExp('(^|\\s)+(' + clsName + ')(\\s|$)+', 'g').test(ele.className);
	};
	
	var _ensure_domele = function _ensure_domele(ele) {
	    if (typeof ele === 'string') {
	        try {
	            return document.querySelector(ele);
	        } catch (ex) {}
	    }
	    return ele;
	};
	
	/**
	 * 删除className
	 * @param  {Element} ele
	 * @param  {String} clsName
	 * @return {void}
	 * @memberOf mUtils.dom
	 */
	var remove_class = function remove_class(ele, clsName) {
	    var _ele = _ensure_domele(ele);
	    var re = new RegExp('(^|\\s)+(' + clsName + ')(\\s|$)+', 'g');
	    try {
	        _ele.className = _ele.className.replace(re, "$1$3");
	    } catch (ex) {}
	    re = null;
	};
	
	/**
	 * 添加className
	 * @param  {Element} ele
	 * @param  {String} clsName
	 * @return {void}
	 * @memberOf mUtils.dom
	 */
	var add_class = function add_class(ele, clsName) {
	    var _ele = _ensure_domele(ele);
	    remove_class(_ele, clsName);
	    _ele.className = (0, _format.trim)(_ele.className + ' ' + clsName);
	};
	
	/**
	 * 获取计算样式
	 * @param  {Element} [ele=null] - 目标元素
	 * @param  {String} [styleName=null] - 样式名
	 * @return {String}
	 * @memberOf mUtils.dom
	 */
	var real_style = function real_style() {
	    var ele = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	    var styleName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	    if (!ele || !styleName) return;
	    var rtn = '';
	    try {
	        rtn = typeof window.getComputedStyle == 'undefined' ? ele.currentStyle[styleName] : window.getComputedStyle(ele, null)[styleName];
	    } catch (ex) {
	        rtn = ele.style[styleName];
	    }
	    return rtn.replace(/px$/, '');
	};
	
	/**
	 * 在指定元素内的最末插入html
	 * @param  {Element} dom
	 * @param  {String} html
	 * @return {void}
	 * @memberOf mUtils.dom
	 */
	var append_HTML = function append_HTML(dom, html) {
	    return dom.insertAdjacentHTML('beforeEnd', html);
	};
	
	/**
	 * 在指定元素内的开始插入html
	 * @param  {Element} dom
	 * @param  {String} html
	 * @return {void}
	 * @memberOf mUtils.dom
	 */
	var prepend_HTML = function prepend_HTML(dom, html) {
	    return dom.insertAdjacentHTML('afterBegin', html);
	};
	
	/**
	 * 根据特征值找到一段html中其所在的tag范围
	 * @param  {String} p_featureStr - 特征值
	 * @param  {String} p_html - 作为查找范围的html
	 * @return {Object} {start, end}
	 * @memberOf mUtils.dom
	 */
	var tag_range_from_HTML = function tag_range_from_HTML(p_featureStr, p_html) {
	    var t = p_html + '',
	        p = p_featureStr,
	        eStart = t.indexOf(p),
	        eEnd = null,
	        temp = null,
	        tagMth = null,
	        tagName = null,
	        closeTag = null,
	        m = null;
	    if (eStart == -1) {
	        return null;
	    }
	    temp = t.substr(0, eStart + p.length);
	    eStart = temp.lastIndexOf('<');
	    temp = t.substr(eStart);
	    tagMth = temp.match(/^\<([a-zA-Z1-6]+)[\s\>]/);
	    tagName = tagMth[1];
	    if (new RegExp('^\\<' + tagName + '[^\\>]*\\/\\>').test(temp)) {
	        /* 直接关闭 <tag /> */
	        closeTag = '/>';
	        eEnd = eStart + temp.indexOf(closeTag) + closeTag.length;
	    } else {
	        closeTag = '</' + tagName + '>';
	        eEnd = eStart + temp.indexOf(closeTag) + closeTag.length;
	        temp = t.substring(eStart + tagName.length + temp.indexOf('>'), eEnd);
	        m = temp.match(new RegExp('\\<' + tagName + '[^\/\>]*[^\\/]?\\>', 'g'));
	        if (m != null) {
	            /*是否嵌套了相同元素*/
	            var lng = m.length;
	            while (lng--) {
	                eEnd += t.substr(eEnd).indexOf(closeTag) + closeTag.length;
	            }
	        }
	    }
	    return {
	        start: eStart,
	        end: eEnd
	    };
	};
	
	/**
	 * 为元素附加2d移动的css3样式
	 * @param  {Element} dom - 目标元素
	 * @param  {Number} x - x轴上移动的px值
	 * @param  {Number} y - y轴上移动的px值
	 * @param  {Number} [duration=null] - 持续的毫秒数
	 * @return {void}
	 * @memberOf mUtils.dom
	 */
	var transformXY = function transformXY(dom) {
	    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	    var _vendor = /webkit/i.test(navigator.appVersion) ? "webkit" : /firefox/i.test(navigator.userAgent) ? "Moz" : "opera" in window ? "O" : /MSIE/i.test(navigator.userAgent) ? "ms" : "",
	        _has3d = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix(),
	        _trnOpen = "translate" + (_has3d ? "3d(" : "("),
	        _trnClose = _has3d ? ",0)" : ")";
	    if (duration !== null && typeof duration === 'number' && duration >= 0) {
	        dom.style[_vendor + 'TransitionDuration'] = duration * 1000 + 's';
	    }
	    dom.style[_vendor + 'Transform'] = '' + _trnOpen + x + 'px,' + y + 'px' + _trnClose;
	};
	
	exports.has_class = has_class;
	exports.add_class = add_class;
	exports.remove_class = remove_class;
	exports.real_style = real_style;
	exports.append_HTML = append_HTML;
	exports.prepend_HTML = prepend_HTML;
	exports.tag_range_from_HTML = tag_range_from_HTML;
	exports.transformXY = transformXY;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * 字符串反转
	 * @param  {String} str
	 * @return {String}
	 * @memberOf mUtils.format
	 */
	var reverse_str = function reverse_str(str) {
	  return str.split('').reverse().join('');
	};
	
	/**
	 * 格式化手机号等，按位插入分隔符
	 * @param  {Number|String} target - 目标数字或字符串
	 * @param  {Number} [step=4] - 插入分隔符的相隔位数
	 * @param  {Boolean} [needReverse=true] - 是否要从右向左进行插入
	 * @param  {String} [div=" "] - 分隔符
	 * @return {String}
	 * @memberOf mUtils.format
	 */
	var step_str = function step_str(target) {
	  var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
	  var needReverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  var div = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : " ";
	
	  var nStr = target.toString(),
	      rst = nStr.replace(/\s/g, ''),
	      rTarget = needReverse ? reverse_str(rst) : rst,
	      re = new RegExp('(.{' + step + '})', 'g');
	  rst = rTarget.replace(re, '$1' + div);
	  rst = needReverse ? reverse_str(rst) : rst;
	  rst = trim(rst);
	  rst = rst.replace(new RegExp('^\\' + div), '');
	  return rst;
	};
	
	/**
	 * 添加千分位的数字分结号
	 * @param  {Number} num - 目标数字
	 * @param  {Number} [fix=null] - 如果同时要对小数限制位数则指定其位数
	 * @return {String}
	 * @memberOf mUtils.format
	 */
	var knot_num = function knot_num(num) {
	  var fix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	  var n = num;
	  if (fix !== null && fix >= 0) {
	    n = limit_decimal(n, fix);
	  }
	  var numParts = n.toString().split('.'),
	      integralPart = numParts[0],
	      decimalPart = numParts.length > 1 ? numParts[1] : null,
	      formatedIntegral = step_str(integralPart, 3, true, ','),
	      rst = void 0;
	  if (!decimalPart) return formatedIntegral;
	  rst = formatedIntegral + '.' + decimalPart;
	  return rst;
	};
	
	/**
	 * 限制小数位
	 * @param  {Number} num
	 * @param  {Number} [fix=2]
	 * @return {String}
	 * @memberOf mUtils.format
	 */
	var limit_decimal = function limit_decimal(num) {
	  var fix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	
	  var v = parseFloat(num);
	  if (isNaN(v)) {
	    throw new Error('[limit_decimal] ' + num + ' is not a number');
	  }
	  return v.toFixed(fix);
	};
	
	/**
	 * 补全数字左侧的0
	 * @param  {Number} num - 目标数字
	 * @param  {Number} [leng=2] - 最终位数
	 * @return {String}
	 * @memberOf mUtils.format
	 */
	var num_pad_left = function num_pad_left(num) {
	  var leng = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	
	  var lng = leng,
	      zeroStr = '',
	      n = num.toString();
	  while (lng--) {
	    zeroStr += '0';
	  }
	  if (n.length < leng) return zeroStr.substr(0, leng - n.length) + n;
	  return n;
	};
	
	/**
	 * 只允许数字并限制位数
	 * @param  {String} value - 原始输入值
	 * @param  {Number} leng - 最大长度
	 * @return {Number}
	 */
	var num_limit_leng = function num_limit_leng(value, leng) {
	  return !/^\d+$/.test(value) ? value.replace(/\D/g, '') : value.length > leng ? parseInt(value.toString().substring(0, leng)) : value;
	};
	
	/**
	 * 去首尾空格
	 * @param  {String} str
	 * @return {String}
	 * @memberOf mUtils.format
	 */
	var trim = function trim(str) {
	  return str.replace(/(^\s+|\s+$)/g, '');
	};
	
	exports.reverse_str = reverse_str;
	exports.step_str = step_str;
	exports.knot_num = knot_num;
	exports.num_pad_left = num_pad_left;
	exports.num_limit_leng = num_limit_leng;
	exports.limit_decimal = limit_decimal;
	exports.trim = trim;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.is_event_on_target = exports.fake_click = exports.listen_select_change = exports.on_page_rotated = exports.on_page_loaded = exports.on_tweened = undefined;
	
	var _env = __webpack_require__(2);
	
	var _env2 = _interopRequireDefault(_env);
	
	var _dom = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * 监听CSS3 transition动画结束
	 * @param  {Element} dom
	 * @param  {Function} callback
	 * @return {void}
	 * @memberOf mUtils.event
	 */
	var on_tweened = function on_tweened(dom, callback) {
	    return dom.addEventListener('webkitTransitionEnd', function fn(e) {
	        e.currentTarget.removeEventListener('webkitTransitionEnd', fn);
	        callback.call(null, e);
	    });
	};
	
	/**
	 * 监听页面加载
	 * @description 如果监听时已加载则直接执行回调
	 * @param  {Function} callback
	 * @return {void}
	 * @memberOf mUtils.event
	 */
	var on_page_loaded = function on_page_loaded(callback) {
	    if (/interactive|complete/.test(document.readyState)) {
	        callback.call(null); /*已加载过，直接执行*/
	        return;
	    }
	    window.addEventListener('DOMContentLoaded', function fn(e) {
	        e.currentTarget.removeEventListener('DOMContentLoaded', fn);
	        callback.call(null, e);
	    });
	};
	
	/**
	 * 监听设备方向改变
	 * @param  {Function} callback
	 * @return {void}
	 * @memberOf mUtils.event
	 */
	var on_page_rotated = function on_page_rotated(callback) {
	    return window.addEventListener('orientationchange', callback);
	};
	
	/**
	 * 模拟点击事件
	 * @param  {Function} callback - 回调函数
	 * @param  {String} [domId='fakeClick'] - 模拟载体元素的id
	 * @return {void}
	 * @memberOf mUtils.event
	 */
	var fake_click = function fake_click(callback) {
	    var domId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'fakeClick';
	
	    (0, _dom.append_HTML)(document.getElementsByTagName('body')[0], '<a href="javascript:void(0)" id="' + domId + '" style="opacity:.01"></a>');
	    var $a = document.getElementById(domId),
	        evt = void 0;
	    $a.addEventListener("click", function (e) {
	        e.preventDefault();
	        callback();
	    });
	    if (document.createEvent) {
	        evt = document.createEvent("MouseEvents");
	        if (evt.initMouseEvent) {
	            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	            $a.dispatchEvent(evt);
	        }
	    }
	    $a.parentNode.removeChild($a);
	};
	
	/**
	 * 兼容性的监听select更改事件
	 * @param  {Element} sel - 目标select元素
	 * @param  {Function} callback - 回调函数
	 * @return {void}
	 * @memberOf mUtils.event
	 */
	var listen_select_change = function listen_select_change(sel, callback) {
	    sel.dataset['lisOldselidx'] = sel.selectedIndex;
	    var _cbk = function _cbk(e) {
	        if (parseInt(sel.dataset['lisOldselidx']) != sel.selectedIndex) {
	            sel.dataset['lisOldselidx'] = sel.selectedIndex;
	            callback(e);
	        }
	    };
	    sel.addEventListener('change', _cbk);
	    sel.addEventListener('focus', _cbk);
	    sel.addEventListener('blur', _cbk);
	    if (_env2.default.ios && _env2.default.version >= 7) {
	        sel.addEventListener('click', _cbk);
	    }
	};
	
	/**
	 * 判断时间是否发生在指定元素范围内
	 * @param {Element} targetDom - 指定元素
	 * @return {Boolean}
	 * @memberOf mUtils.event
	 */
	var is_event_on_target = function is_event_on_target(targetDom) {
	    return function (e) {
	        var tgt = e.target;
	        if (tgt === targetDom) return true;
	        while (tgt.parentElement !== null) {
	            tgt = tgt.parentElement;
	            if (is_event_on_target(targetDom)({ target: tgt })) return true;
	        }
	        return false;
	    };
	};
	
	exports.on_tweened = on_tweened;
	exports.on_page_loaded = on_page_loaded;
	exports.on_page_rotated = on_page_rotated;
	exports.listen_select_change = listen_select_change;
	exports.fake_click = fake_click;
	exports.is_event_on_target = is_event_on_target;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.is_leap_year = exports.date_range = exports.calender = exports.get_clean_date = exports.yesterday = exports.tomorrow = exports.today = exports.getTime = exports.date_to_YMD = exports._aDay = exports._aHour = exports._aMinute = exports._aSecond = undefined;
	
	var _format = __webpack_require__(5);
	
	var _aSecond = exports._aSecond = 1000,
	    _aMinute = exports._aMinute = 60 * _aSecond,
	    _aHour = exports._aHour = 60 * _aMinute,
	    _aDay = exports._aDay = 24 * _aHour;
	
	// export function local_date(dateStr=null) {
	//     let
	//         d = dateStr ? new Date(dateStr) : new Date,
	//         timeOffset = d.getTimezoneOffset() * _aMinute,
	//         localDate = new Date(d.getTime() + timeOffset);
	//     return localDate;
	// }
	
	/**
	 * 将字符串转化为yyyymmdd格式
	 * @param  {Date} date - 目标时间
	 * @param  {String} [div='-'] - 分隔符
	 * @return {String}
	 * @memberOf mUtils.time
	 */
	function date_to_YMD(date) {
	    var div = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
	
	    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(function (num) {
	        return (0, _format.num_pad_left)(num);
	    }).join(div);
	}
	
	/**
	 * 取得某个时间
	 * @param  {Object} [setting] - {偏移值 offset, 基准时间 from, 是否置为0点 zeroTime, 是否置为1日 clean}
	 * @return {Date}
	 * @memberOf mUtils.time
	 */
	function getTime(setting) {
	    setting = Object.assign({
	        offset: 0,
	        zeroTime: false,
	        clean: false,
	        from: new Date()
	    }, setting);
	    var _setting = setting,
	        offset = _setting.offset,
	        zeroTime = _setting.zeroTime,
	        clean = _setting.clean,
	        from = _setting.from,
	        d = new Date(from);
	
	    if (zeroTime) {
	        d.setHours(0);
	        d.setMinutes(0);
	        d.setSeconds(0);
	        d.setMilliseconds(0);
	    }
	    if (clean) {
	        d.setDate(1); /*注意顺序 否则2月可能在遇到30号时出错*/
	    }
	    if (offset) {
	        d.setTime(d.getTime() + offset);
	    }
	    return d;
	}
	
	/**
	 * 取得当天
	 * @param  {Boolean} [zeroTime=true] - 是否置为0点
	 * @return {Date}
	 * @memberOf mUtils.time
	 */
	function today() {
	    var zeroTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	    return getTime({ zeroTime: zeroTime });
	}
	
	/**
	 * 取得明天
	 * @param  {Boolean} [zeroTime=true] - 是否置为0点
	 * @return {Date}
	 * @memberOf mUtils.time
	 */
	function tomorrow() {
	    var zeroTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	    return getTime({ zeroTime: zeroTime, offset: _aDay });
	}
	
	/**
	 * 取得昨天
	 * @param  {Boolean} [zeroTime=true] - 是否置为0点
	 * @return {Date}
	 * @memberOf mUtils.time
	 */
	function yesterday() {
	    var zeroTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	    return getTime({ zeroTime: zeroTime, offset: -_aDay });
	}
	
	/**
	 * 取得一个某年某月1号0时的干净日期
	 * @param  {Number} [p_month=1]
	 * @param  {Number} [p_year=今年]
	 * @return {Date}
	 * @memberOf mUtils.time
	 */
	function get_clean_date() {
	    var p_month = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	    var p_year = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().getFullYear();
	
	    var d = getTime({ clean: true, zeroTime: true });
	    d.setFullYear(p_year);
	    d.setMonth(p_month - 1);
	    return d;
	}
	
	/**
	 * 取得某月的日历
	 * @param  {Number} p_year
	 * @param  {Number} [p_month=1]
	 * @return {Array} 星期-日期 的二维数组: 周日0,周一1...
	 * @memberOf mUtils.time
	 */
	function calender() {
	    var p_month = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	    var p_year = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().getFullYear();
	
	    var matrix = [[]],
	        putDay = function putDay(d) {
	        var isLastRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	        matrix[matrix.length - 1].push(d == null ? null : d.toISOString());
	        if (!isLastRow && matrix[matrix.length - 1].length == 7) {
	            matrix[matrix.length] = [];
	        }
	    },
	        day = get_clean_date(p_month, p_year);
	    for (var i = 0, lng = day.getDay(); i < lng; i++) {
	        putDay(null);
	    }
	    while (day.getMonth() == p_month - 1) {
	        putDay(day);
	        day.setDate(day.getDate() + 1);
	    }
	    if (!matrix[matrix.length - 1].length) {
	        matrix.pop();
	    }
	    while (matrix[matrix.length - 1].length < 7) {
	        putDay(null, true);
	    }
	    return matrix;
	}
	
	/**
	 * 取得开始-结束的日期范围
	 * @param  {Number} rangeNums - 开始到结束的天数
	 * @param  {Date} [from=今天] - 基准日期
	 * @return {Object}
	 * @memberOf mUtils.time
	 */
	function date_range(rangeNums) {
	    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : today();
	
	    var days = parseInt(rangeNums) * _aDay,
	        endDay = getTime({ from: from, offset: days }),
	        arr = [from, endDay];
	    arr.sort(function (a, b) {
	        return a - b;
	    });
	    return {
	        start: arr[0],
	        end: arr[1]
	    };
	}
	
	/**
	 * 是否闰年
	 * @param  {Number} [year=null] 年份
	 * @return {Boolean}
	 * @memberOf mUtils.time
	 */
	function is_leap_year() {
	    var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
	    var currY = new Date().getFullYear(),
	        y = year || currY;
	    y = parseInt(y);
	    if (isNaN(y)) y = currY;
	    return !!(y % 4 == 0 && y % 100 != 0 || y % 400 == 0);
	}
	
	exports.date_to_YMD = date_to_YMD;
	exports.getTime = getTime;
	exports.today = today;
	exports.tomorrow = tomorrow;
	exports.yesterday = yesterday;
	exports.get_clean_date = get_clean_date;
	exports.calender = calender;
	exports.date_range = date_range;
	exports.is_leap_year = is_leap_year;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @private
	 */
	function _split2(s, separator) {
	    var i = s.indexOf(separator);
	    return i == -1 ? [s, ''] : [s.substring(0, i), s.substring(i + 1)];
	}
	
	/**
	 * 将query字符串转换为object
	 * @param  {String} [query=当前url的query] 给定的query字符串
	 * @return {Object}
	 * @memberOf mUtils.url
	 */
	var query_params = function query_params() {
	    var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.search.substring(1);
	
	    if (!query) return null;
	    var obj = {};
	    query.split('&').forEach(function (params) {
	        var p = params.split('='),
	            key = p[0],
	            vlu = decodeURIComponent(p[1]);
	        obj[key] = vlu;
	    });
	    return obj;
	};
	
	/**
	 * 将object转换为query字符串
	 * @param  {Object} obj - 键值对的对象
	 * @param  {Stribng} [separator='&'] - 分隔符
	 * @return {String}
	 */
	function params_query(obj) {
	    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '&';
	
	    var u = encodeURIComponent,
	        k = void 0,
	        r = [];
	    for (k in obj) {
	        r.push(u(k) + '=' + u(obj[k]));
	    }return r.join(separator);
	}
	
	/**
	 * 将hash部分转化为object
	 * @memberOf mUtils.url
	 */
	
	var URLHash = function () {
	    /**
	     * 构造方法
	     * @constructor
	     * @param  {String} [href=当前URL的hash]
	     * @param  {String} [hashChar='#']
	     * @param  {String} [separator="&"]
	     * @return {Object}
	     */
	    function URLHash() {
	        var href = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.href;
	        var hashChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#';
	        var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "&";
	
	        _classCallCheck(this, URLHash);
	
	        var h = href,
	            s = separator,
	            uArr = _split2(h, hashChar),
	            hash_part = uArr[1];
	        this.map = {};
	        this.separator = separator;
	        this.hashChar = hashChar;
	        if (hash_part) {
	            var arr = hash_part.split(s);
	            for (var i = 0; i < arr.length; i++) {
	                var s2 = arr[i];
	                var o = _split2(s2, '=');
	                this.map[o[0]] = o[1];
	            }
	        }
	        this.size = function () {
	            return this.keys().length;
	        };
	        this.keys = function () {
	            var k = [];
	            for (var m in this.map) {
	                if (m != '_hashfoo_') k.push(m);
	            }return k;
	        };
	        this.values = function () {
	            var v = [];
	            for (var m in this.map) {
	                if (m != '_hashfoo_') v.push(this.map[m]);
	            }return v;
	        };
	        this.put('_hashfoo_', Math.random());
	    } //end of constructor
	    /**
	     * 取得某个值
	     * @param  {String} key
	     * @return {String}
	     */
	
	
	    _createClass(URLHash, [{
	        key: 'get',
	        value: function get(key) {
	            return this.map[key] || null;
	        }
	        /**
	         * 放置新值
	         * @param  {String} key
	         * @param  {Any} value
	         * @return {void}
	         */
	
	    }, {
	        key: 'put',
	        value: function put(key, value) {
	            this.map[key] = value;
	        }
	        /**
	         * 一次性设置多个值
	         * @param  {Object} keyValues
	         * @return {void}
	         */
	
	    }, {
	        key: 'putAll',
	        value: function putAll(keyValues) {
	            if ((typeof keyValues === 'undefined' ? 'undefined' : _typeof(keyValues)) == 'object') for (var item in keyValues) {
	                this.map[item] = keyValues[item];
	            }
	        }
	        /**
	         * 删除某个值
	         * @param  {String} key
	         * @return {void}
	         */
	
	    }, {
	        key: 'remove',
	        value: function remove(key) {
	            if (this.map[key]) {
	                var newMap = {};
	                for (var item in this.map) {
	                    if (item != key) newMap[item] = this.map[item];
	                }this.map = newMap;
	            }
	        }
	        /**
	         * 转换为字符串
	         * @return {String}
	         */
	
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var m2 = {};
	            for (var m in this.map) {
	                if (m != '_hashfoo_') m2[m] = this.map[m];
	            }return params_query(m2, "&");
	        }
	        /**
	         * 克隆一个实例
	         * @return {URLHash}
	         */
	
	    }, {
	        key: 'clone',
	        value: function clone() {
	            return new URLHash('foo#' + this.toString(), this.hashChar, this.separator);
	        }
	    }]);
	
	    return URLHash;
	}();
	
	exports.query_params = query_params;
	exports.params_query = params_query;
	exports.URLHash = URLHash;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * 确保老旧的设备可以使用html5的新元素
	 * @return {void}
	 * @memberOf mUtils.utils
	 */
	function enable_html5_for_old() {
	    var tags = 'abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,fieldset,figure,figcaption,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,small,time,video,legend';
	    tags.split(',').forEach(function (ele) {
	        return document.createElement(ele);
	    });
	    write_CSS(tags + '{display:block;}');
	}
	
	/**
	 * 检查并监听applicationCache的更新情况
	 * @return {void}
	 * @memberOf mUtils.utils
	 */
	function check_appcache() {
	    var _appCache = window.applicationCache,
	        support = !!_appCache;
	    if (!support) return;
	    _appCache.addEventListener("updateready", function () {
	        if (_appCache.status == _appCache.UPDATEREADY) {
	            try {
	                _appCache.swapCache();
	            } catch (ex1) {}
	            var _location = location,
	                origin = _location.origin,
	                pathname = _location.pathname,
	                hash = _location.hash,
	                rnd = Math.random();
	
	            location.href = '' + origin + pathname + '?rnd=' + rnd + hash;
	        }
	    }, false);
	}
	
	/**
	 * 将页面移动至指定位置
	 * @param  {Number} [top]
	 * @return {void}
	 * @memberOf mUtils.utils
	 */
	function page_to_top() {
	    var top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
	
	    document.getElementsByTagName('body')[0].scrollTop = top;
	    window.scrollTo(0, top);
	}
	
	/**
	 * 在页面中动态写入css
	 * @param  {String} css - css字符串
	 * @return {void}
	 * @memberOf mUtils.utils
	 */
	function write_CSS(css) {
	    var s = document.createElement('style');
	    s.innerHTML = css;
	    try {
	        s.appendChild(document.createTextNode(css));
	    } catch (ex) {
	        s.styleSheet.cssText = css;
	    }
	    document.getElementsByTagName('head')[0].appendChild(s);
	}
	
	/**
	 * 利用html5的原生pattern校验，对自定义了规则的表单项提示错误信息
	 * @param  {Element} form
	 * @param  {Function} [submitCallback=null] - 校验成功后的回掉函数，参数为 (form, fieldsObj)
	 * @param  {Function} [noticeFunction=null] - *IOS only* 提示错误的方法
	 * @param  {String} [submitTriggerEvent='click'] - 触发校验的事件
	 * @param  {String} [submitTriggerTarget='.submit'] - 触发校验的目标元素上下文
	 * @param  {String} [mismatchNoticeName='mismatch'] - 与pattern属性匹配的自定义提示语data-属性
	 * @return {void}
	 * @memberOf mUtils.utils
	 */
	function form_primary_valid(form) {
	    var submitCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var noticeFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	    var submitTriggerEvent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'click';
	    var submitTriggerTarget = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '.submit';
	    var mismatchNoticeName = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'mismatch';
	    var missingNoticeName = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'missing';
	
	    var show_alert = function show_alert(ipt) {
	        var func = ipt.reportValidity ? ipt.setCustomValidity.bind(ipt) : noticeFunction || alert;
	        if (ipt.validity.valueMissing) {
	            //空缺
	            var msg = ipt.reportValidity ? '' : ipt.dataset.hasOwnProperty(mismatchNoticeName) ? ipt.dataset[missingNoticeName] : ipt.name + ' is required!';
	            func(msg);
	        } else if (ipt.dataset.hasOwnProperty(mismatchNoticeName)) {
	            //不符合pattern
	            var _msg = ipt.dataset[mismatchNoticeName];
	            func(_msg);
	        }
	    };
	    var get_fields = function get_fields() {
	        return [].slice.call(form.querySelectorAll('input[pattern]'), 0);
	    };
	    var fields = get_fields();
	    if (!fields.length) {
	        submitCallback && submitCallback(form, null);
	        return;
	    }
	    //onInput
	    fields.forEach(function (ipt) {
	        return ipt.addEventListener('input', function (e) {
	            return e.currentTarget.setCustomValidity('');
	        });
	    });
	    //onSubmit
	    form.querySelector(submitTriggerTarget).addEventListener(submitTriggerEvent, function (e) {
	        fields = get_fields();
	        var obj = {},
	            bool = true;
	        while (fields.length) {
	            var ipt = fields.shift();
	            var fake = ipt.cloneNode();
	            if (ipt.type === 'number') fake.type = 'text'; //既支持数字键盘，又能使用原生验证
	            if (!fake.checkValidity() && !fake.validity.valid //iphone6s、itouch5等机型会在valid的情况下checkValidity出错
	            ) {
	                    show_alert(ipt);
	                    if (e.currentTarget.type !== 'submit' && typeof ipt.reportValidity === 'function' //iphone6s等机型没有这个
	                    ) ipt.reportValidity();
	                    bool = false;
	                    break;
	                } else {
	                obj[ipt.name] = ipt.value;
	                ipt.setCustomValidity('');
	            }
	        }
	        bool && submitCallback && submitCallback(form, obj);
	    });
	}
	
	/**
	 * 锁定屏幕，限制其响应划动事件
	 * @memberOf mUtils.utils
	 */
	
	var ScrollLocker = function () {
	    /**
	     * 构造方法
	     * @constructor
	     * @param  {Object} settings - 构造参数对象，可以设置ignores忽略对象列表等
	     * @return {void}
	     */
	    function ScrollLocker(settings) {
	        _classCallCheck(this, ScrollLocker);
	
	        this._cfg = Object.assign({
	            ignores: []
	        }, settings);
	        this._scr = this._onscroll.bind(this);
	    }
	    /**
	     * @private
	     */
	
	
	    _createClass(ScrollLocker, [{
	        key: '_isIn',
	        value: function _isIn(targetObj, obj) {
	            var tobj = targetObj,
	                cobj = obj;
	            if (tobj === cobj) return true;
	            while (cobj.parentNode) {
	                if (tobj === cobj) return true;
	                cobj = cobj.parentNode;
	            }
	            return false;
	        }
	        /**
	         * @private
	         */
	
	    }, {
	        key: '_onscroll',
	        value: function _onscroll(e) {
	            var currObj = e.target,
	                ig = this._cfg.ignores;
	            for (var i = 0, lng = ig.length; i < lng; i++) {
	                var igrObj = ig[i];
	                if (!this._isIn(igrObj, currObj)) {
	                    e.preventDefault();
	                    break;
	                }
	            }
	        }
	        /**
	         * 执行锁定
	         */
	
	    }, {
	        key: 'lock',
	        value: function lock() {
	            window.addEventListener('touchmove', this._scr, false);
	        }
	        /**
	         * 解除锁定
	         */
	
	    }, {
	        key: 'unlock',
	        value: function unlock() {
	            window.removeEventListener('touchmove', this._scr, false);
	        }
	    }]);
	
	    return ScrollLocker;
	}();
	
	exports.enable_html5_for_old = enable_html5_for_old;
	exports.check_appcache = check_appcache;
	exports.page_to_top = page_to_top;
	exports.write_CSS = write_CSS;
	exports.form_primary_valid = form_primary_valid;
	exports.ScrollLocker = ScrollLocker;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=mobile-utils.js.map