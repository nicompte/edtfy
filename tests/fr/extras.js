var should = require('chai').should(),
  edtfy = require('../../dist/edtfy'),
  parser = {
    parse: function(string) {
      return edtfy.parse(string, {locale: 'fr'});
    }
  };

describe('FR - extras', function () {
  describe('centuries: the parser', function() {
    it('should parse centuries with digits', function() {
      parser.parse('19è siècle').should.equal('18xx');
      // parser.parse('19è').should.equal('18xx');
      parser.parse('18ème siècle').should.equal('17xx');
      parser.parse('4 siecle').should.equal('3xx');
    });
    it('should parse centuries with roman numbers', function() {
      parser.parse('XIXè siècle').should.equal('18xx');
      // parser.parse('XIXè').should.equal('18xx');
      parser.parse('XVIIIème siècle').should.equal('17xx');
      parser.parse('IV siecle').should.equal('3xx');
    });
  });
});
