# mobile-utils
common utils of mobile html5 development

## 1. How to install
```
npm i mobile-utils --save
```

## 2. How to use
```js
//in requirejs config:
require.config({
	paths: {
		"mobile-utils": "YOUR_PATH/mobile-utils.min",
		...
	},
	...
});

//in page
import mUtils from 'mobile-utils';
...
mUtils.format.limit_decimal(someNum)
```

## 3. API
<a name="mUtils"></a>

## mUtils : <code>object</code>
the entry point

**Kind**: global namespace  

* [mUtils](#mUtils) : <code>object</code>
    * [.dom](#mUtils.dom) : <code>object</code>
        * [.has_class(ele, clsName)](#mUtils.dom.has_class) ⇒ <code>Boolean</code>
        * [.remove_class(ele, clsName)](#mUtils.dom.remove_class) ⇒ <code>void</code>
        * [.add_class(ele, clsName)](#mUtils.dom.add_class) ⇒ <code>void</code>
        * [.real_style([ele], [styleName])](#mUtils.dom.real_style) ⇒ <code>String</code>
        * [.append_HTML(dom, html)](#mUtils.dom.append_HTML) ⇒ <code>void</code>
        * [.prepend_HTML(dom, html)](#mUtils.dom.prepend_HTML) ⇒ <code>void</code>
        * [.tag_range_from_HTML(p_featureStr, p_html)](#mUtils.dom.tag_range_from_HTML) ⇒ <code>Object</code>
        * [.transformXY(dom, x, y, [duration])](#mUtils.dom.transformXY) ⇒ <code>void</code>
    * [.env](#mUtils.env) : <code>object</code>
    * [.event](#mUtils.event) : <code>object</code>
        * [.on_tweened(dom, callback)](#mUtils.event.on_tweened) ⇒ <code>void</code>
        * [.on_page_loaded(callback)](#mUtils.event.on_page_loaded) ⇒ <code>void</code>
        * [.on_page_rotated(callback)](#mUtils.event.on_page_rotated) ⇒ <code>void</code>
        * [.fake_click(callback, [domId])](#mUtils.event.fake_click) ⇒ <code>void</code>
        * [.listen_select_change(sel, callback)](#mUtils.event.listen_select_change) ⇒ <code>void</code>
        * [.is_event_on_target(targetDom)](#mUtils.event.is_event_on_target) ⇒ <code>Boolean</code>
    * [.format](#mUtils.format) : <code>object</code>
        * [.reverse_str(str)](#mUtils.format.reverse_str) ⇒ <code>String</code>
        * [.step_str(target, [step], [needReverse], [div])](#mUtils.format.step_str) ⇒ <code>String</code>
        * [.knot_num(num, [fix])](#mUtils.format.knot_num) ⇒ <code>String</code>
        * [.limit_decimal(num, [fix])](#mUtils.format.limit_decimal) ⇒ <code>String</code>
        * [.num_pad_left(num, [leng])](#mUtils.format.num_pad_left) ⇒ <code>String</code>
        * [.num_limit_leng(value, leng)](#mUtils.format.num_limit_leng) ⇒ <code>Number</code>
        * [.trim(str)](#mUtils.format.trim) ⇒ <code>String</code>
    * [.lang](#mUtils.lang) : <code>object</code>
        * [.read_i18n(tmpl, ...args)](#mUtils.lang.read_i18n) ⇒ <code>String</code>
    * [.time](#mUtils.time) : <code>object</code>
        * [.date_to_YMD(date, [div])](#mUtils.time.date_to_YMD) ⇒ <code>String</code>
        * [.getTime([setting])](#mUtils.time.getTime) ⇒ <code>Date</code>
        * [.today([zeroTime])](#mUtils.time.today) ⇒ <code>Date</code>
        * [.tomorrow([zeroTime])](#mUtils.time.tomorrow) ⇒ <code>Date</code>
        * [.yesterday([zeroTime])](#mUtils.time.yesterday) ⇒ <code>Date</code>
        * [.get_clean_date([p_month], [p_year])](#mUtils.time.get_clean_date) ⇒ <code>Date</code>
        * [.calender(p_year, [p_month])](#mUtils.time.calender) ⇒ <code>Array</code>
        * [.date_range(rangeNums, [from])](#mUtils.time.date_range) ⇒ <code>Object</code>
        * [.is_leap_year([year])](#mUtils.time.is_leap_year) ⇒ <code>Boolean</code>
    * [.url](#mUtils.url) : <code>object</code>
        * [.URLHash](#mUtils.url.URLHash)
            * [new URLHash([href], [hashChar], [separator])](#new_mUtils.url.URLHash_new)
            * [.get(key)](#mUtils.url.URLHash+get) ⇒ <code>String</code>
            * [.put(key, value)](#mUtils.url.URLHash+put) ⇒ <code>void</code>
            * [.putAll(keyValues)](#mUtils.url.URLHash+putAll) ⇒ <code>void</code>
            * [.remove(key)](#mUtils.url.URLHash+remove) ⇒ <code>void</code>
            * [.toString()](#mUtils.url.URLHash+toString) ⇒ <code>String</code>
            * [.clone()](#mUtils.url.URLHash+clone) ⇒ <code>URLHash</code>
        * [.query_params([query])](#mUtils.url.query_params) ⇒ <code>Object</code>
        * [.params_query(obj, [separator])](#mUtils.url.params_query) ⇒ <code>String</code>
    * [.utils](#mUtils.utils) : <code>object</code>
        * [.ScrollLocker](#mUtils.utils.ScrollLocker)
            * [new ScrollLocker(settings)](#new_mUtils.utils.ScrollLocker_new)
            * [.lock()](#mUtils.utils.ScrollLocker+lock)
            * [.unlock()](#mUtils.utils.ScrollLocker+unlock)
        * [.enable_html5_for_old()](#mUtils.utils.enable_html5_for_old) ⇒ <code>void</code>
        * [.check_appcache()](#mUtils.utils.check_appcache) ⇒ <code>void</code>
        * [.page_to_top([top])](#mUtils.utils.page_to_top) ⇒ <code>void</code>
        * [.write_CSS(css)](#mUtils.utils.write_CSS) ⇒ <code>void</code>
        * [.form_primary_valid(form, [submitCallback], [noticeFunction], [submitTriggerEvent], [submitTriggerTarget], [mismatchNoticeName])](#mUtils.utils.form_primary_valid) ⇒ <code>void</code>

<a name="mUtils.dom"></a>

### mUtils.dom : <code>object</code>
**Kind**: static namespace of <code>[mUtils](#mUtils)</code>  

* [.dom](#mUtils.dom) : <code>object</code>
    * [.has_class(ele, clsName)](#mUtils.dom.has_class) ⇒ <code>Boolean</code>
    * [.remove_class(ele, clsName)](#mUtils.dom.remove_class) ⇒ <code>void</code>
    * [.add_class(ele, clsName)](#mUtils.dom.add_class) ⇒ <code>void</code>
    * [.real_style([ele], [styleName])](#mUtils.dom.real_style) ⇒ <code>String</code>
    * [.append_HTML(dom, html)](#mUtils.dom.append_HTML) ⇒ <code>void</code>
    * [.prepend_HTML(dom, html)](#mUtils.dom.prepend_HTML) ⇒ <code>void</code>
    * [.tag_range_from_HTML(p_featureStr, p_html)](#mUtils.dom.tag_range_from_HTML) ⇒ <code>Object</code>
    * [.transformXY(dom, x, y, [duration])](#mUtils.dom.transformXY) ⇒ <code>void</code>

<a name="mUtils.dom.has_class"></a>

#### dom.has_class(ele, clsName) ⇒ <code>Boolean</code>
判断元素是否有指定className

**Kind**: static method of <code>[dom](#mUtils.dom)</code>  

| Param | Type |
| --- | --- |
| ele | <code>Element</code> | 
| clsName | <code>String</code> | 

<a name="mUtils.dom.remove_class"></a>

#### dom.remove_class(ele, clsName) ⇒ <code>void</code>
删除className

**Kind**: static method of <code>[dom](#mUtils.dom)</code>  

| Param | Type |
| --- | --- |
| ele | <code>Element</code> | 
| clsName | <code>String</code> | 

<a name="mUtils.dom.add_class"></a>

#### dom.add_class(ele, clsName) ⇒ <code>void</code>
添加className

**Kind**: static method of <code>[dom](#mUtils.dom)</code>  

| Param | Type |
| --- | --- |
| ele | <code>Element</code> | 
| clsName | <code>String</code> | 

<a name="mUtils.dom.real_style"></a>

#### dom.real_style([ele], [styleName]) ⇒ <code>String</code>
获取计算样式

**Kind**: static method of <code>[dom](#mUtils.dom)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [ele] | <code>Element</code> | <code></code> | 目标元素 |
| [styleName] | <code>String</code> | <code></code> | 样式名 |

<a name="mUtils.dom.append_HTML"></a>

#### dom.append_HTML(dom, html) ⇒ <code>void</code>
在指定元素内的最末插入html

**Kind**: static method of <code>[dom](#mUtils.dom)</code>  

| Param | Type |
| --- | --- |
| dom | <code>Element</code> | 
| html | <code>String</code> | 

<a name="mUtils.dom.prepend_HTML"></a>

#### dom.prepend_HTML(dom, html) ⇒ <code>void</code>
在指定元素内的开始插入html

**Kind**: static method of <code>[dom](#mUtils.dom)</code>  

| Param | Type |
| --- | --- |
| dom | <code>Element</code> | 
| html | <code>String</code> | 

<a name="mUtils.dom.tag_range_from_HTML"></a>

#### dom.tag_range_from_HTML(p_featureStr, p_html) ⇒ <code>Object</code>
根据特征值找到一段html中其所在的tag范围

**Kind**: static method of <code>[dom](#mUtils.dom)</code>  
**Returns**: <code>Object</code> - {start, end}  

| Param | Type | Description |
| --- | --- | --- |
| p_featureStr | <code>String</code> | 特征值 |
| p_html | <code>String</code> | 作为查找范围的html |

<a name="mUtils.dom.transformXY"></a>

#### dom.transformXY(dom, x, y, [duration]) ⇒ <code>void</code>
为元素附加2d移动的css3样式

**Kind**: static method of <code>[dom](#mUtils.dom)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dom | <code>Element</code> |  | 目标元素 |
| x | <code>Number</code> |  | x轴上移动的px值 |
| y | <code>Number</code> |  | y轴上移动的px值 |
| [duration] | <code>Number</code> | <code></code> | 持续的毫秒数 |

<a name="mUtils.env"></a>

### mUtils.env : <code>object</code>
获取移动设备型号版本等环境信息

**Kind**: static namespace of <code>[mUtils](#mUtils)</code>  
**Default**: <code>{
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
    }</code>  
<a name="mUtils.event"></a>

### mUtils.event : <code>object</code>
**Kind**: static namespace of <code>[mUtils](#mUtils)</code>  

* [.event](#mUtils.event) : <code>object</code>
    * [.on_tweened(dom, callback)](#mUtils.event.on_tweened) ⇒ <code>void</code>
    * [.on_page_loaded(callback)](#mUtils.event.on_page_loaded) ⇒ <code>void</code>
    * [.on_page_rotated(callback)](#mUtils.event.on_page_rotated) ⇒ <code>void</code>
    * [.fake_click(callback, [domId])](#mUtils.event.fake_click) ⇒ <code>void</code>
    * [.listen_select_change(sel, callback)](#mUtils.event.listen_select_change) ⇒ <code>void</code>
    * [.is_event_on_target(targetDom)](#mUtils.event.is_event_on_target) ⇒ <code>Boolean</code>

<a name="mUtils.event.on_tweened"></a>

#### event.on_tweened(dom, callback) ⇒ <code>void</code>
监听CSS3 transition动画结束

**Kind**: static method of <code>[event](#mUtils.event)</code>  

| Param | Type |
| --- | --- |
| dom | <code>Element</code> | 
| callback | <code>function</code> | 

<a name="mUtils.event.on_page_loaded"></a>

#### event.on_page_loaded(callback) ⇒ <code>void</code>
如果监听时已加载则直接执行回调

**Kind**: static method of <code>[event](#mUtils.event)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="mUtils.event.on_page_rotated"></a>

#### event.on_page_rotated(callback) ⇒ <code>void</code>
监听设备方向改变

**Kind**: static method of <code>[event](#mUtils.event)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="mUtils.event.fake_click"></a>

#### event.fake_click(callback, [domId]) ⇒ <code>void</code>
模拟点击事件

**Kind**: static method of <code>[event](#mUtils.event)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | 回调函数 |
| [domId] | <code>String</code> | <code>&#x27;fakeClick&#x27;</code> | 模拟载体元素的id |

<a name="mUtils.event.listen_select_change"></a>

#### event.listen_select_change(sel, callback) ⇒ <code>void</code>
兼容性的监听select更改事件

**Kind**: static method of <code>[event](#mUtils.event)</code>  

| Param | Type | Description |
| --- | --- | --- |
| sel | <code>Element</code> | 目标select元素 |
| callback | <code>function</code> | 回调函数 |

<a name="mUtils.event.is_event_on_target"></a>

#### event.is_event_on_target(targetDom) ⇒ <code>Boolean</code>
判断时间是否发生在指定元素范围内

**Kind**: static method of <code>[event](#mUtils.event)</code>  

| Param | Type | Description |
| --- | --- | --- |
| targetDom | <code>Element</code> | 指定元素 |

<a name="mUtils.format"></a>

### mUtils.format : <code>object</code>
**Kind**: static namespace of <code>[mUtils](#mUtils)</code>  

* [.format](#mUtils.format) : <code>object</code>
    * [.reverse_str(str)](#mUtils.format.reverse_str) ⇒ <code>String</code>
    * [.step_str(target, [step], [needReverse], [div])](#mUtils.format.step_str) ⇒ <code>String</code>
    * [.knot_num(num, [fix])](#mUtils.format.knot_num) ⇒ <code>String</code>
    * [.limit_decimal(num, [fix])](#mUtils.format.limit_decimal) ⇒ <code>String</code>
    * [.num_pad_left(num, [leng])](#mUtils.format.num_pad_left) ⇒ <code>String</code>
    * [.num_limit_leng(value, leng)](#mUtils.format.num_limit_leng) ⇒ <code>Number</code>
    * [.trim(str)](#mUtils.format.trim) ⇒ <code>String</code>

<a name="mUtils.format.reverse_str"></a>

#### format.reverse_str(str) ⇒ <code>String</code>
字符串反转

**Kind**: static method of <code>[format](#mUtils.format)</code>  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="mUtils.format.step_str"></a>

#### format.step_str(target, [step], [needReverse], [div]) ⇒ <code>String</code>
格式化手机号等，按位插入分隔符

**Kind**: static method of <code>[format](#mUtils.format)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | <code>Number</code> &#124; <code>String</code> |  | 目标数字或字符串 |
| [step] | <code>Number</code> | <code>4</code> | 插入分隔符的相隔位数 |
| [needReverse] | <code>Boolean</code> | <code>true</code> | 是否要从右向左进行插入 |
| [div] | <code>String</code> | <code>&quot; &quot;</code> | 分隔符 |

<a name="mUtils.format.knot_num"></a>

#### format.knot_num(num, [fix]) ⇒ <code>String</code>
添加千分位的数字分结号

**Kind**: static method of <code>[format](#mUtils.format)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| num | <code>Number</code> |  | 目标数字 |
| [fix] | <code>Number</code> | <code></code> | 如果同时要对小数限制位数则指定其位数 |

<a name="mUtils.format.limit_decimal"></a>

#### format.limit_decimal(num, [fix]) ⇒ <code>String</code>
限制小数位

**Kind**: static method of <code>[format](#mUtils.format)</code>  

| Param | Type | Default |
| --- | --- | --- |
| num | <code>Number</code> |  | 
| [fix] | <code>Number</code> | <code>2</code> | 

<a name="mUtils.format.num_pad_left"></a>

#### format.num_pad_left(num, [leng]) ⇒ <code>String</code>
补全数字左侧的0

**Kind**: static method of <code>[format](#mUtils.format)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| num | <code>Number</code> |  | 目标数字 |
| [leng] | <code>Number</code> | <code>2</code> | 最终位数 |

<a name="mUtils.format.num_limit_leng"></a>

#### format.num_limit_leng(value, leng) ⇒ <code>Number</code>
只允许数字并限制位数

**Kind**: static method of <code>[format](#mUtils.format)</code>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | 原始输入值 |
| leng | <code>Number</code> | 最大长度 |

<a name="mUtils.format.trim"></a>

#### format.trim(str) ⇒ <code>String</code>
去首尾空格

**Kind**: static method of <code>[format](#mUtils.format)</code>  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="mUtils.lang"></a>

### mUtils.lang : <code>object</code>
**Kind**: static namespace of <code>[mUtils](#mUtils)</code>  
<a name="mUtils.lang.read_i18n"></a>

#### lang.read_i18n(tmpl, ...args) ⇒ <code>String</code>
获取基于模板的文本值

**Kind**: static method of <code>[lang](#mUtils.lang)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tmpl | <code>String</code> | 文本模板，格式为 'hello{0},world{1}' |
| ...args | <code>String</code> | 用于替换的若干参数 |

<a name="mUtils.time"></a>

### mUtils.time : <code>object</code>
**Kind**: static namespace of <code>[mUtils](#mUtils)</code>  

* [.time](#mUtils.time) : <code>object</code>
    * [.date_to_YMD(date, [div])](#mUtils.time.date_to_YMD) ⇒ <code>String</code>
    * [.getTime([setting])](#mUtils.time.getTime) ⇒ <code>Date</code>
    * [.today([zeroTime])](#mUtils.time.today) ⇒ <code>Date</code>
    * [.tomorrow([zeroTime])](#mUtils.time.tomorrow) ⇒ <code>Date</code>
    * [.yesterday([zeroTime])](#mUtils.time.yesterday) ⇒ <code>Date</code>
    * [.get_clean_date([p_month], [p_year])](#mUtils.time.get_clean_date) ⇒ <code>Date</code>
    * [.calender(p_year, [p_month])](#mUtils.time.calender) ⇒ <code>Array</code>
    * [.date_range(rangeNums, [from])](#mUtils.time.date_range) ⇒ <code>Object</code>
    * [.is_leap_year([year])](#mUtils.time.is_leap_year) ⇒ <code>Boolean</code>

<a name="mUtils.time.date_to_YMD"></a>

#### time.date_to_YMD(date, [div]) ⇒ <code>String</code>
将字符串转化为yyyymmdd格式

**Kind**: static method of <code>[time](#mUtils.time)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>Date</code> |  | 目标时间 |
| [div] | <code>String</code> | <code>&#x27;-&#x27;</code> | 分隔符 |

<a name="mUtils.time.getTime"></a>

#### time.getTime([setting]) ⇒ <code>Date</code>
取得某个时间

**Kind**: static method of <code>[time](#mUtils.time)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [setting] | <code>Object</code> | {偏移值 offset, 基准时间 from, 是否置为0点 zeroTime, 是否置为1日 clean} |

<a name="mUtils.time.today"></a>

#### time.today([zeroTime]) ⇒ <code>Date</code>
取得当天

**Kind**: static method of <code>[time](#mUtils.time)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [zeroTime] | <code>Boolean</code> | <code>true</code> | 是否置为0点 |

<a name="mUtils.time.tomorrow"></a>

#### time.tomorrow([zeroTime]) ⇒ <code>Date</code>
取得明天

**Kind**: static method of <code>[time](#mUtils.time)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [zeroTime] | <code>Boolean</code> | <code>true</code> | 是否置为0点 |

<a name="mUtils.time.yesterday"></a>

#### time.yesterday([zeroTime]) ⇒ <code>Date</code>
取得昨天

**Kind**: static method of <code>[time](#mUtils.time)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [zeroTime] | <code>Boolean</code> | <code>true</code> | 是否置为0点 |

<a name="mUtils.time.get_clean_date"></a>

#### time.get_clean_date([p_month], [p_year]) ⇒ <code>Date</code>
取得一个某年某月1号0时的干净日期

**Kind**: static method of <code>[time](#mUtils.time)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [p_month] | <code>Number</code> | <code>1</code> | 
| [p_year] | <code>Number</code> | <code>今年</code> | 

<a name="mUtils.time.calender"></a>

#### time.calender(p_year, [p_month]) ⇒ <code>Array</code>
取得某月的日历

**Kind**: static method of <code>[time](#mUtils.time)</code>  
**Returns**: <code>Array</code> - 星期-日期 的二维数组: 周日0,周一1...  

| Param | Type | Default |
| --- | --- | --- |
| p_year | <code>Number</code> |  | 
| [p_month] | <code>Number</code> | <code>1</code> | 

<a name="mUtils.time.date_range"></a>

#### time.date_range(rangeNums, [from]) ⇒ <code>Object</code>
取得开始-结束的日期范围

**Kind**: static method of <code>[time](#mUtils.time)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rangeNums | <code>Number</code> |  | 开始到结束的天数 |
| [from] | <code>Date</code> | <code>今天</code> | 基准日期 |

<a name="mUtils.time.is_leap_year"></a>

#### time.is_leap_year([year]) ⇒ <code>Boolean</code>
是否闰年

**Kind**: static method of <code>[time](#mUtils.time)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [year] | <code>Number</code> | <code></code> | 年份 |

<a name="mUtils.url"></a>

### mUtils.url : <code>object</code>
**Kind**: static namespace of <code>[mUtils](#mUtils)</code>  

* [.url](#mUtils.url) : <code>object</code>
    * [.URLHash](#mUtils.url.URLHash)
        * [new URLHash([href], [hashChar], [separator])](#new_mUtils.url.URLHash_new)
        * [.get(key)](#mUtils.url.URLHash+get) ⇒ <code>String</code>
        * [.put(key, value)](#mUtils.url.URLHash+put) ⇒ <code>void</code>
        * [.putAll(keyValues)](#mUtils.url.URLHash+putAll) ⇒ <code>void</code>
        * [.remove(key)](#mUtils.url.URLHash+remove) ⇒ <code>void</code>
        * [.toString()](#mUtils.url.URLHash+toString) ⇒ <code>String</code>
        * [.clone()](#mUtils.url.URLHash+clone) ⇒ <code>URLHash</code>
    * [.query_params([query])](#mUtils.url.query_params) ⇒ <code>Object</code>
    * [.params_query(obj, [separator])](#mUtils.url.params_query) ⇒ <code>String</code>

<a name="mUtils.url.URLHash"></a>

#### url.URLHash
将hash部分转化为object

**Kind**: static class of <code>[url](#mUtils.url)</code>  

* [.URLHash](#mUtils.url.URLHash)
    * [new URLHash([href], [hashChar], [separator])](#new_mUtils.url.URLHash_new)
    * [.get(key)](#mUtils.url.URLHash+get) ⇒ <code>String</code>
    * [.put(key, value)](#mUtils.url.URLHash+put) ⇒ <code>void</code>
    * [.putAll(keyValues)](#mUtils.url.URLHash+putAll) ⇒ <code>void</code>
    * [.remove(key)](#mUtils.url.URLHash+remove) ⇒ <code>void</code>
    * [.toString()](#mUtils.url.URLHash+toString) ⇒ <code>String</code>
    * [.clone()](#mUtils.url.URLHash+clone) ⇒ <code>URLHash</code>

<a name="new_mUtils.url.URLHash_new"></a>

##### new URLHash([href], [hashChar], [separator])
构造方法


| Param | Type | Default |
| --- | --- | --- |
| [href] | <code>String</code> | <code>当前URL的hash</code> | 
| [hashChar] | <code>String</code> | <code>&#x27;#&#x27;</code> | 
| [separator] | <code>String</code> | <code>&quot;&amp;&quot;</code> | 

<a name="mUtils.url.URLHash+get"></a>

##### urlHash.get(key) ⇒ <code>String</code>
取得某个值

**Kind**: instance method of <code>[URLHash](#mUtils.url.URLHash)</code>  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="mUtils.url.URLHash+put"></a>

##### urlHash.put(key, value) ⇒ <code>void</code>
放置新值

**Kind**: instance method of <code>[URLHash](#mUtils.url.URLHash)</code>  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>Any</code> | 

<a name="mUtils.url.URLHash+putAll"></a>

##### urlHash.putAll(keyValues) ⇒ <code>void</code>
一次性设置多个值

**Kind**: instance method of <code>[URLHash](#mUtils.url.URLHash)</code>  

| Param | Type |
| --- | --- |
| keyValues | <code>Object</code> | 

<a name="mUtils.url.URLHash+remove"></a>

##### urlHash.remove(key) ⇒ <code>void</code>
删除某个值

**Kind**: instance method of <code>[URLHash](#mUtils.url.URLHash)</code>  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="mUtils.url.URLHash+toString"></a>

##### urlHash.toString() ⇒ <code>String</code>
转换为字符串

**Kind**: instance method of <code>[URLHash](#mUtils.url.URLHash)</code>  
<a name="mUtils.url.URLHash+clone"></a>

##### urlHash.clone() ⇒ <code>URLHash</code>
克隆一个实例

**Kind**: instance method of <code>[URLHash](#mUtils.url.URLHash)</code>  
<a name="mUtils.url.query_params"></a>

#### url.query_params([query]) ⇒ <code>Object</code>
将query字符串转换为object

**Kind**: static method of <code>[url](#mUtils.url)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [query] | <code>String</code> | <code>当前url的query</code> | 给定的query字符串 |

<a name="mUtils.url.params_query"></a>

#### url.params_query(obj, [separator]) ⇒ <code>String</code>
将object转换为query字符串

**Kind**: static method of <code>[url](#mUtils.url)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>Object</code> |  | 键值对的对象 |
| [separator] | <code>Stribng</code> | <code>&#x27;&amp;&#x27;</code> | 分隔符 |

<a name="mUtils.utils"></a>

### mUtils.utils : <code>object</code>
**Kind**: static namespace of <code>[mUtils](#mUtils)</code>  

* [.utils](#mUtils.utils) : <code>object</code>
    * [.ScrollLocker](#mUtils.utils.ScrollLocker)
        * [new ScrollLocker(settings)](#new_mUtils.utils.ScrollLocker_new)
        * [.lock()](#mUtils.utils.ScrollLocker+lock)
        * [.unlock()](#mUtils.utils.ScrollLocker+unlock)
    * [.enable_html5_for_old()](#mUtils.utils.enable_html5_for_old) ⇒ <code>void</code>
    * [.check_appcache()](#mUtils.utils.check_appcache) ⇒ <code>void</code>
    * [.page_to_top([top])](#mUtils.utils.page_to_top) ⇒ <code>void</code>
    * [.write_CSS(css)](#mUtils.utils.write_CSS) ⇒ <code>void</code>
    * [.form_primary_valid(form, [submitCallback], [noticeFunction], [submitTriggerEvent], [submitTriggerTarget], [mismatchNoticeName])](#mUtils.utils.form_primary_valid) ⇒ <code>void</code>

<a name="mUtils.utils.ScrollLocker"></a>

#### utils.ScrollLocker
锁定屏幕，限制其响应划动事件

**Kind**: static class of <code>[utils](#mUtils.utils)</code>  

* [.ScrollLocker](#mUtils.utils.ScrollLocker)
    * [new ScrollLocker(settings)](#new_mUtils.utils.ScrollLocker_new)
    * [.lock()](#mUtils.utils.ScrollLocker+lock)
    * [.unlock()](#mUtils.utils.ScrollLocker+unlock)

<a name="new_mUtils.utils.ScrollLocker_new"></a>

##### new ScrollLocker(settings)
构造方法


| Param | Type | Description |
| --- | --- | --- |
| settings | <code>Object</code> | 构造参数对象，可以设置ignores忽略对象列表等 |

<a name="mUtils.utils.ScrollLocker+lock"></a>

##### scrollLocker.lock()
执行锁定

**Kind**: instance method of <code>[ScrollLocker](#mUtils.utils.ScrollLocker)</code>  
<a name="mUtils.utils.ScrollLocker+unlock"></a>

##### scrollLocker.unlock()
解除锁定

**Kind**: instance method of <code>[ScrollLocker](#mUtils.utils.ScrollLocker)</code>  
<a name="mUtils.utils.enable_html5_for_old"></a>

#### utils.enable_html5_for_old() ⇒ <code>void</code>
确保老旧的设备可以使用html5的新元素

**Kind**: static method of <code>[utils](#mUtils.utils)</code>  
<a name="mUtils.utils.check_appcache"></a>

#### utils.check_appcache() ⇒ <code>void</code>
检查并监听applicationCache的更新情况

**Kind**: static method of <code>[utils](#mUtils.utils)</code>  
<a name="mUtils.utils.page_to_top"></a>

#### utils.page_to_top([top]) ⇒ <code>void</code>
将页面移动至指定位置

**Kind**: static method of <code>[utils](#mUtils.utils)</code>  

| Param | Type |
| --- | --- |
| [top] | <code>Number</code> | 

<a name="mUtils.utils.write_CSS"></a>

#### utils.write_CSS(css) ⇒ <code>void</code>
在页面中动态写入css

**Kind**: static method of <code>[utils](#mUtils.utils)</code>  

| Param | Type | Description |
| --- | --- | --- |
| css | <code>String</code> | css字符串 |

<a name="mUtils.utils.form_primary_valid"></a>

#### utils.form_primary_valid(form, [submitCallback], [noticeFunction], [submitTriggerEvent], [submitTriggerTarget], [mismatchNoticeName]) ⇒ <code>void</code>
利用html5的原生pattern校验，对自定义了规则的表单项提示错误信息

**Kind**: static method of <code>[utils](#mUtils.utils)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| form | <code>Element</code> |  |  |
| [submitCallback] | <code>function</code> | <code></code> | 校验成功后的回掉函数，参数为 (form, fieldsObj) |
| [noticeFunction] | <code>function</code> | <code></code> | *IOS only* 提示错误的方法 |
| [submitTriggerEvent] | <code>String</code> | <code>&#x27;click&#x27;</code> | 触发校验的事件 |
| [submitTriggerTarget] | <code>String</code> | <code>&#x27;.submit&#x27;</code> | 触发校验的目标元素上下文 |
| [mismatchNoticeName] | <code>String</code> | <code>&#x27;mismatch&#x27;</code> | 与pattern属性匹配的自定义提示语data-属性 |

