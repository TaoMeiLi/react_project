import {trim} from './format';

/**
 * 判断元素是否有指定className
 * @param  {Element} ele
 * @param  {String} clsName
 * @return {Boolean}
 * @memberOf mUtils.dom
 */
const has_class = (ele, clsName) => (new RegExp('(^|\\s)+(' + clsName + ')(\\s|$)+', 'g')).test(ele.className);

const _ensure_domele = ele => {
    if (typeof ele === 'string') {
        try {
            return document.querySelector(ele);
        } catch (ex) {}
    }
    return ele;
}

/**
 * 删除className
 * @param  {Element} ele
 * @param  {String} clsName
 * @return {void}
 * @memberOf mUtils.dom
 */
const remove_class = (ele, clsName) => {
    let _ele = _ensure_domele(ele);
    let re = new RegExp('(^|\\s)+(' + clsName + ')(\\s|$)+', 'g');
    try {
        _ele.className = _ele.className.replace(re, "$1$3");
    } catch (ex) {}
    re = null;
}

/**
 * 添加className
 * @param  {Element} ele
 * @param  {String} clsName
 * @return {void}
 * @memberOf mUtils.dom
 */
const add_class = (ele, clsName) => {
    let _ele = _ensure_domele(ele);
    remove_class(_ele, clsName);
    _ele.className = trim(_ele.className + ' ' + clsName);
}

/**
 * 获取计算样式
 * @param  {Element} [ele=null] - 目标元素
 * @param  {String} [styleName=null] - 样式名
 * @return {String}
 * @memberOf mUtils.dom
 */
const real_style = (ele=null, styleName=null) => {
    if (!ele || !styleName) return;
    let rtn = '';
    try {
        rtn = (typeof(window.getComputedStyle) == 'undefined')
            ? ele.currentStyle[styleName]
            : window.getComputedStyle(ele, null)[styleName];
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
const append_HTML = (dom, html) => dom.insertAdjacentHTML('beforeEnd', html);

/**
 * 在指定元素内的开始插入html
 * @param  {Element} dom
 * @param  {String} html
 * @return {void}
 * @memberOf mUtils.dom
 */
const prepend_HTML = (dom, html) => dom.insertAdjacentHTML('afterBegin', html);

/**
 * 根据特征值找到一段html中其所在的tag范围
 * @param  {String} p_featureStr - 特征值
 * @param  {String} p_html - 作为查找范围的html
 * @return {Object} {start, end}
 * @memberOf mUtils.dom
 */
const tag_range_from_HTML = (p_featureStr, p_html) => {
    let
        t = p_html + '',
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
    if (new RegExp('^\\<' + tagName + '[^\\>]*\\/\\>').test(temp)) { /* 直接关闭 <tag /> */
        closeTag = '/>';
        eEnd = eStart + temp.indexOf(closeTag) + closeTag.length;
    } else {
        closeTag = '</' + tagName + '>';
        eEnd = eStart + temp.indexOf(closeTag) + closeTag.length;
        temp = t.substring(eStart + tagName.length + temp.indexOf('>'), eEnd);
        m = temp.match(new RegExp('\\<' + tagName + '[^\/\>]*[^\\/]?\\>', 'g'));
        if (m != null) { /*是否嵌套了相同元素*/
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
const transformXY = (dom, x=0, y=0, duration=null) => {
    let
        _vendor = (/webkit/i).test(navigator.appVersion) ? "webkit": (/firefox/i).test(navigator.userAgent) ? "Moz": "opera" in window ? "O": (/MSIE/i).test(navigator.userAgent) ? "ms": "",
        _has3d = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix(),
        _trnOpen = "translate" + (_has3d ? "3d(": "("),
        _trnClose = _has3d ? ",0)": ")"
    ;
    if (duration !== null
        && typeof duration === 'number'
        && duration>=0) {
        dom.style[_vendor + 'TransitionDuration'] = duration*1000 + 's';
    }
    dom.style[_vendor + 'Transform'] = `${_trnOpen}${x}px,${y}px${_trnClose}`;
};

export
/**
 * @namespace dom
 * @memberOf mUtils
 * @type {Object}
 */
{
    has_class,
    add_class,
    remove_class,
    real_style,
    append_HTML,
    prepend_HTML,
    tag_range_from_HTML,
    transformXY
};