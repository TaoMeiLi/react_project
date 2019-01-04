import Promise from 'native-promise-only';
import { keys, extend, omit } from 'lodash';
import { 
	observable, observe,
	action, runInAction, untracked, useStrict 
} from 'mobx';
import requestUtil from '../utils/request';

useStrict(true);

const tableState = observable.shallowObject({

	history: null,
	path: null,
	init: action.bound(function(history, path) {
		untracked(()=>{
			this.history = history;
			this.path = path;
		});
	}),

	tableType: null, //报表类型
	statsType: 0, //统计类型（表现为tab）
	filter: null, //时间、门店等过滤条件

	data: null,
	page: 0,

	get totalPage() {
		return this.data ? this.data.totalPage : 0;
	},

	get queryString() {
		return this.getQueryFunc();
	},

	getQueryFunc: function(obj={}, needFilter=true) {
		const newObj = extend({}, this, obj);
		const {/*tableType, statsType, page, */filter} = newObj;

		let filterStr = '';
		
		// if (this.history.action === 'REPLACE') {
		// 	needFilter = false;
		// 	filterStr = keys(filter).map( key=>`${key}=` ).join('&');
		// 	console.log(filter, this.filter, filterStr);
		// }

		if (needFilter && filter) {
			filterStr = '&' + keys(filter)
				.sort()
				.map( key=>`${key}=${encodeURIComponent( filter[key] )}` )
				.join('&');
		}

		const str = ["tableType","statsType","page"]
			.filter(item=>needFilter&&filter&&(!filter.hasOwnProperty(item)))
			.map(item=>`${item}=${newObj[item]}`)
			.join('&');

		console.log('getQueryFunc', str, needFilter && filter);

		return `${str}${filterStr}`.replace(/\&$/, '');
	},

	_setValueNum: 0,
	setValue: action.bound(function (obj, slience=false) {
		const warpFunc = slience 
			? untracked 
			: runInAction;
		warpFunc(()=>{
			// console.log(111, obj._forceSearch);
			this._setValueNum = obj._forceSearch
				? 1
				: keys(obj).length;
			omit(obj, '_forceSearch');
			// console.log(222, obj, this._setValueNum);
			keys(obj).forEach(key=>{
				let vlu = obj[key];
				switch (key) {
					case 'statsType':
					case 'page':
						vlu = parseInt(vlu);
						break;
					default:
						break;
				}
				this[key] = vlu;
				// console.log(key, vlu);
			});
		});
		return this;
	}),

	search: action.bound(function(arg) {
		if (typeof arg === 'undefined') arg = {forceConfig: false};
		const { forceConfig } = arg;

		let reqs = [`/table/data?${this.queryString}`];
		if (forceConfig || this.data === null) {
			reqs.unshift( `/table/config?${this.queryString}` );
		}
		return requestUtil.sequence(
			reqs.map(req=>requestUtil.get(req))
		).then(rst=>new Promise((resolve, reject)=>{
			runInAction('action after search', ()=>{
				this.data = extend({}, this.data, rst);
				return resolve(this.data);
			});
		}));
	})
});

observe(tableState, change=>{
	if (!/^(?:tableType|statsType|page|filter)$/.test(change.name)) return;
	console.log('[tableState] observe1', change);

	let { queryString } = change.object;
	if (change.name === 'filter') {
		queryString = tableState.getQueryFunc(change.object, true);
		
		//filter中的page同步到页面中
		const m = /\Wpage\=(\d+)/.exec(queryString);
		if (m && m[1] != tableState.page) {
			change.object.page = parseInt(m[1]);
		}

		// console.log(333, tableState._setValueNum);

		if (tableState._setValueNum === 1) { //单独指定filter，也就是在页面中选择各种条件的情况下
			tableState.search({forceConfig: true});
		}
	}

	const {history, path, data} = change.object;
	if (history && path && queryString && data) {
		try {
			history.push(path + '?' + queryString);
		} catch(ex) {
			console.log(ex);
		}
	}
});

export default tableState;