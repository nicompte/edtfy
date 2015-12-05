var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('FR - Level 1', function () {
  beforeEach(function() {
    edtfy.locale('fr');
  });
  describe('uncertain/approximate: the parser', function() {
    it('should parse year uncertain', function() {
      edtfy('1988?').should.equal('1988?');
    });
    it('should parse season uncertain', function() {
      edtfy('hiver 1988?').should.equal('1988-24?');
      edtfy('automne 1988?').should.equal('1988-23?');
    });
    it('should parse month uncertain', function() {
      edtfy('03/1988?').should.equal('1988-03?');
      edtfy('3/1988?').should.equal('1988-03?');
      edtfy('mars 1988?').should.equal('1988-03?');
      edtfy('mar 1988?').should.equal('1988-03?');
    });
    it('should parse day uncertain', function() {
      edtfy('29/03/1988?').should.equal('1988-03-29?');
      edtfy('29/03/1988 ?').should.equal('1988-03-29?');
      edtfy('le 29/03/1988?').should.equal('1988-03-29?');
      edtfy('29/3/1988?').should.equal('1988-03-29?');
      edtfy('29 mars 1988?').should.equal('1988-03-29?');
      edtfy('le 29 mars 1988?').should.equal('1988-03-29?');
      edtfy('29 mar 1988?').should.equal('1988-03-29?');
      edtfy('juin 2003 ?').should.equal('2003-06?');
    });
    it('should parse year approximate', function() {
      edtfy('environ 1988').should.equal('1988~');
      edtfy('vers 1988').should.equal('1988~');
    });
    it('should parse season approximate', function() {
      edtfy('environ l\'hiver 1988').should.equal('1988-24~');
      edtfy('vers l\'automne 1988').should.equal('1988-23~');
    });
    it('should parse month approximate', function() {
      edtfy('environ 03/1988').should.equal('1988-03~');
      edtfy('environ 3/1988').should.equal('1988-03~');
      edtfy('environ mars 1988').should.equal('1988-03~');
      edtfy('environ mar 1988').should.equal('1988-03~');
    });
    it('should parse day approximate', function() {
      edtfy('environ 29/03/1988').should.equal('1988-03-29~');
      edtfy('environ le 29/03/1988').should.equal('1988-03-29~');
      edtfy('environ 29/3/1988').should.equal('1988-03-29~');
      edtfy('environ 29 mars 1988').should.equal('1988-03-29~');
      edtfy('environ le 29 mars 1988').should.equal('1988-03-29~');
      edtfy('environ 29 mar 1988').should.equal('1988-03-29~');
    });
    it('should parse year approximate and uncertain', function() {
      edtfy('environ 1988?').should.equal('1988?~');
      edtfy('vers 1988?').should.equal('1988?~');
    });
    it('should parse season approximate and uncertain', function() {
      edtfy('environ l\'hiver 1988?').should.equal('1988-24?~');
      edtfy('vers l\'automne 1988?').should.equal('1988-23?~');
    });
    it('should parse month approximate and uncertain', function() {
      edtfy('environ 03/1988?').should.equal('1988-03?~');
      edtfy('environ 3/1988?').should.equal('1988-03?~');
      edtfy('environ mars 1988?').should.equal('1988-03?~');
      edtfy('environ mar 1988?').should.equal('1988-03?~');
    });
    it('should parse day approximate and uncertain', function() {
      edtfy('environ 29/03/1988?').should.equal('1988-03-29?~');
      edtfy('environ le 29/03/1988?').should.equal('1988-03-29?~');
      edtfy('environ 29/3/1988?').should.equal('1988-03-29?~');
      edtfy('environ 29 mars 1988?').should.equal('1988-03-29?~');
      edtfy('environ le 29 mars 1988?').should.equal('1988-03-29?~');
      edtfy('environ 29 mar 1988?').should.equal('1988-03-29?~');
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
      edtfy('1u/01/1988').should.equal('1988-01-1u');
      edtfy('1u/1/1988').should.equal('1988-01-1u');
      edtfy('uu/01/1988').should.equal('1988-01-uu');
      edtfy('1*/01/1988').should.equal('1988-01-1u');
      edtfy('1*/1/1988').should.equal('1988-01-1u');
      edtfy('**/01/1988').should.equal('1988-01-uu');
    });
  });
  describe('L1 extended interval: the parser', function() {
    it('should parse intervals with unknown dates', function() {
      edtfy('inconnue - 1988').should.equal('unknown/1988');
      edtfy('1988 - inconnu').should.equal('1988/unknown');
    });
    it('should parse intervals with open dates', function() {
      edtfy('1988 - en cours').should.equal('1988/open');
    });
    it('should parse various intervals', function() {
      edtfy('uu/1988 - environ 2005').should.equal('1988-uu/2005~');
      edtfy('mars 1988 - hiver 2005?').should.equal('1988-03/2005-24?');
      edtfy('de environ 10 sep 1988? à inconnu').should.equal('1988-09-10?~/unknown');
      edtfy('environ 10 sep 1988? - inconnu').should.equal('1988-09-10?~/unknown');
    });
  });
  describe('year exceeding four digits: the parser', function() {
    it('should handle them', function() {
      edtfy('21988').should.equal('y21988');
      edtfy('-21988').should.equal('y-21988');
      edtfy('3 mars -21988').should.equal('y-21988-03-03');
      edtfy('2/-21988').should.equal('y-21988-02');
      edtfy('10/11/21988').should.equal('y21988-11-10');
      edtfy('3 mars -21988').should.equal('y-21988-03-03');
    });
  });
  describe('season: the parser', function() {
    it('should parse seasons', function() {
      edtfy('printemps 1988').should.equal('1988-21');
      edtfy('été 1988').should.equal('1988-22');
      edtfy('ete 1988').should.equal('1988-22');
      edtfy('automne 1988').should.equal('1988-23');
      edtfy('hiver 1988').should.equal('1988-24');
    });
  });
});
