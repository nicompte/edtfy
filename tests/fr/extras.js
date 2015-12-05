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
});
