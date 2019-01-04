import {expect} from 'chai';
import mUtils from '../lib/mobile-utils.js';

describe('test time module...', ()=> {

	let {
			date_to_YMD,
		    getTime,
		    today,
		    tomorrow,
		    yesterday,
		    get_clean_date,
		    calender,
		    date_range,
		    is_leap_year,
		} = mUtils.time;

	let now;
	beforeEach(()=>{
		now = new Date(Date.now());
	});

	describe('test date_to_YMD', ()=>{
		it('should trans date to a YMD string', ()=>{
			expect( date_to_YMD( new Date('1982-05-30'), '' ) ).to.equal('19820530');
		});
	});

	describe('test getTime', ()=>{
		describe('get now', ()=>{
			it('should get now', ()=>{
				expect( getTime().getDate() ).to.equal( now.getDate() );
				expect( getTime().getMonth() ).to.equal( now.getMonth() );
				expect( getTime().getFullYear() ).to.equal( now.getFullYear() );
				expect( getTime().getHours() ).to.equal( now.getHours() );
			});
		});
		describe('get time with params', ()=>{
			it('should get a right time', ()=>{
				let time = getTime({
					from: new Date('1982-05-30'),
					offset: -4 * mUtils.time._aDay,
					zeroTime: true
				});
				expect( time.getDate() ).to.equal(26);
				expect( time.getFullYear() ).to.equal(1982);
				expect( time.getHours() ).to.equal(0);
			});
		});
	});

	describe('test common days', ()=>{
		it('should get right days', ()=>{
			function getSeconds(time) {
				return parseInt(time / 1000);
			}
			expect( today().getDate() ).to.equal( now.getDate() );
			expect( getSeconds(yesterday(false).getTime()) ).to.equal(
				getSeconds(now.getTime() - mUtils.time._aDay)
			);
			expect( getSeconds(tomorrow(false).getTime()) ).to.equal(
				getSeconds(now.getTime() + mUtils.time._aDay)
			);
		});
	});

	describe('test get_clean_date', ()=>{
		it('should get a begining day of a month', ()=>{
			expect( get_clean_date(3, 1982).toLocaleString().split(/[\s$]/)[0] ).to.equal('1982-3-1');
			expect( get_clean_date(5, 1982).toLocaleString().split(/[\s$]/)[0] ).to.equal('1982-5-1');
		});
	});

	describe('test calender', ()=>{
		it('should get a calender of a month', ()=>{
			let cale = calender(2, 2016);
			expect(cale).to.have.length(5);
			expect(new Date(cale[3][0]).getDay()).to.equal(0);
			expect(new Date(cale[4][1]).getDate()).to.equal(29);
		});
	});

	describe('test date_range', ()=>{
		it('should get range from a date', ()=>{
			let range = date_range(2, yesterday());
			expect(range.end.toLocaleString()).to.equal(tomorrow().toLocaleString());
		});
	});

	describe('test is_leap_year', ()=>{
		it('should check if the given year is leap', ()=>{
			expect(is_leap_year(2016)).to.equal(true);
			expect(is_leap_year(2000)).to.equal(true);
			expect(is_leap_year(2005)).to.equal(false);
			expect(is_leap_year(2006)).to.equal(false);
		});
	});

});