import env from './env';
import {append_HTML} from './dom';

/**
 * 监听CSS3 transition动画结束
 * @param  {Element} dom
 * @param  {Function} callback
 * @return {void}
 * @memberOf mUtils.event
 */
const on_tweened = (dom, callback) =>
    dom.addEventListener('webkitTransitionEnd', function fn(e) {
        e.currentTarget.removeEventListener('webkitTransitionEnd', fn);
        callback.call(null, e)
    });

/**
 * 监听页面加载
 * @description 如果监听时已加载则直接执行回调
 * @param  {Function} callback
 * @return {void}
 * @memberOf mUtils.event
 */
const on_page_loaded = callback => {
    if (/interactive|complete/.test(document.readyState)) {
        callback.call(null); /*已加载过，直接执行*/
        return;
    }
    window.addEventListener('DOMContentLoaded', function fn(e) {
        e.currentTarget.removeEventListener('DOMContentLoaded', fn);
        callback.call(null, e)
    });
};

/**
 * 监听设备方向改变
 * @param  {Function} callback
 * @return {void}
 * @memberOf mUtils.event
 */
const on_page_rotated = callback => window.addEventListener('orientationchange', callback);

/**
 * 模拟点击事件
 * @param  {Function} callback - 回调函数
 * @param  {String} [domId='fakeClick'] - 模拟载体元素的id
 * @return {void}
 * @memberOf mUtils.event
 */
const fake_click = (callback, domId='fakeClick') => {
    append_HTML(
        document.getElementsByTagName('body')[0],
        `<a href="javascript:void(0)" id="${domId}" style="opacity:.01"></a>`
    );
    let
        $a = document.getElementById(domId),
        evt;
    $a.addEventListener("click", function(e) {
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
const listen_select_change = (sel, callback) => {
    sel.dataset['lisOldselidx'] = sel.selectedIndex;
    var _cbk = function(e) {
        if (parseInt(sel.dataset['lisOldselidx']) != sel.selectedIndex) {
            sel.dataset['lisOldselidx'] = sel.selectedIndex;
            callback(e);
        }
    };
    sel.addEventListener('change', _cbk);
    sel.addEventListener('focus', _cbk);
    sel.addEventListener('blur', _cbk);
    if (env.ios && env.version >= 7) {
        sel.addEventListener('click', _cbk);
    }
};

/**
 * 判断时间是否发生在指定元素范围内
 * @param {Element} targetDom - 指定元素
 * @return {Boolean}
 * @memberOf mUtils.event
 */
const is_event_on_target = targetDom => {
    return function(e) {
        var tgt = e.target;
        if ( tgt === targetDom ) return true;
        while (tgt.parentElement !== null) {
            tgt = tgt.parentElement;
            if ( is_event_on_target(targetDom)({target: tgt}) ) return true;
        }
        return false;
    }
};

export
/**
 * @namespace event
 * @memberOf mUtils
 * @type {Object}
 */
{
    on_tweened,
    on_page_loaded,
    on_page_rotated,
    listen_select_change,
    fake_click,
    is_event_on_target,
};