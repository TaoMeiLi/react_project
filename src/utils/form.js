import formSerialize from 'form-serialize';
import { getB64Str } from 'Utils/base64';
import Promise from 'native-promise-only';

export default {
	getDataFrom(form) {
		let s = formSerialize(form, {hash: true});
		return s;
	},
	getMultipartFrom(form) {
		let s = this.getDataFrom(form);
		const fileIpts = [].filter.call(form.elements, ele=>ele.type==='file'&&ele.value);

		return Promise.all(
			fileIpts.map(ipt=>new Promise(function(resolve, reject) {

				const { files } = ipt;
				let arr = new Array(files.length);
				
				return Promise.all(

					[].map.call(files, (file, fidx)=>new Promise(function(resolve2, reject2) { // eslint-disable-line no-unused-vars

						const fr = new FileReader;
						fr.onload = function(e) {
							const b64 = getB64Str(e.target.result);
							resolve2({fidx,b64});
						};
						fr.readAsArrayBuffer(file);
						
					}))

				).then( args=>{
					for (let i=0; i<args.length; i++) {
						let arg = args[i];
						arr[arg.fidx] = arg.b64;
					}
					s[ipt.name] = arr;
					resolve();
				})

			}))
		).then(()=>s);
	}
};