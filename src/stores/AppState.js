import { observable, action, runInAction, useStrict } from 'mobx';
import { delay } from 'lodash';
import { getAppConfig, logOut } from '../app_requests';

useStrict(true);

let AppState = observable({
	history: null,
	currentNav: "",
	setCurrentNav: action.bound(function(nav) {
		if (nav) {
			this.currentNav = nav.label;
			console.log('app init currentNav');
		}
	}),

	initRouter: action.bound(function(router) {
		if (router) {
			this.history = router.history;
			console.log('app init');
		}
	}),

	requesting: false,
	setRequesting: action.bound(function(bool) {
		delay(
			()=>runInAction(
				()=>this.requesting = bool
			), 
			bool?0:300
		);
	}),

	config: null,
	requestConfig: action.bound(function() {
		return getAppConfig().then(rst=>{
			runInAction(
				()=>this.config=rst
			);
		});
	}),

	globalAlert: null,
	alert: action.bound(function(msg) {
		this.globalAlert = msg;
	}),
	hideAlert: action.bound(function() {
		this.globalAlert = null;
	}),
	toLogout: action.bound(function() {
		logOut();
	}),


});

export default AppState;