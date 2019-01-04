import jsdom from 'mocha-jsdom';
import {expect} from 'chai';
import mUtils from '../lib/mobile-utils.js';

describe('test dom module...', function() {

	this.timeout(20*1000);
	jsdom();

	//https://github.com/cure53/DOMPurify/issues/80
	// "insertAdjacentHTML is missing in jsdom"
	let
		dom1,
		{
			has_class,
		    add_class,
		    remove_class,
		    real_style,
		    // append_HTML,
		    // prepend_HTML,
		    tag_range_from_HTML
		} = mUtils.dom;

	beforeEach(()=>{
		dom1 = document.createElement('div');
		dom1.id = 'fake_dom1';
		dom1.className = 'cls1 cls2';
		dom1.style.marginLeft = '20px';
		dom1.style.width = '100px';
		dom1.innerHTML = '<h1 style="display:block;width:50%">hello</h1><h2>world</h2>';
	});

	describe('test has_class', ()=>{
		it('should return true', ()=>{
			expect( has_class(dom1, 'cls2') ).to.equal(true);
		});
		it('should return false', ()=>{
			expect( has_class(dom1, 'cls3') ).to.equal(false);
		});
	});

	describe('test add_class', ()=>{
		it('should add the correct className', ()=>{
			add_class(dom1, 'cls3');
			expect(dom1.classList.contains('cls3')).to.equal(true);
		});
	});

	describe('test remove_class', ()=>{
		it('should remove the correct className', ()=>{
			remove_class(dom1, 'cls2');
			expect(dom1.classList.contains('cls2')).to.equal(false);
		});
	});

	describe('test real_style', ()=>{
		it('should calculate the right width', ()=>{
			expect( parseInt(real_style(dom1, 'marginLeft')) ).to.equal(20);
			expect( parseInt(real_style(dom1.querySelector('h1'), 'width')) ).to.equal(50);
		});
	});

	describe('test tag_range_from_HTML', ()=>{
		it('should return the right tag range', ()=>{
			let
				html = dom1.innerHTML,
				range = tag_range_from_HTML('width:50%', html);
			expect(range.start).to.equal(0);
			expect(range.end).to.equal( html.indexOf('<h2>') );
		});
	});

});