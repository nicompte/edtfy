var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('FR - Level 2', function () {
  beforeEach(function() {
    edtfy.locale('fr');
  });
  describe('partial unspecified: the parser', function() {
    it('should parse various combinations', function() {
      edtfy('11/0u/1988').should.equal('1988-0u-11');
      edtfy('11/uu/198u').should.equal('198u-uu-11');
      edtfy('1u/0u/1988').should.equal('1988-0u-1u');
      edtfy('1u/0u/19uu').should.equal('19uu-0u-1u');
      edtfy('1u/uu/19uu').should.equal('19uu-uu-1u');
      edtfy('uu/uu/19uu').should.equal('19uu-uu-uu');
      edtfy('uu/uu/uu').should.equal('uu-uu-uu');
      edtfy('u/u/uu').should.equal('uu-uu-uu');
    });
  });
  describe('one of a set: the parser', function() {
    it('should parse simple set', function() {
      edtfy('1 mars 2014 ou 2 avril 2015').should.equal('[2014-03-01,2015-04-02]');
      edtfy('2011 ou 2012').should.equal('[2011,2012]');
      edtfy('03/2011 ou 2012').should.equal('[2011-03,2012]');
    });
    it('should parse multiple set', function() {
      edtfy('1 mars 2014 ou 2 avril 2015 ou 20 juin 2016').should.equal('[2014-03-01,2015-04-02,2016-06-20]');
      edtfy('2011 ou 2012 ou 2013').should.equal('[2011,2012,2013]');
      edtfy('03/2011 ou 2012 ou été 2013').should.equal('[2011-03,2012,2013-22]');
    });
    it('should build smart sets', function() {
      edtfy('1 mars ou 2 avril 2015').should.equal('[2015-03-01,2015-04-02]');
      edtfy('1 ou 2 avril 2015').should.equal('[2015-04-01,2015-04-02]');
      edtfy('printemps ou été 2015').should.equal('[2015-21,2015-22]');
    });
    it('should parse before and after dates', function() {
      edtfy('après 1988').should.equal('[1988,..]');
      edtfy('avant 1988').should.equal('[..,1988]');
      edtfy('après le 22 juin 1987').should.equal('[1987-06-22,..]');
      edtfy('avant environ avril -3000').should.equal('[..,-3000-04~]');
    });
  });
  describe('multiple dates: the parser', function() {
    it('should parse simple set', function() {
      edtfy('1 mars 2014 et 2 avril 2015').should.equal('{2014-03-01,2015-04-02}');
      edtfy('2011 et 2012').should.equal('{2011,2012}');
      edtfy('03/2011 et 2012').should.equal('{2011-03,2012}');
    });
    it('should parse multiple set', function() {
      edtfy('1 mars 2014 et 2 avril 2015 et 20 juin 2016').should.equal('{2014-03-01,2015-04-02,2016-06-20}');
      edtfy('2011 et 2012 et 2013').should.equal('{2011,2012,2013}');
      edtfy('03/2011 et 2012 et été 2013').should.equal('{2011-03,2012,2013-22}');
    });
    it('should build smart sets', function() {
      edtfy('1 mars et 2 avril 2015').should.equal('{2015-03-01,2015-04-02}');
      edtfy('1 et 2 avril 2015').should.equal('{2015-04-01,2015-04-02}');
      edtfy('printemps et été 2015').should.equal('{2015-21,2015-22}');
    });
  });
});
