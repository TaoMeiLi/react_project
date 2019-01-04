import AppState from '../stores/AppState';

export default {
	setSessionStorage(key, value) {
		sessionStorage.setItem(key, value)
	},
	getSessionStorage(key) {
		return sessionStorage.getItem(key);
	},
	isExpireSession(key, time, type) {
		let data = sessionStorage.getItem(key);
		if(!data) return true;
		let nowTime = Date.now(), 
			prevTime = data;
		if(nowTime - prevTime >= time) {
			return true;
		} else {
			switch(type){
				case 'synchKinds':
					AppState.alert("距离上次同步数据还不到十分钟");
					break;
				case 'resetKinds':
					AppState.alert("距离上次重置数据还不到十分钟");
					break;
				default:
					break;
			}
			
		}
			
		return false;
	} 
};