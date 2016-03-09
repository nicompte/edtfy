var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('EN - Level 2', function () {
  beforeEach(function() {
    edtfy.locale('en');
  });
  describe('partial unspecified: the parser', function() {
    it('should parse various combinations', function() {
      edtfy('0u/11/1988').should.equal('1988-0u-11');
      edtfy('uu/11/198u').should.equal('198u-uu-11');
      edtfy('0u/1u/1988').should.equal('1988-0u-1u');
      edtfy('0u/1u/19uu').should.equal('19uu-0u-1u');
      edtfy('uu/1u/19uu').should.equal('19uu-uu-1u');
      edtfy('uu/uu/19uu').should.equal('19uu-uu-uu');
      edtfy('uu/uu/uu').should.equal('uu-uu-uu');
      edtfy('u/u/uu').should.equal('uu-uu-uu');
    });
  });
  describe('one of a set: the parser', function() {
    it('should parse simple set', function() {
      edtfy('march 1 2014 or april 2 2015').should.equal('[2014-03-01,2015-04-02]');
      edtfy('2011 or 2012').should.equal('[2011,2012]');
      edtfy('03/2011 or 2012').should.equal('[2011-03,2012]');
    });
    it('should parse multiple set', function() {
      edtfy('march 1 2014 or april 2 2015 or june 20 2016').should.equal('[2014-03-01,2015-04-02,2016-06-20]');
      edtfy('2011 or 2012 or 2013').should.equal('[2011,2012,2013]');
      edtfy('03/2011 or 2012 or summer 2013').should.equal('[2011-03,2012,2013-22]');
    });
    xit('should build smart sets', function() {
      edtfy('march 1 or april 2 2015').should.equal('[2015-03-01,2015-04-02]');
      edtfy('april 1 or 2 2015').should.equal('[2015-04-01,2015-04-02]');
      edtfy('spring or summer 2015').should.equal('[2015-21,2015-22]');
    });
    it('should parse before and after dates', function() {
      edtfy('after 1988').should.equal('[1988,..]');
      edtfy('before 1988').should.equal('[..,1988]');
      edtfy('after june 22nd 1987').should.equal('[1987-06-22,..]');
      edtfy('before around april -3000').should.equal('[..,-3000-04~]');
    });
  });
  describe('multiple dates: the parser', function() {
    it('should parse simple set', function() {
      edtfy('march 1 2014 and april 2 2015').should.equal('{2014-03-01,2015-04-02}');
      edtfy('2011 and 2012').should.equal('{2011,2012}');
      edtfy('03/2011 and 2012').should.equal('{2011-03,2012}');
    });
    it('should parse multiple set', function() {
      edtfy('march 1 2014 and april 2 2015 and june 20 2016').should.equal('{2014-03-01,2015-04-02,2016-06-20}');
      edtfy('2011 and 2012 and 2013').should.equal('{2011,2012,2013}');
      edtfy('03/2011 and 2012 and summer 2013').should.equal('{2011-03,2012,2013-22}');
    });
    xit('should build smart sets', function() {
      edtfy('1 march and 2 april 2015').should.equal('{2015-03-01,2015-04-02}');
      edtfy('1 and 2 april 2015').should.equal('{2015-04-01,2015-04-02}');
      edtfy('spring and summer 2015').should.equal('{2015-21,2015-22}');
    });
  });
});
