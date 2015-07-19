var should = require('chai').should(),
  edtfy = require('../../dist/edtfy'),
  parser = {
    parse: function(string) {
      return edtfy.parse(string, {locale: 'en'});
    }
  };

describe('EN - extras', function () {
  describe('centuries: the parser', function() {
    it('should parse centuries with digits', function() {
      parser.parse('19th century').should.equal('18xx');
      // parser.parse('19th').should.equal('18xx');
      parser.parse('18 century').should.equal('17xx');
      parser.parse('3rd century').should.equal('2xx');
    });
    it('should parse centuries with roman numbers', function() {
      parser.parse('XIXth century').should.equal('18xx');
      // parser.parse('XIXth').should.equal('18xx');
      parser.parse('XVIIIth century').should.equal('17xx');
      parser.parse('IIIrd century').should.equal('2xx');
    });
  });
});
