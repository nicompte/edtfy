var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('EN - Level 1', function () {
  beforeEach(function() {
    edtfy.locale('en');
  });
  describe('uncertain/approximate: the parser', function() {
    it('should parse year uncertain', function() {
      edtfy('1988?').should.equal('1988?');
    });
    it('should parse season uncertain', function() {
      edtfy('winter 1988?').should.equal('1988-24?');
      edtfy('autumn 1988?').should.equal('1988-23?');
    });
    it('should parse month uncertain', function() {
      edtfy('03/1988?').should.equal('1988-03?');
      edtfy('3/1988?').should.equal('1988-03?');
      edtfy('march 1988?').should.equal('1988-03?');
      edtfy('mar 1988?').should.equal('1988-03?');
    });
    it('should parse day uncertain', function() {
      edtfy('03/29/1988?').should.equal('1988-03-29?');
      edtfy('03/29/1988 ?').should.equal('1988-03-29?');
      edtfy('the 03/29/1988?').should.equal('1988-03-29?');
      edtfy('3/29/1988?').should.equal('1988-03-29?');
      edtfy('march 29 1988?').should.equal('1988-03-29?');
      edtfy('march 29th 1988?').should.equal('1988-03-29?');
      edtfy('mar 29 1988?').should.equal('1988-03-29?');
      edtfy('june 2003 ?').should.equal('2003-06?');
    });
    it('should parse year approximate', function() {
      edtfy('around 1988').should.equal('1988~');
      edtfy('about 1988').should.equal('1988~');
    });
    it('should parse season approximate', function() {
      edtfy('around winter 1988').should.equal('1988-24~');
      edtfy('about autumn 1988').should.equal('1988-23~');
    });
    it('should parse month approximate', function() {
      edtfy('around 03/1988').should.equal('1988-03~');
      edtfy('around 3/1988').should.equal('1988-03~');
      edtfy('around march 1988').should.equal('1988-03~');
      edtfy('around mar 1988').should.equal('1988-03~');
    });
    it('should parse day approximate', function() {
      edtfy('about 03/29/1988').should.equal('1988-03-29~');
      edtfy('about 03/29/1988').should.equal('1988-03-29~');
      edtfy('about 3/29/1988').should.equal('1988-03-29~');
      edtfy('about march the 29th 1988').should.equal('1988-03-29~');
      edtfy('about march 29 1988').should.equal('1988-03-29~');
      edtfy('abt mar 29 1988').should.equal('1988-03-29~');
    });
    it('should parse year approximate and uncertain', function() {
      edtfy('around 1988?').should.equal('1988?~');
      edtfy('about 1988?').should.equal('1988?~');
    });
    it('should parse season approximate and uncertain', function() {
      edtfy('around winter 1988?').should.equal('1988-24?~');
      edtfy('around autumn 1988?').should.equal('1988-23?~');
    });
    it('should parse month approximate and uncertain', function() {
      edtfy('around 03/1988?').should.equal('1988-03?~');
      edtfy('around 3/1988?').should.equal('1988-03?~');
      edtfy('around march 1988?').should.equal('1988-03?~');
      edtfy('around mar 1988?').should.equal('1988-03?~');
    });
    it('should parse day approximate and uncertain', function() {
      edtfy('around 03/29/1988?').should.equal('1988-03-29?~');
      edtfy('around the 03/29/1988?').should.equal('1988-03-29?~');
      edtfy('around 3/29/1988?').should.equal('1988-03-29?~');
      edtfy('around march 29 1988?').should.equal('1988-03-29?~');
      edtfy('around march the 29 1988?').should.equal('1988-03-29?~');
      edtfy('around mar 29 1988?').should.equal('1988-03-29?~');
    });
  });
  describe('unspecified: the parser', function() {
    it('should parse year unspecified', function() {
      edtfy('198u').should.equal('198u');
      edtfy('19uu').should.equal('19uu');
      edtfy('198*').should.equal('198u');
      edtfy('19**').should.equal('19uu');
    });
    it('should parse month unspecified', function() {
      edtfy('1u/1988').should.equal('1988-1u');
      edtfy('uu/1988').should.equal('1988-uu');
      edtfy('u/1988').should.equal('1988-uu');
      edtfy('1*/1988').should.equal('1988-1u');
      edtfy('**/1988').should.equal('1988-uu');
      edtfy('*/1988').should.equal('1988-uu');
    });
    it('should parse day unspecified', function() {
      edtfy('01/1u/1988').should.equal('1988-01-1u');
      edtfy('1/1u/1988').should.equal('1988-01-1u');
      edtfy('01/uu/1988').should.equal('1988-01-uu');
      edtfy('01/1*/1988').should.equal('1988-01-1u');
      edtfy('1/1*/1988').should.equal('1988-01-1u');
      edtfy('01/**/1988').should.equal('1988-01-uu');
    });
  });
  describe('L1 extended interval: the parser', function() {
    it('should parse intervals with unknown dates', function() {
      edtfy('unknown - 1988').should.equal('unknown/1988');
      edtfy('1988 - unknown').should.equal('1988/unknown');
    });
    it('should parse intervals with open dates', function() {
      edtfy('1988 - open').should.equal('1988/open');
    });
    it('should parse various intervals', function() {
      edtfy('uu/1988 - around 2005').should.equal('1988-uu/2005~');
      edtfy('march 1988 - winter 2005?').should.equal('1988-03/2005-24?');
      edtfy('from around sep 10 1988? to unknown').should.equal('1988-09-10?~/unknown');
      edtfy('around sep 10 1988? - unknown').should.equal('1988-09-10?~/unknown');
    });
  });
  describe('year exceeding four digits: the parser', function() {
    it('should handthe them', function() {
      edtfy('21988').should.equal('y21988');
      edtfy('-21988').should.equal('y-21988');
      edtfy('march 3 -21988').should.equal('y-21988-03-03');
      edtfy('2/-21988').should.equal('y-21988-02');
      edtfy('11/10/21988').should.equal('y21988-11-10');
      edtfy('march 3 -21988').should.equal('y-21988-03-03');
    });
  });
  describe('season: the parser', function() {
    it('should parse seasons', function() {
      edtfy('spring 1988').should.equal('1988-21');
      edtfy('summer 1988').should.equal('1988-22');
      edtfy('autumn 1988').should.equal('1988-23');
      edtfy('fall 1988').should.equal('1988-23');
      edtfy('winter 1988').should.equal('1988-24');
    });
  });
});
