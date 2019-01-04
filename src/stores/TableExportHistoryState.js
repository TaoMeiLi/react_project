import { observable, action, runInAction, useStrict } from 'mobx';
import { tableexport_getAll, tableexport_remove } from '../app_requests';

useStrict(true);

class State {
	@observable data = null;

	@action update(searchStr) {
		tableexport_getAll(searchStr)
			.then(rst=>runInAction(()=>{
				this.data=rst
			}));
	}
	@action remove(id) {
		tableexport_remove(id).then(rst=>runInAction(()=>{ // eslint-disable-line no-unused-vars
			let rmidx = null;
			let arr = this.data.rows.slice();
			for (let i=0; i<arr.length; i++) {
				if (arr[i].id == id) {
					console.log(i, id);
					rmidx = i;
					break;
				}
			}
			arr.splice(rmidx, 1);
			this.data.rows = arr;
		}));
	}
}

export default State;