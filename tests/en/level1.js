var should = require('chai').should(),
  edtfy = require('../../dist/edtfy'),
  parser = {
    parse: function(string) {
      return edtfy.parse(string, {locale: 'en'});
    }
  };

describe('EN - Level 1', function () {
  describe('uncertain/approximate: the parser', function() {
    it('should parse year uncertain', function() {
      parser.parse('1988?').should.equal('1988?');
    });
    it('should parse season uncertain', function() {
      parser.parse('winter 1988?').should.equal('1988-24?');
      parser.parse('autumn 1988?').should.equal('1988-23?');
    });
    it('should parse month uncertain', function() {
      parser.parse('03/1988?').should.equal('1988-03?');
      parser.parse('3/1988?').should.equal('1988-03?');
      parser.parse('march 1988?').should.equal('1988-03?');
      parser.parse('mar 1988?').should.equal('1988-03?');
    });
    it('should parse day uncertain', function() {
      parser.parse('03/29/1988?').should.equal('1988-03-29?');
      parser.parse('03/29/1988 ?').should.equal('1988-03-29?');
      parser.parse('the 03/29/1988?').should.equal('1988-03-29?');
      parser.parse('3/29/1988?').should.equal('1988-03-29?');
      parser.parse('march 29 1988?').should.equal('1988-03-29?');
      parser.parse('march 29th 1988?').should.equal('1988-03-29?');
      parser.parse('mar 29 1988?').should.equal('1988-03-29?');
      parser.parse('june 2003 ?').should.equal('2003-06?');
    });
    it('should parse year approximate', function() {
      parser.parse('around 1988').should.equal('1988~');
      parser.parse('about 1988').should.equal('1988~');
    });
    it('should parse season approximate', function() {
      parser.parse('around winter 1988').should.equal('1988-24~');
      parser.parse('about autumn 1988').should.equal('1988-23~');
    });
    it('should parse month approximate', function() {
      parser.parse('around 03/1988').should.equal('1988-03~');
      parser.parse('around 3/1988').should.equal('1988-03~');
      parser.parse('around march 1988').should.equal('1988-03~');
      parser.parse('around mar 1988').should.equal('1988-03~');
    });
    it('should parse day approximate', function() {
      parser.parse('about 03/29/1988').should.equal('1988-03-29~');
      parser.parse('about 03/29/1988').should.equal('1988-03-29~');
      parser.parse('about 3/29/1988').should.equal('1988-03-29~');
      parser.parse('about march the 29th 1988').should.equal('1988-03-29~');
      parser.parse('about march 29 1988').should.equal('1988-03-29~');
      parser.parse('abt mar 29 1988').should.equal('1988-03-29~');
    });
    it('should parse year approximate and uncertain', function() {
      parser.parse('around 1988?').should.equal('1988?~');
      parser.parse('about 1988?').should.equal('1988?~');
    });
    it('should parse season approximate and uncertain', function() {
      parser.parse('around winter 1988?').should.equal('1988-24?~');
      parser.parse('around autumn 1988?').should.equal('1988-23?~');
    });
    it('should parse month approximate and uncertain', function() {
      parser.parse('around 03/1988?').should.equal('1988-03?~');
      parser.parse('around 3/1988?').should.equal('1988-03?~');
      parser.parse('around march 1988?').should.equal('1988-03?~');
      parser.parse('around mar 1988?').should.equal('1988-03?~');
    });
    it('should parse day approximate and uncertain', function() {
      parser.parse('around 03/29/1988?').should.equal('1988-03-29?~');
      parser.parse('around the 03/29/1988?').should.equal('1988-03-29?~');
      parser.parse('around 3/29/1988?').should.equal('1988-03-29?~');
      parser.parse('around march 29 1988?').should.equal('1988-03-29?~');
      parser.parse('around march the 29 1988?').should.equal('1988-03-29?~');
      parser.parse('around mar 29 1988?').should.equal('1988-03-29?~');
    });
  });
  describe('unspecified: the parser', function() {
    it('should parse year unspecified', function() {
      parser.parse('198u').should.equal('198u');
      parser.parse('19uu').should.equal('19uu');
    });
    it('should parse month unspecified', function() {
      parser.parse('1u/1988').should.equal('1988-1u');
      parser.parse('uu/1988').should.equal('1988-uu');
      parser.parse('u/1988').should.equal('1988-uu');
    });
    it('should parse day unspecified', function() {
      parser.parse('01/1u/1988').should.equal('1988-01-1u');
      parser.parse('1/1u/1988').should.equal('1988-01-1u');
      parser.parse('01/uu/1988').should.equal('1988-01-uu');
    });
  });
  describe('L1 extended interval: the parser', function() {
    it('should parse intervals with unknown dates', function() {
      parser.parse('unknown - 1988').should.equal('unknown/1988');
      parser.parse('1988 - unknown').should.equal('1988/unknown');
    });
    it('should parse intervals with open dates', function() {
      parser.parse('1988 - open').should.equal('1988/open');
    });
    it('should parse various intervals', function() {
      parser.parse('uu/1988 - around 2005').should.equal('1988-uu/2005~');
      parser.parse('march 1988 - winter 2005?').should.equal('1988-03/2005-24?');
      parser.parse('from around sep 10 1988? to unknown').should.equal('1988-09-10?~/unknown');
      parser.parse('around sep 10 1988? - unknown').should.equal('1988-09-10?~/unknown');
    });
  });
  describe('year exceeding four digits: the parser', function() {
    it('should handthe them', function() {
      parser.parse('21988').should.equal('y21988');
      parser.parse('-21988').should.equal('y-21988');
      parser.parse('march 3 -21988').should.equal('y-21988-03-03');
      parser.parse('2/-21988').should.equal('y-21988-02');
      parser.parse('11/10/21988').should.equal('y21988-11-10');
      parser.parse('march 3 -21988').should.equal('y-21988-03-03');
    });
  });
  describe('season: the parser', function() {
    it('should parse seasons', function() {
      parser.parse('spring 1988').should.equal('1988-21');
      parser.parse('summer 1988').should.equal('1988-22');
      parser.parse('autumn 1988').should.equal('1988-23');
      parser.parse('fall 1988').should.equal('1988-23');
      parser.parse('winter 1988').should.equal('1988-24');
    });
  });
});
