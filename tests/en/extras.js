var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('EN - extras', function () {
  beforeEach(function() {
    edtfy.locale('en');
  });
  describe('centuries: the parser', function() {
    it('should parse centuries with digits', function() {
      edtfy('19th century').should.equal('18xx');
      // edtfy('19th').should.equal('18xx');
      edtfy('18 century').should.equal('17xx');
      edtfy('3rd century').should.equal('2xx');
    });
    it('should parse centuries with roman numbers', function() {
      edtfy('XIXth century').should.equal('18xx');
      // edtfy('XIXth').should.equal('18xx');
      edtfy('XVIIIth century').should.equal('17xx');
      edtfy('IIIrd century').should.equal('2xx');
    });
  });
  describe('sign: the parser', function() {
    it('should parse centuries with era suffixes', function() {
      edtfy('2nd century BC').should.equal('-01xx');
      edtfy('2nd century AD').should.equal('1xx');
      edtfy('2nd century BCE').should.equal('-01xx');
      edtfy('2nd century CE').should.equal('1xx');
    });
    it('should parse years with era suffixes', function() {
      edtfy('2000BC').should.equal('-1999');
      edtfy('2000AD').should.equal('2000');
      edtfy('1000BCE').should.equal('-0999');
      edtfy('1000CE').should.equal('1000');
    });
    it('should parse full dates with era suffixes', function() {
      edtfy('12th March 24BC').should.equal('-0023-03-12');
      edtfy('Spring 4BCE').should.equal('-0003-21');
      edtfy('Summer 12u BCE').should.equal('-012u-22');
      edtfy('Summer 120 BCE').should.equal('-0119-22');
    });
  });
});
