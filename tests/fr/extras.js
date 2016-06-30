var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('FR - extras', function () {
  beforeEach(function() {
    edtfy.locale('fr');
  });
  describe('centuries: the parser', function() {
    it('should parse centuries with digits', function() {
      edtfy('19è siècle').should.equal('18xx');
      // edtfy('19è').should.equal('18xx');
      edtfy('18ème siècle').should.equal('17xx');
      edtfy('4 siecle').should.equal('3xx');
    });
    it('should parse centuries with roman numbers', function() {
      edtfy('XIXè siècle').should.equal('18xx');
      // edtfy('XIXè').should.equal('18xx');
      edtfy('XVIIIème siècle').should.equal('17xx');
      edtfy('IV siecle').should.equal('3xx');
    });
  });
  describe('sign: the parser', function() {
    it('should parse centuries with era suffixes', function() {
      edtfy('2nd siècle AEC').should.equal('-01xx');
      edtfy('2nd siècle EC').should.equal('1xx');
    });
    it('should parse years with era suffixes', function() {
      edtfy('2000AEC').should.equal('-1999');
      edtfy('2000EC').should.equal('2000');
    });
    it('should parse full dates with era suffixes', function() {
      edtfy('12 mars 24AEC').should.equal('-0023-03-12');
      edtfy('printemps 4AEC').should.equal('-0003-21');
      edtfy('ete 12u AEC').should.equal('-012u-22');
      edtfy('ete 120 AEC').should.equal('-0119-22');
    });
  });
});
