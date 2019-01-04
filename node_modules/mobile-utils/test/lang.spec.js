import {expect} from 'chai';
import mUtils from '../lib/mobile-utils.js';

describe('test lang module...', ()=>{

	const {read_i18n} = mUtils.lang;

	describe('when call the function without args', ()=>{
		it('should return same string', ()=>{
			const tmpl = 'what a wonderful world!';
			expect( read_i18n(tmpl) ).to.be.equal(tmpl);
		});
	});

	describe('when call the function with args', ()=>{
		it('should return correct string', ()=>{
			const
				tmpl = 'what a {0} {1}! {0}!',
				word1 = 'wonderful',
				word2 = 'world',
				exp = `what a ${word1} ${word2}! ${word1}!`;
			expect( read_i18n(tmpl, word1, word2) ).to.be.equal(exp);
		});
	});

});