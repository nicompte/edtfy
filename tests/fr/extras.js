var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('FR - extras', function () {
  beforeEach(function() {
    edtfy.locale('fr');
  });
  describe('centuries: the parser', function() {
    it('should parse centuries with digits', function() {
      edtfy.parse('19è siècle').should.equal('18xx');
      // edtfy.parse('19è').should.equal('18xx');
      edtfy.parse('18ème siècle').should.equal('17xx');
      edtfy.parse('4 siecle').should.equal('3xx');
    });
    it('should parse centuries with roman numbers', function() {
      edtfy.parse('XIXè siècle').should.equal('18xx');
      // edtfy.parse('XIXè').should.equal('18xx');
      edtfy.parse('XVIIIème siècle').should.equal('17xx');
      edtfy.parse('IV siecle').should.equal('3xx');
    });
  });
});
