import jsdom from 'mocha-jsdom';
import {expect} from 'chai';
import mUtils from '../lib/mobile-utils.js';

describe('test url module...', function() {

	this.timeout(20*1000);
	jsdom();

	const {query_params, params_query, URLHash} = mUtils.url;

	describe('test query_params', ()=>{
		it('should parse the query string to a object', ()=>{
			expect( query_params('x=1&y=2') ).to.have.property('x').to.equal('1');
		});
	});

	describe('test params_query', ()=>{
		it('should parse the object to a query string', ()=>{
			expect( params_query({a:1, b:2}, '%%') ).to.equal('a=1%%b=2');
		});
	});

	describe('test URLHash', ()=>{
		var uh = new URLHash('http://baidu.com:8090/xxx/yyy?a=1&b=2#c=3&d=4');
		it('should get a right string by calling toString()', ()=>{
			expect( uh.toString() ).to.equal('c=3&d=4');
		});
		it('should clone a instance', ()=>{
			expect( uh.clone().toString() ).to.equal('c=3&d=4');
		});
		it('should get a item', ()=>{
			expect( uh.get('c') ).to.equal('3');
		});
		it('should put a item', ()=>{
			uh.put('e', '5');
			expect( uh.get('e') ).to.equal('5');
			expect( uh.toString() ).to.equal('c=3&d=4&e=5');
		});
		it('should put some items', ()=>{
			uh.putAll({
				x: 'hel',
				y: 'lo'
			});
			expect( uh.get('x') ).to.equal('hel');
			expect( uh.toString() ).to.equal('c=3&d=4&e=5&x=hel&y=lo');
		});
		it('should remove a item', ()=>{
			uh.remove('e');
			expect( uh.get('e') ).to.equal(null);
			expect( uh.toString() ).to.equal('c=3&d=4&x=hel&y=lo');
		});
		it('should get a size', ()=>{
			expect( uh.size() ).to.equal(4);
		});
		it('should get keys', ()=>{
			expect( uh.keys() ).to.have.length(4);
		});
		it('should get values', ()=>{
			expect( uh.values().join() ).to.equal(['3', '4', 'hel', 'lo'].join());
		});
	});

});