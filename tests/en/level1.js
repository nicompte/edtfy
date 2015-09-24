var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('EN - Level 1', function () {
  beforeEach(function() {
    edtfy.locale('en');
  });
  describe('uncertain/approximate: the parser', function() {
    it('should parse year uncertain', function() {
      edtfy.parse('1988?').should.equal('1988?');
    });
    it('should parse season uncertain', function() {
      edtfy.parse('winter 1988?').should.equal('1988-24?');
      edtfy.parse('autumn 1988?').should.equal('1988-23?');
    });
    it('should parse month uncertain', function() {
      edtfy.parse('03/1988?').should.equal('1988-03?');
      edtfy.parse('3/1988?').should.equal('1988-03?');
      edtfy.parse('march 1988?').should.equal('1988-03?');
      edtfy.parse('mar 1988?').should.equal('1988-03?');
    });
    it('should parse day uncertain', function() {
      edtfy.parse('03/29/1988?').should.equal('1988-03-29?');
      edtfy.parse('03/29/1988 ?').should.equal('1988-03-29?');
      edtfy.parse('the 03/29/1988?').should.equal('1988-03-29?');
      edtfy.parse('3/29/1988?').should.equal('1988-03-29?');
      edtfy.parse('march 29 1988?').should.equal('1988-03-29?');
      edtfy.parse('march 29th 1988?').should.equal('1988-03-29?');
      edtfy.parse('mar 29 1988?').should.equal('1988-03-29?');
      edtfy.parse('june 2003 ?').should.equal('2003-06?');
    });
    it('should parse year approximate', function() {
      edtfy.parse('around 1988').should.equal('1988~');
      edtfy.parse('about 1988').should.equal('1988~');
    });
    it('should parse season approximate', function() {
      edtfy.parse('around winter 1988').should.equal('1988-24~');
      edtfy.parse('about autumn 1988').should.equal('1988-23~');
    });
    it('should parse month approximate', function() {
      edtfy.parse('around 03/1988').should.equal('1988-03~');
      edtfy.parse('around 3/1988').should.equal('1988-03~');
      edtfy.parse('around march 1988').should.equal('1988-03~');
      edtfy.parse('around mar 1988').should.equal('1988-03~');
    });
    it('should parse day approximate', function() {
      edtfy.parse('about 03/29/1988').should.equal('1988-03-29~');
      edtfy.parse('about 03/29/1988').should.equal('1988-03-29~');
      edtfy.parse('about 3/29/1988').should.equal('1988-03-29~');
      edtfy.parse('about march the 29th 1988').should.equal('1988-03-29~');
      edtfy.parse('about march 29 1988').should.equal('1988-03-29~');
      edtfy.parse('abt mar 29 1988').should.equal('1988-03-29~');
    });
    it('should parse year approximate and uncertain', function() {
      edtfy.parse('around 1988?').should.equal('1988?~');
      edtfy.parse('about 1988?').should.equal('1988?~');
    });
    it('should parse season approximate and uncertain', function() {
      edtfy.parse('around winter 1988?').should.equal('1988-24?~');
      edtfy.parse('around autumn 1988?').should.equal('1988-23?~');
    });
    it('should parse month approximate and uncertain', function() {
      edtfy.parse('around 03/1988?').should.equal('1988-03?~');
      edtfy.parse('around 3/1988?').should.equal('1988-03?~');
      edtfy.parse('around march 1988?').should.equal('1988-03?~');
      edtfy.parse('around mar 1988?').should.equal('1988-03?~');
    });
    it('should parse day approximate and uncertain', function() {
      edtfy.parse('around 03/29/1988?').should.equal('1988-03-29?~');
      edtfy.parse('around the 03/29/1988?').should.equal('1988-03-29?~');
      edtfy.parse('around 3/29/1988?').should.equal('1988-03-29?~');
      edtfy.parse('around march 29 1988?').should.equal('1988-03-29?~');
      edtfy.parse('around march the 29 1988?').should.equal('1988-03-29?~');
      edtfy.parse('around mar 29 1988?').should.equal('1988-03-29?~');
    });
  });
  describe('unspecified: the parser', function() {
    it('should parse year unspecified', function() {
      edtfy.parse('198u').should.equal('198u');
      edtfy.parse('19uu').should.equal('19uu');
      edtfy.parse('198*').should.equal('198u');
      edtfy.parse('19**').should.equal('19uu');
    });
    it('should parse month unspecified', function() {
      edtfy.parse('1u/1988').should.equal('1988-1u');
      edtfy.parse('uu/1988').should.equal('1988-uu');
      edtfy.parse('u/1988').should.equal('1988-uu');
      edtfy.parse('1*/1988').should.equal('1988-1u');
      edtfy.parse('**/1988').should.equal('1988-uu');
      edtfy.parse('*/1988').should.equal('1988-uu');
    });
    it('should parse day unspecified', function() {
      edtfy.parse('01/1u/1988').should.equal('1988-01-1u');
      edtfy.parse('1/1u/1988').should.equal('1988-01-1u');
      edtfy.parse('01/uu/1988').should.equal('1988-01-uu');
      edtfy.parse('01/1*/1988').should.equal('1988-01-1u');
      edtfy.parse('1/1*/1988').should.equal('1988-01-1u');
      edtfy.parse('01/**/1988').should.equal('1988-01-uu');
    });
  });
  describe('L1 extended interval: the parser', function() {
    it('should parse intervals with unknown dates', function() {
      edtfy.parse('unknown - 1988').should.equal('unknown/1988');
      edtfy.parse('1988 - unknown').should.equal('1988/unknown');
    });
    it('should parse intervals with open dates', function() {
      edtfy.parse('1988 - open').should.equal('1988/open');
    });
    it('should parse various intervals', function() {
      edtfy.parse('uu/1988 - around 2005').should.equal('1988-uu/2005~');
      edtfy.parse('march 1988 - winter 2005?').should.equal('1988-03/2005-24?');
      edtfy.parse('from around sep 10 1988? to unknown').should.equal('1988-09-10?~/unknown');
      edtfy.parse('around sep 10 1988? - unknown').should.equal('1988-09-10?~/unknown');
    });
  });
  describe('year exceeding four digits: the parser', function() {
    it('should handthe them', function() {
      edtfy.parse('21988').should.equal('y21988');
      edtfy.parse('-21988').should.equal('y-21988');
      edtfy.parse('march 3 -21988').should.equal('y-21988-03-03');
      edtfy.parse('2/-21988').should.equal('y-21988-02');
      edtfy.parse('11/10/21988').should.equal('y21988-11-10');
      edtfy.parse('march 3 -21988').should.equal('y-21988-03-03');
    });
  });
  describe('season: the parser', function() {
    it('should parse seasons', function() {
      edtfy.parse('spring 1988').should.equal('1988-21');
      edtfy.parse('summer 1988').should.equal('1988-22');
      edtfy.parse('autumn 1988').should.equal('1988-23');
      edtfy.parse('fall 1988').should.equal('1988-23');
      edtfy.parse('winter 1988').should.equal('1988-24');
    });
  });
});
