import 'whatwg-fetch';
import Promise from 'native-promise-only';
import { keys, delay, isObject, extend, pick } from 'lodash'; // eslint-disable-line no-unused-vars
import { mock_prefix } from '../../dev.server';
import AppState from '../stores/AppState';
import SidebarState from '../stores/SidebarState';

const FETCH_TIMEOUT = 50 * 1000;
const FETCH_EXCEPTION = "_fetch_timeout_";
const _fetch = window.fetch;
window.fetch = function() {
	const fetchPromise = _fetch.apply(null, arguments);
	const timeoutPromise = new Promise(function(res, rej) {
		setTimeout(
			()=>rej(new Error(FETCH_EXCEPTION)),
			FETCH_TIMEOUT
		)
	});
	return Promise.race([fetchPromise, timeoutPromise]);
};

export const isBadRequest = status=>(status>=400 && status<=600);

export const isValidCode = code=>{
	let c = parseInt(code); return (!isNaN(c)) && (c == 0)
};

export default {
	request: method=>(url, params, errCallback)=>{
		AppState.setRequesting(true);

		if ('_isOldIE' in window && window._isOldIE) {
			params = extend({}, params, {
				ierand: parseInt(Math.random() * 100000)
			})
		}

		let reqUrl = `${mock_prefix}${url}`;
		if (AppState.config) {
			const rp = AppState.config.requests_proxy;
			if (isObject(rp)) {
				let re = null;
				for (let k in rp) {
					re = new RegExp(k);
					if (re.test(url)) {
						reqUrl = url.replace(re, rp[k]);
						console.log(`request: ${url} --> ${reqUrl}`)
						break;
					}
				}
			}
		}

		let headers = {
			'Accept': 'application/json'
		};
		if(!(params instanceof FormData)) {
			headers["Content-Type"] = 'application/json';
		}

		let reqObj = {
			method,
			headers: headers,
			body: params 
				? method === 'GET'
					? keys(params).reduce((arr, key)=>{
						if (!!params[key])
							arr.push(`${key}=${params[key]}`);
						return arr;
					}, []).join('&')
					: params instanceof FormData ? params : JSON.stringify(params) 
				: null,
			credentials: 'include',
			cache: 'reload'
		};

		if (reqObj.body === null) {
			delete reqObj.body;
		} else if (method === 'GET') {
			let divSign = ~reqUrl.indexOf('?') ? '&' : '?';
			reqUrl += divSign + reqObj.body;
			delete reqObj.body;
		}

		const req = new Request(reqUrl, reqObj);

		const _err = (msg, res) => {
			if (typeof errCallback === 'function') {
				errCallback(msg, res);
			} else {
				if (!('errlevel' in res) || res.errlevel === 'page') {
					AppState.history.push(`/msg/`, {
						message: `request failure ${msg ? ', '+msg : ''}`,
						response: res
					});
				} else if (res.errlevel === 'alert') {
					if ('alert' in AppState) AppState.alert(res.errmsg);
					else window.alert(res.errmsg);
				} else { // errlevel === 'console'
					console.log('ERR: ', res);
				}
			}
			AppState.setRequesting(false);
		};
		console.log(`[fetch] ${req.method} ${req.url}`);

		// const _startTime = new Date;

		return fetch(req)
			/*.then(res=>{
				fetch(new Request(
					`${mock_prefix}/timelog`,
					{
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							time: (new Date).getTime() - _startTime.getTime(),
							info: extend(pick(req, 'method', 'url', 'headers'), {
								referer: location.href
							})
						}),
						credentials: 'include',
					}
				)).catch(ex=>{
					// console.log('err when timelog: ', ex);
				});
				return res;
			})*/
			.then(res=>{
				if (isBadRequest(res.status)) {
					let ex = `state: ${res.status}`;
					_err(ex, res);
					throw new Error(ex);
				}
				return res.json();
			}).then(json=>{
				let {errcode, errmsg, result, errlevel} = json; // eslint-disable-line no-unused-vars
				if (!result) result = {};
				if ('route' in result) {
					console.log(route,'route requeset coming...')
					let {route, routeDelay, routeAfterMsg} = result;
					const _jump = timeout=>delay(
						/^(https?\:)?\/{2}/.test(route)
							? ()=>location.href=route
							: ()=>AppState.history.push(route, {
								timestamp: (new Date).getTime()
							}),
						timeout
					);
					if (routeAfterMsg) { //先显示提示页面再跳转
						_err(errmsg, json);
						delay(()=>_jump(routeDelay || 0), 1000);
					} else { //在当前页面跳转
						console.log('在当前页面跳转')
						_jump(routeDelay || 0);
					}
				}
				if ('app_nav' in result && isObject(result.app_nav)) {
					SidebarState.setNav(result.app_nav);
				}
				if (!isValidCode(errcode)) {
					let ex = `bussiness logic wrong (${errcode} "${errmsg}")`;
					_err(ex, json);
					throw new Error(ex);
				}

				const { pageTitle } = result; //自动更新标题
				if (pageTitle) document.title = pageTitle;

				AppState.setRequesting(false);
				return result;
			}).catch(ex=>{
				AppState.setRequesting(false);
				if (ex.message === FETCH_EXCEPTION) {
					window.alert("request timeout");
					return;
				}
				// console.warn(ex.message);
				throw ex;
			});
	},
	get(...args) {
		return this.request('GET')(...args);
	},
	post(...args) {	
		return this.request('POST')(...args);
	},
	sequence(reqPromises, autoMerge=true) {
		let results = [];
		return reqPromises.reduce(
			(promise, req)=>promise.then(
				()=>req.then(result=>results.push(result)).catch(ex=>Promise.reject(ex))
			), Promise.resolve()
		).then(
			()=>autoMerge
				? results.reduce((rst, curr)=>extend(rst, curr), {})
				: results
		);
	}
}