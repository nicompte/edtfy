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
});
