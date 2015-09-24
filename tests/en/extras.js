var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('EN - extras', function () {
  beforeEach(function() {
    edtfy.locale('en');
  });
  describe('centuries: the parser', function() {
    it('should parse centuries with digits', function() {
      edtfy.parse('19th century').should.equal('18xx');
      // edtfy.parse('19th').should.equal('18xx');
      edtfy.parse('18 century').should.equal('17xx');
      edtfy.parse('3rd century').should.equal('2xx');
    });
    it('should parse centuries with roman numbers', function() {
      edtfy.parse('XIXth century').should.equal('18xx');
      // edtfy.parse('XIXth').should.equal('18xx');
      edtfy.parse('XVIIIth century').should.equal('17xx');
      edtfy.parse('IIIrd century').should.equal('2xx');
    });
  });
});
