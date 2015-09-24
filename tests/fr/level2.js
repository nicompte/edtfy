var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('FR - Level 2', function () {
  beforeEach(function() {
    edtfy.locale('fr');
  });
  describe('partial unspecified: the parser', function() {
    it('should parse various combinations', function() {
      edtfy.parse('11/0u/1988').should.equal('1988-0u-11');
      edtfy.parse('11/uu/198u').should.equal('198u-uu-11');
      edtfy.parse('1u/0u/1988').should.equal('1988-0u-1u');
      edtfy.parse('1u/0u/19uu').should.equal('19uu-0u-1u');
      edtfy.parse('1u/uu/19uu').should.equal('19uu-uu-1u');
      edtfy.parse('uu/uu/19uu').should.equal('19uu-uu-uu');
      edtfy.parse('uu/uu/uu').should.equal('uu-uu-uu');
      edtfy.parse('u/u/uu').should.equal('uu-uu-uu');
    });
  });
  describe('one of a set: the parser', function() {
    it('should parse simple set', function() {
      edtfy.parse('1 mars 2014 ou 2 avril 2015').should.equal('[2014-03-01,2015-04-02]');
      edtfy.parse('2011 ou 2012').should.equal('[2011,2012]');
      edtfy.parse('03/2011 ou 2012').should.equal('[2011-03,2012]');
    });
    it('should parse multiple set', function() {
      edtfy.parse('1 mars 2014 ou 2 avril 2015 ou 20 juin 2016').should.equal('[2014-03-01,2015-04-02,2016-06-20]');
      edtfy.parse('2011 ou 2012 ou 2013').should.equal('[2011,2012,2013]');
      edtfy.parse('03/2011 ou 2012 ou été 2013').should.equal('[2011-03,2012,2013-22]');
    });
    it('should build smart sets', function() {
      edtfy.parse('1 mars ou 2 avril 2015').should.equal('[2015-03-01,2015-04-02]');
      edtfy.parse('1 ou 2 avril 2015').should.equal('[2015-04-01,2015-04-02]');
      edtfy.parse('printemps ou été 2015').should.equal('[2015-21,2015-22]');
    });
  });
  describe('multiple dates: the parser', function() {
    it('should parse simple set', function() {
      edtfy.parse('1 mars 2014 et 2 avril 2015').should.equal('{2014-03-01,2015-04-02}');
      edtfy.parse('2011 et 2012').should.equal('{2011,2012}');
      edtfy.parse('03/2011 et 2012').should.equal('{2011-03,2012}');
    });
    it('should parse multiple set', function() {
      edtfy.parse('1 mars 2014 et 2 avril 2015 et 20 juin 2016').should.equal('{2014-03-01,2015-04-02,2016-06-20}');
      edtfy.parse('2011 et 2012 et 2013').should.equal('{2011,2012,2013}');
      edtfy.parse('03/2011 et 2012 et été 2013').should.equal('{2011-03,2012,2013-22}');
    });
    it('should build smart sets', function() {
      edtfy.parse('1 mars et 2 avril 2015').should.equal('{2015-03-01,2015-04-02}');
      edtfy.parse('1 et 2 avril 2015').should.equal('{2015-04-01,2015-04-02}');
      edtfy.parse('printemps et été 2015').should.equal('{2015-21,2015-22}');
    });
  });
});
