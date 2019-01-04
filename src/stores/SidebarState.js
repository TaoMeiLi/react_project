import { observable, action, useStrict } from 'mobx';
import { filter, isArray } from 'lodash';
import AppState from './AppState';

useStrict(true);

const SidebarState = observable({
	navState: null,

	active_lv1: null, //sidebar中选中的一级菜单
	active_lv2: null, //sidebar中展开的二级菜单
	active_lv3: null, //sidebar中选中的三级菜单

	setNav: action.bound(function(nav) {
		this.navState = nav;
	}),

	setSidebarActive: action.bound(function(lv, value) {
		this[lv] = value;
	}),

	get relevant_lv2() { //取得点击一级菜单后对应的二级菜单
		if (!AppState.config 
			|| !AppState.config.nav 
			|| this.active_lv1===null) return null;
		let lv1 = filter(AppState.config.nav, (nav,idx)=>idx==this.active_lv1);
		if (!lv1.length) return null;
		let {sub} = lv1[0];
		if (!sub) return null;
		sub = sub.toJS()
		if (!isArray(sub) || !sub.length) return null;
		return sub;
	},

	get relevant_lv3() {
		if (!this.relevant_lv2 
			|| this.active_lv2===null
			|| this.relevant_lv2.length <= this.active_lv2) return null;
		let {sub} = this.relevant_lv2[this.active_lv2];
		if (!sub) return null;
		sub = sub.toJS();
		if (!isArray(sub) || !sub.length) return null;
		return sub;
	}
});

export default SidebarState;