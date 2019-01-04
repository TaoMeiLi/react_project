var
    _default = {
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
    let
        _ua = navigator.userAgent,
        _m = null,
        _formatV = function(vstr, vdiv) {
            let f = vstr.split(vdiv);
            f = f.shift() + '.' + f.join('');
            return f * 1;
        },
        _break = false
    ;

    env = Object.assign({}, _default, {
        ua: _ua,
        touchSupport: ('createTouch' in document),
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
        let bb = {
            a: _ua.match(/\(BB1\d+\;\s.*\sVersion\/([\.0-9]+)\s/),
            b: _ua.match(/\(BlackBerry\;\s.*\sVersion\/([\.0-9]+)\s/),
            c: _ua.match(/^BlackBerry\d+\/([\.0-9]+)\s/),
            d: _ua.match(/\(PlayBook\;\s.*\sVersion\/([\.0-9]+)\s/)
        };
        for (let k in bb) {
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
export default env;
