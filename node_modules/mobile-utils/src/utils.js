/**
 * 确保老旧的设备可以使用html5的新元素
 * @return {void}
 * @memberOf mUtils.utils
 */
function enable_html5_for_old() {
    let tags = 'abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,fieldset,figure,figcaption,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,small,time,video,legend';
    tags.split(',').forEach(ele=>document.createElement(ele));
    write_CSS(tags + '{display:block;}');
}

/**
 * 检查并监听applicationCache的更新情况
 * @return {void}
 * @memberOf mUtils.utils
 */
function check_appcache() {
	let
		_appCache = window.applicationCache,
        support = !!_appCache;
    if (!support) return;
    _appCache.addEventListener("updateready", () => {
        if (_appCache.status == _appCache.UPDATEREADY) {
            try {
                _appCache.swapCache();
            } catch (ex1) {}
            let
                {origin, pathname, hash} = location,
                rnd = Math.random();
            location.href = `${origin}${pathname}?rnd=${rnd}${hash}`;
        }
    }, false);
}

/**
 * 将页面移动至指定位置
 * @param  {Number} [top]
 * @return {void}
 * @memberOf mUtils.utils
 */
function page_to_top(top = -1) {
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
function form_primary_valid(
    form, 
    submitCallback = null,
    noticeFunction = null,
    submitTriggerEvent = 'click',
    submitTriggerTarget = '.submit',
    mismatchNoticeName = 'mismatch',
    missingNoticeName = 'missing')
{
    const show_alert = ipt=>{
        let func = ipt.reportValidity 
            ? ipt.setCustomValidity.bind(ipt)
            : (noticeFunction || alert);
        if (ipt.validity.valueMissing) { //空缺
            let msg = ipt.reportValidity 
                ? '' 
                : ipt.dataset.hasOwnProperty(mismatchNoticeName)
                    ? ipt.dataset[missingNoticeName]
                    : `${ipt.name} is required!`;
            func(msg);
        } else if (ipt.dataset.hasOwnProperty(mismatchNoticeName)) {//不符合pattern
            let msg = ipt.dataset[mismatchNoticeName];
            func(msg);
        }
    };
    const get_fields = ()=> [].slice.call(form.querySelectorAll('input[pattern]'), 0);
    let fields = get_fields();
    if (!fields.length) {
        submitCallback && submitCallback(form, null);
        return;
    }
    //onInput
    fields.forEach(ipt=>ipt.addEventListener('input', e=>e.currentTarget.setCustomValidity('')));
    //onSubmit
    form.querySelector(submitTriggerTarget).addEventListener(submitTriggerEvent, e=>{
        fields = get_fields();
        let 
            obj = {}
            ,bool = true
        ;
        while (fields.length) {
            let ipt = fields.shift();
            let fake = ipt.cloneNode();
            if (ipt.type === 'number') fake.type = 'text'; //既支持数字键盘，又能使用原生验证
            if (!fake.checkValidity()
                && !fake.validity.valid //iphone6s、itouch5等机型会在valid的情况下checkValidity出错
                ) {
                show_alert(ipt);
                if (e.currentTarget.type !== 'submit'
                    && typeof ipt.reportValidity === 'function' //iphone6s等机型没有这个
                )
                    ipt.reportValidity();
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
class ScrollLocker {
    /**
     * 构造方法
     * @constructor
     * @param  {Object} settings - 构造参数对象，可以设置ignores忽略对象列表等
     * @return {void}
     */
    constructor(settings) {
        this._cfg = Object.assign({
            ignores: []
        }, settings);
        this._scr = this._onscroll.bind(this);
    }
    /**
     * @private
     */
    _isIn(targetObj, obj) {
        let
            tobj = targetObj
            ,cobj = obj
        ;
        if (tobj === cobj)
            return true;
        while (cobj.parentNode) {
            if (tobj === cobj)
                return true;
            cobj = cobj.parentNode;
        }
        return false;
    }
    /**
     * @private
     */
    _onscroll(e) {
        let
            currObj = e.target
            ,ig = this._cfg.ignores
        ;
        for (let i=0, lng=ig.length; i<lng; i++) {
            let igrObj = ig[i];
            if ( !this._isIn(igrObj, currObj) ){
                e.preventDefault();
                break;
            }
        }
    }
    /**
     * 执行锁定
     */
    lock() {
        window.addEventListener('touchmove', this._scr, false);
    }
    /**
     * 解除锁定
     */
    unlock() {
        window.removeEventListener('touchmove', this._scr, false);
    }
}

export
/**
 * @namespace utils
 * @memberOf mUtils
 * @type {Object}
 */
{
    enable_html5_for_old,
    check_appcache,
    page_to_top,
    write_CSS,
    form_primary_valid,
    ScrollLocker
}