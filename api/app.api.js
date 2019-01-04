const { random } = require('lodash');
const { host, public_host, mock_port } = require('../dev.server.js');
const IS_PROD = ~process.argv[1].indexOf('preview');

/*应用全局*/
module.exports = (app, prefix) => {

	/**
	 * 获得全局数据
	 */
	app.get(`${prefix}/app/config`, function (req, res) {
		let normal_result = {
			login_state: {
				username: 'westlife'
			},
			nav: [
				{
					icon: 'config',
					label: '首页',
					route: '/index/config?nav_index=0'
				},
				{
					icon: 'set',
					label: '设置',
					sub: [
						{
							label: '设置1',
							route: '/index/set?nav_index=1&sub_nav_idex=0'
						},
						{
							label: '设置2',
							route: '/index/set?nav_index=1&sub_nav_idex=1'
						}
					]
				},
			]	
		},
		login_result = {
			route: "/login"
		};
		
		let result = normal_result; //random(0, 1) ? normal_result : login_result;
		res.json({

			errcode: 0, //random(0, 1),
			errmsg: ':)',
			result: result
		});
	});


}