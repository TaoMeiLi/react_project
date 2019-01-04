/**
 * @private
 */
function _split2(s, separator) {
    let i = s.indexOf(separator);
    return i == -1 ? [s, ''] : [s.substring(0, i), s.substring(i + 1)];
}

/**
 * 将query字符串转换为object
 * @param  {String} [query=当前url的query] 给定的query字符串
 * @return {Object}
 * @memberOf mUtils.url
 */
const query_params = (query = window.location.search.substring(1)) => {
	if (!query) return null;
    let obj = {};
	query.split('&').forEach(function(params) {
		let
			p = params.split('='),
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
 * @memberOf mUtils.url
 */
function params_query(obj, separator='&') {
    let
        u = encodeURIComponent,
        k,
        r = [];
    for (k in obj) r.push(u(k) + '=' + u(obj[k]));
    return r.join(separator);
}

/**
 * 将hash部分转化为object
 * @memberOf mUtils.url
 */
class URLHash {
    /**
     * 构造方法
     * @constructor
     * @param  {String} [href=当前URL的hash]
     * @param  {String} [hashChar='#']
     * @param  {String} [separator="&"]
     * @return {Object}
     */
    constructor(href=window.location.href, hashChar='#', separator="&") {
        let
            h = href,
            s = separator,
            uArr = _split2(h, hashChar),
            hash_part = uArr[1];
        this.map = {};
        this.separator = separator;
        this.hashChar = hashChar;
        if (hash_part) {
            let arr = hash_part.split(s);
            for (let i = 0; i < arr.length; i++) {
                let s2 = arr[i];
                let o = _split2(s2, '=');
                this.map[o[0]] = o[1];
            }
        }
        this.size = function() {
            return this.keys().length;
        };
        this.keys = function() {
            let k = [];
            for (let m in this.map)
                if (m != '_hashfoo_') k.push(m);
            return k;
        };
        this.values = function() {
            let v = [];
            for (let m in this.map)
                if (m != '_hashfoo_') v.push(this.map[m]);
            return v;
        };
        this.put('_hashfoo_', Math.random());
    } //end of constructor
    /**
     * 取得某个值
     * @param  {String} key
     * @return {String}
     */
    get(key) {
        return this.map[key] || null;
    }
    /**
     * 放置新值
     * @param  {String} key
     * @param  {Any} value
     * @return {void}
     */
    put(key, value) {
        this.map[key] = value;
    }
    /**
     * 一次性设置多个值
     * @param  {Object} keyValues
     * @return {void}
     */
    putAll(keyValues) {
        if (typeof(keyValues) == 'object')
            for (let item in keyValues)
                this.map[item] = keyValues[item];
    }
    /**
     * 删除某个值
     * @param  {String} key
     * @return {void}
     */
    remove(key) {
        if (this.map[key]) {
            let newMap = {};
            for (let item in this.map)
                if (item != key) newMap[item] = this.map[item];
            this.map = newMap;
        }
    }
    /**
     * 转换为字符串
     * @return {String}
     */
    toString() {
        let m2 = {};
        for (let m in this.map)
            if (m != '_hashfoo_') m2[m] = this.map[m];
        return params_query(m2, "&");
    }
    /**
     * 克隆一个实例
     * @return {URLHash}
     */
    clone() {
        return new URLHash('foo#' + this.toString(), this.hashChar, this.separator);
    }
}

export
/**
 * @namespace url
 * @memberOf mUtils
 * @type {Object}
 */
{
    query_params,
    params_query,
    URLHash,
};